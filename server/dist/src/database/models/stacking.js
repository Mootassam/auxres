"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.default = (database) => {
    try {
        return database.model("stacking");
    }
    catch (error) {
        // continue, because model doesn't exist
    }
    const StackingSchema = new Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        plan: {
            type: Schema.Types.ObjectId,
            ref: "stakeProgram",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "completed", "cancelled"],
            default: "active",
        },
        startDate: {
            type: Date,
            default: Date.now,
        },
        endDate: {
            type: Date,
        },
        earnedRewards: {
            type: Number,
            default: 0,
        },
        tenant: {
            type: Schema.Types.ObjectId,
            ref: "tenant",
            required: true,
        },
        createdBy: { type: Schema.Types.ObjectId, ref: "user" },
        updatedBy: { type: Schema.Types.ObjectId, ref: "user" },
        importHash: { type: String },
    }, { timestamps: true });
    StackingSchema.virtual("id").get(function () {
        // @ts-ignore
        return this._id.toHexString();
    });
    StackingSchema.set("toJSON", {
        getters: true,
    });
    StackingSchema.set("toObject", {
        getters: true,
    });
    return database.model("stacking", StackingSchema);
};
//# sourceMappingURL=stacking.js.map