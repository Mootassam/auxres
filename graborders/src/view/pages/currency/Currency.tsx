import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Currency() {
    const [loadingCurrency, setLoadingCurrency] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState('USD');

    const currencies = [
        { id: 'USD', symbol: '$', name: 'US Dollar' },
        { id: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
        { id: 'EUR', symbol: '€', name: 'Euro' },
        { id: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
        { id: 'JPY', symbol: '¥', name: 'Japanese Yen' },
        { id: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
        { id: 'TWD', symbol: 'NT$', name: 'Taiwan Dollar' },
        { id: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
        { id: 'PHP', symbol: '₱', name: 'Philippine Peso' },
        { id: 'THB', symbol: '฿', name: 'Thai Baht' },
        { id: 'RUB', symbol: '₽', name: 'Russian Ruble' },
        { id: 'AUD', symbol: 'AU$', name: 'Australian Dollar' },
        { id: 'GBP', symbol: '£', name: 'British Pound' },
        { id: 'KRW', symbol: '₩', name: 'South Korean Won' },
        { id: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
        { id: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
        { id: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' }
    ];

    const doChangeCurrency = async (currencyId) => {
        setLoadingCurrency(currencyId);
        try {
            // Here you would add your currency change logic
            // For example: await actions.doChangeCurrency(currencyId);
            setSelectedCurrency(currencyId);
        } finally {
            setTimeout(() => {
                setLoadingCurrency(null);
            }, 300);
        }
    };

    return (
        <div className="currency-container">
            {/* Header Section - Matching Profile Page */}
            <div className="header">
                <div className="nav-bar">
                    <Link to="/settings" className="back-arrow">
                        <i className="fas fa-arrow-left"></i>
                    </Link>
                    <div className="page-title">Currency</div>
                </div>
            </div>

            {/* Content Card - Matching Profile Page */}
            <div className="content-card">
                <div className="currency-intro">
                    <div className="currency-icon">
                        <i className="fas fa-money-bill-wave"></i>
                    </div>
                    <h2>Please select pricing currency</h2>
                    <p>Select your preferred currency for pricing and transactions</p>
                </div>

                <div className="currencies-list">
                    {currencies.map((currency) => {
                        const isActive = selectedCurrency === currency.id;
                        const isLoading = loadingCurrency === currency.id;
                        
                        return (
                            <div
                                key={currency.id}
                                onClick={() => !isLoading && doChangeCurrency(currency.id)}
                                className={`currency-item ${
                                    isActive ? 'active' : ''
                                } ${isLoading ? 'loading' : ''}`}
                            >
                                <div className="currency-info">
                                    <div className="currency-code">{currency.id}</div>
                                    <div className="currency-name">{currency.name}</div>
                                </div>
                                {isActive && !isLoading && (
                                    <div className="selected-indicator">
                                        <i className="fas fa-check"></i>
                                    </div>
                                )}
                                {isLoading && (
                                    <div className="loading-indicator">
                                        <i className="fas fa-spinner fa-spin"></i>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="currency-help">
                    <p>
                        <i className="fas fa-info-circle"></i>
                        Changing the currency will affect all prices in the application
                    </p>
                </div>
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

                .currency-container {
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
                    margin-bottom: 20px;
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
                    font-size: 18px;
                    font-weight: 600;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                }

                /* Content Card - Matching Profile Page */
                .content-card {
                    background: white;
                    border-radius: 40px 40px 0 0;
                    padding: 30px 20px 100px;
                    box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
                    min-height: calc(100vh - 60px);
                }

                .currency-intro {
                    text-align: center;
                    margin-bottom: 30px;
                    padding: 0 10px;
                }

                .currency-icon {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #e6f0ff 0%, #d0e2ff 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    color: #106cf5;
                    font-size: 36px;
                    box-shadow: 0 8px 16px rgba(16, 108, 245, 0.15);
                }

                .currency-intro h2 {
                    font-size: 20px;
                    font-weight: 700;
                    color: #222;
                    margin-bottom: 8px;
                }

                .currency-intro p {
                    font-size: 14px;
                    color: #888f99;
                    line-height: 1.4;
                }

                .currencies-list {
                    margin-bottom: 30px;
                }

                .currency-item {
                    display: flex;
                    align-items: center;
                    padding: 16px;
                    background: #fff;
                    border: 1px solid #e7eaee;
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    margin-bottom: 12px;
                    position: relative;
                }

                .currency-item:hover {
                    transform: translateY(-2px);
                    border-color: #106cf5;
                    box-shadow: 0 4px 12px rgba(16, 108, 245, 0.1);
                }

                .currency-item.active {
                    background: linear-gradient(135deg, #f0f7ff 0%, #e6f0ff 100%);
                    border-color: #106cf5;
                    border-width: 2px;
                }

                .currency-item.loading {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .currency-symbol-container {
                    width: 48px;
                    height: 48px;
                    border-radius: 8px;
                    margin-right: 16px;
                    border: 2px solid #e7eaee;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                }

                .currency-item.active .currency-symbol-container {
                    border-color: #106cf5;
                    box-shadow: 0 2px 8px rgba(16, 108, 245, 0.2);
                    background: linear-gradient(135deg, #e6f0ff 0%, #d0e2ff 100%);
                }

                .currency-symbol {
                    font-size: 24px;
                    font-weight: 600;
                    color: #333;
                }

                .currency-item.active .currency-symbol {
                    color: #106cf5;
                }

                .currency-info {
                    flex: 1;
                }

                .currency-code {
                    font-size: 16px;
                    font-weight: 600;
                    color: #222;
                    margin-bottom: 4px;
                }

                .currency-name {
                    font-size: 14px;
                    color: #888f99;
                }

                .currency-item.active .currency-code {
                    color: #106cf5;
                }

                .currency-item.active .currency-name {
                    color: #666;
                }

                .selected-indicator {
                    width: 24px;
                    height: 24px;
                    background: #106cf5;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: 12px;
                    flex-shrink: 0;
                }

                .selected-indicator i {
                    font-size: 12px;
                    color: white;
                }

                .loading-indicator {
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: 12px;
                    flex-shrink: 0;
                }

                .loading-indicator i {
                    font-size: 16px;
                    color: #106cf5;
                }

                .currency-help {
                    background: #f8f9fa;
                    border-radius: 12px;
                    padding: 16px;
                    text-align: center;
                    margin-top: 20px;
                    border: 1px solid #e7eaee;
                }

                .currency-help p {
                    font-size: 14px;
                    color: #666;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }

                .currency-help i {
                    color: #106cf5;
                    font-size: 16px;
                }

                /* Animations */
                @keyframes pulse {
                    0% {
                        box-shadow: 0 0 0 0 rgba(16, 108, 245, 0.4);
                    }
                    70% {
                        box-shadow: 0 0 0 6px rgba(16, 108, 245, 0);
                    }
                    100% {
                        box-shadow: 0 0 0 0 rgba(16, 108, 245, 0);
                    }
                }

                .pulse {
                    animation: pulse 2s infinite;
                }

                /* Responsive adjustments */
                @media (max-width: 380px) {
                    .currency-container {
                        padding: 0;
                    }

                    .header {
                        padding: 16px;
                        min-height: 50px;
                    }

                    .content-card {
                        padding: 25px 16px 100px;
                    }

                    .currency-intro {
                        margin-bottom: 20px;
                    }

                    .currency-icon {
                        width: 60px;
                        height: 60px;
                        font-size: 28px;
                        margin-bottom: 16px;
                    }

                    .currency-intro h2 {
                        font-size: 18px;
                    }

                    .currency-item {
                        padding: 14px;
                    }

                    .currency-symbol-container {
                        width: 40px;
                        height: 40px;
                        margin-right: 12px;
                    }

                    .currency-symbol {
                        font-size: 20px;
                    }

                    .currency-code {
                        font-size: 15px;
                    }

                    .currency-name {
                        font-size: 13px;
                    }
                }

                @media (min-width: 768px) {
                    .currency-container {
                        max-width: 400px;
                    }

                    .content-card {
                        border-radius: 30px 30px 0 0;
                    }

                    .currency-item {
                        padding: 12px;
                    }
                }
            `}</style>
        </div>
    );
}

export default Currency;