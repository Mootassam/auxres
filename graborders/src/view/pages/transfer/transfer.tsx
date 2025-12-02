import React from 'react'
import {Link} from "react-router-dom";
function transfer() {
    return (
        <>
            <div className="container">
                {/* Header Section */}
                <div className="header">
                    <div className="nav-bar">
                        <Link to="/wallets" className="back-arrow remove_blue">
                            <div className="back-arrow">
                                <i className="fas fa-arrow-left" />
                            </div>
                        </Link>
                        <div className="page-title">Transfer</div>
                        <div className="header-icon">
                            <i className="fas fa-receipt" />
                        </div>
                    </div>
                </div>
                {/* Content Section */}

                <div className="content-card">
                    {/* Currency Selector */}
                    <div className="currency-selector">
                        <div className="selector-header">
                            <div className="selector-label">Select currency</div>
                        </div>
                        <div className="selected-currency" id="currencySelector">
                            <div className="currency-icon">USDT</div>
                            <div className="currency-name">USDT</div>
                            <i className="fas fa-chevron-down selector-arrow" />
                        </div>
                        <div className="warning-message">
                            There are currently no assets available, please select another
                        </div>
                    </div>
                    {/* Wallet Section */}
                    <div className="wallet-section">
                        <div className="wallet-card">
                            <div className="wallet-row">
                                <div className="wallet-label">From:</div>
                                <div className="wallet-value">
                                    Exchange
                                    <i className="fas fa-chevron-right wallet-arrow" />
                                </div>
                            </div>
                            <div className="transfer-direction">
                                <div className="direction-arrow">
                                    <i className="fas fa-arrow-down" />
                                </div>
                            </div>
                            <div className="wallet-row">
                                <div className="wallet-label">Arrive:</div>
                                <div className="wallet-value">
                                    Trade
                                    <i className="fas fa-chevron-right wallet-arrow" />
                                </div>
                            </div>
                        </div>
                        <div className="swap-wallets" id="swapWallets">
                            <i className="fas fa-exchange-alt" />
                        </div>
                    </div>
                    {/* Quantity Section */}
                    <div className="quantity-section">
                        <div className="input-group">
                            <input
                                type="text"
                                className="input-field"
                                id="amountInput"
                            />
                            <div className="input-actions">
                                <div className="token-symbol">USDT</div>
                                <button className="max-button" id="maxButton">
                                    Maximum
                                </button>
                            </div>
                        </div>
                        <div className="balance-info">Available: 0 USDT</div>
                    </div>
                    {/* Transfer Button */}
                    <button className="transfer-button" id="transferButton">
                        Transfer
                    </button>
                </div>
            </div>
            {/* Currency Selection Modal */}
            <div className="modal-overlay" id="currencyModal">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-title">Select Currency</div>
                        <button className="modal-close" id="closeCurrencyModal">
                            <i className="fas fa-times" />
                        </button>
                    </div>
                    <ul className="currency-list">
                        <li className="currency-item selected" data-currency="USDT">
                            <div className="currency-icon">USDT</div>
                            <div className="currency-name">USDT</div>
                            <i className="fas fa-check check-icon" />
                        </li>
                        <li className="currency-item" data-currency="BTC">
                            <div className="currency-icon">BTC</div>
                            <div className="currency-name">Bitcoin</div>
                            <i className="fas fa-check check-icon" />
                        </li>
                        <li className="currency-item" data-currency="ETH">
                            <div className="currency-icon">ETH</div>
                            <div className="currency-name">Ethereum</div>
                            <i className="fas fa-check check-icon" />
                        </li>
                        <li className="currency-item" data-currency="USDC">
                            <div className="currency-icon">USDC</div>
                            <div className="currency-name">USDC</div>
                            <i className="fas fa-check check-icon" />
                        </li>
                    </ul>
                </div>
            </div>

            <style>{`  * {
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

        .container {
            max-width: 400px;
            margin: 0 auto;
            height: 100dvh;
            position: relative;
            background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header Section */
        .header {
            padding: 15px 20px;
            color: white;
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .nav-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .back-arrow {
            font-size: 18px;
            font-weight: 300;
        }

        .page-title {
            font-size: 18px;
            font-weight: 600;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }

        .header-icon {
            font-size: 16px;
            cursor: pointer;
        }

        /* Content Section */
        .content-card {
            background: white;
            border-radius: 40px 40px 0 0;
            height: calc(100% - 60px);
            padding: 30px 20px 100px;
            overflow-y: auto;
        }

        .section-title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 15px;
            color: #333;
        }

        /* Currency Selector */
        .currency-selector {
            margin-bottom: 20px;
        }

        .selector-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
        }

        .selector-label {
            font-size: 12px;
            color: #666;
            font-weight: 500;
        }

        .selected-currency {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 15px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            background: white;
            cursor: pointer;
        }

        .currency-icon {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: linear-gradient(135deg, #26a17b 0%, #1e8a63 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 12px;
        }

        .currency-name {
            font-size: 16px;
            font-weight: 600;
            color: #333;
            flex: 1;
        }

        .selector-arrow {
            color: #999;
            font-size: 12px;
        }

        .warning-message {
            color: #d40000;
            font-size: 13px;
            margin-top: 10px;

            padding-left: 5px;
            border-left: 3px solid #f56c6c;
        }

        /* Wallet Section */
        .wallet-section {
            background: #f8f9fa;
            margin-bottom: 20px;
            position: relative;
            display: flex
        }

        .wallet-card {
            background: white;
            width: 100%;
            padding: 20px;
            border: 1px solid #e0e0e0;
        }

        .wallet-row {
            display: flex;
            align-items: center;
            padding: 12px 0;
            gap: 30px
        }

        .wallet-row:first-child {
            border-bottom: 1px solid #f0f0f0;
        }

        .wallet-label {
            font-size: 12px;
            color: #666;
        }

        .wallet-value {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            font-weight: 500;
            color: #000;
        }

        .wallet-arrow {
            color: #999;
            font-size: 12px;
        }

        .transfer-direction {
            display: flex;
            justify-content: center;
            margin: 10px 0;
        }

        .direction-arrow {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
            font-size: 12px;
        }

        .swap-wallets {
            right: 20px;
            top: 50%;
            width: 42px;
            background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .swap-wallets:hover {
            opacity: 0.9;
        }

        /* Quantity Section */
        .quantity-section {
            margin-bottom: 30px;
        }

        .input-group {
            position: relative;
            margin-bottom: 10px;
        }

        .input-field {
            width: 100%;
            padding: 16px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            background: white;
            font-size: 16px;
            transition: border-color 0.3s ease;
        }

        .input-field:focus {
            outline: none;
            border-color: #106cf5;
        }

        .input-actions {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .token-symbol {
            font-size: 12px;
            color: #666;
        }

        .max-button {
            background: #e6f0ff;
            border: none;
            border-radius: 6px;
            padding: 4px 8px;
            color: #106cf5;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .max-button:hover {
            background: #d0e2ff;
        }

        .balance-info {
            font-size: 13px;
            color: #666;
            text-align: right;
        }

        /* Transfer Button */
        .transfer-button {
            background: #ccc;
            border: none;
            border-radius: 12px;
            padding: 16px 20px;
            color: white;
            font-size: 16px;
            font-weight: 600;
            cursor: not-allowed;
            width: 100%;
            transition: all 0.3s ease;
        }

        .transfer-button.enabled {
            background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
            cursor: pointer;
        }

        .transfer-button.enabled:hover {
            opacity: 0.9;
        }

        /* Modal Styles */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }

        .modal-content {
            background: white;
            border-radius: 16px;
            width: 90%;
            max-width: 350px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .modal-header {
            padding: 20px;
            border-bottom: 1px solid #e9ecef;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .modal-title {
            font-size: 18px;
            font-weight: 600;
            color: #333;
        }

        .modal-close {
            background: none;
            border: none;
            font-size: 18px;
            color: #999;
            cursor: pointer;
            padding: 5px;
        }

        .currency-list {
            list-style: none;
            padding: 0;
        }

        .currency-item {
            padding: 16px 20px;
            border-bottom: 1px solid #f0f0f0;
            cursor: pointer;
            transition: background-color 0.2s;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .currency-item:hover {
            background: #f8f9fa;
        }

        .currency-item.selected {
            background: #e6f0ff;
        }

        .check-icon {
            color: #106cf5;
            font-size: 12px;
            margin-left: auto;
            display: none;
        }

        .currency-item.selected .check-icon {
            display: block;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
            .container {
                padding: 0;
            }

            .header {
                padding: 16px;
            }

            .content-card {
                padding: 25px 16px 100px;
            }

            .currency-selector,
            .wallet-section,
            .quantity-section {
                padding: 16px;
            }
        }`}</style>
        </>

    )
}

export default transfer