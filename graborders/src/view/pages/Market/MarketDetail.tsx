import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import axios from "axios";
import FuturesChart from "../Futures/FuturesChart";
import { i18n } from "../../../i18n";

// Interface for Binance trade data
interface BinanceTrade {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  t: number; // Trade ID
  p: string; // Price
  q: string; // Quantity
  T: number; // Trade time
  m: boolean; // Is buyer market maker?
}

// Interface for Binance ticker data
interface BinanceTicker {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  c: string; // Last price
  o: string; // Open price
  h: string; // High price
  l: string; // Low price
  v: string; // Total traded base asset volume
  q: string; // Total traded quote asset volume
  P: string; // Price change percent
}

// Interface for Binance order book data
interface BinanceOrderBook {
  lastUpdateId: number;
  bids: [string, string][]; // [price, quantity]
  asks: [string, string][];
}

function MarketDetail() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [marketPrice, setMarketPrice] = useState<string | null>(null);
  const [priceChangePercent, setPriceChangePercent] = useState<string | null>(null);
  const [highPrice, setHighPrice] = useState<string | null>(null);
  const [lowPrice, setLowPrice] = useState<string | null>(null);
  const [volume, setVolume] = useState<string | null>(null);
  const [quoteVolume, setQuoteVolume] = useState<string | null>(null);
  const [recentTrades, setRecentTrades] = useState<BinanceTrade[]>([]);
  const [orderBook, setOrderBook] = useState<BinanceOrderBook | null>(null);
  const [selectedCoin, setSelectedCoin] = useState(id || "BTCUSDT");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orderBook' | 'transactions'>('orderBook');

  const tradeWs = useRef<WebSocket | null>(null);
  const tickerWs = useRef<WebSocket | null>(null);
  const depthWs = useRef<WebSocket | null>(null);

  // Format number with commas and fixed decimals
  const formatNumber = useCallback((num: string, decimals: number = 4) => {
    return Number(num).toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }, []);

  // Format volume in billions/millions
  const formatVolume = useCallback((vol: string) => {
    const volumeNum = Number(vol);
    if (volumeNum >= 1000000000) {
      return (volumeNum / 1000000000).toFixed(2) + "B";
    } else if (volumeNum >= 1000000) {
      return (volumeNum / 1000000).toFixed(2) + "M";
    } else if (volumeNum >= 1000) {
      return (volumeNum / 1000).toFixed(2) + "K";
    } else {
      return volumeNum.toFixed(2);
    }
  }, []);

  // Fetch initial data via REST API before WebSocket connects
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const [tickerResponse, tradesResponse, orderBookResponse] = await Promise.all([
          axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${selectedCoin}`),
          axios.get(`https://api.binance.com/api/v3/trades?symbol=${selectedCoin}&limit=20`),
          axios.get(`https://api.binance.com/api/v3/depth?symbol=${selectedCoin}&limit=10`)
        ]);
        
        // Set initial data from REST API
        const tickerData = tickerResponse.data;
        setMarketPrice(tickerData.lastPrice);
        setPriceChangePercent(tickerData.priceChangePercent);
        setHighPrice(tickerData.highPrice);
        setLowPrice(tickerData.lowPrice);
        setVolume(tickerData.volume);
        setQuoteVolume(tickerData.quoteVolume);
        
        // Set initial trades
        setRecentTrades(tradesResponse.data.slice(0, 10));
        
        // Set initial order book
        setOrderBook(orderBookResponse.data);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [selectedCoin]);

  // WebSocket connection management
  useEffect(() => {
    if (!selectedCoin) return;

    const connectTickerWebSocket = () => {
      if (tickerWs.current?.readyState === WebSocket.OPEN) {
        tickerWs.current.close();
      }

      tickerWs.current = new WebSocket(
        `wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@ticker`
      );

      tickerWs.current.onmessage = (event: MessageEvent) => {
        const tickerData: BinanceTicker = JSON.parse(event.data);
        setMarketPrice(tickerData.c);
        setPriceChangePercent(tickerData.P);
        setHighPrice(tickerData.h);
        setLowPrice(tickerData.l);
        setVolume(tickerData.v);
        setQuoteVolume(tickerData.q);
      };

      tickerWs.current.onclose = () => {
        setTimeout(() => {
          if (selectedCoin) {
            connectTickerWebSocket();
          }
        }, 2000);
      };
    };

    const connectTradeWebSocket = () => {
      if (tradeWs.current?.readyState === WebSocket.OPEN) {
        tradeWs.current.close();
      }

      tradeWs.current = new WebSocket(
        `wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@trade`
      );

      tradeWs.current.onmessage = (event: MessageEvent) => {
        const tradeData: BinanceTrade = JSON.parse(event.data);
        setRecentTrades((prevTrades) => {
          const newTrades = [tradeData, ...prevTrades.slice(0, 19)];
          return newTrades;
        });
      };

      tradeWs.current.onclose = () => {
        setTimeout(() => {
          if (selectedCoin) {
            connectTradeWebSocket();
          }
        }, 2000);
      };
    };

    const connectDepthWebSocket = () => {
      if (depthWs.current?.readyState === WebSocket.OPEN) {
        depthWs.current.close();
      }

      depthWs.current = new WebSocket(
        `wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@depth`
      );

      depthWs.current.onmessage = (event: MessageEvent) => {
        const depthData = JSON.parse(event.data);
        setOrderBook(prev => {
          if (!prev) return null;
          return {
            lastUpdateId: depthData.u,
            bids: depthData.b && depthData.b.length > 0 ? depthData.b : prev.bids,
            asks: depthData.a && depthData.a.length > 0 ? depthData.a : prev.asks
          };
        });
      };

      depthWs.current.onclose = () => {
        setTimeout(() => {
          if (selectedCoin) {
            connectDepthWebSocket();
          }
        }, 2000);
      };
    };

    connectTickerWebSocket();
    connectTradeWebSocket();
    connectDepthWebSocket();

    return () => {
      if (tickerWs.current?.readyState === WebSocket.OPEN) {
        tickerWs.current.close();
      }
      if (tradeWs.current?.readyState === WebSocket.OPEN) {
        tradeWs.current.close();
      }
      if (depthWs.current?.readyState === WebSocket.OPEN) {
        depthWs.current.close();
      }
    };
  }, [selectedCoin]);

  useEffect(() => {
    if (id && id !== selectedCoin) {
      setSelectedCoin(id);
    }
  }, [id, selectedCoin]);

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  // Loading placeholder component
  const LoadingPlaceholder = useCallback(({ width = "100%", height = "1em" }: { width?: string, height?: string }) => (
    <div 
      className="loading-placeholder" 
      style={{ width, height }}
    />
  ), []);

  // Memoized order book data with heat map intensities
  const orderBookData = useMemo(() => {
    if (!orderBook) return { buySide: [], sellSide: [] };

    const calculateIntensity = (orders: [string, string][], isBid: boolean) => {
      if (orders.length === 0) return [];
      
      const quantities = orders.map(order => Number(order[1]));
      const maxQuantity = Math.max(...quantities);
      const minQuantity = Math.min(...quantities);
      
      return orders.map((order, index) => {
        const quantity = Number(order[1]);
        let intensity = 0;
        
        if (maxQuantity > minQuantity) {
          intensity = ((quantity - minQuantity) / (maxQuantity - minQuantity)) * 100;
        }
        
        // Ensure minimum intensity for visibility
        intensity = Math.max(intensity, 20);
        
        return {
          amount: formatVolume(order[1]),
          price: formatNumber(order[0]),
          intensity: Math.min(intensity, 95)
        };
      });
    };

    const buySide = calculateIntensity(orderBook.bids.slice(0, 10), true);
    const sellSide = calculateIntensity(orderBook.asks.slice(0, 10), false);

    return { buySide, sellSide };
  }, [orderBook, formatNumber, formatVolume]);

  return (
    <div className="market-detail-container">
      {/* Header Section */}
      <div className="header">
        <div className="nav-bar">
          <div className="back-arrow" onClick={goBack}>
            <i className="fas fa-arrow-left"></i>
          </div>
          <div className="trading-pair">
            {selectedCoin.replace("USDT", "")} / USDT
          </div>
          <div className="header-icon">
            <i className="fas fa-info-circle"></i>
          </div>
        </div>
      </div>

      {/* Price Section */}
      <div className="price-section">
        <div className="price-main-row">
          <div className="price-left-section">
            <div className="current-price">
              {marketPrice !== null ? (
                <span style={{ 
                  color: priceChangePercent && parseFloat(priceChangePercent) < 0 ? '#f56c6c' : '#37b66a' 
                }}>
                  {formatNumber(marketPrice)}
                </span>
              ) : (
                <LoadingPlaceholder width="120px" height="28px" />
              )}
            </div>
            <div className="price-info-row">
              <div className="usd-price">
                {marketPrice !== null ? `$${Number(marketPrice).toFixed(2)}` : '$0.00'}
              </div>
              <div className="price-change" style={{
                color: priceChangePercent && parseFloat(priceChangePercent) < 0 ? '#f56c6c' : '#37b66a'
              }}>
                {priceChangePercent !== null ? (
                  `${parseFloat(priceChangePercent) < 0 ? '−' : '+'}${Math.abs(parseFloat(priceChangePercent)).toFixed(2)}%`
                ) : (
                  <LoadingPlaceholder width="60px" height="16px" />
                )}
              </div>
            </div>
          </div>
          
          <div className="stats-grid">
            <div className="stat-row">
              <div className="stat-item">
                <div className="stat-label">24H High</div>
                <div className="stat-value">
                  {highPrice !== null ? formatNumber(highPrice) : <LoadingPlaceholder width="60px" height="12px" />}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-label">24H Volume({selectedCoin.replace("USDT", "")})</div>
                <div className="stat-value">
                  {volume !== null ? formatVolume(volume) : <LoadingPlaceholder width="60px" height="12px" />}
                </div>
              </div>
            </div>
            <div className="stat-row">
              <div className="stat-item">
                <div className="stat-label">24H Low</div>
                <div className="stat-value">
                  {lowPrice !== null ? formatNumber(lowPrice) : <LoadingPlaceholder width="60px" height="12px" />}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-label">24H Volume(USDT)</div>
                <div className="stat-value">
                  {quoteVolume !== null ? formatVolume(quoteVolume) : <LoadingPlaceholder width="60px" height="12px" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-section">
        <FuturesChart symbol={selectedCoin} />
      </div>

      {/* Tabs Section */}
      <div className="tabs-section">
        <div className="tabs-header">
          <div 
            className={`tab ${activeTab === 'orderBook' ? 'active' : ''}`}
            onClick={() => setActiveTab('orderBook')}
          >
            Order
          </div>
          <div 
            className={`tab ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            Last transaction
          </div>
        </div>

        <div className="tab-content">
          {/* Order Book Content */}
          {activeTab === 'orderBook' && (
            <div className="modern-order-book">
              <div className="order-book-table">
                <div className="table-header">
                  <div className="buy-section">
                    <div className="column-header">Buy</div>
                    <div className="column-header">Quantity</div>
                    <div className="column-header">Price (usdt)</div>
                  </div>
                  <div className="sell-section">
                    <div className="column-header">Price (usdt)</div>
                    <div className="column-header">Quantity</div>
                    <div className="column-header" style={{textAlign:'right'}}>Sell</div>
                  </div>
                </div>

                <div className="table-body">
                  {orderBookData.buySide.length > 0 ? (
                    orderBookData.buySide.map((buyOrder, index) => {
                      const sellOrder = orderBookData.sellSide[index] || { amount: '0', price: '0', intensity: 0 };
                      return (
                        <div key={index} className="table-row">
                          <div className="buy-section">
                            <div className="cell buy-cell">{index + 1}</div>
                            <div className="cell quantity">{buyOrder.amount}</div>
                            <div className="cell price-cell">
                              <div 
                                className="heatmap-bar buy-heatmap"
                                style={{ width: `${buyOrder.intensity}%` }}
                              ></div>
                              <span className="price-value buy-price">{buyOrder.price}</span>
                            </div>
                          </div>
                          <div className="sell-section">
                            <div className="cell price-cell">
                              <div 
                                className="heatmap-bar sell-heatmap"
                                style={{ width: `${sellOrder.intensity}%` }}
                              ></div>
                              <span className="price-value sell-price">{sellOrder.price}</span>
                            </div>
                            <div className="cell quantity">{sellOrder.amount}</div>
                            <div className="cell sell-cell">{index + 1}</div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    Array.from({ length: 10 }).map((_, index) => (
                      <div key={index} className="table-row">
                        <div className="buy-section">
                          <div className="cell buy-cell">
                            <LoadingPlaceholder width="20px" height="12px" />
                          </div>
                          <div className="cell quantity">
                            <LoadingPlaceholder width="40px" height="12px" />
                          </div>
                          <div className="cell price-cell">
                            <LoadingPlaceholder width="50px" height="12px" />
                          </div>
                        </div>
                        <div className="sell-section">
                          <div className="cell price-cell">
                            <LoadingPlaceholder width="50px" height="12px" />
                          </div>
                          <div className="cell quantity">
                            <LoadingPlaceholder width="40px" height="12px" />
                          </div>
                          <div className="cell sell-cell">
                            <LoadingPlaceholder width="20px" height="12px" />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Latest Transactions Content */}
          {activeTab === 'transactions' && (
            <div className="transactions-container">
              <div className="transactions-header">
                <div className="header-item">Time</div>
                <div className="header-item">Price</div>
                <div className="header-item">Quantity</div>
              </div>
              <div className="transactions-list">
                {recentTrades.length > 0 ? (
                  recentTrades.slice(0, 10).map((trade, index) => (
                    <div key={`${trade.t}-${trade.T}-${index}`} className="transaction-item">
                      <div className="transaction-time">
                        {new Date(trade.T).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </div>
                      <div className={`transaction-price ${trade.m ? 'sell' : 'buy'}`}>
                        {formatNumber(trade.p)}
                      </div>
                      <div className="transaction-amount">{Number(trade.q).toFixed(4)}</div>
                    </div>
                  ))
                ) : (
                  Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className="transaction-item">
                      <div className="transaction-time">
                        <LoadingPlaceholder width="50px" height="14px" />
                      </div>
                      <div className="transaction-price">
                        <LoadingPlaceholder width="60px" height="14px" />
                      </div>
                      <div className="transaction-amount">
                        <LoadingPlaceholder width="50px" height="14px" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .market-detail-container {
          max-width: 400px;
          margin: 0 auto;
          height: 100dvh;
          position: relative;
          background: #f2f4f7;
        }

        /* Header Section */
        .header {
          padding: 15px 20px;
          color: #000;
          position: sticky;
          top: 0;
          z-index: 100;
          background: #f2f4f7;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-arrow {
          font-size: 18px;
          font-weight: 300;
          cursor: pointer;
        }

        .trading-pair {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
        
        }

        .header-icon {
          font-size: 16px;
          cursor: pointer;
        }

        /* Price Section */
        .price-section {
          padding: 20px;
          background: white;
          border-bottom: 1px solid #e9ecef;
          border-radius: 40px 40px 0 0;
        }

        .price-main-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
        }

        .price-left-section {
          flex: 1;
        }

        .current-price {
          font-size: 1.75rem;
        font-weight: 600;
          line-height: 1.75rem;
          margin-bottom: 8px;
        }

        .price-info-row {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
        }

        .usd-price {
          color: #6c757d;
        }

        .price-change {
        
        }

        /* Stats Grid */
        .stats-grid {
          display: flex;
          gap: 8px;
          min-width: 140px;
        }

        .stat-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 12px;
        }

        .stat-label {
          color: #6c757d;
          white-space: nowrap;
        }

        .stat-value {
          color: #333;
          font-weight: 500;
          white-space: nowrap;
        }

        /* Chart Section */
        .chart-section {
          background: white;
          border-bottom: 1px solid #e9ecef;
        }

        /* Tabs Section */
        .tabs-section {
          background: white;
        }

        .tabs-header {
          display: flex;
          border-bottom: 1px solid #eef2f6;
          background: white;
        }

        .tab {
          flex: 1;
          padding: 16px;
          text-align: center;
          font-size: 14px;
          font-weight: 500;
          color: #6c757d;
          cursor: pointer;
          transition: all 0.2s ease;
          border-bottom: 2px solid transparent;
        }

        .tab.active {
          color: #106cf5;
          border-bottom: 2px solid #106cf5;
          background: linear-gradient(to bottom, #f8fbff, #ffffff);
        }

        .tab-content {
          padding: 0;
          min-height: 400px;
          max-height: 500px;
          overflow: hidden;
        }

        /* Modern Order Book */
        .modern-order-book {
          background: white;
          border-radius: 12px;
          overflow: hidden;
        }

        .order-book-table {
          display: flex;
          flex-direction: column;
          background: white;
        }

        .table-header {
          display: flex;
          background: #f8fbff;
          border-bottom: 1px solid #eef2f6;
          font-size: 12px !important;
          padding: 8px 5px;
          color: #6c757d;
        }

        .buy-section, .sell-section {
          display: flex;
          justify-content: space-between;
        }

        .column-header {
          text-align: center;
        }

        .buy-section .column-header:first-child,
        .sell-section .column-header:last-child {
          text-align: left;
          flex: 0.8;
        }

        .buy-section .column-header:last-child,
        .sell-section .column-header:first-child {
          flex: 1.2;
        }

        .table-body {
          display: flex;
          flex-direction: column;
          max-height: 360px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #cbd5e0 #f7fafc;
        }

        .table-body::-webkit-scrollbar {
          width: 6px;
        }

        .table-body::-webkit-scrollbar-track {
          background: #f7fafc;
          border-radius: 3px;
        }

        .table-body::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 3px;
        }

        .table-body::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }

        .table-row {
          display: flex;
          border-bottom: 1px solid #f1f5f9;
          font-size: 12px;
          color: #2d3748;
          transition: background-color 0.15s ease;
        }

        .table-row:hover {
          background: #fafbfc;
        }

        .buy-section, .sell-section {
          display: flex;
          flex: 1;
          align-items: center;
        }

        .cell {
          flex: 1;
          text-align: center;
          padding: 0 4px;
          position: relative;
          z-index: 1;
        }

        .buy-cell, .sell-cell {
          flex: 0.8;
          font-size: 11px;
          text-align: left;
          border-radius: 4px;
        }

        .buy-cell {
        }

        .sell-cell {
          text-align: right;
        }

        .quantity {
          color: #4a5568;
          font-weight: 500;
        }

        .price-cell {
          flex: 1.2;
          text-align: right;
          position: relative;
          padding: 4px 8px;
          border-radius: 4px;
          overflow: hidden;
        }

        .buy-section .price-cell {
          text-align: right;
        }

        .sell-section .price-cell {
          text-align: left;
        }

        .heatmap-bar {
          position: absolute;
          top: 0;
          bottom: 0;
          border-radius: 3px;
          opacity: 0.12;
          transition: width 0.3s ease;
        }

        .buy-heatmap {
          right: 0;
          background: linear-gradient(90deg, transparent, #37b66a);
        }

        .sell-heatmap {
          left: 0;
          background: linear-gradient(90deg, #f56c6c, transparent);
        }

        .price-value {
          position: relative;
          z-index: 2;
        
        }

        .buy-price {
          color: #37b66a;
        }

        .sell-price {
          color: #f56c6c;
        }

        /* Transactions Container */
        .transactions-container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .transactions-header {
          display: flex;
          justify-content: space-between;
          padding: 12px 16px;
          background: #f8fbff;
          border-bottom: 1px solid #eef2f6;
          font-size: 12px;
          color: #6c757d;
          font-weight: 500;
        }

        .header-item {
          flex: 1;
          text-align: center;
        }

        .header-item:first-child {
          text-align: left;
        }

        .header-item:last-child {
          text-align: right;
        }

        /* Latest Transactions */
        .transactions-list {
          display: flex;
          flex-direction: column;
          flex: 1;
          max-height: 400px;
          overflow-y: auto;
        }

        .transaction-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          padding: 10px 16px;
          border-bottom: 1px solid #f0f0f0;
        }

        .transaction-time {
          color: #6c757d;
          flex: 1;
        }

        .transaction-price {
          flex: 1;
          text-align: center;
          font-weight: 500;
        }

        .transaction-price.buy {
          color: #37b66a;
        }

        .transaction-price.sell {
          color: #f56c6c;
        }

        .transaction-amount {
          color: #6c757d;
          flex: 1;
          text-align: right;
        }

        /* Loading placeholder animation */
        .loading-placeholder {
          background: linear-gradient(90deg, #e9ecef 25%, #f8f9fa 50%, #e9ecef 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 4px;
          display: inline-block;
        }

        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .market-detail-container {
            padding: 0;
          }

          .header,
          .price-section,
          .tabs-section {
            padding-left: 16px;
            padding-right: 16px;
          }

          .price-main-row {
            gap: 15px;
          }

          .table-header,
          .table-row {
            padding-left: 12px;
            padding-right: 12px;
          }

          .transactions-header,
          .transaction-item {
            padding-left: 12px;
            padding-right: 12px;
          }
        }
      `}</style>
    </div>
  );
}

export default React.memo(MarketDetail);