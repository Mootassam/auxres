import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  memo,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import assetsActions from "src/modules/assets/list/assetsListActions";
import assetsListSelectors from "src/modules/assets/list/assetsListSelectors";
import { i18n } from "../../../i18n";
import CurrencyModal from "../currency/Currency";

// Constants
const QUICK_ACTIONS = [
  { path: "/withdraw", icon: "fas fa-arrow-up", name: "Withdraw" },
  { path: "/deposit", icon: "fas fa-arrow-down", name: "Deposit" },
  { path: "/transfer", icon: "fas fa-exchange-alt", name: "Transfer" },
  { path: "/conversion", icon: "fas fa-sync-alt", name: "Swap" },
];

const ACCOUNT_TABS = ["Exchange", "Trade", "Perpetual"];
const TIMEFRAMES = ["7 days", "30 days"];

// Helper function to get/set currency from localStorage
const getStoredCurrency = () => {
  const stored = localStorage.getItem('selectedCurrency');
  return stored ? JSON.parse(stored) : { code: "USD", symbol: "$" };
};

const setStoredCurrency = (currency) => {
  localStorage.setItem('selectedCurrency', JSON.stringify(currency));
};

// Memoized components
const QuickActionItem = memo(({ item }: { item: typeof QUICK_ACTIONS[0] }) => (
  <Link
    to={item.path}
    className="action-item remove_blue"
    role="button"
    aria-label={item.name}
  >
    <div className="action-icon">
      <i className={item.icon} aria-hidden="true" />
    </div>
    <span className="action-label">{item.name}</span>
  </Link>
));

QuickActionItem.displayName = 'QuickActionItem';

const AssetCard = memo(({ asset, currencySymbol }: { 
  asset: any; 
  currencySymbol: string;
}) => {
  const getAssetIconClass = (symbol: string) => {
    switch (symbol) {
      case "ETH": return "asset-icon eth-icon";
      case "BTC": return "asset-icon btc-icon";
      case "USDC": return "asset-icon usdc-icon";
      default: return "asset-icon";
    }
  };

  const assetIconClass = getAssetIconClass(asset.symbol);

  return (
    <div className="asset-card">
      <div className="asset-header">
        <div className={assetIconClass}>
          <img
            src={`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${asset.symbol}.png`}
            alt={asset.symbol}
            style={{ width: '100%' }}
            loading="lazy"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const img = e.currentTarget;
              img.onerror = null;
              img.style.display = 'none';
              if (img.parentElement) {
                img.parentElement.textContent = asset.symbol;
              }
            }}
          />
        </div>
        <div className="asset-name">{asset.coinName}</div>
      </div>
      <div className="asset-details">
        <div className="asset-column">
          <div className="asset-label">Available balance:</div>
          <div className="asset-value">{asset.amount}</div>
        </div>
        <div className="asset-column">
          <div className="asset-label">Frozen amount:</div>
          <div className="asset-value">{asset.amountFreezed}</div>
        </div>
        <div className="asset-column">
          <div className="asset-label">Valuation:</div>
          <div className="asset-value">
            {currencySymbol}{asset.balanceFiat}
          </div>
        </div>
      </div>
    </div>
  );
});

AssetCard.displayName = 'AssetCard';

const TimeframeSelector = memo(({
  activeTimeframe,
  setActiveTimeframe
}: {
  activeTimeframe: string;
  setActiveTimeframe: (timeframe: string) => void;
}) => (
  <div className="timeframe-selector">
    {TIMEFRAMES.map((timeframe) => (
      <div
        key={timeframe}
        className={`timeframe ${activeTimeframe === timeframe ? "active" : ""}`}
        onClick={() => setActiveTimeframe(timeframe)}
      >
        {timeframe}
      </div>
    ))}
  </div>
));

TimeframeSelector.displayName = 'TimeframeSelector';

const AccountTab = memo(({
  tab,
  activeTab,
  onTabClick
}: {
  tab: string;
  activeTab: string;
  onTabClick: (tab: string) => void;
}) => (
  <div
    className={`account-tab ${activeTab === tab ? "active" : ""}`}
    onClick={() => onTabClick(tab)}
  >
    {tab}
  </div>
));

AccountTab.displayName = 'AccountTab';

