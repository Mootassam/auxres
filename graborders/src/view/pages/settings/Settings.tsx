import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import authActions from "src/modules/auth/authActions";
import CurrencyModal from "../currency/Currency";



// Main Settings Component
function Settings() {
  const dispatch = useDispatch();
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState({
    symbol: "$",
    code: "USD",
    name: "USD [$]"
  });

  const handleSignOut = () => {
    dispatch(authActions.doSignout());
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency({
      symbol: currency.symbol,
      code: currency.code,
      name: `${currency.code} [${currency.symbol}]`
    });
    setIsCurrencyModalOpen(false);
  };

  const openCurrencyModal = () => {
    setIsCurrencyModalOpen(true);
  };

  const closeCurrencyModal = () => {
    setIsCurrencyModalOpen(false);
  };

  return (
    <div className="settings-container">
      {/* Header Section - Matching Profile Page */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/profile" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">Settings</div>
        </div>
      </div>

      {/* Content Card - Matching Profile Page */}
      <div className="content-card">
        <div className="settings-options">
          <Link to="/language" className="settings-option remove_blue">
            <div className="option-content-wrapper">
              <div className="option-icon">
                <i className="fas fa-language" />
              </div>
              <div className="option-content">
                <div className="option-title">Language</div>
              </div>
              <div className="option-arrow">
                <i className="fas fa-chevron-right" />
              </div>
            </div>
          </Link>

          {/* Currency Option - Now opens modal instead of navigating */}
          <div className="settings-option remove_blue" onClick={openCurrencyModal}>
            <div className="option-content-wrapper">
              <div className="option-icon">
                <i className="fas fa-dollar-sign" />
              </div>
              <div className="option-content">
                <div className="option-title">Quotation currency {selectedCurrency.name}</div>
              </div>
              <div className="option-arrow">
                <i className="fas fa-chevron-right" />
              </div>
            </div>
          </div>

          <Link to="/color-config" className="settings-option remove_blue">
            <div className="option-content-wrapper">
              <div className="option-icon">
                <i className="fas fa-palette" />
              </div>
              <div className="option-content">
                <div className="option-title">Color configuration</div>
              </div>
              <div className="option-arrow">
                <i className="fas fa-chevron-right" />
              </div>
            </div>
          </Link>

          <Link to="/about" className="settings-option remove_blue">
            <div className="option-content-wrapper">
              <div className="option-icon">
                <i className="fas fa-info-circle" />
              </div>
              <div className="option-content">
                <div className="option-title">About us</div>
              </div>
              <div className="option-arrow">
                <i className="fas fa-chevron-right" />
              </div>
            </div>
          </Link>

          <div className="settings-option version-option">
            <div className="option-content-wrapper">
              <div className="option-icon">
                <i className="fas fa-code-branch" />
              </div>
              <div className="option-content">
                <div className="option-title">Version number 1.0.0</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <div className="signout-section">
          <button className="signout-button" onClick={handleSignOut}>
            <i className="fas fa-sign-out-alt" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Currency Selection Modal - Using separate component */}
      <CurrencyModal
        isOpen={isCurrencyModalOpen}
        onClose={closeCurrencyModal}
        selectedCurrency={selectedCurrency}
        onSelectCurrency={handleCurrencySelect}
      />

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

        .settings-container {
          max-width: 400px;
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header Section - Matching Profile Page */
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

        /* Content Card - Matching Profile Page */
        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 20px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
          display: flex;
          flex-direction: column;
        }

        .settings-options {
          flex: 1;
        }

        .settings-option {
          display: block;
          text-decoration: none;
          color: inherit;
          margin-bottom: 12px;
          cursor: pointer;
        }

        .settings-option:last-child {
          margin-bottom: 0;
        }

        .option-content-wrapper {
          display: flex;
          align-items: center;
          padding: 12px;
          border: 1px solid #e7eaee;
          border-radius: 7px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          background: #fff;
        }

        .settings-option:hover .option-content-wrapper {
          transform: translateY(-2px);
          border-color: #106cf5;
          box-shadow: 0 4px 12px rgba(16, 108, 245, 0.1);
        }

        .version-option .option-content-wrapper {
          cursor: default;
        }

        .version-option:hover .option-content-wrapper {
          transform: none;
          border-color: #e7eaee;
          box-shadow: none;
        }

        .option-icon {
          margin-right: 16px;
          font-size: 18px;
          color: #666;
          width: 24px;
          text-align: center;
        }

        .option-content {
          flex: 1;
        }

        .option-title {
          font-size: 14px;
          font-weight: 500;
          color: #222;
        }

        .option-arrow {
          color: #ccc;
          font-size: 12px;
          margin-left: 12px;
          transition: transform 0.3s ease;
        }

        .settings-option:hover .option-arrow {
          color: #106cf5;
          transform: translateX(3px);
        }

        /* Sign Out Button */
        .signout-section {
          margin-top: 30px;
          padding: 20px 0;
          border-top: 1px solid #e7eaee;
        }

        .signout-button {
          width: 100%;
          padding: 12px;
          background: #f44336;
          color: white;
          border: none;
          border-radius: 7px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .signout-button:hover {
          background: #d32f2f;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(244, 67, 54, 0.2);
        }

        .signout-button:active {
          transform: translateY(0);
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .settings-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 16px;
          }

          .option-content-wrapper {
            padding: 10px;
          }

          .option-icon {
            font-size: 16px;
            margin-right: 12px;
          }

          .option-title {
            font-size: 13px;
          }

          .signout-button {
            padding: 10px;
            font-size: 13px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }
        }
      `}</style>
    </div>
  );
}

export default Settings;