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
  BNB: { min: 0.01, fee: 0.0005, decimals: 6 },
  TRX: { min: 1, fee: 0.1, decimals: 6 },
  SHIB: { min: 100000, fee: 10000, decimals: 0 },
  DAI: { min: 30, fee: 3, decimals: 2 },
  USDC: { min: 30, fee: 3, decimals: 2 },
  DOGE: { min: 10, fee: 1, decimals: 2 },
};

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
  const selectModal = useSelector(selectors.selectModal);
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [selected, setSelected] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [item, setItem] = useState<{ symbol: string; amount: number } | null>(null);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);

  const listMethod = useSelector(depositMethodselectors.selectRows);
  const loading = useSelector(selectors.selectSaveLoading);

  // Fetch assets once
  useEffect(() => {
    dispatch(assetsListActions.doFetch('exchange'));
  }, [dispatch]);

  // Fetch deposit methods on mount
  useEffect(() => {
    dispatch(method.doFetch());
  }, [dispatch]);

  // Set default currency when listMethod loads
  useEffect(() => {
    if (listMethod && listMethod.length > 0 && !selected) {
      const defaultCurrency = listMethod[0];
      const symbol = defaultCurrency.symbol || defaultCurrency.id;
      setSelected(symbol);
      form.setValue("currency", symbol);
      
      // Also set the default network for this currency
      if (defaultCurrency.network && defaultCurrency.network.length > 0) {
        setSelectedNetwork(defaultCurrency.network[0]._id || defaultCurrency.network[0].name);
      }
    }
  }, [listMethod]);

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
      
      // Update withdraw address field if available
      if (walletAddress) {
        form.setValue("withdrawAdress", walletAddress);
      }
    } else {
      setItem(null);
      setAddress("");
      form.setValue("currency", "");
      form.setValue("withdrawAdress", "");
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

  // Get selected method details - FIXED: Use the correct data structure
  const selectedMethod = useMemo(() => {
    if (!listMethod || !selected) return null;
    return listMethod.find((method) => {
      const methodSymbol = method.symbol || method.id || "";
      return String(methodSymbol).toUpperCase() === String(selected).toUpperCase();
    });
  }, [listMethod, selected]);

  // Get network list for selected currency - FIXED
  const networkList = selectedMethod?.network || [];

  // Set default network when currency changes
  useEffect(() => {
    if (networkList.length > 0) {
      // Always reset to first network when currency changes
      const defaultNetwork = networkList[0];
      setSelectedNetwork(defaultNetwork._id || defaultNetwork.name);
      setShowNetworkDropdown(false);
    } else {
      setSelectedNetwork("");
    }
  }, [selectedMethod, networkList]);

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

  // Get currency icon URL
  const getCurrencyIcon = (symbol) => {
    const cleanSymbol = symbol ? symbol.toUpperCase() : "";
    return `https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${cleanSymbol}.png`;
  };

  // Handle network selection
  const handleNetworkSelect = (network) => {
    setSelectedNetwork(network._id || network.name);
    setShowNetworkDropdown(false);
  };

  // Combine multiple validation checks to produce button label + disabled state + inline messages
  const computeValidationState = () => {
    // not allowed if currency is not selected
    if (!selected) {
      return { disabled: true, label: i18n("pages.withdraw.validation.selectCurrency"), reason: "selectCurrency" };
    }

    // Network selection required if multiple networks available
    if (networkList.length > 0 && !selectedNetwork) {
      return { disabled: true, label: i18n("pages.withdraw.validation.selectNetwork"), reason: "selectNetwork" };
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

    // address required
    const withdrawAddress = form.getValues("withdrawAdress");
    if (!withdrawAddress || withdrawAddress.trim() === "") {
      return { disabled: true, label: i18n("pages.withdraw.validation.enterAddress"), reason: "enterAddress" };
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
    setSelectedNetwork("");
  };

  // Submit handler
  const onSubmit = async (values) => {
    if (validationState.disabled) return;

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
      values.status = "pending";

      // Add selected network to values
      values.network = selectedNetwork;

      setAmount(values.totalAmount.toString());

      // Dispatch create action
      await dispatch(actions.doCreate(values));

    } catch (error) {
      console.error("Withdrawal submission error:", error);
    }
  };

  // Handle currency selection
  const handleCurrencySelect = (currency) => {
    const symbol = currency.symbol || currency.id;
    setSelected(symbol);
    form.setValue("currency", symbol);
    form.setValue("withdrawAmount", "");
    form.setValue("withdrawPassword", "");
    form.setValue("withdrawAdress", "");
    setShowCurrencyDropdown(false);
    setShowNetworkDropdown(false);
  };

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
              <div className="custom-select-wrapper">
                <div
                  className="currency-select-trigger"
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                >
                  {selected ? (
                    <div className="selected-currency">
                      <div className="currency-icon">
                        <img
                          src={getCurrencyIcon(selected)}
                          alt={selected}
                          onError={(e) => {
                            const img = e.target;
                            if (img && img instanceof HTMLImageElement) {
                              img.onerror = null;
                              img.style.display = "none";
                              const parent = img.parentElement;
                              if (parent) {
                                parent.textContent = selected.charAt(0);
                                parent.style.background = "#f0f0f0";
                                parent.style.color = "#333";
                                parent.style.fontSize = "14px";
                                parent.style.fontWeight = "bold";
                                parent.style.display = "inline-flex";
                                parent.style.alignItems = "center";
                                parent.style.justifyContent = "center";
                                parent.style.width = "24px";
                                parent.style.height = "24px";
                                parent.style.borderRadius = "50%";
                              }
                            }
                          }}
                        />
                      </div>
                      <span className="currency-text">{selected}</span>
                    </div>
                  ) : (
                    <span className="placeholder">Select Currency</span>
                  )}
                  <i className="fas fa-chevron-down dropdown-arrow" />
                </div>

                {showCurrencyDropdown && (
                  <div className="currency-dropdown">
                    {listMethod && listMethod.length > 0 ? (
                      listMethod.map((currency) => {
                        const symbol = currency.symbol || currency.id;
                        return (
                          <div
                            key={currency.id || symbol}
                            className="currency-option"
                            onClick={() => handleCurrencySelect(currency)}
                          >
                            <div className="currency-icon">
                              <img
                                src={getCurrencyIcon(symbol)}
                                alt={symbol}
                                onError={(e) => {
                                  const img = e.target;
                                  if (img && img instanceof HTMLImageElement) {
                                    img.onerror = null;
                                    img.style.display = "none";
                                    const parent = img.parentElement;
                                    if (parent) {
                                      parent.textContent = symbol.charAt(0);
                                      parent.style.background = "#f0f0f0";
                                      parent.style.color = "#333";
                                      parent.style.fontSize = "14px";
                                      parent.style.fontWeight = "bold";
                                      parent.style.display = "inline-flex";
                                      parent.style.alignItems = "center";
                                      parent.style.justifyContent = "center";
                                      parent.style.width = "24px";
                                      parent.style.height = "24px";
                                      parent.style.borderRadius = "50%";
                                    }
                                  }
                                }}
                              />
                            </div>
                            <span className="currency-text">{symbol}</span>
                            {currency.name && <span className="currency-name"> - {currency.name}</span>}
                          </div>
                        );
                      })
                    ) : (
                      <div className="no-options">No currencies available</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Withdraw network - Fixed to show dropdown */}
            {selected && networkList.length > 0 && (
              <div className="input-field">
                <label className="input-label">Withdraw network</label>
                <div className="custom-select-wrapper">
                  <div
                    className="network-select-trigger"
                    onClick={() => setShowNetworkDropdown(!showNetworkDropdown)}
                  >
                    <div className="selected-network">
                      <i className="fas fa-network-wired network-icon" />
                      <span className="network-text">
                        {networkList.find(n => 
                          n._id === selectedNetwork || 
                          n.id === selectedNetwork || 
                          n.name === selectedNetwork
                        )?.name || "Select Network"}
                      </span>
                    </div>
                    <i className="fas fa-chevron-down dropdown-arrow" />
                  </div>
                  
                  {showNetworkDropdown && (
                    <div className="network-dropdown">
                      {networkList.map((network) => (
                        <div
                          key={network._id || network.id || network.name}
                          className="network-option"
                          onClick={() => handleNetworkSelect(network)}
                        >
                          <i className="fas fa-network-wired network-icon-small" />
                          <span className="network-text">{network.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Withdraw address */}


            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>


                <div className="input-field">
                  <label className="input-label">Withdraw address</label>
                  <div className="input-wrapper">
                    <FieldFormItem
                      name="withdrawAdress"
                      type="text"
                      className="address-field"
                      placeholder="Enter your wallet address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <br />

                </div>
                {/* Amount section */}
                <div className="input-field">
                  <label className="input-label">Amount of coins withdrawn</label>
                  <div className="input-wrapper">
                    <FieldFormItem
                      name="withdrawAmount"
                      type="number"
                      className="amount-field"
                      placeholder="0.0"
                      step="any"
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
                      disabled={loading}
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
                  disabled={validationState.disabled || loading}
                >
                  {loading ? (
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

        .custom-select-wrapper {
          position: relative;
        }

        .currency-select-trigger,
        .network-select-trigger {
          width: 100%;
          padding: 12px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 12px;
          background-color: white;
          color: #333;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
        }

        .currency-select-trigger:hover,
        .network-select-trigger:hover {
          border-color: #106cf5;
        }

        .selected-currency,
        .selected-network {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .currency-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .currency-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .currency-text,
        .network-text {
          font-size: 12px;
          font-weight: 500;
        }

        .network-icon {
          color: #106cf5;
          font-size: 14px;
        }

        .dropdown-arrow {
          color: #666;
          font-size: 12px;
          transition: transform 0.3s ease;
        }

        .currency-select-trigger.active .dropdown-arrow {
          transform: rotate(180deg);
        }

        /* Currency Dropdown */
        .currency-dropdown,
        .network-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          margin-top: 4px;
          max-height: 200px;
          overflow-y: auto;
          z-index: 1000;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .currency-option,
        .network-option {
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .currency-option:hover,
        .network-option:hover {
          background-color: #f5f7fa;
        }

        .currency-option .currency-icon {
          width: 24px;
          height: 24px;
        }

        .currency-name {
          font-size: 11px;
          color: #666;
        }

        .network-icon-small {
          color: #106cf5;
          font-size: 12px;
        }

        .no-options {
          padding: 12px;
          color: #999;
          font-size: 12px;
          text-align: center;
        }

        .placeholder {
          color: #999;
        }

        .input-wrapper {
          position: relative;
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
          padding: 12px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
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

          .currency-select-trigger,
          .network-select-trigger,
          .address-field,
          .amount-field,
          .password-field {
            padding: 12px;
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

          .currency-icon {
            width: 20px;
            height: 20px;
          }

          .currency-text, .network-text {
            font-size: 11px;
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