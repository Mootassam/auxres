
import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import authSelectors from "src/modules/auth/authSelectors";
import actions from "src/modules/withdraw/form/withdrawFormActions";
import selectors from "src/modules/withdraw/form/withdrawFormSelectors";
import FieldFormItem from "src/shared/form/FieldFormItem";
import assetsListSelectors from "src/modules/assets/list/assetsListSelectors";
import assetsListActions from "src/modules/assets/list/assetsListActions";
import SuccessModalComponent from "src/view/shared/modals/sucessModal";
import method from "src/modules/depositMethod/list/depositMethodListActions";
import depositMethodselectors from "src/modules/depositMethod/list/depositMethodSelectors";

// Currency rules: minimum withdrawal and fee per currency
const withdrawRules = {
  BTC: { min: 0.00091, fee: 0.00002, decimals: 8 },
  ETH: { min: 0.0077, fee: 0.0005, decimals: 8 },
  USDT: { min: 30, fee: 3, decimals: 2 },
  SOL: { min: 0.01, fee: 0.0005, decimals: 6 },
  XRP: { min: 1, fee: 0.1, decimals: 6 },
};

const networkOptions = [
  { value: "ethereum", label: "Ethereum (ERC20)" },
  { value: "bsc", label: "Binance Smart Chain (BEP20)" },
  { value: "tron", label: "Tron (TRC20)" },
  { value: "polygon", label: "Polygon" },
  { value: "solana", label: "Solana" },
  { value: "bitcoin", label: "Bitcoin" }
];

const schema = yup.object().shape({
  orderNo: yupFormSchemas.string(i18n("entities.withdraw.fields.orderNo")),
  currency: yupFormSchemas.string(i18n("entities.withdraw.fields.currency")),
  withdrawAmount: yup
    .number()
    .typeError(i18n("pages.withdraw.errors.amountNumber"))
    .required(i18n("pages.withdraw.errors.amountRequired"))
    .test(
      "positive",
      i18n("pages.withdraw.errors.amountPositive"),
      (val) => typeof val === "number" && val > 0
    )
    .test(
      "min-by-currency",
      i18n("pages.withdraw.errors.amountMin"),
      function (value) {
        const { currency } = this.parent || {};
        if (!currency || !withdrawRules[currency]) return true;
        if (typeof value !== "number") return false;
        return value >= withdrawRules[currency].min;
      }
    ),
  fee: yupFormSchemas.decimal(i18n("entities.withdraw.fields.fee")),
  totalAmount: yupFormSchemas.decimal(
    i18n("entities.withdraw.fields.totalAmount")
  ),
  auditor: yupFormSchemas.relationToOne(i18n("entities.withdraw.fields.auditor")),
  acceptTime: yupFormSchemas.datetime(i18n("entities.withdraw.fields.acceptTime")),
  status: yupFormSchemas.enumerator(i18n("entities.withdraw.fields.status"), {
    options: ["pending", "canceled", "success"],
  }),
  withdrawPassword: yup.string().required(i18n("pages.withdraw.errors.passwordRequired")),
});

