import axios from "axios";
import React, { useState, useEffect, useMemo, useRef } from "react";
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

  // Specific list of pairs you want to display
  const targetPairs = useMemo(() => [
    "SHIBUSDT", "USDCUSDT", "DOGEUSDT", "TRXUSDT",
    "XRPUSDT", "ADAUSDT", "FILUSDT", "TONUSDT",
    "MATICUSDT", "DOTUSDT", "SOLUSDT", "TRUMPUSDT",
    "EOSUSDT", "LINKUSDT", "ZECUSDT", "DASHUSDT",
    "LTCUSDT", "ETHUSDT", "BCHUSDT", "BNBUSDT",
    "BTCUSDT", "XMRUSDT", "YFIUSDT"
  ], []);

  // Fetch initial market data for specific pairs
  useEffect(() => {
    const fetchSpecificPrices = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://api.binance.com/api/v3/ticker/24hr"
        );

        const formattedData: { [key: string]: CryptoData } = {};

        response.data.forEach((item: any) => {
          if (targetPairs.includes(item.symbol)) {
            const symbol = item.symbol;
            const baseSymbol = symbol.replace("USDT", "");
            const isPositive = !item.priceChangePercent.startsWith("-");
            const changePercent = Math.abs(Number(item.priceChangePercent)).toFixed(2);

            // Format volume
            const volumeNum = Number(item.volume);
            let volumeFormatted = volumeNum.toFixed(0);
            if (volumeNum >= 1000000000) {
              volumeFormatted = (volumeNum / 1000000000).toFixed(1) + "B";
            } else if (volumeNum >= 1000000) {
              volumeFormatted = (volumeNum / 1000000).toFixed(1) + "M";
            }

            formattedData[symbol] = {
              symbol,
              name: `${baseSymbol}/USDT`,
              price: Number(item.lastPrice).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: Number(item.lastPrice) < 1 ? 6 : 4,
              }),
              change: item.priceChange,
              changePercent: changePercent,
              volume: item.volume,
              volumeFormatted: volumeFormatted,
              isPositive: isPositive,
              quoteVolume: parseFloat(item.quoteVolume),
            };
          }
        });

        setCryptoData(formattedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching market data:", error);
        setIsLoading(false);
      }
    };

    fetchSpecificPrices();
  }, [targetPairs]);

  // Setup WebSocket for real-time updates for specific pairs
  useEffect(() => {
    // Create WebSocket connection for all tickers (we'll filter for our pairs)
    ws.current = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

    ws.current.onmessage = (event) => {
      const data: BinanceTicker[] = JSON.parse(event.data);

      // Update crypto data with real-time information only for our pairs
      setCryptoData((prevData) => {
        const newData = { ...prevData };

        data.forEach((ticker) => {
          if (targetPairs.includes(ticker.s) && newData[ticker.s]) {
            const isPositive = !ticker.P.startsWith("-");
            const changePercent = Math.abs(Number(ticker.P)).toFixed(2);

            // Format volume
            const volumeNum = Number(ticker.v);
            let volumeFormatted = volumeNum.toFixed(0);
            if (volumeNum >= 1000000000) {
              volumeFormatted = (volumeNum / 1000000000).toFixed(1) + "B";
            } else if (volumeNum >= 1000000) {
              volumeFormatted = (volumeNum / 1000000).toFixed(1) + "M";
            }

            newData[ticker.s] = {
              ...newData[ticker.s],
              price: Number(ticker.c).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: Number(ticker.c) < 1 ? 6 : 4,
              }),
              change: ticker.p,
              changePercent: changePercent,
              volume: ticker.v,
              volumeFormatted: volumeFormatted,
              isPositive: isPositive,
              quoteVolume: parseFloat(ticker.q),
            };
          }
        });

        return newData;
      });
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [targetPairs]);

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
              onClick={() => setSearchTerm("")}
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
          padding: "20px 16px 0"
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
              <div key={pair} className="table-row">
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
                            parent.style.color = '#106cf5';
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

             container {
            max-width: 400px;
            width: 100%;
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
            /* border-bottom: 1px solid #f1f3f4; */
            align-items: center;
            transition: background-color 0.2s;
            margin-top:8px !important ;


        }
        .table-row:last-child {
            border-bottom: none;
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
            border-radius: 0px;
            font-size: 13px;
          
            display: inline-block;
            min-width: 70px;
            text-align: center;
        }

        .change-negative {
            background-color: #e53858;
            color: white;
            padding: 6px 10px;
            border-radius: 0px;
            font-size: 13px;
          
            display: inline-block;
            min-width: 70px;
            text-align: center;
        }

        /* Navigation Bar */
        .nav-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            display: flex;
            justify-content: space-around;
            padding: 12px 0;
            background-color: #f5f5f5;
            z-index: 100;
            max-width: 400px;
            margin: 0 auto;
            border-radius: 30px 30px 0 0;
        }

        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #8e8e93;
            font-size: 12px;
            transition: color 0.2s;
        }

        .nav-item.active {
            color: #106cf5;
        }

        .nav-icon {
            font-size: 20px;
            margin-bottom: 4px;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {


            .table-row {
                padding: 14px 15px;
            }

            .crypto-icon {
                width: 28px;
                height: 28px;
                margin-right: 10px;
            }
        }

        /* Animation for price changes */
        @keyframes pulseGreen {
            0% {
                background-color: #37b66a;
            }

            50% {
                background-color: #2da15a;
            }

            100% {
                background-color: #37b66a;
            }
        }

        @keyframes pulseRed {
            0% {
                background-color: #e53858;
            }

            50% {
                background-color: #d32f4e;
            }

            100% {
                background-color: #e53858;
            }
        }

        .price-update {
            animation-duration: 1s;
            animation-iteration-count: 1;
        }
      `}</style>
    </div>
  );
};

export default Market;