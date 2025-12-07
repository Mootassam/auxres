import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { QRCodeCanvas } from "qrcode.react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import method from "src/modules/depositMethod/list/depositMethodListActions";
import selectors from "src/modules/depositMethod/list/depositMethodSelectors";
import depositActions from "src/modules/deposit/form/depositFormActions";
import FieldFormItem from "src/shared/form/FieldFormItem";

interface CurrencyType {
  _id?: string;
  name?: string;
  symbol?: string;
  network?: any[];
  address?: string;
  minDeposit?: number;
  minimumAmount?: number;
  [key: string]: any;
}

function Deposit() {
  const dispatch = useDispatch();
  const params = useParams();
  const symbol = (params?.id || "").toString();

  const listMethod = useSelector(selectors.selectRows);
  const loading = useSelector(selectors.selectLoading);

  const [showToast, setShowToast] = useState(false);
  const [copiedText, setCopiedText] = useState("Address copied");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [currentAddress, setCurrentAddress] = useState("");
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyType | null>(null);
  const [networkOptions, setNetworkOptions] = useState<Array<{ _id: string; name: string; wallet: string; raw: any }>>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null); // will store network._id (string)
  const [minDepositAmount, setMinDepositAmount] = useState(0);
  const [submittedAmount, setSubmittedAmount] = useState("");

  // Known minimums by symbol (fallbacks)
  const MIN_DEPOSIT_AMOUNTS = {
    USDT: 10,
    BTC: 0.001,
    ETH: 0.01,
    SOL: 0.1,
    BNB: 0.01,
    XRP: 10,
    ADA: 10,
    DOGE: 50,
    LTC: 0.1,
    TRX: 10,
  };

  // Dynamic validation schema based on minDepositAmount
  const schema = useMemo(() => {
    return yup.object().shape({
      amount: yup
        .number()
        .typeError("Amount must be a number")
        .positive("Amount must be positive")
        .required("Amount is required")
        .min(minDepositAmount || 0, `Minimum deposit is ${minDepositAmount}`),
      txid: yup.string().required("Transaction ID is required"),
    });
  }, [minDepositAmount]);

  const formMethods = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      amount: "",
      txid: "",
    },
  });

  // Fetch deposit methods on mount
  useEffect(() => {
    dispatch(method.doFetch());
  }, [dispatch]);

  // When listMethod or symbol changes, find currency and setup network options
  useEffect(() => {
    if (!listMethod || !symbol) {
      // set fallback min if symbol present but no list yet
      if (symbol) {
        setMinDepositAmount(MIN_DEPOSIT_AMOUNTS[symbol.toUpperCase()] || 0);
      }
      return;
    }

    // Find currency by symbol (case-insensitive)
    const currency = listMethod.find((item) => {
      if (!item || !item.symbol) return false;
      return item.symbol.toString().toLowerCase() === symbol.toString().toLowerCase();
    });

    if (!currency) {
      // No matching currency found
      setCurrentCurrency(null);
      setNetworkOptions([]);
      setSelectedNetwork(null);
      setCurrentAddress("");
      setMinDepositAmount(MIN_DEPOSIT_AMOUNTS[symbol.toUpperCase()] || 0);
      return;
    }

    setCurrentCurrency(currency);

    // Determine minimum amount: prefer known map, then currency fields, then 0
    const minAmount =
      (MIN_DEPOSIT_AMOUNTS[symbol.toUpperCase()] ?? currency?.minDeposit ?? currency?.minimumAmount ?? 0);
    setMinDepositAmount(Number(minAmount) || 0);

    // Normalize networks
    if (Array.isArray(currency.network) && currency.network.length > 0) {
      const normalized = currency.network.map((n, idx) => ({
        _id: n._id ?? `${currency._id ?? symbol}-network-${idx}`,
        name: n.name ?? n.network ?? `${currency.name ?? symbol} Network`,
        wallet: n.wallet ?? n.address ?? n.depositAddress ?? "",
        raw: n,
      }));
      setNetworkOptions(normalized);

      // default to first network's id (or keep the current selectedNetwork if it exists in normalized)
      const defaultNet = normalized.find(n => n._id === selectedNetwork) || normalized[0];
      setSelectedNetwork(defaultNet._id);
      setCurrentAddress(defaultNet.wallet || "");
    } else if (currency.address) {
      // Currency has a direct address (no separate networks)
      const single = {
        _id: currency._id ?? `${symbol}-single`,
        name: `${currency.name ?? symbol} Network`,
        wallet: currency.address,
        raw: null,
      };
      setNetworkOptions([single]);
      setSelectedNetwork(single._id);
      setCurrentAddress(single.wallet || "");
    } else {
      // No networks and no direct address
      setNetworkOptions([]);
      setSelectedNetwork(null);
      setCurrentAddress("");
    }
  }, [listMethod, symbol]); // intentionally not including selectedNetwork here

  // Update currentAddress when selectedNetwork changes (selectedNetwork holds ID)
  useEffect(() => {
    if (!selectedNetwork) {
      return;
    }
    const found = networkOptions.find((n) => n._id === selectedNetwork);
    if (found) {
      setCurrentAddress(found.wallet || "");
    }
  }, [selectedNetwork, networkOptions]);

  // Copy address to clipboard with feedback
  const copyAddressToClipboard = async () => {
    if (!currentAddress) {
      console.error("No address to copy");
      return;
    }
    try {
      await navigator.clipboard.writeText(currentAddress);
      setCopiedText("Address copied");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Failed to copy address: ", err);
      setCopiedText("Failed to copy address");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  // Save QR code as PNG
  const saveQRCode = () => {
    const canvas = document.querySelector(".qr-box canvas");
    if (!(canvas instanceof HTMLCanvasElement)) {
      console.error("QR canvas not found");
      setCopiedText("Unable to save QR");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    try {
      const link = document.createElement("a");
      const networkNameSafe = (networkOptions.find(n => n._id === selectedNetwork)?.name || "deposit").replace(/\s+/g, "-");
      link.download = `${symbol}-${networkNameSafe}-address.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setCopiedText("QR code saved");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Failed to save QR code", err);
      setCopiedText("Unable to save QR");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  // Handle network selection change (store network._id)
  const handleNetworkSelect = (event) => {
    const networkId = event.target.value;
    setSelectedNetwork(networkId);
    // clear amount to avoid mismatched validation if min changes
    formMethods.setValue("amount", "");
    formMethods.clearErrors("amount");
  };

  // Handle form submit
  const onSubmit = async (data) => {
    if (!selectedNetwork || !currentCurrency || !currentAddress) {
      console.error("Missing required information");
      return;
    }

    setIsSubmitting(true);
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const randomDigits = Math.floor(Math.random() * 10000000).toString().padStart(7, "0");
      const orderno = `RE${year}${month}${day}${randomDigits}`;
      const depositData = {
        orderno,
        amount: data.amount,
        txid: data.txid,
        rechargechannel: symbol,     // your requested behavior
        status: "pending",
        network: selectedNetwork,
        rechargetime: now.toISOString()// <-- network ID
      };

      setSubmittedAmount(data.amount);

      // dispatch deposit action (assumes this returns a promise)
      await dispatch(depositActions.doCreate(depositData));

      setShowSuccessModal(true);
      formMethods.reset();
    } catch (error) {
      console.error("Deposit submission error:", error);
      // optionally set a toast/error state here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setSubmittedAmount("");
  };

  return (
    <div className="deposit-container">
      {/* Header */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/deposit" className="back-arrow" aria-label="Back to deposits">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">Deposit {symbol || "..."}</div>

          
        </div>
      </div>

      {/* Content */}
      <div className="content-card">
        <div className="deposit-content">
          {/* Currency display */}
          <div className="section">
            <div className="section-label">Deposit currency</div>
            <div className="currency-display">
              <div className="currency-icon" aria-hidden>
                <img
                  src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${symbol}.png`}
                  alt={symbol}
                  onError={(e) => {
                    const img = e.target;
                    if (img && img instanceof HTMLImageElement) {
                      img.onerror = null;
                      img.style.display = "none";
                      const parent = img.parentElement;
                      if (parent) {
                        parent.textContent = (symbol && symbol.charAt(0)) || "C";
                        parent.style.background = "#f0f0f0";
                        parent.style.color = "#333";
                        parent.style.fontSize = "12px";
                        parent.style.fontWeight = "bold";
                        parent.style.display = "inline-flex";
                        parent.style.alignItems = "center";
                        parent.style.justifyContent = "center";
                        parent.style.width = "36px";
                        parent.style.height = "36px";
                        parent.style.borderRadius = "6px";
                      }
                    }
                  }}
                />
              </div>
              <div className="currency-name">{currentCurrency?.name || symbol}</div>
            </div>
            <div className="section-note">Fixed currency - cannot be changed</div>
          </div>

          {/* Network select */}
          {networkOptions.length > 0 && (
            <div className="section">
              <div className="section-label">Deposit network</div>
              <div className="network-select-wrapper">
                <select
                  className="network-select"
                  value={selectedNetwork || ""}
                  onChange={handleNetworkSelect}
                  aria-label="Select deposit network"
                >
                  {networkOptions.map((network) => (
                    <option key={network._id} value={network._id}>
                      {network.name}
                    </option>
                  ))}
                </select>
                <div className="select-arrow">
                  <i className="fas fa-chevron-down" />
                </div>
              </div>
            </div>
          )}

          {/* QR code & address */}
          {currentAddress && (
            <div className="qr-section">
              <div className="section-label">Save QR code</div>
              <div className="qr-container">
                <div className="qr-box" aria-hidden>
                  <QRCodeCanvas
                    value={currentAddress}
                    size={180}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="H"
                    includeMargin={true}
                  />
                </div>

                <div className="address-section">
                  <div className="address-label">Wallet Address</div>
                  <div className="address-text" id="walletAddress">
                    {currentAddress}
                  </div>
                  <div className="address-actions">
                    <button
                      type="button"
                      className="action-btn copy-btn"
                      onClick={copyAddressToClipboard}
                      aria-label="Copy address"
                    >
                      <i className="fas fa-copy" /> Copy Address
                    </button>
                    <button
                      type="button"
                      className="action-btn save-btn"
                      onClick={saveQRCode}
                      aria-label="Save QR code"
                    >
                      <i className="fas fa-download" /> Save QR Code
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Deposit form */}
          {currentAddress && (
            <FormProvider {...formMethods}>
              <form onSubmit={formMethods.handleSubmit(onSubmit)} className="deposit-form">
                <div className="section">

                  <div className="form-group">
                    <FieldFormItem
                      name="amount"
                      label={`Amount (${symbol})`}
                      placeholder={`Minimum: ${minDepositAmount} ${symbol}`}
                      className="form-input"
                    />


                    <div className="min-amount-note">
                      Minimum deposit: {minDepositAmount} {symbol}
                    </div>
                  </div>
                </div>

                <div className="section">
                  <div className="form-group">
                    <FieldFormItem
                      name="txid"
                      label="Transaction ID"
                      placeholder="Enter your transaction ID"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={!formMethods.formState.isValid || isSubmitting}
                    aria-disabled={!formMethods.formState.isValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin" /> Processing...
                      </>
                    ) : (
                      "Confirm Deposit"
                    )}
                  </button>
                </div>
              </form>
            </FormProvider>
          )}

          {/* Loading */}
          {loading && (
            <div className="loading-section" role="status" aria-live="polite">
              <div className="spinner" />
              <div>Loading deposit information...</div>
            </div>
          )}

          {/* No address found */}
          {!loading && !currentAddress && symbol && (
            <div className="error-section" role="alert">
              <i className="fas fa-exclamation-triangle" />
              <div>No deposit address found for {symbol}</div>
              <div className="error-note">Please contact support or try another currency.</div>
            </div>
          )}

          {/* Hint Section */}
          <div className="hint-section">
            <div className="hint-title">Important Notes</div>
            <div className="hint-content">
              <div className="hint-item">
                1. Send only {symbol} to this deposit address. Sending other currencies may result in permanent loss.
              </div>
              <div className="hint-item">2. Ensure you are using the correct network ({networkOptions.find(n => n._id === selectedNetwork)?.name}).</div>
              <div className="hint-item">3. Minimum deposit amount: {minDepositAmount} {symbol}</div>
              <div className="hint-item">4. Transactions typically require 1-3 network confirmations before being credited to your account.</div>
              <div className="hint-item">5. Always double-check the address before sending funds.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div className={`toast ${showToast ? "visible" : ""}`} role="status" aria-live="polite">
        <i className="fas fa-check-circle toast-icon" />
        {copiedText}
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Deposit Submitted Successfully</h3>
              <button className="modal-close" onClick={handleCloseModal} aria-label="Close">
                <i className="fas fa-times" />
              </button>
            </div>
            <div className="modal-body">
              <div className="success-icon"><i className="fas fa-check-circle" /></div>
              <div className="success-message">
                Your deposit of {submittedAmount} {symbol} has been submitted for processing.
              </div>
              <div className="success-details">
                <p>Please wait for network confirmations. This usually takes 5-30 minutes.</p>
                <p>You can track the status in your transaction history.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-btn" onClick={handleCloseModal}>OK</button>
            </div>
          </div>
        </div>
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

        .deposit-container {
          max-width: 400px;
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

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

        .content-card {
          background: #f2f4f7;
          border-radius: 40px 40px 0 0;
          padding: 20px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        .deposit-content {
          width: 100%;
        }

        .section {
          margin-bottom: 14px;
        }

        .section-label {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-bottom: 8px;
        }

        .currency-display {
          display: flex;
          align-items: center;
          gap: 12px;
          background: white;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #e0e0e0;
          margin-bottom: 8px;
        }

        .currency-icon {
          width: 23px;
          height: 23px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f9fa;
          overflow: hidden;
        }

        .currency-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .currency-name {
          font-size: 13px;
          font-weight: 600;
          color: #222;
        }

        .section-note {
          font-size: 12px;
          color: #666;
          font-style: italic;
        }

        .network-select-wrapper {
          position: relative;
        }

        .network-select {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          font-size: 14px;
          background-color: white;
          color: #333;
          appearance: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .network-select:focus {
          outline: none;
          border-color: #106cf5;
          box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.1);
        }

        .select-arrow {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
          pointer-events: none;
        }

        .qr-container {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .qr-box {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
          padding: 10px;
          background: white;
          border-radius: 8px;
        }

        .qr-box canvas {
          border-radius: 8px;
        }

        .address-section {
          text-align: center;
        }

        .address-label {
          font-size: 14px;
          font-weight: 600;
          color: #666;
          margin-bottom: 12px;
        }

        .address-text {
          font-size: 13px;
          color: #333;
          background: #f8f9fa;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 16px;
          word-break: break-all;
          font-family: monospace;
          line-height: 1.4;
        }

        .address-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .action-btn {
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .copy-btn {
          background: #106cf5;
          color: white;
        }

        .copy-btn:hover {
          background: #0a4fc4;
          transform: translateY(-2px);
        }

        .save-btn {
          background: white;
          color: #106cf5;
          border: 1px solid #106cf5;
        }

        .save-btn:hover {
          background: #f0f7ff;
          transform: translateY(-2px);
        }

        .deposit-form {
          margin-top: 20px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .amount-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .amount-input {
          width: 100%;
          padding: 14px 16px;
          padding-right: 60px;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          font-size: 14px;
          background-color: white;
          color: #333;
          transition: all 0.3s ease;
        }

        .amount-input:focus {
          outline: none;
          border-color: #106cf5;
          box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.1);
        }

        .amount-suffix {
          position: absolute;
          right: 16px;
          color: #666;
          font-weight: 600;
          pointer-events: none;
        }


        .form-input:focus {
          outline: none;
          border-color: #106cf5;
          box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.1);
        }

        .error-message {
          color: #ff4757;
          font-size: 12px;
          margin-top: 4px;
        }

        .min-amount-note {
          font-size: 12px;
          color: #666;
          margin-top: 8px;
          font-style: italic;
        }

        .form-actions {
          margin-top: 24px;
        }

        .submit-btn {
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
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .submit-btn:hover:not(:disabled) {
          background: #0a4fc4;
          transform: translateY(-2px);
        }

        .submit-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .fa-spin {
          animation: fa-spin 1s infinite linear;
        }

        @keyframes fa-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          width: 90%;
          max-width: 400px;
          overflow: hidden;
          animation: slideUp 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-header {
          padding: 20px;
          border-bottom: 1px solid #e0e0e0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 18px;
          color: #222;
        }

        .modal-close {
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          font-size: 18px;
          transition: color 0.3s ease;
        }

        .modal-close:hover {
          color: #ff4757;
        }

        .modal-body {
          padding: 30px 20px;
          text-align: center;
        }

        .success-icon {
          font-size: 60px;
          color: #4CAF50;
          margin-bottom: 20px;
        }

        .success-message {
          font-size: 16px;
          color: #222;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .success-details {
          font-size: 14px;
          color: #666;
          line-height: 1.5;
        }

        .success-details p {
          margin: 10px 0;
        }

        .modal-footer {
          padding: 20px;
          border-top: 1px solid #e0e0e0;
        }

        .modal-btn {
          width: 100%;
          padding: 14px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .modal-btn:hover {
          background: #0a4fc4;
        }

        .loading-section {
          text-align: center;
          padding: 40px 0;
          color: #666;
        }

        .spinner {
          border: 3px solid #f3f3f3;
          border-top: 3px solid #106cf5;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-section {
          text-align: center;
          padding: 40px 20px;
          color: #ff4757;
        }

        .error-section i {
          font-size: 40px;
          margin-bottom: 20px;
        }

        .error-note {
          margin-top: 10px;
          font-size: 14px;
          color: #666;
        }

        .hint-section {
          margin-top: 24px;
          background: white;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .hint-title {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-bottom: 12px;
        }

        .hint-content {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .hint-item {
          font-size: 10px;
          color: #666;
          line-height: 1.4;
          position: relative;
          padding-left: 12px;
        }

        .hint-item::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #106cf5;
          font-weight: bold;
        }

        .toast {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%) translateY(100px);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.3s ease;
          z-index: 1000;
        }

        .toast.visible {
          transform: translateX(-50%) translateY(0);
        }

        .toast-icon {
          color: #4CAF50;
        }

        @media (max-width: 380px) {
          .deposit-container {
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

          .currency-display {
            padding: 12px;
          }

          .currency-icon {
            width: 36px;
            height: 36px;
          }

          .currency-name {
            font-size: 15px;
          }

          .network-select {
            padding: 12px 14px;
            font-size: 14px;
          }

          .qr-container {
            padding: 20px;
          }

          .qr-box canvas {
            width: 160px;
            height: 160px;
          }

          .address-text {
            font-size: 12px;
            padding: 10px;
          }

          .address-actions {
            flex-direction: column;
          }

          .action-btn {
            width: 100%;
            justify-content: center;
          }

          .amount-input {
            padding: 12px 14px;
            font-size: 14px;
          }

          .submit-btn {
            padding: 14px;
            font-size: 15px;
          }

          .hint-section {
            padding: 16px;
          }

          .hint-title {
            font-size: 13px;
          }

          .hint-item {
            font-size: 9px;
          }

          .modal-content {
            width: 95%;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }

          .deposit-content {
            max-width: 500px;
            margin: 0 auto;
          }

          .address-actions {
            flex-direction: row;
          }
        }
      `}</style>
    </div>
  );
}

export default Deposit;