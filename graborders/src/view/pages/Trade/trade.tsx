import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import CoinListModal from "src/shared/modal/CoinListModal";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import spotListSelectors from "src/modules/spot/list/spotListSelectors";
import spotListActions from "src/modules/spot/list/spotListActions";
import spotFormActions from "src/modules/spot/form/spotFormActions";
import assetsActions from "src/modules/assets/list/assetsListActions";
import assetsListSelectors from "src/modules/assets/list/assetsListSelectors";
import { i18n } from "../../../i18n";
import CoinSelectorSidebar from "src/view/shared/modals/CoinSelectorSidebar";

// Utility: safe parseFloat that returns NaN if invalid
const safeParse = (v) => {
  if (v === null || v === undefined || v === "") return NaN;
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
};

function Trade() {
  const dispatch = useDispatch();

  // Redux data
  const listspot = useSelector(spotListSelectors.selectRows) || [];
  const listAssets = useSelector(assetsListSelectors.selectRows) || [];

  // Local UI state
  const [selectedCoin, setSelectedCoin] = useState("BTCUSDT");
  const [marketPrice, setMarketPrice] = useState("0");
  const [priceChangePercent, setPriceChangePercent] = useState("0");
  const [isCoinModalOpen, setIsCoinModalOpen] = useState(false);
  const [orderType, setOrderType] = useState("LIMIT");
  const [price, setPrice] = useState("0");
  const [quantity, setQuantity] = useState("");
  const [amountInUSDT, setAmountInUSDT] = useState("");
  const [activeTab, setActiveTab] = useState("buy");
  const [orderBook, setOrderBook] = useState({ asks: [], bids: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeOrdersTab, setActiveOrdersTab] = useState("Orders");

  // Refs for websockets and performance
  const tickerWs = useRef(null);
  const depthWs = useRef(null);
  const currentCoinRef = useRef(selectedCoin);
  const dataFetchController = useRef(null);
  const isComponentMounted = useRef(true);

  // Memoized balances mapping
  const balances = useMemo(() => {
    if (!Array.isArray(listAssets)) return {};
    return listAssets.reduce((acc, item) => {
      acc[item.symbol] = Number(item.amount) || 0;
      return acc;
    }, {});
  }, [listAssets]);

  // Derived symbols
  const baseSymbol = useMemo(() => {
    return selectedCoin.replace("USDT", "");
  }, [selectedCoin]);

  // Current balance based on active tab
  const currentBalance = useMemo(() => {
    if (activeTab === "buy") {
      return balances.USDT || 0;
    } else {
      return balances[baseSymbol] || 0;
    }
  }, [activeTab, baseSymbol, balances]);

  // Format function
  const formatNumber = useCallback((num, decimals = 2) => {
    const n = Number(num);
    if (!Number.isFinite(n)) return (0).toFixed(decimals);
    return n.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }, []);

  // Generate unique order number
  const generateOrderNumber = useCallback(() => {
    const t = Date.now().toString(36);
    const r = Math.floor(Math.random() * 1e6).toString(36);
    return `ORD-${t}-${r}`.toUpperCase();
  }, []);

  // Cancel pending requests
  const cancelPendingRequests = useCallback(() => {
    if (dataFetchController.current) {
      dataFetchController.current.abort();
      dataFetchController.current = null;
    }
  }, []);

  // Close WebSockets
  const closeWebSockets = useCallback(() => {
    [tickerWs, depthWs].forEach(wsRef => {
      if (wsRef.current) {
        try {
          wsRef.current.onclose = null;
          wsRef.current.close();
        } catch (e) { }
        wsRef.current = null;
      }
    });
  }, []);

  // Fetch assets and spot list on mount
  useEffect(() => {
    isComponentMounted.current = true;

    dispatch(assetsActions.doFetch());
    dispatch(spotListActions.doFetchPending());

    // Faster loading timeout
    const t = setTimeout(() => {
      if (isComponentMounted.current) {
        setIsLoading(false);
      }
    }, 400);

    return () => {
      isComponentMounted.current = false;
      clearTimeout(t);
      cancelPendingRequests();
      closeWebSockets();
    };
  }, [dispatch, cancelPendingRequests, closeWebSockets]);

  // Update price when market price changes or coin changes
  useEffect(() => {
    if (marketPrice && marketPrice !== "0") {
      setPrice(marketPrice);

      if (quantity && !isNaN(Number(quantity))) {
        const calculatedUSDT = Number(quantity) * Number(marketPrice);
        setAmountInUSDT(calculatedUSDT.toFixed(2));
      }
    }
  }, [marketPrice, quantity]);




  // Sync quantity and amountInUSDT
  const syncQuantityFromUSDT = useCallback((usdtValue) => {
    const usdtNum = safeParse(usdtValue);
    const priceNum = safeParse(price);

    if (Number.isFinite(usdtNum) && Number.isFinite(priceNum) && priceNum > 0) {
      const calculatedQuantity = usdtNum / priceNum;
      setQuantity(calculatedQuantity.toFixed(8));
    } else {
      setQuantity("");
    }
  }, [price]);

  const syncUSDTFromQuantity = useCallback((qtyValue) => {
    const qtyNum = safeParse(qtyValue);
    const priceNum = safeParse(price);

    if (Number.isFinite(qtyNum) && Number.isFinite(priceNum)) {
      const calculatedUSDT = qtyNum * priceNum;
      setAmountInUSDT(calculatedUSDT.toFixed(2));
    } else {
      setAmountInUSDT("");
    }
  }, [price]);

  // Handle quantity change
  const handleQuantityChange = useCallback((e) => {
    const value = e.target.value;
    setQuantity(value);
    syncUSDTFromQuantity(value);
  }, [syncUSDTFromQuantity]);

  // Handle amount in USDT change
  const handleAmountInUSDTChange = useCallback((e) => {
    const value = e.target.value;
    setAmountInUSDT(value);
    syncQuantityFromUSDT(value);
  }, [syncQuantityFromUSDT]);

  // Optimized WebSocket connection management
  useEffect(() => {
    currentCoinRef.current = selectedCoin;

    const setupWebSocket = (url, onMessage, type) => {
      if (!isComponentMounted.current || currentCoinRef.current !== selectedCoin) return null;

      try {
        const ws = new WebSocket(url);

        ws.onopen = () => {
          console.log(`${type} WebSocket connected for:`, selectedCoin);
        };

        ws.onmessage = (event) => {
          if (!isComponentMounted.current || currentCoinRef.current !== selectedCoin) return;

          try {
            const data = JSON.parse(event.data);
            onMessage(data);
          } catch (err) {
            console.error(`Error parsing ${type} data:`, err);
          }
        };

        ws.onerror = (error) => {
          console.error(`${type} WebSocket error:`, error);
        };

        ws.onclose = (event) => {
          console.log(`${type} WebSocket closed for:`, selectedCoin);
          if (isComponentMounted.current && currentCoinRef.current === selectedCoin && event.code !== 1000) {
            setTimeout(() => {
              if (isComponentMounted.current && currentCoinRef.current === selectedCoin) {
                const newWs = setupWebSocket(url, onMessage, type);
                if (type === 'ticker' && newWs) tickerWs.current = newWs;
                else if (type === 'depth' && newWs) depthWs.current = newWs;
              }
            }, 1000);
          }
        };

        return ws;
      } catch (err) {
        console.error(`Error creating ${type} WebSocket:`, err);
        return null;
      }
    };

    // Close existing connections
    closeWebSockets();

    // Setup ticker WebSocket
    const tickerUrl = `wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@ticker`;
    tickerWs.current = setupWebSocket(tickerUrl, (data) => {
      if (data.c !== undefined) setMarketPrice(data.c);
      if (data.P !== undefined) setPriceChangePercent(data.P);
    }, 'ticker');

    // Setup depth WebSocket
    const depthUrl = `wss://stream.binance.com:9443/ws/${selectedCoin.toLowerCase()}@depth20@100ms`;
    depthWs.current = setupWebSocket(depthUrl, (data) => {
      const asks = (data.asks || []).slice(0, 5).map((a) => ({ price: a[0], amount: a[1] }));
      const bids = (data.bids || []).slice(0, 5).map((b) => ({ price: b[0], amount: b[1] }));
      setOrderBook({ asks, bids });
    }, 'depth');

    return () => {
      closeWebSockets();
    };
  }, [selectedCoin, closeWebSockets]);

  // Calculate max amount for depth visualization
  const maxAmount = useMemo(() => {
    const all = [
      ...orderBook.asks.map((it) => safeParse(it.amount)),
      ...orderBook.bids.map((it) => safeParse(it.amount)),
    ].filter((n) => Number.isFinite(n));
    return Math.max(...all, 1);
  }, [orderBook]);

  // Handlers
  const handleOpenCoinModal = useCallback(() => setIsCoinModalOpen(true), []);
  const handleCloseCoinModal = useCallback(() => setIsCoinModalOpen(false), []);

  const handleSelectCoin = useCallback((coin) => {
    if (!coin || coin === selectedCoin) {
      setIsCoinModalOpen(false);
      return;
    }

    setSelectedCoin(coin);
    setIsCoinModalOpen(false);
    setIsLoading(true);

    // Reset form fields when coin changes
    setQuantity("");
    setAmountInUSDT("");

    // Brief loading state
    const t = setTimeout(() => {
      if (isComponentMounted.current) {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(t);
  }, [selectedCoin]);

  const handlePriceChange = useCallback((e) => {
    const newPrice = e.target.value;
    setPrice(newPrice);

    const qtyNum = safeParse(quantity);
    if (Number.isFinite(qtyNum)) {
      const calculatedUSDT = qtyNum * Number(newPrice);
      setAmountInUSDT(calculatedUSDT.toFixed(2));
    }
  }, [quantity]);

  // Percentage quick select handlers
  const handlePercentageSelect = useCallback((percentage) => {
    if (activeTab === "buy") {
      const availableUSDT = currentBalance;
      const maxSpend = availableUSDT * percentage;
      setAmountInUSDT(maxSpend.toFixed(2));
      syncQuantityFromUSDT(maxSpend);
    } else {
      const availableCoin = currentBalance;
      const sellAmount = availableCoin * percentage;
      setQuantity(sellAmount.toFixed(8));
      syncUSDTFromQuantity(sellAmount);
    }
  }, [activeTab, currentBalance, syncQuantityFromUSDT, syncUSDTFromQuantity]);

  const handleIncrementPrice = useCallback(() => {
    const p = safeParse(price);
    const next = Number.isFinite(p) ? (p + 1) : safeParse(marketPrice) || 0;
    setPrice(next.toString());
  }, [price, marketPrice]);

  const handleDecrementPrice = useCallback(() => {
    const p = safeParse(price);
    if (!Number.isFinite(p)) return;
    const next = Math.max(0.0001, p - 1);
    setPrice(next.toString());
  }, [price]);

  const handleOrderBookClick = useCallback((clickPrice) => {
    if (orderType === "LIMIT" && clickPrice !== undefined) {
      setPrice(clickPrice.toString());
    }
  }, [orderType]);

  // Place order
  const handlePlaceOrder = useCallback(async () => {
    setErrorMessage("");
    if (placing) return;

    const q = safeParse(quantity);
    const p = orderType === "MARKET" ? safeParse(marketPrice) : safeParse(price);

    // Validation
    if (!Number.isFinite(q) || q <= 0) {
      setErrorMessage(i18n("pages.trade.errors.invalidQuantity"));
      return;
    }

    if (!Number.isFinite(p) || p <= 0) {
      setErrorMessage(i18n("pages.trade.errors.invalidPrice"));
      return;
    }

    // Balance validation
    if (activeTab === "buy") {
      const totalCost = p * q;
      if (totalCost > currentBalance) {
        setErrorMessage(i18n("pages.trade.errors.insufficientUSDT", formatNumber(currentBalance, 2)));
        return;
      }
    } else {
      if (q > currentBalance) {
        setErrorMessage(i18n("pages.trade.errors.insufficientCoin", formatNumber(currentBalance, 6), baseSymbol));
        return;
      }
    }

    setPlacing(true);
    try {
      const orderPrice = p;
      const orderQty = q;
      const totalValue = orderPrice * orderQty;
      const estimatedFee = totalValue * 0.001;

      const orderData = {
        orderNo: generateOrderNumber(),
        orderType: orderType.toLowerCase(),
        tradingPair: selectedCoin.replace("USDT", "/USDT"),
        status: orderType === "MARKET" ? "completed" : "pending",
        direction: activeTab.toUpperCase(),
        delegateType: orderType,
        delegateState: orderType === "MARKET" ? "Filled" : "Pending",
        orderQuantity: orderQty,
        commissionPrice: orderPrice,
        entrustedValue: totalValue,
        transactionQuantity: orderType === "MARKET" ? orderQty : 0,
        transactionValue: orderType === "MARKET" ? totalValue : 0,
        closingPrice: orderType === "MARKET" ? orderPrice : 0,
        handlingFee: orderType === "MARKET" ? estimatedFee : 0,
        commissionTime: new Date().toISOString(),
        closingTime: orderType === "MARKET" ? new Date().toISOString() : null,
      };

      await dispatch(spotFormActions.doCreate(orderData));

      // Reset form
      setQuantity("");
      setAmountInUSDT("");

    } catch (err) {
      console.error("Place order error", err);
      setErrorMessage(i18n("pages.trade.errors.failedOrder"));
    } finally {
      setPlacing(false);
    }
  }, [
    placing, quantity, orderType, marketPrice, price, selectedCoin,
    activeTab, dispatch, generateOrderNumber, currentBalance, baseSymbol, formatNumber
  ]);

  const updateStatus = async (id, data) => {
    data.status = "canceled";
    dispatch(spotFormActions.doUpdate(id, data));
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="trade-header">
        <div className="nav-bar">
          <div className="back-arrow">
            <div className="trading-pair" onClick={handleOpenCoinModal}>
              <i className="fas fa-chevron-down dropdown-arrow"></i>
              {selectedCoin.replace("USDT", "")} / USDT
            </div>
            <div>
              <p style={{ fontSize: 10 }}>
                Perpetual
              </p>
            </div>
          </div>

          <div className="header-right">
            <select className="trade-type-select">
              <option value="trade">Trade</option>
              <option value="perpetual">Perpetual</option>
            </select>
            <Link to={`market/detail/${selectedCoin}`} className="chart-icon">
              <i className="fas fa-chart-line"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="trading-layout">
          {/* Trade Form */}
          <div className="trade-form">
            <div className="buy-sell-tabs" role="tablist">
              {isLoading ? (
                <div className="skeleton-tab" />
              ) : (
                <>
                  <div
                    role="tab"
                    aria-selected={activeTab === "buy"}
                    tabIndex={0}
                    className={`buy-tab ${activeTab === "buy" ? "active" : ""}`}
                    onClick={() => setActiveTab("buy")}
                    onKeyDown={(e) => e.key === "Enter" && setActiveTab("buy")}
                  >
                    {i18n("pages.trade.buy")}
                  </div>
                  <div
                    role="tab"
                    aria-selected={activeTab === "sell"}
                    tabIndex={0}
                    className={`sell-tab ${activeTab === "sell" ? "active" : ""}`}
                    onClick={() => setActiveTab("sell")}
                    onKeyDown={(e) => e.key === "Enter" && setActiveTab("sell")}
                  >
                    {i18n("pages.trade.sell")}
                  </div>
                </>
              )}
            </div>

            <div className="order-type">
              <div className="order-type-label">{i18n("pages.trade.orderType")}</div>
              {isLoading ? (
                <div className="skeleton-input" />
              ) : (
                <select
                  className="order-type-select"
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                >
                  <option value="LIMIT">{i18n("pages.trade.limit")}</option>
                  <option value="MARKET">{i18n("pages.trade.market")}</option>
                </select>
              )}
            </div>

            {/* Price input (limit only) */}
            {orderType === "LIMIT" && (
              <div className="input-group">
                <div className="input-label">{i18n("pages.trade.price")}</div>
                {isLoading ? (
                  <div className="skeleton-input" />
                ) : (
                  <div className="input-with-buttons">
                    <input
                      className="value-input"
                      value={price}
                      onChange={handlePriceChange}
                      inputMode="decimal"
                      aria-label="price"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Quantity in Coin */}
            <div className="input-group">
              <div className="input-label">{i18n("pages.trade.amount")} ({baseSymbol})</div>
              {isLoading ? (
                <div className="skeleton-input" />
              ) : (
                <div className="input-with-buttons">
                  <input
                    className="value-input"
                    value={quantity}
                    onChange={handleQuantityChange}
                    placeholder="0.0"
                    inputMode="decimal"
                    aria-label="quantity"
                  />
                </div>
              )}
            </div>

            {/* Amount in USDT */}
            <div className="input-group">
              <div className="input-label">{i18n("pages.trade.amount")} (USDT)</div>
              {isLoading ? (
                <div className="skeleton-input" />
              ) : (
                <input
                  className="value-input"
                  value={amountInUSDT}
                  onChange={handleAmountInUSDTChange}
                  placeholder="0.0"
                  inputMode="decimal"
                  aria-label="amount in usdt"
                />
              )}
            </div>

            {/* Balance Display */}
            {isLoading ? (
              <div className="skeleton-balance" />
            ) : (
              <div className="balance-info">
                {i18n("pages.trade.available")}: {formatNumber(currentBalance, activeTab === "buy" ? 2 : 6)} {activeTab === "buy" ? "USDT" : baseSymbol}
              </div>
            )}

            {/* Error */}
            {errorMessage && <div className="error-message" role="alert">{errorMessage}</div>}

            {/* Action */}
            {isLoading ? (
              <div className="skeleton-button" />
            ) : (
              <button
                className={`action-button ${activeTab === "buy" ? "buy-button" : "sell-button"}`}
                onClick={handlePlaceOrder}
                disabled={placing}
                aria-busy={placing}
              >
                {placing ? i18n("pages.trade.placing") : `${activeTab === "buy" ? i18n("pages.trade.buy") : i18n("pages.trade.sell")} ${baseSymbol}`}
              </button>
            )}
          </div>

          {/* Order Book */}
          <div className="order-book" role="region" aria-label="order book">
            <div className="order-book-header">
              <span>{i18n("pages.trade.orderBook.price")}</span>
              <span>{i18n("pages.trade.orderBook.amount")} ({baseSymbol})</span>
            </div>

            {isLoading ? (
              <>
                {[...Array(5)].map((_, i) => <div key={`s-a-${i}`} className="skeleton-order-book" />)}
                <div className="skeleton-current-price" />
                {[...Array(5)].map((_, i) => <div key={`s-b-${i}`} className="skeleton-order-book" />)}
              </>
            ) : (
              <>
                {orderBook.asks.map((ask, idx) => {
                  const amount = safeParse(ask.amount) || 0;
                  const widthPercentage = Math.min(100, (amount / maxAmount) * 100);
                  return (
                    <div key={`ask-${idx}`} className="order-book-row ask-row" onClick={() => handleOrderBookClick(ask.price)}>
                      <div className="depth-bar ask-depth" style={{ width: `${widthPercentage}%` }} />
                      <div className="order-price">{formatNumber(ask.price, 4)}</div>
                      <div className="order-amount">{formatNumber(ask.amount, 4)}</div>
                    </div>
                  );
                })}

                <div className="order-book-row current-price-row">
                  <div className="current-price">${formatNumber(marketPrice, 2)}</div>
                </div>

                {orderBook.bids.map((bid, idx) => {
                  const amount = safeParse(bid.amount) || 0;
                  const widthPercentage = Math.min(100, (amount / maxAmount) * 100);
                  return (
                    <div key={`bid-${idx}`} className="order-book-row bid-row" onClick={() => handleOrderBookClick(bid.price)}>
                      <div className="depth-bar bid-depth" style={{ width: `${widthPercentage}%` }} />
                      <div className="order-price">{formatNumber(bid.price, 4)}</div>
                      <div className="order-amount">{formatNumber(bid.amount, 4)}</div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>

        {/* Orders Tabs */}
        <div className="orders-tabs">
          <div className="orders-tabs-header">
            {['Positions', 'Orders', 'History orders', 'Transaction history'].map(tab => (
              <div
                key={tab}
                className={`orders-tab ${activeOrdersTab === tab ? 'active' : ''}`}
                onClick={() => setActiveOrdersTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>

          <div className="orders-tab-content">
            {activeOrdersTab === 'Orders' && (
              <>
                {listspot && listspot.length > 0 ? (
                  <div className="orders-list">
                    {listspot.map((order) => (
                      <div key={order.id ?? order.orderNo} className="order-item">
                        <div className="order-main-info">
                          <div className="order-pair-action">
                            <span className="order-pair">{order.tradingPair}</span>
                            <span className={`order-action ${String(order?.direction || "").toLowerCase()}`}>
                              {order.direction}
                            </span>
                            <span className="order-type-badge">{order.orderType}</span>
                          </div>
                          <div className="order-date">
                            {order.commissionTime ? new Date(order.commissionTime).toLocaleDateString() : ""}
                            <span className="order-time">
                              {order.commissionTime ? new Date(order.commissionTime).toLocaleTimeString() : ""}
                            </span>
                          </div>
                        </div>

                        <div className="order-details">
                          <div className="order-detail">
                            <span className="detail-label">{i18n("pages.trade.openOrders.status")}</span>
                            <span className={`order-status ${String(order.status).toLowerCase()}`}>{order.status}</span>
                          </div>

                          <div className="order-detail">
                            <span className="detail-label">{i18n("pages.trade.openOrders.price")}</span>
                            <span className="order-price-value">{formatNumber(order.commissionPrice, 4)} USDT</span>
                          </div>

                          <div className="order-detail">
                            <span className="detail-label">{i18n("pages.trade.openOrders.amount")}</span>
                            <span className="order-amount-value">{order.orderQuantity} {order?.tradingPair?.split("/")[0]}</span>
                          </div>

                          <div className="order-detail">
                            <span className="detail-label">{i18n("pages.trade.openOrders.total")}</span>
                            <span className="order-total">{formatNumber(order.entrustedValue)} USDT</span>
                          </div>
                        </div>

                        <div className="order-actions">
                          {String(order.status).toLowerCase() === "pending" ||
                            String(order.status).toLowerCase() === "partially filled" ? (
                            <button className="cancel-order-btn" onClick={() => updateStatus(order.id, order)}>
                              {i18n("pages.trade.openOrders.cancel")}
                            </button>
                          ) : (
                            <div className="completed-indicator">
                              <i className="fas fa-check-circle" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-orders">
                    <div className="empty-icon"><i className="fas fa-clipboard-list" /></div>
                    <div className="empty-text">{i18n("pages.trade.openOrders.noOrders")}</div>
                    <div className="empty-subtext">{i18n("pages.trade.openOrders.noOrdersSubtext")}</div>
                  </div>
                )}
              </>
            )}

            {activeOrdersTab !== 'Orders' && (
              <div className="empty-tab-content">
                <div className="empty-icon"><i className="fas fa-clipboard-list" /></div>
                <div className="empty-text">No {activeOrdersTab.toLowerCase()} available</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Coin Selection Modal */}
      <CoinSelectorSidebar
        isOpen={isCoinModalOpen}
        onClose={() => setIsCoinModalOpen(false)}
        selectedCoin={selectedCoin}
        onCoinSelect={handleSelectCoin}
        title="Select Trading Pair"
      />

      <style>{`
        /* Trade Header Section - Market Page Style */
        .container {
          background-color: rgb(16, 108, 245);
          color: #FFFFFF;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          max-width: 400px;
          margin: 0 auto;
        }
        
        .trade-header {
          padding: 15px 20px;
          color: #fff;
          top: 0;
          z-index: 100;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .back-arrow {
          font-size: 18px;
          font-weight: 300;
          cursor: pointer;
          display: flex;
          align-items: center;
          display: flex;
          flex-direction: column;
        }

        .trading-pair {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 600;
        }

        .trading-pair:hover {
          opacity: 0.8;
        }

        .dropdown-arrow {
          font-size: 12px;
          transition: transform 0.3s ease;
          color: #fff;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .trade-type-select {
          font-size: 10px;
          padding: 5px;
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 4px;
        }

        .chart-icon {
          color: #fff;
          font-size: 16px;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        .chart-icon:hover {
          opacity: 0.8;
        }

        .market-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .market-name {
          font-weight: 600;
          font-size: 16px;
          color: #1a1a1a;
        }

        .market-change {
          font-size: 12px;
          font-weight: 500;
        }

        /* Main Content */
        .main-content {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 20px 16px 100px;
          min-height: calc(100vh - 120px);
        }

        /* Trading Layout */
        .trading-layout {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
          align-items: stretch;
        }

        .trade-form {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .order-book {
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        /* Orders Tabs */
        .orders-tabs {
          margin-top: 20px;
        }

        .orders-tabs-header {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
          border-bottom: 1px solid #eef2f6;
          padding-bottom: 8px;
        }

        .orders-tab {
          font-size: 12px;
          cursor: pointer;
          color: #888f99;
          transition: color 0.2s ease;
          padding: 4px 0;
        }

        .orders-tab.active {
          color: #000;
          font-weight: 500;
        }

        .orders-tab-content {
          min-height: 200px;
        }

        .empty-tab-content {
          text-align: center;
          padding: 40px 0;
        }

        /* Buy/Sell Tabs */
        .buy-sell-tabs {
          display: flex;
          margin-bottom: 16px;
          background-color: #f8f9fa;
          border-radius: 4px;
          overflow: hidden;
        }

        .buy-tab,
        .sell-tab {
          flex: 1;
          text-align: center;
          padding: 8px;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.2s ease;
        }

        .buy-tab {
          background-color: #f8f9fa;
          color: #6c757d;
        }

        .buy-tab.active {
          background-color: #37b66a;
          color: #ffffff;
        }

        .sell-tab {
          background-color: #f8f9fa;
          color: #6c757d;
        }

        .sell-tab.active {
          background-color: #f56c6c;
          color: #ffffff;
        }

        /* Order Type */
        .order-type {
          margin-bottom: 16px;
        }

        .order-type-label {
          font-size: 12px;
          color: #6c757d;
          margin-bottom: 6px;
          font-weight: 500;
        }

        .order-type-select {
          width: 100%;
          background-color: #ffffff;
          color: #333333;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 8px;
          font-size: 12px;
        }

        /* Input Fields */
        .input-group {
          margin-bottom: 16px;
        }

        .input-label {
          display: block;
          font-size: 12px;
          color: #6c757d;
          margin-bottom: 6px;
          font-weight: 500;
        }

        .input-with-buttons {
          display: flex;
          align-items: center;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 4px;
        }

        .value-input {
          flex: 1;
          background: transparent;
          border: none;
          color: #333333;
          font-size: 12px;
          padding: 8px;
          outline: none;
        }

        .value-buttons {
          display: flex;
        }

        .value-button {
          background-color: #f8f9fa;
          color: #6c757d;
          border: none;
          width: 26px;
          height: 26px;
          border-radius: 6px;
          margin-left: 4px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
        }

        .balance-info {
          font-size: 13px;
          color: #6c757d;
          margin-bottom: 16px;
          text-align: center;
          padding: 8px;
          background-color: #f8fbff;
          border-radius: 6px;
        }

        /* Action Button */
        .action-button {
          width: 100%;
          padding: 8px;
          border: none;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          margin-top: auto;
        }

        .buy-button {
          background-color: #37b66a;
          color: white;
        }

        .sell-button {
          background-color: #f56c6c;
          color: white;
        }

        .action-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Order Book */
        .order-book-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 12px;
          color: #6c757d;
          padding: 0 8px;
          font-weight: 500;
        }

        .order-book-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 8px;
          font-size: 12px;
          cursor: pointer;
          transition: background-color 0.2s;
          position: relative;
          z-index: 1;
          border-radius: 4px;
        }

        .depth-bar {
          position: absolute;
          top: 0;
          height: 100%;
          opacity: 0.1;
          z-index: -1;
          transition: width 0.3s ease;
        }

        .ask-depth {
          right: 0;
          background-color: #f56c6c;
        }

        .bid-depth {
          left: 0;
          background-color: #37b66a;
        }

        .order-book-row:hover {
          background-color: #f8fbff;
        }

        .order-price {
          flex: 1;
          font-weight: 500;
        }

        .order-amount {
          flex: 1;
          text-align: right;
          color: #6c757d;
        }

        .ask-row .order-price {
          color: #f56c6c;
        }

        .bid-row .order-price {
          color: #37b66a;
        }

        .current-price-row {
          display: flex;
          justify-content: center;
          margin: 8px 0;
          padding: 8px 0;
          border-top: 1px solid #eef2f6;
          border-bottom: 1px solid #eef2f6;
        }

        .current-price {
          font-weight: 600;
          color: #106cf5;
          font-size: 12px;
        }

        /* Order Item Styles */
        .order-item {
          background-color: #f8fbff;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 10px;
        }

        .order-main-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .order-pair-action {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .order-pair {
          font-weight: 600;
          font-size: 12px;
        }

        .order-action {
          font-size: 11px;
          padding: 3px 6px;
          border-radius: 3px;
          font-weight: 600;
        }

        .order-action.buy {
          background-color: rgba(55, 182, 106, 0.1);
          color: #37b66a;
        }

        .order-action.sell {
          background-color: rgba(245, 108, 108, 0.1);
          color: #f56c6c;
        }

        .order-type-badge {
          font-size: 10px;
          color: #6c757d;
          background-color: #e9ecef;
          padding: 2px 5px;
          border-radius: 3px;
        }

        .order-date {
          font-size: 11px;
          color: #6c757d;
        }

        .order-time {
          color: #8c98a4;
        }

        .order-details {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-bottom: 12px;
        }

        .order-detail {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .detail-label {
          font-size: 11px;
          color: #6c757d;
        }

        .order-status {
          font-size: 11px;
          font-weight: 600;
        }

        .order-status.completed {
          color: #37b66a;
        }

        .order-status.cancelled {
          color: #f56c6c;
        }

        .order-status.pending {
          color: #106cf5;
        }

        .order-price-value, .order-amount-value, .order-total {
          font-size: 11px;
          font-weight: 600;
        }

        .order-actions {
          display: flex;
          justify-content: flex-end;
        }

        .cancel-order-btn {
          background-color: #f56c6c;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 11px;
          cursor: pointer;
        }

        .completed-indicator {
          color: #37b66a;
          font-size: 12px;
        }

        .empty-orders {
          text-align: center;
          padding: 30px 0;
        }

        .empty-icon {
          font-size: 32px;
          color: #e9ecef;
          margin-bottom: 10px;
        }

        .empty-text {
          color: #6c757d;
          font-size: 12px;
          margin-bottom: 5px;
        }

        .empty-subtext {
          color: #8c98a4;
          font-size: 12px;
        }

        /* Error Message */
        .error-message {
          background-color: #fef2f2;
          color: #dc2626;
          padding: 10px;
          border-radius: 6px;
          margin-bottom: 12px;
          font-size: 13px;
          border: 1px solid #fecaca;
        }

        /* Skeleton Loading Styles */
        .skeleton-loading {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 4px;
        }
        
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        /* Skeleton elements */
        .skeleton-market-name {
          width: 120px;
          height: 16px;
        }
        
        .skeleton-price-change {
          width: 60px;
          height: 16px;
        }
        
        .skeleton-tab {
          width: 100%;
          height: 44px;
        }
        
        .skeleton-input {
          width: 100%;
          height: 40px;
          margin-bottom: 16px;
        }
        
        .skeleton-balance {
          width: 100%;
          height: 14px;
          margin-bottom: 16px;
        }
        
        .skeleton-button {
          width: 100%;
          height: 48px;
        }
        
        .skeleton-order-book {
          height: 20px;
          margin-bottom: 4px;
        }
        
        .skeleton-current-price {
          height: 30px;
          margin: 8px 0;
        }

        /* Responsive */
        @media (max-width: 380px) {
          .container {
            padding: 0;
          }

          .trade-header,
          .main-content {
            padding-left: 16px;
            padding-right: 16px;
          }

          .trading-layout {
            gap: 10px;
          }
        }

        .remove_blue {
          text-decoration: none;
          color: inherit;
        }
      `}</style>
    </div>
  );
}

export default Trade;