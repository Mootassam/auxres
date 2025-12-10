"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongooseRepository_1 = __importDefault(require("./mongooseRepository"));
const mongooseQueryUtils_1 = __importDefault(require("../utils/mongooseQueryUtils"));
const auditLogRepository_1 = __importDefault(require("./auditLogRepository"));
const Error404_1 = __importDefault(require("../../errors/Error404"));
const fileRepository_1 = __importDefault(require("./fileRepository"));
const spot_1 = __importDefault(require("../models/spot"));
const transaction_1 = __importDefault(require("../models/transaction"));
const wallet_1 = __importDefault(require("../models/wallet"));
class SpotRepository {
    static create(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("🚀 ~ SpotRepository ~ create ~ data:", data);
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            try {
                // Get the trading pair and extract base/quote currencies
                const [baseCurrency, quoteCurrency] = data.tradingPair.split('/');
                let targetWallet;
                let sourceWallet;
                if (data.direction === "BUY") {
                    // BUY LOGIC: Convert quote currency to base currency
                    // 1. Find or create the target wallet (base currency)
                    targetWallet = yield wallet_1.default(options.database).findOne({
                        user: currentUser.id,
                        symbol: baseCurrency,
                        tenant: currentTenant.id,
                        accountType: 'perpetual'
                    });
                    if (!targetWallet) {
                        // Create new wallet for the base currency
                        [targetWallet] = yield wallet_1.default(options.database).create([{
                                user: currentUser.id,
                                symbol: baseCurrency,
                                coinName: baseCurrency,
                                amount: 0,
                                status: "available",
                                tenant: currentTenant.id,
                                createdBy: currentUser.id,
                                updatedBy: currentUser.id
                            }]);
                    }
                    // 2. Find the source wallet (quote currency - usually USDT)
                    sourceWallet = yield wallet_1.default(options.database).findOne({
                        user: currentUser.id,
                        symbol: quoteCurrency,
                        tenant: currentTenant.id,
                        accountType: 'perpetual'
                    });
                    if (!sourceWallet) {
                        throw new Error(`Wallet for ${quoteCurrency} not found. Please deposit ${quoteCurrency} first.`);
                    }
                    // 3. Check if source wallet has sufficient balance
                    const requiredAmount = data.entrustedValue || data.orderQuantity * data.commissionPrice;
                    if (sourceWallet.amount < requiredAmount) {
                        throw new Error(`Insufficient ${quoteCurrency} balance. Available: ${sourceWallet.amount}, Required: ${requiredAmount}`);
                    }
                    // 4. Execute the trade based on order type
                    if (data.delegateType === "MARKET") {
                        // MARKET ORDER: Immediate execution
                        // Deduct from source wallet (quote currency)
                        sourceWallet.amount -= requiredAmount;
                        yield sourceWallet.save();
                        // Add to target wallet (base currency)
                        const receivedAmount = data.orderQuantity;
                        targetWallet.amount += receivedAmount;
                        yield targetWallet.save();
                        // Update order status to completed for market orders
                        data.status = "completed";
                        data.transactionQuantity = receivedAmount;
                        data.transactionValue = requiredAmount;
                        data.closingPrice = data.commissionPrice;
                        data.closingTime = new Date();
                    }
                    else if (data.delegateType === "LIMIT") {
                        // LIMIT ORDER: Reserve funds (deduct from available balance)
                        sourceWallet.amount -= requiredAmount;
                        yield sourceWallet.save();
                        // Create reservation transaction
                        yield transaction_1.default(options.database).create([{
                                type: "order_reserved",
                                wallet: sourceWallet._id,
                                asset: quoteCurrency,
                                amount: requiredAmount,
                                status: "completed",
                                direction: "out",
                                user: currentUser.id,
                                tenant: currentTenant.id,
                                dateTransaction: new Date(),
                                createdBy: currentUser.id,
                                updatedBy: currentUser.id,
                                referenceId: null // Will be updated after order creation
                            }], options);
                        // Order remains pending
                        data.status = "pending";
                    }
                }
                else if (data.direction === "SELL") {
                    // SELL LOGIC: Convert base currency to quote currency
                    // 1. Find the source wallet (base currency)
                    sourceWallet = yield wallet_1.default(options.database).findOne({
                        user: currentUser.id,
                        symbol: baseCurrency,
                        tenant: currentTenant.id,
                        accountType: 'perpetual'
                    });
                    if (!sourceWallet) {
                        throw new Error(`Wallet for ${baseCurrency} not found. Please deposit ${baseCurrency} first.`);
                    }
                    // 2. Check if source wallet has sufficient balance
                    if (sourceWallet.amount < data.orderQuantity) {
                        throw new Error(`Insufficient ${baseCurrency} balance. Available: ${sourceWallet.amount}, Required: ${data.orderQuantity}`);
                    }
                    // 3. Find or create target wallet (quote currency)
                    targetWallet = yield wallet_1.default(options.database).findOne({
                        user: currentUser.id,
                        symbol: quoteCurrency,
                        tenant: currentTenant.id,
                        accountType: 'perpetual'
                    });
                    if (!targetWallet) {
                        [targetWallet] = yield wallet_1.default(options.database).create([{
                                user: currentUser.id,
                                symbol: quoteCurrency,
                                coinName: quoteCurrency,
                                amount: 0,
                                status: "available",
                                tenant: currentTenant.id,
                                createdBy: currentUser.id,
                                updatedBy: currentUser.id
                            }]);
                    }
                    // 4. Execute the trade based on order type
                    if (data.delegateType === "MARKET") {
                        // MARKET ORDER: Immediate execution
                        // Deduct from source wallet (base currency)
                        sourceWallet.amount -= data.orderQuantity;
                        yield sourceWallet.save();
                        // Add to target wallet (quote currency)
                        const receivedAmount = data.entrustedValue || data.orderQuantity * data.commissionPrice;
                        targetWallet.amount += receivedAmount;
                        yield targetWallet.save();
                        // Update order status to completed for market orders
                        data.status = "completed";
                        data.transactionQuantity = data.orderQuantity;
                        data.transactionValue = receivedAmount;
                        data.closingPrice = data.commissionPrice;
                        data.closingTime = new Date();
                    }
                    else if (data.delegateType === "LIMIT") {
                        // LIMIT ORDER: Reserve funds (deduct from available balance)
                        sourceWallet.amount -= data.orderQuantity;
                        yield sourceWallet.save();
                        // Create reservation transaction
                        yield transaction_1.default(options.database).create([{
                                type: "order_reserved",
                                wallet: sourceWallet._id,
                                asset: baseCurrency,
                                amount: data.orderQuantity,
                                status: "completed",
                                direction: "out",
                                user: currentUser.id,
                                tenant: currentTenant.id,
                                dateTransaction: new Date(),
                                createdBy: currentUser.id,
                                updatedBy: currentUser.id,
                                referenceId: null // Will be updated after order creation
                            }], options);
                        // Order remains pending
                        data.status = "pending";
                    }
                }
                // Create the spot order record
                const [record] = yield spot_1.default(options.database).create([Object.assign(Object.assign({}, data), { userAccount: currentUser.id, tenant: currentTenant.id, createdBy: currentUser.id, updatedBy: currentUser.id, commissionTime: new Date() })], options);
                // Update reservation transactions with order reference
                if (data.delegateType === "LIMIT") {
                    yield transaction_1.default(options.database).updateOne({
                        user: currentUser.id,
                        tenant: currentTenant.id,
                        type: "order_reserved",
                        referenceId: null
                    }, { referenceId: record._id }, options);
                }
                // Create transaction records for completed MARKET trades
                if (data.delegateType === "MARKET") {
                    const [baseCurrency, quoteCurrency] = data.tradingPair.split('/');
                    if (data.direction === "BUY") {
                        // For BUY: Create spot transaction for the asset received
                        yield transaction_1.default(options.database).create([{
                                type: "spot_profit",
                                wallet: targetWallet._id,
                                asset: baseCurrency,
                                relatedAsset: quoteCurrency,
                                amount: data.orderQuantity,
                                status: "completed",
                                direction: "in",
                                user: currentUser.id,
                                tenant: currentTenant.id,
                                dateTransaction: new Date(),
                                createdBy: currentUser.id,
                                updatedBy: currentUser.id,
                                referenceId: record._id
                            }], options);
                        // Also create transaction for the quote currency spent
                        yield transaction_1.default(options.database).create([{
                                type: "spot_loss",
                                wallet: sourceWallet._id,
                                asset: quoteCurrency,
                                relatedAsset: baseCurrency,
                                amount: data.entrustedValue || data.orderQuantity * data.commissionPrice,
                                status: "completed",
                                direction: "out",
                                user: currentUser.id,
                                tenant: currentTenant.id,
                                dateTransaction: new Date(),
                                createdBy: currentUser.id,
                                updatedBy: currentUser.id,
                                referenceId: record._id
                            }], options);
                    }
                    else if (data.direction === "SELL") {
                        // For SELL: Create spot transaction for the asset sold
                        yield transaction_1.default(options.database).create([{
                                type: "spot_loss",
                                wallet: sourceWallet._id,
                                asset: baseCurrency,
                                relatedAsset: quoteCurrency,
                                amount: data.orderQuantity,
                                status: "completed",
                                direction: "out",
                                user: currentUser.id,
                                tenant: currentTenant.id,
                                dateTransaction: new Date(),
                                createdBy: currentUser.id,
                                updatedBy: currentUser.id,
                                referenceId: record._id
                            }], options);
                        // Also create transaction for the quote currency received
                        yield transaction_1.default(options.database).create([{
                                type: "spot_profit",
                                wallet: targetWallet._id,
                                asset: quoteCurrency,
                                relatedAsset: baseCurrency,
                                amount: data.entrustedValue || data.orderQuantity * data.commissionPrice,
                                status: "completed",
                                direction: "in",
                                user: currentUser.id,
                                tenant: currentTenant.id,
                                dateTransaction: new Date(),
                                createdBy: currentUser.id,
                                updatedBy: currentUser.id,
                                referenceId: record._id
                            }], options);
                    }
                }
                // Create audit log
                yield this._createAuditLog(auditLogRepository_1.default.CREATE, record.id, data, options);
                return this.findById(record.id, options);
            }
            catch (error) {
                throw error;
            }
        });
    }
    static UpdateStatus(id, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            // Find and validate record
            let record = yield spot_1.default(options.database).findById(id);
            if (!record || String(record.tenant) !== String(currentTenant.id)) {
                throw new Error404_1.default();
            }
            // Initialize updateData with all possible fields
            const updateData = {
                status: data.status,
                updatedBy: currentUser.id,
            };
            // Set closing time if order is being canceled or completed
            if (data.status === "canceled" || data.status === "completed") {
                updateData.closingTime = new Date();
            }
            // If canceling a pending limit order
            if (data.status === "canceled" && record.status === "pending" && record.orderType === "limit") {
                const [baseCurrency, quoteCurrency] = record.tradingPair.split('/');
                if (record.direction === "BUY") {
                    // For BUY limit orders: Refund the reserved funds to quote currency wallet
                    const quoteWallet = yield wallet_1.default(options.database).findOne({
                        user: record.userAccount,
                        symbol: quoteCurrency,
                        tenant: currentTenant.id,
                        accountType: 'perpetual'
                    });
                    if (quoteWallet) {
                        const refundAmount = record.entrustedValue || (record.orderQuantity * record.commissionPrice);
                        quoteWallet.amount += refundAmount;
                        yield quoteWallet.save();
                        // Create cancellation transaction
                        yield transaction_1.default(options.database).create([{
                                type: "order_cancelled",
                                wallet: quoteWallet._id,
                                asset: quoteCurrency,
                                amount: refundAmount,
                                status: "completed",
                                direction: "in",
                                user: record.userAccount,
                                tenant: currentTenant.id,
                                dateTransaction: new Date(),
                                createdBy: currentUser.id,
                                updatedBy: currentUser.id,
                                referenceId: record._id
                            }], options);
                    }
                }
                else if (record.direction === "SELL") {
                    // For SELL limit orders: Return the reserved base currency
                    const baseWallet = yield wallet_1.default(options.database).findOne({
                        user: record.userAccount,
                        symbol: baseCurrency,
                        tenant: currentTenant.id,
                        accountType: 'perpetual'
                    });
                    if (baseWallet) {
                        baseWallet.amount += record.orderQuantity;
                        yield baseWallet.save();
                        // Create cancellation transaction
                        yield transaction_1.default(options.database).create([{
                                type: "order_cancelled",
                                wallet: baseWallet._id,
                                asset: baseCurrency,
                                amount: record.orderQuantity,
                                status: "completed",
                                direction: "in",
                                user: record.userAccount,
                                tenant: currentTenant.id,
                                dateTransaction: new Date(),
                                createdBy: currentUser.id,
                                updatedBy: currentUser.id,
                                referenceId: record._id
                            }], options);
                    }
                }
            }
            // Update record
            yield spot_1.default(options.database).updateOne({ _id: id }, updateData, options);
            // Create audit log
            yield this._createAuditLog(auditLogRepository_1.default.UPDATE, id, data, options);
            // Return updated record
            return yield this.findById(id, options);
        });
    }
    static update(id, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let record = yield mongooseRepository_1.default.wrapWithSessionIfExists(spot_1.default(options.database).findById(id), options);
            if (!record || String(record.tenant) !== String(currentTenant.id)) {
                throw new Error404_1.default();
            }
            yield spot_1.default(options.database).updateOne({ _id: id }, Object.assign(Object.assign({}, data), { updatedBy: mongooseRepository_1.default.getCurrentUser(options).id }), options);
            yield this._createAuditLog(auditLogRepository_1.default.UPDATE, id, data, options);
            record = yield this.findById(id, options);
            return record;
        });
    }
    static destroy(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let record = yield mongooseRepository_1.default.wrapWithSessionIfExists(spot_1.default(options.database).findById(id), options);
            if (!record || String(record.tenant) !== String(currentTenant.id)) {
                throw new Error404_1.default();
            }
            yield spot_1.default(options.database).deleteOne({ _id: id }, options);
            yield this._createAuditLog(auditLogRepository_1.default.DELETE, id, record, options);
        });
    }
    static count(filter, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            return mongooseRepository_1.default.wrapWithSessionIfExists(spot_1.default(options.database).countDocuments(Object.assign(Object.assign({}, filter), { tenant: currentTenant.id })), options);
        });
    }
    static findById(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let record = yield mongooseRepository_1.default.wrapWithSessionIfExists(spot_1.default(options.database)
                .findById(id)
                .populate("user")
                .populate("createdBy"), options);
            if (!record || String(record.tenant) !== String(currentTenant.id)) {
                throw new Error404_1.default();
            }
            return this._fillFileDownloadUrls(record);
        });
    }
    static findAndCountAll({ filter, limit = 0, offset = 0, orderBy = "" }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let criteriaAnd = [];
            criteriaAnd.push({
                tenant: currentTenant.id,
            });
            if (filter) {
                if (filter.id) {
                    criteriaAnd.push({
                        ["_id"]: mongooseQueryUtils_1.default.uuid(filter.id),
                    });
                }
                if (filter.user) {
                    criteriaAnd.push({
                        createdBy: filter.user,
                    });
                }
                if (filter.idnumer) {
                    criteriaAnd.push({
                        idnumer: {
                            $regex: mongooseQueryUtils_1.default.escapeRegExp(filter.idnumer),
                            $options: "i",
                        },
                    });
                }
            }
            const sort = mongooseQueryUtils_1.default.sort(orderBy || "createdAt_DESC");
            const skip = Number(offset || 0) || undefined;
            const limitEscaped = Number(limit || 0) || undefined;
            const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;
            let rows = yield spot_1.default(options.database)
                .find(criteria)
                .skip(skip)
                .limit(limitEscaped)
                .sort(sort)
                .populate("user")
                .populate("createdBy");
            const count = yield spot_1.default(options.database).countDocuments(criteria);
            rows = yield Promise.all(rows.map(this._fillFileDownloadUrls));
            return { rows, count };
        });
    }
    static findAndCountAllMobile({ filter, limit = 0, offset = 0, orderBy = "" }, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            const currentUser = mongooseRepository_1.default.getCurrentUser(options);
            let criteriaAnd = [];
            criteriaAnd.push({
                tenant: currentTenant.id,
            });
            criteriaAnd.push({
                userAccount: currentUser.id,
            });
            if (filter) {
                criteriaAnd.push({
                    status: filter,
                });
                if (filter.id) {
                    criteriaAnd.push({
                        ["_id"]: mongooseQueryUtils_1.default.uuid(filter.id),
                    });
                }
                if (filter.user) {
                    criteriaAnd.push({
                        user: filter.user,
                    });
                }
                if (filter.idnumer) {
                    criteriaAnd.push({
                        idnumer: {
                            $regex: mongooseQueryUtils_1.default.escapeRegExp(filter.idnumer),
                            $options: "i",
                        },
                    });
                }
            }
            const sort = mongooseQueryUtils_1.default.sort(orderBy || "createdAt_DESC");
            const skip = Number(offset || 0) || undefined;
            const limitEscaped = Number(limit || 0) || undefined;
            const criteria = criteriaAnd.length ? { $and: criteriaAnd } : null;
            let rows = yield spot_1.default(options.database)
                .find(criteria)
                .skip(skip)
                .limit(limitEscaped)
                .sort(sort)
                .populate("user")
                .populate("createdBy");
            const count = yield spot_1.default(options.database).countDocuments(criteria);
            rows = yield Promise.all(rows.map(this._fillFileDownloadUrls));
            return { rows, count };
        });
    }
    static findAllAutocomplete(search, limit, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentTenant = mongooseRepository_1.default.getCurrentTenant(options);
            let criteriaAnd = [
                {
                    tenant: currentTenant.id,
                },
            ];
            if (search) {
                criteriaAnd.push({
                    $or: [
                        {
                            _id: mongooseQueryUtils_1.default.uuid(search),
                        },
                        {
                            titre: {
                                $regex: mongooseQueryUtils_1.default.escapeRegExp(search),
                                $options: "i",
                            },
                        },
                    ],
                });
            }
            const sort = mongooseQueryUtils_1.default.sort("titre_ASC");
            const limitEscaped = Number(limit || 0) || undefined;
            const criteria = { $and: criteriaAnd };
            const records = yield spot_1.default(options.database)
                .find(criteria)
                .limit(limitEscaped)
                .sort(sort);
            return records.map((record) => ({
                id: record.id,
                label: record.title,
            }));
        });
    }
    static _createAuditLog(action, id, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            // await AuditLogRepository.log(
            //   {
            //     entityName: Spot(options.database).modelName,
            //     entityId: id,
            //     action,
            //     values: data,
            //   },
            //   options
            // );
        });
    }
    static _fillFileDownloadUrls(record) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!record) {
                return null;
            }
            const output = record.toObject ? record.toObject() : record;
            output.photo = yield fileRepository_1.default.fillDownloadUrl(output.photo);
            return output;
        });
    }
}
exports.default = SpotRepository;
//# sourceMappingURL=spotRepository.js.map