import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import assetsListSelectors from "src/modules/assets/list/assetsListSelectors";
import assetsFormAction from "src/modules/assets/form/assetsFormActions";
import authSelectors from "src/modules/auth/authSelectors";
import assetsActions from "src/modules/assets/list/assetsListActions";
import selector from "src/modules/assets/form/assetsFormSelectors";
import SuccessModalComponent from "src/view/shared/modals/sucessModal";
import { i18n } from "../../../i18n";

// Interface for Binance ticker data
interface BinanceTicker {
  s: string; // Symbol
  c: string; // Last price
  P: string; // Price change percent
  v: string; // Volume
  p: string; // Price change
  q: string; // Quote volume (USDT volume)
}

function Conversion() {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const [fromCurrency, setFromCurrency] = useState("USDT");
  const [toCurrency, setToCurrency] = useState("BTC");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("0.0");
  const [conversionRate, setConversionRate] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isConverting, setIsConverting] = useState(false);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [conversionFee, setConversionFee] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [prices, setPrices] = useState<{ [key: string]: number }>({});
  const [conversionSuccessData, setConversionSuccessData] = useState({
    amount: "0",
    coinType: "USDT"
  });
  const selectModal = useSelector(selector.selectModal);
  const assetsBalance = useSelector(assetsListSelectors.selectRows);
  const ws = useRef<WebSocket | null>(null);
  const fromDropdownRef = useRef<HTMLDivElement>(null);
  const toDropdownRef = useRef<HTMLDivElement>(null);

  // List of allowed coins (11 coins as specified) with Binance symbols
  const allowedCoins = [
    { code: "USDT", name: "Tether USD", color: "#26A17B", symbol: "USDT", binanceSymbol: "USDTUSDT" },
    { code: "ETH", name: "Ethereum", color: "#627EEA", symbol: "ETH", binanceSymbol: "ETHUSDT" },
    { code: "BTC", name: "Bitcoin", color: "#F7931A", symbol: "BTC", binanceSymbol: "BTCUSDT" },
    { code: "USDC", name: "USD Coin", color: "#2775CA", symbol: "USDC", binanceSymbol: "USDCUSDT" },
    { code: "DAI", name: "Dai", color: "#F4B731", symbol: "DAI", binanceSymbol: "DAIUSDT" },
    { code: "SHIB", name: "Shiba Inu", color: "#FFC107", symbol: "SHIB", binanceSymbol: "SHIBUSDT" },
    { code: "XRP", name: "Ripple", color: "#23292F", symbol: "XRP", binanceSymbol: "XRPUSDT" },
    { code: "TRX", name: "TRON", color: "#FF001A", symbol: "TRX", binanceSymbol: "TRXUSDT" },
    { code: "SOL", name: "Solana", color: "#00FFA3", symbol: "SOL", binanceSymbol: "SOLUSDT" },
    { code: "BNB", name: "Binance Coin", color: "#F0B90B", symbol: "BNB", binanceSymbol: "BNBUSDT" },
    { code: "DOGE", name: "Dogecoin", color: "#C2A633", symbol: "DOGE", binanceSymbol: "DOGEUSDT" }
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

  // Handle Redux success modal
  useEffect(() => {
    if (selectModal && conversionSuccessData.amount !== "0") {
      // Show success modal when Redux modal is open and we have conversion data
      setShowSuccessModal(true);
    }
  }, [selectModal, conversionSuccessData]);

  // Fetch assets and initial prices from Binance
  useEffect(() => {
    dispatch(assetsActions.doFetch());
    
    const fetchInitialPrices = async () => {
      setIsLoading(true);
      try {
        // First, get prices for all 11 coins from Binance
        const response = await axios.get("https://api.binance.com/api/v3/ticker/24hr");
        
        const initialPrices: { [key: string]: number } = { USDT: 1 };
        
        allowedCoins.forEach(coin => {
          if (coin.code === "USDT") return;
          
          const coinData = response.data.find((item: any) => 
            item.symbol === coin.binanceSymbol
          );
          
          if (coinData) {
            initialPrices[coin.code] = parseFloat(coinData.lastPrice);
          } else {
            // Fallback price if not found
            const fallbackPrices: { [key: string]: number } = {
              ETH: 3000,
              BTC: 45000,
              USDC: 1,
              DAI: 1,
              SHIB: 0.00002,
              XRP: 0.6,
              TRX: 0.1,
              SOL: 100,
              BNB: 350,
              DOGE: 0.08
            };
            initialPrices[coin.code] = fallbackPrices[coin.code] || 1;
          }
        });

        setPrices(initialPrices);
        setIsLoading(false);
        
        // Set up WebSocket for real-time updates
        setupWebSocket();
        
      } catch (error) {
        console.error("Error fetching initial prices:", error);
        setIsLoading(false);
        // Set fallback prices
        const fallbackPrices: { [key: string]: number } = {
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
        setPrices(fallbackPrices);
      }
    };

    fetchInitialPrices();

    // Cleanup WebSocket on unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [dispatch]);

  // Set up WebSocket for real-time price updates
  const setupWebSocket = () => {
    // Create streams for all coins except USDT
    const streams = allowedCoins
      .filter(coin => coin.code !== "USDT")
      .map(coin => `${coin.symbol.toLowerCase()}usdt@ticker`)
      .join('/');
    
    const wsUrl = `wss://stream.binance.com:9443/stream?streams=${streams}`;
    
    try {
      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        console.log('WebSocket connected for price updates');
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.stream && data.data) {
          const symbol = data.data.s; // e.g., "BTCUSDT"
          const price = parseFloat(data.data.c); // Last price
          
          // Extract coin code from symbol (remove USDT)
          const coinCode = symbol.replace("USDT", "");
          
          setPrices(prev => ({
            ...prev,
            [coinCode]: price
          }));
        }
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.current.onclose = () => {
        console.log('WebSocket disconnected, attempting to reconnect...');
        setTimeout(setupWebSocket, 3000);
      };
    } catch (error) {
      console.error('Error setting up WebSocket:', error);
    }
  };

  // Get coin info
  const getCoinInfo = (code: string) => {
    return allowedCoins.find(coin => coin.code === code) || allowedCoins[0];
  };

  // Calculate conversion
  const calculateConversion = useCallback(() => {
    const fromPrice = prices[fromCurrency] || 1;
    const toPrice = prices[toCurrency] || 1;
    
    if (fromPrice && toPrice && fromPrice > 0 && toPrice > 0) {
      const rate = fromPrice / toPrice;
      setConversionRate(rate);
      
      if (fromAmount) {
        const amount = parseFloat(fromAmount);
        if (!isNaN(amount) && amount > 0) {
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
    setShowSuccessModal(false);
    setConversionSuccessData({ amount: "0", coinType: "USDT" });
    dispatch(assetsActions.doFetch());
  };

  const performConversion = () => {
    if (!hasSufficientBalance) return;
    setIsConverting(true);

    // Store conversion data for success modal
    const convertedAmount = finalAmount.toFixed(8);
    const convertedCoinType = toCurrency;
    
    setConversionSuccessData({
      amount: convertedAmount,
      coinType: convertedCoinType
    });

    setTimeout(() => {
      const values = {
        user: currentUser.id,
        fromSymbol: fromCurrency,
        fromAmount: parseFloat(fromAmount),
        toSymbol: toCurrency,
        coinName: toCurrency,
        toAmount: convertedAmount,
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

      // Success modal will be shown by Redux or local state
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
    if (!conversionRate || conversionRate <= 0) return "0.00000000";
    
    if (conversionRate < 0.0001) {
      return conversionRate.toFixed(12);
    } else if (conversionRate < 1) {
      return conversionRate.toFixed(8);
    } else if (conversionRate < 100) {
      return conversionRate.toFixed(4);
    } else {
      return conversionRate.toFixed(2);
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
    return `https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${code}.png`;
  };

  // Format price for display
  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else if (price >= 1) {
      return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
    } else if (price >= 0.01) {
      return price.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 6 });
    } else {
      return price.toLocaleString('en-US', { minimumFractionDigits: 8, maximumFractionDigits: 12 });
    }
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
                          src={getCoinImage(coin.code)}
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
                      <div className="item-price">
                        ${prices[coin.code] ? formatPrice(prices[coin.code]) : '0.00'}
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

          {/* Price Display */}
          <div className="price-display">
            {prices[fromCurrency] ? (
              <>
                1 {fromCurrency} = ${formatPrice(prices[fromCurrency])}
                <span className="price-update-indicator">
                  <i className="fas fa-circle" />
                </span>
              </>
            ) : (
              <div className="price-loading">
                <i className="fas fa-spinner fa-spin" /> Loading price...
              </div>
            )}
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
                          src={getCoinImage(coin.code)}
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
                      <div className="item-price">
                        ${prices[coin.code] ? formatPrice(prices[coin.code]) : '0.00'}
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

          {/* Price Display */}
          <div className="price-display">
            {prices[toCurrency] ? (
              <>
                1 {toCurrency} = ${formatPrice(prices[toCurrency])}
                <span className="price-update-indicator">
                  <i className="fas fa-circle" />
                </span>
              </>
            ) : (
              <div className="price-loading">
                <i className="fas fa-spinner fa-spin" /> Loading price...
              </div>
            )}
          </div>

          {/* Exchange Rate */}
          <div className="exchange-rate">
            1 {fromCurrency} ≈ {formatExchangeRate()} {toCurrency}
          </div>

          {/* Real-time indicator */}
          <div className="realtime-indicator">
            <i className="fas fa-sync-alt" /> Real-time prices from Binance
          </div>

          {/* Confirm Button */}
          <button 
            className="confirm-button"
            onClick={() => setShowConfirmationModal(true)}
            disabled={isLoading || !fromAmount || !hasSufficientBalance || fromCurrency === toCurrency || parseFloat(fromAmount) <= 0}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin" /> Loading prices...
              </>
            ) : fromCurrency === toCurrency ? (
              i18n("pages.conversion.selectDifferentCurrencies") || "Select different currencies"
            ) : !hasSufficientBalance ? (
              i18n("pages.conversion.insufficientBalance") || "Insufficient balance"
            ) : (
              i18n("pages.conversion.confirmExchange") || "Confirm exchange"
            )}
          </button>
        </div>
      </div>

      {/* Success Modal - Using local state with stored conversion data */}
      {showSuccessModal && (
        <SuccessModalComponent
          isOpen={showSuccessModal}
          onClose={handleCloseModal}
          type='convert'
          amount={conversionSuccessData.amount}
          coinType={conversionSuccessData.coinType} 
        />
      )}

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
                  <span>{i18n("pages.conversion.currentPrice") || "Current Price"}</span>
                  <span>1 {fromCurrency} = ${prices[fromCurrency] ? formatPrice(prices[fromCurrency]) : '0.00'}</span>
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

      {/* CSS Styles (keep all your existing styles) */}
      <style>{`
        /* Add these new styles to your existing CSS */
        
        .price-display {
          font-size: 12px;
          color: #888f99;
          text-align: center;
          margin: 10px 0 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .price-update-indicator {
          color: #2ff378;
          font-size: 8px;
          animation: pricePulse 2s infinite;
        }
        
        @keyframes pricePulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        .price-loading {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #106cf5;
        }
        
        .realtime-indicator {
          text-align: center;
          color: #888f99;
          font-size: 11px;
          margin: 15px 0 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        
        .realtime-indicator i {
          color: #106cf5;
          font-size: 10px;
        }
        
        .item-price {
          font-size: 12px;
          font-weight: 600;
          color: #106cf5;
          margin-left: 10px;
          text-align: right;
          min-width: 80px;
        }
        
        /* Existing styles remain the same, just adding the new ones above */
        
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
          z-index: 2;
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
          margin-bottom: 10px;
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
          margin: 20px 0;
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
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16, 108, 245, 0.3);
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

          .item-price {
            font-size: 11px;
            min-width: 70px;
          }
        }
      `}</style>
    </div>
  );
}

export default Conversion;