function Withdraw() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const assets = useSelector(assetsListSelectors.selectRows) || [];
  console.log("🚀 ~ Withdraw ~ assets:", assets)
  const selectModal = useSelector(selectors.selectModal);
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [selected, setSelected] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("ethereum");
  const [item, setItem] = useState<{ symbol: string; amount: number } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const listMethod = useSelector(depositMethodselectors.selectRows);
  const loading = useSelector(depositMethodselectors.selectLoading);

  // Fetch assets once
  useEffect(() => {
    dispatch(assetsListActions.doFetch());
  }, [dispatch]);

  // Fetch deposit methods on mount
  useEffect(() => {
    dispatch(method.doFetch());
  }, [dispatch]);

  // Update selected asset info when currency or assets change
  useEffect(() => {
    if (selected && assets.length) {
      const found = assets.find((a) =>
        String(a.symbol).toUpperCase() === String(selected).toUpperCase()
      );
      setItem(found || null);

      // Fixed: Safely access wallet address
      const walletAddress = currentUser?.wallet?.[selected]?.address || "";
      setAddress(walletAddress);

      // Update form currency field
      form.setValue("currency", selected);
    } else {
      setItem(null);
      setAddress("");
      form.setValue("currency", "");
    }
  }, [selected, assets, currentUser]);

  const initialValues = {
    orderNo: "",
    currency: "",
    withdrawAmount: "",
    fee: "",
    totalAmount: "",
    auditor: "",
    acceptTime: "",
    status: "pending",
    withdrawAdress: "",
    withdrawPassword: "",
  };

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialValues,
  });

  // Watch fields we need to react to
  const watchedAmount = useWatch({ control: form.control, name: "withdrawAmount" });
  const watchedPassword = useWatch({ control: form.control, name: "withdrawPassword" });
  const watchedCurrency = useWatch({ control: form.control, name: "currency" });

  // parsed numeric values
  const parsedAmount = Number(watchedAmount);
  const isAmountNumber = !Number.isNaN(parsedAmount) && isFinite(parsedAmount);
  const availableBalance = item ? Number(item.amount) || 0 : 0;

  // rules for selected currency
  const selectedRules = withdrawRules[selected] || { min: 0, fee: 0, decimals: 8 };
  const fee = selected ? selectedRules.fee : 0;
  const min = selected ? selectedRules.min : 0;
  const decimals = selected ? selectedRules.decimals : 8;

  // Receive amount (what user receives after fee)
  const receiveAmount = isAmountNumber ? Math.max(parsedAmount - (fee || 0), 0) : 0;

  // helper to format numbers consistently
  const formatNumber = (value, d = decimals) => {
    if (typeof value !== "number" || !isFinite(value)) return "0";
    return Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: d,
    });
  };

  // Combine multiple validation checks to produce button label + disabled state + inline messages
  const computeValidationState = () => {
    // not allowed if currency is not selected
    if (!selected) {
      return { disabled: true, label: i18n("pages.withdraw.validation.selectCurrency"), reason: "selectCurrency" };
    }

    // amount missing or invalid
    if (!isAmountNumber || parsedAmount <= 0) {
      return { disabled: true, label: i18n("pages.withdraw.validation.enterAmount"), reason: "enterAmount" };
    }

    // below minimum for currency
    if (min && parsedAmount < min) {
      return {
        disabled: true,
        label: i18n("pages.withdraw.validation.belowMin", formatNumber(min), selected),
        reason: "belowMin",
      };
    }

    // withdraw amount greater than available balance
    if (parsedAmount > availableBalance) {
      return {
        disabled: true,
        label: i18n("pages.withdraw.validation.insufficientBalance"),
        reason: "insufficientBalance",
      };
    }

    // ensure fee can be covered too
    if (parsedAmount + fee > availableBalance) {
      return {
        disabled: true,
        label: i18n("pages.withdraw.validation.insufficientForFee"),
        reason: "insufficientForFee",
      };
    }

    // password required
    if (!watchedPassword || (typeof watchedPassword === "string" && watchedPassword.trim() === "")) {
      return { disabled: true, label: i18n("pages.withdraw.validation.enterPassword"), reason: "enterPassword" };
    }

    // everything okay
    return { disabled: false, label: i18n("pages.withdraw.confirmWithdrawal"), reason: "ok" };
  };

  const validationState = computeValidationState();

  const handleCloseModal = () => {
    dispatch(actions.doClose());
    // Reset form after successful withdrawal
    form.reset(initialValues);
    setSelected("");
    setAddress("");
    setAmount("");
    setIsSubmitting(false);
  };

  // Submit handler
  const onSubmit = async (values) => {
    if (validationState.disabled) return;

    setIsSubmitting(true);

    try {
      // ensure we use the selected currency
      values.currency = selected;

      // generate order number: RE + YYYYMMDD + 7 random digits
      const now = new Date();
      const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
      const randomDigits = Math.floor(Math.random() * 1e7).toString().padStart(7, "0");
      values.orderNo = `RE${dateStr}${randomDigits}`;

      // numeric values
      const amountNum = Number(values.withdrawAmount) || 0;
      const feeNum = fee || 0;
      values.fee = feeNum;
      values.totalAmount = amountNum - feeNum; // what user receives
      values.withdrawAdress = address;
      values.status = "pending";

      setAmount(values.totalAmount.toString());

      // Dispatch create action
      await dispatch(actions.doCreate(values));

    } catch (error) {
      console.error("Withdrawal submission error:", error);
      setIsSubmitting(false);
    }
  };

  const selectedMethod = useMemo(() => {
    return listMethod.find((method) => method.id === selected);
  }, [listMethod, selected]);

  const networkList = selectedMethod?.network || [];
  console.log("🚀 ~ Withdraw ~ selectedMethod:", selectedMethod)



  // form errors for inline display
  const { errors } = form.formState;

  return (
    <div className="withdraw-container">
      {/* Header Section - Matching HelpCenter */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/wallets" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">Withdraw</div>
          <Link className="header-icon" to="/history" style={{ color: 'white' }}>
            <i className="fas fa-receipt" />
          </Link>
        </div>
      </div>

      {/* Content Card - Matching HelpCenter */}
      <div className="content-card">
        <div className="withdraw-content">

          {/* Select currency section */}
          <div className="form-section">
            <div className="input-field">
              <label className="input-label">Select currency</label>
              <div className="input-wrapper">
                <select
                  className="currency-select"
                  value={selected}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelected(val);
                    form.setValue("currency", val);
                    // When currency changes, clear amount/password to force validation
                    form.setValue("withdrawAmount", "");
                    form.setValue("withdrawPassword", "");
                  }}
                >
                  {listMethod.map((currency) => (
                    <option key={currency.id} value={currency.id}>
                      {currency.symbol}
                    </option>
                  ))}
                </select>

              </div>
            </div>

            {/* Withdraw network */}
            <div className="input-field">
              <label className="input-label">Withdraw network</label>
              <div className="input-wrapper">
                <select
                  className="network-select"
                  value={selectedNetwork}
                  onChange={(e) => setSelectedNetwork(e.target.value)}
                >
                  {networkList.map((network) => (
                    <option key={network.id} value={network.id}>
                      {network.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Withdraw address */}
            <div className="input-field">
              <label className="input-label">Withdraw address</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  className="address-field"
                  placeholder="Your wallet address will appear here"
                />
              </div>
              {!address && selected && (
                <div className="field-hint">
                  Please add a wallet address for {selected} to withdraw
                </div>
              )}
            </div>

            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Amount section */}
                <div className="input-field">
                  <label className="input-label">Amount of coins withdrawn</label>
                  <div className="input-wrapper">
                    <FieldFormItem
                      name="withdrawAmount"
                      type="number"
                      className="amount-field"
                      placeholder="0.0"

                      disabled={isSubmitting || !selected}
                    />
                  </div>
                  <div className="balance-text">
                    Available: <span className="balance-amount">{formatNumber(availableBalance, decimals)} {selected}</span>
                  </div>

                  <div className="field-error">
                    {errors.withdrawAmount?.message && <div>{errors.withdrawAmount?.message}</div>}
                    {!errors.withdrawAmount?.message && validationState.reason === "belowMin" && (
                      <div>Minimum withdrawal: {formatNumber(min, decimals)} {selected}</div>
                    )}
                    {!errors.withdrawAmount?.message && validationState.reason === "insufficientBalance" && (
                      <div>Insufficient balance</div>
                    )}
                  </div>
                </div>

                {/* Handling fee section */}
                <div className="fee-section">
                  <div className="fee-row">
                    <div className="fee-label">Handling fee:</div>
                    <div className="fee-value">{formatNumber(fee, decimals)} {selected}</div>
                  </div>
                  <div className="fee-row">
                    <div className="fee-label">You will receive:</div>
                    <div className="fee-value receive-amount">{formatNumber(receiveAmount, decimals)} {selected}</div>
                  </div>
                </div>

                {/* Important notice section */}
                <div className="notice-section">
                  <div className="notice-title">Important notice</div>
                  <div className="notice-content">
                    <div className="notice-item">1. In order to prevent arbitrage, you can apply for currency withdraw when the transaction volume reaches the quota.</div>
                    <div className="notice-item">2. After submitting the withdraw application, the money will arrive within 24 hours. If the money does not arrive after the expected withdraw time, please consult the online customer service.</div>
                    <div className="notice-item">3. After submitting the withdraw application, the funds are frozen because the withdraw is in progress and the funds are temporarily held by the system. This does not mean that you have lost the asset or that there is an abnormality with the asset.</div>
                  </div>
                </div>

                {/* Withdrawal password */}
                <div className="input-field">
                  <label className="input-label">Withdrawal Password</label>
                  <div className="input-wrapper">
                    <FieldFormItem
                      name="withdrawPassword"
                      type="password"
                      className="password-field"
                      placeholder="Enter your withdrawal password"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="field-error">
                    {errors.withdrawPassword?.message && <div>{errors.withdrawPassword?.message}</div>}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="withdraw-button"
                  disabled={validationState.disabled || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                      Processing...
                    </>
                  ) : (
                    validationState.label
                  )}
                </button>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>

      {selectModal && (
        <SuccessModalComponent
          isOpen={selectModal}
          onClose={handleCloseModal}
          type='withdraw'
          amount={amount}
          coinType={selected}
        />
      )}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        body {
          background-color: #f5f7fa;
          color: #333;
          line-height: 1.6;
          overflow-x: hidden;
        }

        .withdraw-container {
          max-width: 400px;
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header Section - Matching HelpCenter */
        .header {
          min-height: 60px;
          position: relative;
          padding: 15px 20px;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-arrow {
          color: white;
          font-size: 20px;
          font-weight: 300;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }

        .back-arrow:hover {
          opacity: 0.8;
        }

        .page-title {
          color: white;
          font-size: 17px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        /* Content Card - Matching HelpCenter */
        .content-card {
          background: #f2f4f7;
          border-radius: 40px 40px 0 0;
          padding: 20px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        .withdraw-content {
          width: 100%;
        }

        /* Form Sections */
        .form-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .input-field {
          display: flex;
          flex-direction: column;
        }

        .input-label {
          font-size: 12px;
          font-weight: 600;
          color: #222;
          margin-bottom: 8px;
        }

        .input-wrapper {
          position: relative;
        }

        .currency-select, .network-select {
          width: 100%;
          padding: 12px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 12px;
          background-color: white;
          color: #333;
          appearance: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .currency-select:focus, .network-select:focus {
          outline: none;
          border-color: #106cf5;
          box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.1);
        }

        .currency-select-icon {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 20px;
          pointer-events: none;
        }

        .address-field, .amount-field, .password-field {
          width: 100%;
          padding: 12px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 12px;
          background-color: white;
          color: #333;
          transition: all 0.3s ease;
        }

        .address-field:disabled {
          background-color: #f8f9fa;
          color: #666;
          cursor: not-allowed;
        }

        .amount-field:focus, .password-field:focus {
          outline: none;
          border-color: #106cf5;
          box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.1);
        }

        .balance-text {
          font-size: 14px;
          color: #666;
          margin-top: 8px;
        }

        .balance-amount {
          font-weight: 600;
          color: #106cf5;
        }

        /* Fee Section */
        .fee-section {
          background: white;
          border-radius: 8px;
          padding: 16px;
          margin: 10px 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .fee-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .fee-row:last-child {
          border-bottom: none;
        }

        .fee-label {
          font-size: 14px;
          color: #666;
        }

        .fee-value {
          font-size: 15px;
          font-weight: 600;
          color: #222;
        }

        .receive-amount {
          color: #106cf5;
          font-size: 16px;
        }

        /* Notice Section */
        .notice-section {
          background: white;
          border-radius: 8px;
          padding: 16px;
          margin: 10px 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .notice-title {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-bottom: 12px;
        }

        .notice-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .notice-item {
          font-size: 10px;
          color: #666;
          line-height: 1.4;
        }

        /* Field Error */
        .field-error {
          font-size: 12px;
          color: #e53935;
          margin-top: 6px;
          min-height: 20px;
        }

        .field-hint {
          font-size: 12px;
          color: #ff9800;
          margin-top: 6px;
        }

        /* Withdraw Button */
        .withdraw-button {
          width: 100%;
          padding: 16px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 20px;
        }

        .withdraw-button:hover:not(:disabled) {
          background: #0a4fc4;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(16, 108, 245, 0.3);
        }

        .withdraw-button:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .withdraw-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 16px;
            border-radius: 30px 30px 0 0;
          }

          .currency-select, .network-select, .address-field, .amount-field, .password-field {
            padding: 12px ;
            font-size: 14px;
          }

          .input-label {
            font-size: 13px;
          }

          .balance-text {
            font-size: 13px;
          }

          .fee-section, .notice-section {
            padding: 12px;
          }

          .fee-label, .fee-value {
            font-size: 13px;
          }

          .notice-title {
            font-size: 13px;
          }

          .notice-item {
            font-size: 10px;
          }

          .withdraw-button {
            padding: 12px;
            font-size: 15px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }

          .withdraw-content {
            max-width: 600px;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
}

export default Withdraw;