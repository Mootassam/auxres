import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import authActions from "src/modules/auth/authActions";
import CurrencyModal from "../currency/Currency";
import I18nSelect from "src/view/layout/I18nSelect";
import assetsListActions from "src/modules/assets/list/assetsListActions";

// Main Settings Component
function Settings() {
  const dispatch = useDispatch();
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState({
    symbol: "$",
    code: "USD",
    name: "USD [$]"
  });

  const handleSignOut = () => {
    dispatch(authActions.doSignout());
  };

  const convertFiat = () => {
  }

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency({
      symbol: currency.symbol,
      code: currency.code,
      name: `${currency.code} [${currency.symbol}]`
    });
    dispatch(assetsListActions.doConvert(currency.code))

    setIsCurrencyModalOpen(false);
  };

  const openCurrencyModal = () => {
    setIsCurrencyModalOpen(true);
  };

  const closeCurrencyModal = () => {
    setIsCurrencyModalOpen(false);
  };

  const openLanguageModal = () => {
    setIsLanguageModalOpen(true);
  };

  const closeLanguageModal = () => {
    setIsLanguageModalOpen(false);
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
          {/* Language Option - Now opens modal instead of navigating */}
          <div className="settings-option remove_blue" onClick={openLanguageModal}>
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
          </div>

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

      {/* Language Selection Modal - Using I18nSelect component */}
      {isLanguageModalOpen && (
        <div className="modal-overlay" onClick={closeLanguageModal}>
          <div className="modal-container-bottom" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header-bottom">
              <div className="modal-drag-handle"></div>
              <div className="modal-title-wrapper">
                <div className="modal-title">Select Language</div>
                <button className="modal-close-btn-bottom" onClick={closeLanguageModal}>
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="modal-content-bottom">
              <I18nSelect isInModal={true} />
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

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        .modal-container-bottom {
          background: white;
          border-radius: 24px 24px 0 0;
          width: 100%;
          max-width: 400px;
          max-height: 85vh;
          overflow: hidden;
          box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.15);
          animation: slideUpFromBottom 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          margin: 0 auto;
        }

        .modal-header-bottom {
          padding: 16px 20px 8px 20px;
          border-bottom: 1px solid #eef2f7;
          position: relative;
        }

        .modal-drag-handle {
          width: 40px;
          height: 4px;
          background: #ddd;
          border-radius: 2px;
          margin: 0 auto 12px auto;
        }

        .modal-title-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .modal-title {
          font-size: 17px;
          font-weight: 700;
          color: #222;
          flex: 1;
          padding-right: 10px;
        }

        .modal-close-btn-bottom {
          background: #f5f7fa;
          border: none;
          color: #666;
          font-size: 16px;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .modal-close-btn-bottom:hover {
          background: #eef2f7;
          color: #333;
        }

        .modal-content-bottom {
          flex: 1;
          overflow-y: auto;
          padding: 0;
          max-height: calc(85vh - 100px);
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUpFromBottom {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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

          .modal-container-bottom {
            max-height: 90vh;
          }

          .modal-header-bottom {
            padding: 12px 16px 6px 16px;
          }

          .modal-title {
            font-size: 16px;
          }

          .modal-drag-handle {
            width: 36px;
            height: 3px;
            margin-bottom: 10px;
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