// Main component
function Wallet() {
  const dispatch = useDispatch();
  const location = useLocation();
  
  // Selectors
  const listAssets = useSelector(assetsListSelectors.selectRows);
  const selectTotalFiat = useSelector(assetsListSelectors.selectTotalFiat);
  const loading = useSelector(assetsListSelectors.selectLoading);
  
  // State with localStorage initialization
  const [activeItem, setActiveItem] = useState<string>(location.pathname);
  const [activeTimeframe, setActiveTimeframe] = useState("7 days");
  const [activeTab, setActiveTab] = useState("Exchange");
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  
  // Get initial currency from localStorage
  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    return getStoredCurrency();
  });

  // Currency symbols mapping
  const CURRENCY_SYMBOLS = useMemo(() => ({
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CNY: '¥',
    AUD: 'A$',
    CAD: 'C$',
    CHF: 'CHF',
    HKD: 'HK$',
    SGD: 'S$'
  }), []);

  // Memoized callbacks
  const handleTabClick = useCallback((tab: string) => {
    setActiveTab(tab);
    // Dispatch to fetch assets for the selected tab with current currency
    dispatch(assetsActions.doFetch(tab, selectedCurrency.code));
  }, [dispatch, selectedCurrency.code]);

  const handleCurrencySelect = useCallback((currency: any) => {
    // Update localStorage and state
    const newCurrency = {
      code: currency.code,
      symbol: currency.symbol || CURRENCY_SYMBOLS[currency.code] || currency.code
    };
    
    setStoredCurrency(newCurrency);
    setSelectedCurrency(newCurrency);
    
    // Fetch assets with the new currency and current tab
    dispatch(assetsActions.doFetch(activeTab, currency.code));
    setIsCurrencyModalOpen(false);
  }, [dispatch, activeTab, CURRENCY_SYMBOLS]);

  const openCurrencyModal = () => {
    setIsCurrencyModalOpen(true);
  };

  const closeCurrencyModal = () => {
    setIsCurrencyModalOpen(false);
  };

  // Initial fetch on mount
  useEffect(() => {
    let isMounted = true;

    const fetchAssets = async () => {
      if (!isMounted) return;

      try {
        await dispatch(assetsActions.doFetch(activeTab, selectedCurrency.code));
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
  }, []); // Only run on mount

  // Fetch assets when activeTab changes
  useEffect(() => {
    let isMounted = true;

    const fetchAssets = async () => {
      if (!isMounted) return;

      try {
        await dispatch(assetsActions.doFetch(activeTab, selectedCurrency.code));
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
  }, [dispatch, activeTab, selectedCurrency.code]);

  // Update active item when route changes
  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  // Memoize rendered assets
  const renderedAssets = useMemo(() => {
    if (loading) {
      return (
        <div className="no-assets">
          <div className="asset-card">
            <div className="asset-header">
              <div className="asset-icon"></div>
              <div className="asset-name">Loading assets...</div>
            </div>
            <div className="asset-details">
              <div className="asset-column">
                <div className="asset-label">Available balance:</div>
                <div className="asset-value">...</div>
              </div>
              <div className="asset-column">
                <div className="asset-label">Frozen amount:</div>
                <div className="asset-value">...</div>
              </div>
              <div className="asset-column">
                <div className="asset-label">Valuation:</div>
                <div className="asset-value">{selectedCurrency.symbol}...</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

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
                <div className="asset-value">{selectedCurrency.symbol}0.00</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return listAssets.map((asset) => (
      <AssetCard
        key={asset.id}
        asset={asset}
        currencySymbol={selectedCurrency.symbol}
      />
    ));
  }, [listAssets, loading, selectedCurrency.symbol]);

  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <div className="nav-bar">
          <div className="back-arrow"></div>
          <div className="page-title">{i18n("pages.wallet.myAssets")}</div>
          <div className="header-icon"></div>
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
              {/* Currency Selector - Shows the selected currency */}
              <div className="currency-selector-modal" onClick={openCurrencyModal}>
                <div className="currency-display">
                  <span className="currency-symbol">{selectedCurrency.symbol}</span>
                  <span className="currency-code">{selectedCurrency.code}</span>
                  <i className="fas fa-chevron-down"></i>
                </div>
              </div>
            </div>
            <div className="balance-amount">
              {selectedCurrency.symbol}{selectTotalFiat}
            </div>
            <div className="usd-equivalent">
              ≈{selectedCurrency.code} {selectTotalFiat}
            </div>
          </div>
        </div>

        <div className="sectionn__assets">
          {/* Action Buttons */}
          <div className="actions-section">
            <div className="actions-grid">
              {QUICK_ACTIONS.map((item) => (
                <QuickActionItem key={item.path} item={item} />
              ))}
            </div>
          </div>

          {/* My Account Section */}
          <div className="account-section">
            <div className="section-title">{i18n("pages.wallet.myAccount")}</div>
            <div className="account-tabs">
              {ACCOUNT_TABS.map((tab) => (
                <AccountTab
                  key={tab}
                  tab={tab}
                  activeTab={activeTab}
                  onTabClick={handleTabClick}
                />
              ))}
            </div>
            <div className="asset-list">{renderedAssets}</div>
          </div>
        </div>
      </div>

      {/* Currency Selection Modal */}
      {isCurrencyModalOpen && (
        <CurrencyModal
          isOpen={isCurrencyModalOpen}
          onClose={closeCurrencyModal}
          selectedCurrency={selectedCurrency}
          onSelectCurrency={handleCurrencySelect}
        />
      )}


      <style>{`
        .sectionn__assets{ 
          background-color: #fff;
          border-radius: 21px 21px 0 0;
          overflow-y: auto;
          will-change: transform;
          margin-bottom: 40px;
          height:100dvh;
          padding-bottom: 250px;
        }

        .container {
          max-width: 400px;
          margin: 0 auto;
          height: 100dvh;
          position: relative;
          background: linear-gradient(135deg, #4082e3 0%, #ffffff 100%);
          background-size: cover;
          background-repeat: no-repeat;
          contain: layout style paint;
        }

        .header {
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
          text-align: center;
          width: 200px;
        }

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

        /* New Currency Selector Modal Style */
        .currency-selector-modal {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 6px;
          padding: 6px 12px;
          color: white;
          font-size: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
          user-select: none;
          min-width: 70px;
          justify-content: center;
        }

        .currency-selector-modal:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }

        .currency-display {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 500;
        }

        .currency-display i {
          font-size: 10px;
          transition: transform 0.2s ease;
        }

        .currency-selector-modal:hover .currency-display i {
          transform: translateY(1px);
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
          user-select: none;
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
          transition: height 0.3s ease;
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
          cursor: pointer;
        }

        .actions-section {
          padding: 20px 20px 20px;
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
          padding: 8px 0;
          background: #f2f4f7;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          color: inherit;
          will-change: transform;
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
          margin-top: 4px;
        }

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
          user-select: none;
        }

        .account-tab.active {
          background: white;
          color: #106cf5;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .asset-card {
          background: #f2f4f7;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          transition: transform 0.2s ease;
        }

        .asset-card:hover {
          transform: translateY(-1px);
        }

        .asset-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .asset-icon {
          width: 21px;
          height: 21px;
          border-radius: 50%;
          background: linear-gradient(135deg, #26a17b 0%, #1e8a63 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 12px;
          flex-shrink: 0;
          overflow: hidden;
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
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

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
          min-width: 100px;
        }

        .asset-label {
          color: #666;
          white-space: nowrap;
          font-size: 11px;
          margin-bottom: 2px;
        }

        .asset-value {
          color: #333;
          font-weight: 500;
          white-space: nowrap;
          font-size: 13px;
        }

        .remove_blue {
          color: inherit;
          text-decoration: none;
        }

        .no-assets {
          text-align: center;
          color: #666;
          padding: 20px;
        }

        @media (max-width: 400px) {
          .asset-details {
            flex-direction: column;
            gap: 12px;
          }
          
          .asset-column {
            width: 100%;
            flex-direction: row;
            justify-content: space-between;
          }
          
          .actions-grid {
            gap: 10px;
          }
          
          .action-label {
            font-size: 11px;
          }
          
          .currency-selector-modal {
            padding: 5px 10px;
            min-width: 60px;
          }
        }
      `}</style>
    </div>
  );
}

// Export memoized component
export default memo(Wallet);