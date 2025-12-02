import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import assetsActions from "src/modules/assets/list/assetsListActions";
import assetsListSelectors from "src/modules/assets/list/assetsListSelectors";
import { i18n } from "../../../i18n";

function Wallet() {
  const dispatch = useDispatch();
  const location = useLocation();
  const listAssets = useSelector(assetsListSelectors.selectRows);
  const [activeItem, setActiveItem] = useState<string>(location.pathname);
  const [activeTimeframe, setActiveTimeframe] = useState("7 days");
  const [activeTab, setActiveTab] = useState("Exchange");

  const quickActions = [
    {
      path: "/withdraw",
      icon: "fas fa-arrow-up",
      name: "Withdraw",
    },
    {
      path: "/deposit",
      icon: "fas fa-arrow-down",
      name: "Deposit",
    },
    {
      path: "/transfer",
      icon: "fas fa-exchange-alt",
      name: "Transfer",
    },
    {
      path: "/swap",
      icon: "fas fa-sync-alt",
      name: "Swap",
    },
  ];

  const bottomNavItems = [
    { icon: "fas fa-home", label: "Home", path: "/" },
    { icon: "fas fa-chart-line", label: "Quotes", path: "/quotes" },
    { icon: "fas fa-exchange-alt", label: "Trade", path: "/trade" },
    { icon: "fas fa-percentage", label: "Finance", path: "/finance" },
    { icon: "fas fa-wallet", label: "Assets", path: "/assets", active: true },
  ];

  const accountTabs = ["Exchange", "Trade", "Perpetual", "Finance"];

  // Memoize the format function to prevent unnecessary re-renders
  const formatAmount = useCallback((amount: string) => {
    const num = parseFloat(amount);
    if (isNaN(num)) return "0.00";

    if (num % 1 === 0) return num.toString() + ".00";

    return num.toFixed(2);
  }, []);

  // Fetch assets only once on component mount with cleanup
  useEffect(() => {
    let isMounted = true;

    const fetchAssets = async () => {
      try {
        await dispatch(assetsActions.doFetch());
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching assets:", error);
        }
      }
    };

    fetchAssets();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  // Update active item when route changes
  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  // Calculate total portfolio value
  const { totalValue, totalChange } = useMemo(() => {
    let total = 0;
    let change = 0;

    listAssets.forEach((asset) => {
      const amount = parseFloat(asset.amount || "0");
      total += amount;
    });

    return {
      totalValue: total,
      totalChange: change,
    };
  }, [listAssets]);

  // Get asset icon class based on symbol
  const getAssetIconClass = (symbol: string) => {
    switch (symbol) {
      case "ETH":
        return "asset-icon eth-icon";
      case "BTC":
        return "asset-icon btc-icon";
      case "USDC":
        return "asset-icon usdc-icon";
      default:
        return "asset-icon";
    }
  };

  // Memoize the asset list rendering to prevent unnecessary re-renders
  const renderedAssets = useMemo(() => {
    if (listAssets.length === 0) {
      return (
        <div className="no-assets">
          <div className="asset-card">
            <div className="asset-header">
              <div className="asset-icon"></div>
              <div className="asset-name">No assets found</div>
            </div>
            <div className="asset-details">
              <div className="asset-column">
                <div className="asset-label">Available balance:</div>
                <div className="asset-value">0.00</div>
              </div>
              <div className="asset-column">
                <div className="asset-label">Frozen amount:</div>
                <div className="asset-value">0.00</div>
              </div>
              <div className="asset-column">
                <div className="asset-label">Valuation:</div>
                <div className="asset-value">$0.00</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return listAssets.map((asset) => {
      const assetAmount = parseFloat(asset.amount || "0");

      return (
        <div className="asset-card" key={asset.id}>
          <div className="asset-header">
            <div className={getAssetIconClass(asset.symbol)}>

              <img
                src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${asset.symbol}.png`}
                alt={asset.symbol}
                style={
                  { width: '100%' }
                }
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const img = e.currentTarget;
                  img.onerror = null;
                  img.style.display = 'none';
                  if (img.parentElement) img.parentElement.innerHTML = asset.symbol;
                }}
              />
            </div>
            <div className="asset-name">{asset.coinName}</div>
          </div>
          <div className="asset-details">
            <div className="asset-column">
              <div className="asset-label">Available balance:</div>
              <div className="asset-value">{formatAmount(asset.amount)}</div>
            </div>
            <div className="asset-column">
              <div className="asset-label">Frozen amount:</div>
              <div className="asset-value">0.00</div>
            </div>
            <div className="asset-column">
              <div className="asset-label">Valuation:</div>
              <div className="asset-value">
                ${formatAmount(asset.amount)}
              </div>
            </div>
          </div>
        </div>
      );
    });
  }, [listAssets, formatAmount]);

  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <div className="nav-bar">
          <div className="back-arrow">
          </div>
          <div className="page-title">{i18n("pages.wallet.myAssets")}</div>
          <div className="header-icon">
            {/* Empty for alignment */}
          </div>
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="content-wrapper">
        {/* Asset Valuation Section */}
        <div className="valuation-section">
          <div className="valuation-card">
            <div className="valuation-header">
              <div className="valuation-label">
                <i className="fas fa-eye-slash"></i>
                {i18n("pages.wallet.assetValuation")}
              </div>
              <select className="currency-selector">
                <option>USD</option>
                <option>EUR</option>
                <option>CNY</option>
              </select>
            </div>
            <div className="balance-amount">
              {totalValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="usd-equivalent">
              ≈${totalValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="earnings-today">
              {i18n("pages.wallet.todaysEarnings")} 0.00
            </div>
          </div>
        </div>

        <div className="sectionn__assets">
          {/* Earnings Trends Section */}
          <div className="earnings-section">
            <div className="earnings-header">
              <div className="earnings-title">{i18n("pages.wallet.earningsTrends")}</div>
              <div className="timeframe-selector">
                <div
                  className={`timeframe ${activeTimeframe === "7 days" ? "active" : ""}`}
                  onClick={() => setActiveTimeframe("7 days")}
                >
                  7 days
                </div>
                <div
                  className={`timeframe ${activeTimeframe === "30 days" ? "active" : ""}`}
                  onClick={() => setActiveTimeframe("30 days")}
                >
                  30 days
                </div>
              </div>
            </div>
            <div className="graph-container">
              <div className="graph-line"></div>
              <div className="graph-points">
                <div className="graph-point" style={{ height: "10%" }}></div>
                <div className="graph-point" style={{ height: "15%" }}></div>
                <div className="graph-point" style={{ height: "8%" }}></div>
                <div className="graph-point" style={{ height: "12%" }}></div>
                <div className="graph-point" style={{ height: "6%" }}></div>
                <div className="graph-point" style={{ height: "10%" }}></div>
                <div className="graph-point" style={{ height: "5%" }}></div>
              </div>
            </div>
            <div className="graph-dates">
              <div>11-19</div>
              <div>11-21</div>
              <div>11-23</div>
              <div>11-25</div>
            </div>
            <div className="expand-arrow">
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="actions-section">
            <div className="actions-grid">
              {quickActions.map((item) => (
                <Link
                  to={item.path}
                  className="action-item remove_blue"
                  role="button"
                  aria-label={item.name}
                  key={item.path}
                >
                  <div className="action-icon">
                    <i className={item.icon} aria-hidden="true" />
                  </div>
                  <span className="action-label">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* My Account Section */}
          <div className="account-section">
            <div className="section-title">{i18n("pages.wallet.myAccount")}</div>
            <div className="account-tabs">
              {accountTabs.map((tab) => (
                <div
                  key={tab}
                  className={`account-tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </div>
              ))}
            </div>
            <div className="asset-list">
              {renderedAssets}
            </div>
          </div>
        </div>
      </div>


      {/* Updated CSS Styles */}
      <style>{`
     .sectionn__assets{ 
    background-color: #fff;
    height: calc(100% - 184px);
    border-radius: 21px 21px 0 0;
    overflow-y: auto;

     }

        .container {
          max-width: 400px;
          margin: 0 auto;
          height: 100dvh;
          position: relative;
          background-image: url('https://aurexes.com/app/static/img/background.ac97a8d5.png');
          background-size: cover;
          overflow-y: auto; 
          backgrouund-repeat: no-repeat;
        }

        /* Header Section */
        .header {
          // background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          padding: 15px 20px;
          color: white;
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

        /* Asset Valuation Section */
        .valuation-section {
          padding: 20px 20px 0 20px;
          color: white;
        }

        .valuation-card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 16px 16px 0 0;
          padding: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
        }

        .valuation-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .valuation-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;

          color: white;
        }

        .currency-selector {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 6px;
          padding: 4px 8px;
          color: white;
          font-size: 12px;
        }

        .balance-amount {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 8px;
          color: white;
        }

        .usd-equivalent {
          font-size: 16px;
        }

        .earnings-today {
          font-size: 14px;
          opacity: 0.9;
        }

        /* Earnings Trends Section */
        .earnings-section {
          background: #f2f4f7;
          margin: 20px;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        }

        .earnings-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .earnings-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }

        .timeframe-selector {
          display: flex;
          gap: 8px;
        }

        .timeframe {
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 12px;
          cursor: pointer;
          color: #666;
          background: #f8f9fa;
          transition: all 0.3s ease;
        }

        .timeframe.active {
          background: #106cf5;
          color: white;
        }

        .graph-container {
          height: 80px;
          background: #f8f9fa;
          border-radius: 8px;
          margin-bottom: 15px;
          position: relative;
          overflow: hidden;
        }

        .graph-line {
          position: absolute;
          bottom: 40px;
          left: 0;
          right: 0;
          height: 1px;
          background: #e0e0e0;
        }

        .graph-points {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          height: 100%;
          padding: 0 10px;
        }

        .graph-point {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #106cf5;
          position: relative;
        }

        .graph-point::after {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: rgba(16, 108, 245, 0.2);
          border-radius: 50%;
        }

        .graph-dates {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: #999;
          margin-top: 8px;
        }

        .expand-arrow {
          text-align: center;
          color: #999;
          font-size: 12px;
        }

        /* Action Buttons */
        .actions-section {
          padding: 0 20px 20px;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
        }

        .action-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 8px 0 ;
          background: #f2f4f7;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          color: inherit;
        }

        .action-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .action-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #106cf5;
          font-size: 18px;
        }

        .action-label {
          font-size: 12px;
          color: #333;
          font-weight: 500;
        }

        /* My Account Section */
        .account-section {
          padding: 0 20px 20px;
        }

        .section-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #333;
        }

        .account-tabs {
          display: flex;
          background: #f8f9fa;
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 20px;
        }

        .account-tab {
          flex: 1;
          padding: 10px;
          text-align: center;
          font-size: 14px;
          font-weight: 500;
          color: #666;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .account-tab.active {
          background: white;
          color: #106cf5;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        /* Asset Cards */
        .asset-card {
          background: #f2f4f7;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .asset-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .asset-icon {
          width: 21px;
          height: 21x;
          border-radius: 50%;
          background: linear-gradient(135deg, #26a17b 0%, #1e8a63 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 12px;
        }

        .eth-icon {
          background: linear-gradient(135deg, #627eea 0%, #4c68c7 100%);
        }

        .btc-icon {
          background: linear-gradient(135deg, #f7931a 0%, #e07e00 100%);
        }

        .usdc-icon {
          background: linear-gradient(135deg, #2775ca 0%, #1e63b3 100%);
        }

        .asset-name {
          font-size: 14px;
          font-weight: 600;
          color: #333;
          flex: 1;
        }

        /* Updated Asset Details Layout */
        .asset-details {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          font-size: 12px;
        }

        .asset-column {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .asset-label {
          color: #666;
          white-space: nowrap;
        }

        .asset-value {
          color: #333;
          font-weight: 500;
          white-space: nowrap;
        }

        /* Bottom Navigation */
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          border-top: 1px solid #e9ecef;
          display: flex;
          justify-content: space-around;
          padding: 10px 0;
          max-width: 400px;
          margin: 0 auto;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #666;
          cursor: pointer;
          text-decoration: none;
        }

        .nav-item.active {
          color: #106cf5;
        }

        .nav-icon {
          font-size: 18px;
        }

        /* Content wrapper for scrolling */
        .content-wrapper {
          padding-bottom: 70px;
        }

        .remove_blue {
          color: inherit;
          text-decoration: none;
        }

        .no-assets {
          text-align: center;
          color: #666;
        }

      `}</style>
    </div>
  );
}

export default Wallet;