import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { QRCodeCanvas } from "qrcode.react";
import { useParams } from "react-router-dom";
import method from 'src/modules/depositMethod/list/depositMethodListActions'
  import selectors from 'src/modules/depositMethod/list/depositMethodSelectors';

function Deposit() {
  const dispatch = useDispatch();
  const { symbol } = useParams(); // Get the symbol from URL
  const [selectedNetwork, setSelectedNetwork] = useState(symbol || "ETH");
  const [showToast, setShowToast] = useState(false);
  const [copiedText, setCopiedText] = useState("Address copied");
  const listMethod = useSelector(selectors.selectRows);
  const loading = useSelector(selectors.selectLoading);

  // Initialize currentAddress safely
  const [currentAddress, setCurrentAddress] = useState("");

  useEffect(() => {
    dispatch(method.doFetch());
  }, [dispatch]);

  // Update address when network changes or listMethod updates
  useEffect(() => {
    if (listMethod && listMethod.length > 0) {
      const network = listMethod.find(n => n.symbol === selectedNetwork);
      if (network) {
        setCurrentAddress(network.address || "0xBcBEF105855cB0f29f1b100B28eC4BB18eE911A4");
      } else {
        // Fallback to default address if not found
        setCurrentAddress("0xBcBEF105855cB0f29f1b100B28eC4BB18eE911A4");
      }
    } else {
      // Default address if no data
      setCurrentAddress("0xBcBEF105855cB0f29f1b100B28eC4BB18eE911A4");
    }
  }, [selectedNetwork, listMethod]);

  // Copy address to clipboard with error handling
  const copyAddressToClipboard = () => {
    if (!currentAddress) {
      console.error("No address to copy");
      return;
    }

    navigator.clipboard.writeText(currentAddress).then(() => {
      setCopiedText("Address copied");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }).catch(err => {
      console.error("Failed to copy address: ", err);
    });
  };

  // Save QR code as image
  const saveQRCode = () => {
    const canvas = document.querySelector('.qr-box canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = `${selectedNetwork}-deposit-address.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      setCopiedText("QR code saved");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  // Handle network selection
  const handleNetworkSelect = (event) => {
    setSelectedNetwork(event.target.value);
  };

  // Safe network display name
  const getNetworkDisplayName = () => {
    const network = listMethod?.find(n => n.symbol === selectedNetwork);
    return network?.name || "Ethereum";
  };

  return (
    <div className="deposit-container">
      {/* Header Section - Matching HelpCenter */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/deposit" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">Deposit</div>
        </div>
      </div>

      {/* Content Card - Matching HelpCenter */}
      <div className="content-card">
        <div className="deposit-content">
          
          {/* Deposit Currency (Fixed) */}
          <div className="section">
            <div className="section-label">Deposit currency</div>
            <div className="currency-display">
              <div className="currency-icon">
                <img 
                  src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${selectedNetwork}.png`}
                  alt={selectedNetwork}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    const parent = e.target.parentElement;
                    if (parent) {
                      parent.textContent = selectedNetwork;
                      parent.style.background = '#f0f0f0';
                      parent.style.color = '#333';
                    }
                  }}
                />
              </div>
              <div className="currency-name">{selectedNetwork}</div>
            </div>
            <div className="section-note">Fixed currency - cannot be changed</div>
          </div>

          {/* Deposit Network (Selectable) */}
          <div className="section">
            <div className="section-label">Deposit network</div>
            <div className="network-select-wrapper">
              <select
                className="network-select"
                value={selectedNetwork}
                onChange={handleNetworkSelect}
              >
                <option value="ETH">Ethereum (ERC20)</option>
                <option value="BSC">Binance Smart Chain (BEP20)</option>
                <option value="TRX">Tron (TRC20)</option>
                <option value="SOL">Solana</option>
                <option value="BTC">Bitcoin</option>
              </select>
              <div className="select-arrow">
                <i className="fas fa-chevron-down" />
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="qr-section">
            <div className="section-label">Save QR code</div>
            <div className="qr-container">
              <div className="qr-box">
                <QRCodeCanvas
                  value={currentAddress}
                  size={180}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H"
                  includeMargin={true}
                />
              </div>
              
              {/* Wallet Address */}
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
                  >
                    <i className="fas fa-copy" /> Copy Address
                  </button>
                  <button
                    type="button"
                    className="action-btn save-btn"
                    onClick={saveQRCode}
                  >
                    <i className="fas fa-download" /> Save QR Code
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Hint Section */}
          <div className="hint-section">
            <div className="hint-title">Hint</div>
            <div className="hint-content">
              <div className="hint-item">
                1. Please select the above-mentioned token system and currency type and transfer the corresponding amount for deposit. Please do not transfer any other irrelevant assets, otherwise they will not be retrieved.
              </div>
              <div className="hint-item">
                2. After you recharge the above address, you need to confirm the entire network node before it can be credited;
              </div>
              <div className="hint-item">
                3. Please make sure that your computer and browser are safe to prevent information from being tampered with or leaked;
              </div>
              <div className="hint-item">
                4. The above deposit address is the official payment address of the platform, please look for the official deposit address of the platform, and the loss of funds caused by incorrect charging shall be borne by yourself;
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Toast Notification */}
      <div className={`toast ${showToast ? 'visible' : ''}`}>
        <i className="fas fa-check-circle toast-icon" />
        {copiedText}
      </div>

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

        /* Header Section - Matching HelpCenter */
        .header {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          min-height: 60px;
          position: relative;
          padding: 20px;
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

        .deposit-content {
          width: 100%;
        }

        /* Section Styles */
        .section {
          margin-bottom: 14px;
        }

        .section-label {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-bottom: 8px;
        }

        /* Currency Display */
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

        .currency-icon:not(:has(img)) {
          font-weight: 600;
          color: #333;
          font-size: 14px;
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

        /* Network Select */
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

        /* QR Section */
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

        /* Hint Section */
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

        /* Toast Notification */
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

        /* Responsive adjustments */
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

          .hint-section {
            padding: 16px;
          }

          .hint-title {
            font-size: 13px;
          }

          .hint-item {
            font-size: 9px;
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