import axios from "axios";
import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { i18n } from "../../../i18n";

// Interface for Binance ticker data
interface BinanceTicker {
  s: string; // Symbol
  c: string; // Last price
  P: string; // Price change percent
  v: string; // Total traded base asset volume
  p: string; // Price change
  q: string; // Quote asset volume (USDT volume)
}

// Interface for cryptocurrency data
interface CryptoData {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  volume: string;
  volumeFormatted: string;
  isPositive: boolean;
  quoteVolume: number;
}

// Main Market Component
const Market: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<{ [key: string]: CryptoData }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const ws = useRef<WebSocket | null>(null);
  const dataFetchController = useRef<AbortController | null>(null);
  const isComponentMounted = useRef(true);

  // Specific list of pairs you want to display
  const targetPairs = useMemo(() => [
    "SHIBUSDT", "USDCUSDT", "DOGEUSDT", "TRXUSDT",
    "XRPUSDT", "ADAUSDT", "FILUSDT", "TONUSDT",
    "MATICUSDT", "DOTUSDT", "SOLUSDT", "TRUMPUSDT",
    "EOSUSDT", "LINKUSDT", "ZECUSDT", "DASHUSDT",
    "LTCUSDT", "ETHUSDT", "BCHUSDT", "BNBUSDT",
    "BTCUSDT", "XMRUSDT", "YFIUSDT"
  ], []);

  // Format volume helper
  const formatVolume = useCallback((volumeNum: number) => {
    if (volumeNum >= 1000000000) {
      return (volumeNum / 1000000000).toFixed(1) + "B";
    } else if (volumeNum >= 1000000) {
      return (volumeNum / 1000000).toFixed(1) + "M";
    }
    return volumeNum.toFixed(0);
  }, []);

  // Format price helper
  const formatPrice = useCallback((price: string) => {
    const priceNum = Number(price);
    if (isNaN(priceNum)) return "0.00";
    
    return priceNum.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: priceNum < 1 ? 6 : 4,
    });
  }, []);

  // Cancel pending requests
  const cancelPendingRequests = useCallback(() => {
    if (dataFetchController.current) {
      dataFetchController.current.abort();
      dataFetchController.current = null;
    }
  }, []);

  // Close WebSocket
  const closeWebSocket = useCallback(() => {
    if (ws.current) {
      try {
        ws.current.onclose = null;
        ws.current.close();
      } catch (error) {
        console.warn("Error closing WebSocket:", error);
      }
      ws.current = null;
    }
  }, []);

  // Fetch initial market data for specific pairs
  useEffect(() => {
    const fetchSpecificPrices = async () => {
      try {
        setIsLoading(true);
        
        // Cancel any existing requests
        cancelPendingRequests();
        dataFetchController.current = new AbortController();
        const signal = dataFetchController.current.signal;

        // Set timeout for API call
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('Request timeout')), 5000);
        });

        // Create symbols parameter for batch request
        const symbolsParam = targetPairs.map(symbol => `"${symbol}"`).join(',');
        const url = `https://api.binance.com/api/v3/ticker/24hr?symbols=[${symbolsParam}]`;

        const fetchPromise = axios.get(url, { signal });
        const response = await Promise.race([fetchPromise, timeoutPromise]);

        const formattedData: { [key: string]: CryptoData } = {};

        response.data.forEach((item: any) => {
          const symbol = item.symbol;
          const baseSymbol = symbol.replace("USDT", "");
          const isPositive = parseFloat(item.priceChangePercent) >= 0;
          const changePercent = Math.abs(Number(item.priceChangePercent)).toFixed(2);

          formattedData[symbol] = {
            symbol,
            name: `${baseSymbol}/USDT`,
            price: formatPrice(item.lastPrice),
            change: item.priceChange,
            changePercent: changePercent,
            volume: item.volume,
            volumeFormatted: formatVolume(Number(item.volume)),
            isPositive: isPositive,
            quoteVolume: parseFloat(item.quoteVolume),
          };
        });

        // Fill in any missing pairs with placeholder data
        targetPairs.forEach(symbol => {
          if (!formattedData[symbol]) {
            const baseSymbol = symbol.replace("USDT", "");
            formattedData[symbol] = {
              symbol,
              name: `${baseSymbol}/USDT`,
              price: "0.00",
              change: "0.00",
              changePercent: "0.00",
              volume: "0",
              volumeFormatted: "0",
              isPositive: true,
              quoteVolume: 0,
            };
          }
        });

        if (isComponentMounted.current) {
          setCryptoData(formattedData);
          setIsLoading(false);
        }
      } catch (error: any) {
        if (error.name === 'AbortError') {
          console.log('Request aborted');
          return;
        }
        console.error("Error fetching market data:", error);
        
        // Set fallback data
        const fallbackData: { [key: string]: CryptoData } = {};
        targetPairs.forEach(symbol => {
          const baseSymbol = symbol.replace("USDT", "");
          fallbackData[symbol] = {
            symbol,
            name: `${baseSymbol}/USDT`,
            price: "0.00",
            change: "0.00",
            changePercent: "0.00",
            volume: "0",
            volumeFormatted: "0",
            isPositive: true,
            quoteVolume: 0,
          };
        });

        if (isComponentMounted.current) {
          setCryptoData(fallbackData);
          setIsLoading(false);
        }
      }
    };

    fetchSpecificPrices();

    return () => {
      cancelPendingRequests();
    };
  }, [targetPairs, formatPrice, formatVolume, cancelPendingRequests]);

  // Setup optimized WebSocket for real-time updates
  useEffect(() => {
    isComponentMounted.current = true;

    const setupWebSocket = () => {
      try {
        // Create individual streams for better performance
        const streams = targetPairs.map(pair => `${pair.toLowerCase()}@ticker`).join('/');
        ws.current = new WebSocket(`wss://stream.binance.com:9443/ws/${streams}`);

        ws.current.onopen = () => {
          console.log("Market WebSocket connected");
        };

        ws.current.onmessage = (event) => {
          if (!isComponentMounted.current) return;

          try {
            const data = JSON.parse(event.data);
            
            // Handle both array (for multiple streams) and single object
            const updates = Array.isArray(data) ? data : [data];

            setCryptoData((prevData) => {
              const newData = { ...prevData };

              updates.forEach((ticker: BinanceTicker) => {
                if (targetPairs.includes(ticker.s) && newData[ticker.s]) {
                  const isPositive = parseFloat(ticker.P) >= 0;
                  const changePercent = Math.abs(Number(ticker.P)).toFixed(2);

                  newData[ticker.s] = {
                    ...newData[ticker.s],
                    price: formatPrice(ticker.c),
                    change: ticker.p,
                    changePercent: changePercent,
                    volume: ticker.v,
                    volumeFormatted: formatVolume(Number(ticker.v)),
                    isPositive: isPositive,
                    quoteVolume: parseFloat(ticker.q),
                  };
                }
              });

              return newData;
            });
          } catch (error) {
            console.error("Error parsing WebSocket data:", error);
          }
        };

        ws.current.onerror = (error) => {
          console.error("Market WebSocket error:", error);
        };

        ws.current.onclose = (event) => {
          console.log("Market WebSocket closed, code:", event.code);
          // Reconnect after delay if not normal closure
          if (event.code !== 1000 && isComponentMounted.current) {
            setTimeout(() => {
              if (isComponentMounted.current) {
                setupWebSocket();
              }
            }, 2000);
          }
        };
      } catch (error) {
        console.error("Error setting up WebSocket:", error);
      }
    };

    setupWebSocket();

    return () => {
      isComponentMounted.current = false;
      closeWebSocket();
    };
  }, [targetPairs, formatPrice, formatVolume, closeWebSocket]);

  // Filter cryptocurrencies based on search
  const filteredCrypto = useMemo(() => {
    const cryptoArray = Object.values(cryptoData);

    if (cryptoArray.length === 0) return [];

    let filtered = cryptoArray;

    // Apply search filter
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(searchTermLower) ||
          crypto.symbol.toLowerCase().includes(searchTermLower)
      );
    }

    // Return in the order of targetPairs
    return targetPairs
      .map(symbol => filtered.find(crypto => crypto.symbol === symbol))
      .filter(Boolean) as CryptoData[];
  }, [cryptoData, searchTerm, targetPairs]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  // Loading placeholder row
  const LoadingRow = useCallback(({ pair }: { pair: string }) => (
    <div className="table-row">
      <div className="pair-col">
        <div className="crypto-icon">
          {pair.replace("USDT", "").substring(0, 2)}
        </div>
        <span>{pair.replace("USDT", "")}/USDT</span>
      </div>
      <div className="price-col">
        <div className="crypto-price">...</div>
        <div className="usd-price">...</div>
      </div>
      <div className="change-col">
        <span className="change-positive">...</span>
      </div>
    </div>
  ), []);

  return (
    <div className="container" style={{ backgroundColor: "#106cf5" }}>
      {/* Header */}
      <div className="header">
        <div className="header-title">Blockchain</div>
        <div className="search-bar">
          <i className="fas fa-search" />
          <input
            type="text"
            placeholder="Search crypto..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button
              className="clear-search"
              onClick={clearSearch}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.8)',
                cursor: 'pointer',
                fontSize: '18px',
                padding: '0 5px'
              }}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div
        className="content"
        style={{
          borderRadius: "21px 21px 0 0",
          backgroundColor: "white",
          padding: "20px 16px 100px"
        }}
      >
        <div className="table-header">
          <div className="pair-col" style={{ fontSize: 12 }}>
            Trading Pair
          </div>
          <div className="price-col" style={{ fontSize: 12 }}>
            Latest Price
          </div>
          <div className="change-col" style={{ fontSize: 12 }}>
            24H Change
          </div>
        </div>

        {isLoading ? (
          // Loading state
          <div>
            {targetPairs.map((pair) => (
              <LoadingRow key={pair} pair={pair} />
            ))}
          </div>
        ) : filteredCrypto.length > 0 ? (
          // Real data from Binance API with images
          <>
            {filteredCrypto.map((crypto) => (
              <Link
                key={crypto.symbol}
                to={`/market/detail/${crypto.symbol}`}
                className="remove_blue"
              >
                <div className="table-row">
                  <div className="pair-col">
                    <div className="crypto-icon">
                      <img
                        src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${crypto.name.split("/")[0]}.png`}
                        style={{ width: 25, height: 25 }}
                        alt={crypto.name.split("/")[0]}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          // Show text fallback
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = crypto.name.split("/")[0].substring(0, 2);
                            parent.style.display = 'flex';
                            parent.style.alignItems = 'center';
                            parent.style.justifyContent = 'center';
                            parent.style.width = '32px';
                            parent.style.height = '32px';
                            parent.style.borderRadius = '50%';
                            parent.style.color= '#106cf5';
                            parent.style.fontSize = '14px';
                          }
                        }}
                      />
                    </div>
                    <span>{crypto.name}</span>
                  </div>
                  <div className="price-col">
                    <div className="crypto-price">${crypto.price}</div>
                    <div className="usd-price">${crypto.price}</div>
                  </div>
                  <div className="change-col">
                    <span className={crypto.isPositive ? "change-positive" : "change-negative"}>
                      {crypto.isPositive ? '+' : ''}{crypto.changePercent}%
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </>
        ) : (
          // No results
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#666',
            fontSize: '16px'
          }}>
            No cryptocurrencies found
          </div>
        )}
      </div>

      <style>{`
        .container {
          max-width: 400px;
          width: 100%;
          margin: 0 auto;
        }

        /* Header Styles */
        .header {
          background-color: #106cf5;
          color: white;
          padding: 10px 20px 20px;
          position: relative;
        }

        .header-title {
          text-align: center;
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .search-bar {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 25px;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          backdrop-filter: blur(10px);
        }

        .search-bar i {
          margin-right: 10px;
          color: rgba(255, 255, 255, 0.8);
        }

        .search-bar input {
          background: transparent;
          border: none;
          color: white;
          font-size: 12px;
          width: 100%;
          outline: none;
        }

        .search-bar input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        /* Main Content */
        .table-header {
          display: flex;
          color: #6c757d;
          font-size: 12px;
        }

        .table-row {
          display: flex;
          align-items: center;
          transition: background-color 0.2s;
          margin-top: 8px !important;
          border-radius: 8px;
        }

        .table-row:hover {
          background-color: #f8f9fa;
        }

        .pair-col {
          flex: 2;
          display: flex;
          align-items: center;
        }

        .price-col {
          flex: 2;
          text-align: right;
          margin-right: 15px;
        }

        .change-col {
          flex: 1;
          text-align: right;
        }

        .crypto-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          font-size: 14px;
          color: #106cf5;
          background: #f0f4ff;
          overflow: hidden;
        }

        .crypto-icon img {
          border-radius: 50%;
        }

        .crypto-price {
          font-size: 16px;
        }

        .usd-price {
          font-size: 12px;
          color: #6c757d;
          margin-top: 2px;
        }

        .change-positive {
          background-color: #37b66a;
          color: white;
          padding: 6px 10px;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 500;
          display: inline-block;
          min-width: 70px;
          text-align: center;
        }

        .change-negative {
          background-color: #e53858;
          color: white;
          padding: 6px 10px;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 500;
          display: inline-block;
          min-width: 70px;
          text-align: center;
        }

        .remove_blue {
          text-decoration: none;
          color: inherit;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .table-row {
            padding: 10px 12px;
          }

          .crypto-icon {
            width: 28px;
            height: 28px;
            margin-right: 10px;
          }

          .crypto-price {
            font-size: 14px;
          }
        }

        /* Animation for price updates */
        @keyframes highlightUpdate {
          0% {
            background-color: rgba(55, 182, 106, 0.1);
          }
          100% {
            background-color: transparent;
          }
        }

        .price-update {
          animation: highlightUpdate 1s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Market;