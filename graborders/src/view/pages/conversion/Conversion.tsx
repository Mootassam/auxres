import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import assetsListSelectors from "src/modules/assets/list/assetsListSelectors";
import assetsFormAction from "src/modules/assets/form/assetsFormActions";
import authSelectors from "src/modules/auth/authSelectors";
import assetsActions from "src/modules/assets/list/assetsListActions";
import selector from "src/modules/assets/form/assetsFormSelectors";
import SuccessModalComponent from "src/view/shared/modals/sucessModal";
import { i18n } from "../../../i18n";

function Conversion() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const [fromCurrency, setFromCurrency] = useState("USDT");
  const [toCurrency, setToCurrency] = useState("BTC");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("0.0");
  const [conversionRate, setConversionRate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const selectModal = useSelector(selector.selectModal);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [conversionFee, setConversionFee] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [isConverting, setIsConverting] = useState(false);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const assetsBalance = useSelector(assetsListSelectors.selectRows);
  const [prices, setPrices] = useState<{ [key: string]: number }>({});
  const fromDropdownRef = useRef<HTMLDivElement>(null);
  const toDropdownRef = useRef<HTMLDivElement>(null);

  // List of allowed coins (11 coins as specified)
  const allowedCoins = [
    { code: "USDT", name: "Tether USD", color: "#26A17B", image: "https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/USDT.png" },
    { code: "ETH", name: "Ethereum", color: "#627EEA", image: "https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/ETH.png" },
    { code: "BTC", name: "Bitcoin", color: "#F7931A", image: "https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/BTC.png" },
    { code: "USDC", name: "USD Coin", color: "#2775CA", image: "https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/USDC.png" },
    { code: "DAI", name: "Dai", color: "#F4B731", image: "https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/DAI.png" },
    { code: "SHIB", name: "Shiba Inu", color: "#FFC107", image: "https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/SHIB.png" },
    { code: "XRP", name: "Ripple", color: "#23292F", image: "https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/XRP.png" },
    { code: "TRX", name: "TRON", color: "#FF001A", image: "https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/TRX.png" },
    { code: "SOL", name: "Solana", color: "#00FFA3", image: "https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/SOL.png" },
    { code: "BNB", name: "Binance Coin", color: "#F0B90B", image: "https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/BNB.png" },
    { code: "DOGE", name: "Dogecoin", color: "#C2A633", image: "https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/DOGE.png" }
  ];

  // Initialize balances from assets
  const [balances, setBalances] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const initializeBalances = () => {
      if (assetsBalance?.length) {
        const formatted = assetsBalance.reduce(
          (acc: { [key: string]: number }, item) => {
            acc[item.symbol] = item.amount;
            return acc;
          },
          {}
        );
        setBalances(formatted);
      }
    };

    initializeBalances();
  }, [assetsBalance]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromDropdownRef.current && !fromDropdownRef.current.contains(event.target as Node)) {
        setShowFromDropdown(false);
      }
      if (toDropdownRef.current && !toDropdownRef.current.contains(event.target as Node)) {
        setShowToDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch assets and prices
  useEffect(() => {
    dispatch(assetsActions.doFetch());
    
    const fetchPrices = async () => {
      setIsLoading(true);
      try {
        const mockPrices: { [key: string]: number } = {
          USDT: 1,
          BTC: 45000,
          ETH: 3000,
          USDC: 1,
          DAI: 1,
          SHIB: 0.00002,
          XRP: 0.6,
          TRX: 0.1,
          SOL: 100,
          BNB: 350,
          DOGE: 0.08
        };
        setPrices(mockPrices);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching prices:", error);
        setIsLoading(false);
      }
    };

    fetchPrices();
  }, [dispatch]);

  // Get coin info
  const getCoinInfo = (code: string) => {
    return allowedCoins.find(coin => coin.code === code) || allowedCoins[0];
  };

  // Calculate conversion
  const calculateConversion = useCallback(() => {
    const fromPrice = prices[fromCurrency] || 1;
    const toPrice = prices[toCurrency] || 1;
    
    if (fromPrice && toPrice) {
      const rate = fromPrice / toPrice;
      setConversionRate(rate);
      
      if (fromAmount) {
        const amount = parseFloat(fromAmount);
        const result = amount * rate;
        setToAmount(result.toFixed(8));
        
        // Calculate fee (0.1%)
        const fee = amount * 0.001;
        setConversionFee(fee);
        setFinalAmount(result * 0.999); // After fee
      } else {
        setToAmount("0.0");
        setFinalAmount(0);
      }
    }
  }, [fromCurrency, toCurrency, fromAmount, prices]);

  // Recalculate on changes
  useEffect(() => {
    calculateConversion();
  }, [calculateConversion]);

  // Check balance
  const hasSufficientBalance = useMemo(() => {
    if (!fromCurrency || !fromAmount) return false;
    const amount = parseFloat(fromAmount);
    if (isNaN(amount) || amount <= 0) return false;
    const balance = balances[fromCurrency] || 0;
    return amount <= balance;
  }, [fromAmount, fromCurrency, balances]);

  // Input handlers
  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and one decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setFromAmount(value);
    }
  };

  const handleSetMaxAmount = () => {
    setFromAmount(balances[fromCurrency]?.toString() || "0");
  };

  const switchCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    // Also swap amounts
    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleCloseModal = () => {
    dispatch(assetsFormAction.doClose());
    setFromAmount("");
    setToAmount("0.0");
    setFinalAmount(0);
    setConversionFee(0);
    dispatch(assetsActions.doFetch());
  };

  const performConversion = () => {
    if (!hasSufficientBalance) return;
    setIsConverting(true);

    setTimeout(() => {
      const values = {
        user: currentUser.id,
        fromSymbol: fromCurrency,
        fromAmount: parseFloat(fromAmount),
        toSymbol: toCurrency,
        coinName: toCurrency,
        toAmount: finalAmount.toFixed(8),
        status: "available",
      };
      
      dispatch(assetsFormAction.doCreate(values));
      
      // Update local balances
      setBalances(prev => ({
        ...prev,
        [fromCurrency]: (prev[fromCurrency] || 0) - parseFloat(fromAmount),
        [toCurrency]: (prev[toCurrency] || 0) + finalAmount
      }));
      
      setIsConverting(false);
      setShowConfirmationModal(false);
      setFromAmount("");

      setTimeout(() => {
        dispatch(assetsActions.doFetch());
      }, 500);
    }, 1500);
  };

  // Get balance for display
  const getBalance = (currency: string) => {
    return balances[currency]?.toFixed(8) || "0";
  };

  // Format exchange rate
  const formatExchangeRate = () => {
    if (conversionRate < 0.0001) {
      return conversionRate.toFixed(12);
    } else if (conversionRate < 1) {
      return conversionRate.toFixed(8);
    } else {
      return conversionRate.toFixed(4);
    }
  };

  // Select coin from dropdown
  const selectFromCoin = (code: string) => {
    setFromCurrency(code);
    setShowFromDropdown(false);
  };

  const selectToCoin = (code: string) => {
    setToCurrency(code);
    setShowToDropdown(false);
  };

  // Get current coin image
  const getCoinImage = (code: string) => {
    const coin = getCoinInfo(code);
    return coin?.image || `https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${code}.png`;
  };

  return (
    <div className="container">
      {/* Header Section - Matching Swap Page */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/profile" className="back-arrow remove_blue">
            <div className="back-arrow">
              <i className="fas fa-arrow-left" />
            </div>
          </Link>
          <div className="page-title">{i18n("pages.conversion.title") || "Conversion"}</div>
          <div className="header-icon">
            <i className="fas fa-receipt" />
          </div>
        </div>
      </div>

      {/* Swap Container */}
      <div className="swap-container">
        <div className="swap-card">
          {/* From Section */}
          <div className="section-header">
            <div className="section-title">{i18n("pages.conversion.youSend") || "You Send"}</div>
            <div className="available-balance">
              Available: {getBalance(fromCurrency)} {fromCurrency}
            </div>
          </div>

          {/* From Token Selector */}
          <div className="custom-select-wrapper" ref={fromDropdownRef}>
            <div className="token-selector" onClick={() => setShowFromDropdown(!showFromDropdown)}>
              <div className="token-info">
                <div className="token-icon">
                  <img 
                    src={getCoinImage(fromCurrency)}
                    alt={fromCurrency}
                    className="coin-image"
                    onError={(e) => {
                      e.currentTarget.src = `https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${fromCurrency}.png`;
                      e.currentTarget.onerror = null;
                    }}
                  />
                </div>
                <div className="token-name">{fromCurrency}</div>
              </div>
              <i className={`fas fa-chevron-down selector-arrow ${showFromDropdown ? 'rotated' : ''}`} />
            </div>

            {showFromDropdown && (
              <div className="custom-dropdown">
                <div className="dropdown-header">
                  <div className="dropdown-title">Select Coin</div>
                  <div className="dropdown-count">{allowedCoins.length} coins</div>
                </div>
                <div className="dropdown-list">
                  {allowedCoins.map((coin) => (
                    <div
                      key={coin.code}
                      className={`dropdown-item ${fromCurrency === coin.code ? 'selected' : ''}`}
                      onClick={() => selectFromCoin(coin.code)}
                    >
                      <div className="item-icon">
                        <img 
                          src={coin.image}
                          alt={coin.code}
                          className="coin-image"
                          onError={(e) => {
                            e.currentTarget.src = `https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${coin.code}.png`;
                            e.currentTarget.onerror = null;
                          }}
                        />
                      </div>
                      <div className="item-info">
                        <div className="item-code">{coin.code}</div>
                        <div className="item-name">{coin.name}</div>
                      </div>
                      <div className="item-balance">
                        {getBalance(coin.code)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* From Input Field */}
          <div className="input-group">
            <input
              type="text"
              className="input-field"
              placeholder={i18n("pages.conversion.enterAmount") || "Please enter the amount"}
              value={fromAmount}
              onChange={handleFromAmountChange}
            />
            <div className="input-actions">
              <div className="token-symbol">{fromCurrency}</div>
              <button className="max-button" onClick={handleSetMaxAmount}>All</button>
            </div>
          </div>

          {/* Swap Direction Button */}
          <div className="swap-direction">
            <div className="swap-button" onClick={switchCurrencies}>
              <i className="fas fa-exchange-alt" />
            </div>
          </div>

          {/* To Section */}
          <div className="section-header">
            <div className="section-title">{i18n("pages.conversion.youReceive") || "You Receive"}</div>
            <div className="available-balance">
              Available: {getBalance(toCurrency)} {toCurrency}
            </div>
          </div>

          {/* To Token Selector */}
          <div className="custom-select-wrapper" ref={toDropdownRef}>
            <div className="token-selector" onClick={() => setShowToDropdown(!showToDropdown)}>
              <div className="token-info">
                <div className="token-icon">
                  <img 
                    src={getCoinImage(toCurrency)}
                    alt={toCurrency}
                    className="coin-image"
                    onError={(e) => {
                      e.currentTarget.src = `https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${toCurrency}.png`;
                      e.currentTarget.onerror = null;
                    }}
                  />
                </div>
                <div className="token-name">{toCurrency}</div>
              </div>
              <i className={`fas fa-chevron-down selector-arrow ${showToDropdown ? 'rotated' : ''}`} />
            </div>

            {showToDropdown && (
              <div className="custom-dropdown">
                <div className="dropdown-header">
                  <div className="dropdown-title">Select Coin</div>
                  <div className="dropdown-count">{allowedCoins.length} coins</div>
                </div>
                <div className="dropdown-list">
                  {allowedCoins.map((coin) => (
                    <div
                      key={coin.code}
                      className={`dropdown-item ${toCurrency === coin.code ? 'selected' : ''}`}
                      onClick={() => selectToCoin(coin.code)}
                    >
                      <div className="item-icon">
                        <img 
                          src={coin.image}
                          alt={coin.code}
                          className="coin-image"
                          onError={(e) => {
                            e.currentTarget.src = `https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${coin.code}.png`;
                            e.currentTarget.onerror = null;
                          }}
                        />
                      </div>
                      <div className="item-info">
                        <div className="item-code">{coin.code}</div>
                        <div className="item-name">{coin.name}</div>
                      </div>
                      <div className="item-balance">
                        {getBalance(coin.code)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Output Field */}
          <input
            type="text"
            className="output-field"
            value={toAmount}
            readOnly
          />

          {/* Exchange Rate */}
          <div className="exchange-rate">
            1 {fromCurrency} ≈ {formatExchangeRate()} {toCurrency}
          </div>

          {/* Confirm Button */}
          <button 
            className="confirm-button"
            onClick={() => setShowConfirmationModal(true)}
            disabled={!fromAmount || !hasSufficientBalance || fromCurrency === toCurrency || parseFloat(fromAmount) <= 0}
          >
            {i18n("pages.conversion.confirmExchange") || "Confirm exchange"}
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {selectModal && 
        <SuccessModalComponent
          isOpen={selectModal}
          onClose={handleCloseModal}
          type='convert'
          amount={Number(finalAmount).toFixed(8)}
          coinType={toCurrency} 
        />
      }

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="confirmation-modal-overlay">
          <div className="confirmation-modal">
            <div className="modal-header">
              <h3>{i18n("pages.conversion.confirmConversion") || "Confirm Conversion"}</h3>
              <button 
                className="close-btn"
                onClick={() => !isConverting && setShowConfirmationModal(false)}
              >
                <i className="fas fa-times" />
              </button>
            </div>

            <div className="modal-body">
              <div className="conversion-summary">
                <div className="from-amount">
                  <div className="amount">{parseFloat(fromAmount).toFixed(8)}</div>
                  <div className="currency">{fromCurrency}</div>
                </div>
                
                <div className="conversion-arrow">
                  <i className="fas fa-arrow-down" />
                </div>

                <div className="to-amount">
                  <div className="amount">{finalAmount.toFixed(8)}</div>
                  <div className="currency">{toCurrency}</div>
                </div>
              </div>

              <div className="conversion-details">
                <div className="detail-row">
                  <span>{i18n("pages.conversion.exchangeRate") || "Exchange Rate"}</span>
                  <span>1 {fromCurrency} = {formatExchangeRate()} {toCurrency}</span>
                </div>
                <div className="detail-row">
                  <span>{i18n("pages.conversion.networkFee") || "Network Fee"}</span>
                  <span>{conversionFee.toFixed(8)} {fromCurrency}</span>
                </div>
                <div className="detail-row">
                  <span>{i18n("pages.conversion.estimatedArrival") || "Estimated Arrival"}</span>
                  <span>{i18n("pages.conversion.arrivalTime") || "Instant"}</span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="confirm-btn"
                onClick={performConversion}
                disabled={isConverting}
              >
                {isConverting ? (
                  <>
                    <i className="fas fa-spinner fa-spin" />
                    {i18n("pages.conversion.processingConversion") || "Processing Conversion"}
                  </>
                ) : (
                  <>
                    <i className="fas fa-check-circle" />
                    {i18n("pages.conversion.confirmConversion") || "Confirm Conversion"}
                  </>
                )}
              </button>
              
              <button
                className="cancel-btn"
                onClick={() => setShowConfirmationModal(false)}
                disabled={isConverting}
              >
                {i18n("pages.conversion.cancel") || "Cancel"}
              </button>
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

        .remove_blue {
          color: white;
          text-decoration: none;
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

        /* Swap Container */
        .swap-container {
          padding: 20px;
          border-radius: 40px 40px 0 0;
          background: white;
          height: 100%;
          overflow-y: auto;
        }

        .swap-card {
          background: white;
          border-radius: 16px;
          padding: 20px;
          margin-top: 10px;
        }

        /* Section Headers */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .section-title {
          font-size: 12px;
          color: #666;
          font-weight: 500;
        }

        .available-balance {
          font-size: 12px;
          color: #999;
        }

        /* Custom Select Wrapper */
        .custom-select-wrapper {
          position: relative;
          margin-bottom: 12px;
        }

        /* Token Selector */
        .token-selector {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 15px;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: white;
          position: relative;
          z-index: 1;
        }

        .token-selector:hover {
          border-color: #106cf5;
          box-shadow: 0 2px 8px rgba(16, 108, 245, 0.1);
        }

        .token-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .token-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f9fa;
        }

        .coin-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .token-name {
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }

        .selector-arrow {
          color: #999;
          font-size: 12px;
          transition: transform 0.3s ease;
        }

        .selector-arrow.rotated {
          transform: rotate(180deg);
        }

        /* Custom Dropdown */
        .custom-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          margin-top: 4px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          z-index: 10;
          max-height: 300px;
          overflow-y: auto;
        }

        .dropdown-header {
          padding: 15px 20px;
          border-bottom: 1px solid #e7eaee;
          background: #f8f9fa;
        }

        .dropdown-title {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-bottom: 4px;
        }

        .dropdown-count {
          font-size: 12px;
          color: #888f99;
        }

        .dropdown-list {
          padding: 8px 0;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          padding: 12px 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          border-bottom: 1px solid #f5f5f5;
        }

        .dropdown-item:last-child {
          border-bottom: none;
        }

        .dropdown-item:hover {
          background-color: #f8f9fa;
        }

        .dropdown-item.selected {
          background-color: #e6f0ff;
        }

        .item-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 12px;
          flex-shrink: 0;
          background: #f8f9fa;
        }

        .item-info {
          flex: 1;
          min-width: 0;
        }

        .item-code {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-bottom: 2px;
        }

        .item-name {
          font-size: 12px;
          color: #888f99;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .item-balance {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-left: 10px;
        }

        /* Input Field */
        .input-group {
          position: relative;
          margin-bottom: 20px;
        }

        .input-field {
          width: 100%;
          padding: 16px;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          background: white;
          font-size: 12px;
          transition: border-color 0.3s ease;
        }

        .input-field:focus {
          outline: none;
          border-color: #106cf5;
        }

        .input-field::placeholder {
          color: #999;
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
          font-size: 14px;
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

        /* Output Field */
        .output-field {
          width: 100%;
          padding: 10px 15px;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          background: #f8f9fa;
          font-size: 16px;
          color: #333;
          text-align: right;
        }

        /* Swap Button */
        .swap-direction {
          display: flex;
          justify-content: center;
          margin: 10px 0;
        }

        .swap-button {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: white;
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .swap-button:hover {
          border-color: #106cf5;
          transform: rotate(180deg);
        }

        .swap-button i {
          color: #666;
          font-size: 16px;
        }

        /* Exchange Rate */
        .exchange-rate {
          text-align: center;
          margin: 20px 0;
          font-size: 14px;
          color: #666;
        }

        /* Confirm Button */
        .confirm-button {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          border: none;
          border-radius: 12px;
          padding: 16px 20px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          margin-top: 10px;
        }

        .confirm-button:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .confirm-button:disabled {
          background: #e0e0e0;
          color: #999;
          cursor: not-allowed;
          transform: none;
        }

        /* Confirmation Modal Styles */
        .confirmation-modal-overlay {
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
          padding: 20px;
        }

        .confirmation-modal {
          background: white;
          border-radius: 20px;
          width: 100%;
          max-width: 400px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          animation: modalSlideIn 0.3s ease;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-header {
          padding: 20px;
          border-bottom: 1px solid #e7eaee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h3 {
          font-size: 18px;
          color: #222;
          margin: 0;
        }

        .close-btn {
          background: none;
          border: none;
          color: #888f99;
          font-size: 20px;
          cursor: pointer;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: #f8f9fa;
          color: #222;
        }

        .modal-body {
          padding: 20px;
        }

        .conversion-summary {
          text-align: center;
          margin-bottom: 30px;
        }

        .from-amount, .to-amount {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 15px;
          margin: 10px 0;
        }

        .from-amount .amount,
        .to-amount .amount {
          font-size: 24px;
          font-weight: 700;
          color: #222;
        }

        .from-amount .currency,
        .to-amount .currency {
          font-size: 14px;
          color: #888f99;
          margin-top: 4px;
        }

        .conversion-arrow {
          color: #106cf5;
          font-size: 16px;
        }

        .conversion-details {
          border-top: 1px solid #e7eaee;
          padding-top: 20px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #f5f5f5;
        }

        .detail-row:last-child {
          border-bottom: none;
        }

        .detail-row span:first-child {
          color: #888f99;
          font-size: 14px;
        }

        .detail-row span:last-child {
          color: #222;
          font-weight: 500;
          font-size: 14px;
        }

        .modal-footer {
          padding: 20px;
          border-top: 1px solid #e7eaee;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .confirm-btn {
          padding: 16px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .confirm-btn:hover:not(:disabled) {
          background: #0a4fc4;
        }

        .confirm-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .cancel-btn {
          padding: 16px;
          background: transparent;
          color: #888f99;
          border: 1px solid #e7eaee;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cancel-btn:hover:not(:disabled) {
          background: #f8f9fa;
          color: #222;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .container {
            padding: 0;
          }

          .header,
          .swap-container {
            padding-left: 16px;
            padding-right: 16px;
          }

          .swap-card {
            padding: 16px;
          }

          .confirmation-modal {
            max-width: 100%;
          }

          .token-icon {
            width: 28px;
            height: 28px;
          }

          .token-name {
            font-size: 13px;
          }

          .dropdown-item {
            padding: 10px 16px;
          }

          .item-balance {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}

export default Conversion;