import{i as t,j as e,L as T,N as U,u as f,A as v,E as h,D as g}from"./index-a3888f1e.js";import $ from"./Currency-bfa22ff5.js";import{u as M}from"./useDispatch-9594a0fd.js";const H=[{path:"/withdraw",icon:"fas fa-arrow-up",name:"Withdraw"},{path:"/deposit",icon:"fas fa-arrow-down",name:"Deposit"},{path:"/transfer",icon:"fas fa-exchange-alt",name:"Transfer"},{path:"/conversion",icon:"fas fa-sync-alt",name:"Swap"}],I=["Exchange","Trade","Perpetual"],Y=()=>{const s=localStorage.getItem("selectedCurrency");return s?JSON.parse(s):{code:"USD",symbol:"$"}},q=s=>{localStorage.setItem("selectedCurrency",JSON.stringify(s))},_=(s,o,l)=>{const r={USD:1,EUR:.85,GBP:.73,JPY:110,CNY:6.5,AUD:1.35,CAD:1.25,CHF:.92,HKD:7.8,SGD:1.35,BTC:25e-6,ETH:4e-4,USDC:1},c=parseFloat(s)||0;return o===l?c.toFixed(2):r[o]&&r[l]?(c/r[o]*r[l]).toFixed(2):c.toFixed(2)},j=t.memo(({item:s})=>e.jsxs(T,{to:s.path,className:"action-item remove_blue",role:"button","aria-label":s.name,children:[e.jsx("div",{className:"action-icon",children:e.jsx("i",{className:s.icon,"aria-hidden":"true"})}),e.jsx("span",{className:"action-label",children:s.name})]}));j.displayName="QuickActionItem";const N=t.memo(({asset:s,currencySymbol:o,hideAmounts:l})=>{const c=(x=>{switch(x){case"ETH":return"asset-icon eth-icon";case"BTC":return"asset-icon btc-icon";case"USDC":return"asset-icon usdc-icon";default:return"asset-icon"}})(s.symbol);return e.jsxs("div",{className:"asset-card",children:[e.jsxs("div",{className:"asset-header",children:[e.jsx("div",{className:c,children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${s.symbol}.png`,alt:s.symbol,style:{width:"100%"},loading:"lazy",onError:x=>{const d=x.currentTarget;d.onerror=null,d.style.display="none",d.parentElement&&(d.parentElement.textContent=s.symbol)}})}),e.jsx("div",{className:"asset-name",children:s.coinName})]}),e.jsxs("div",{className:"asset-details",children:[e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label",children:"Available balance:"}),e.jsx("div",{className:"asset-value",children:l?"****":s.amount})]}),e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label",children:"Frozen amount:"}),e.jsx("div",{className:"asset-value",children:l?"****":s.amountFreezed})]}),e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label",children:"Valuation:"}),e.jsx("div",{className:"asset-value",children:l?"****":`${o}${s.balanceFiat}`})]})]})]})});N.displayName="AssetCard";const y=t.memo(({tab:s,activeTab:o,onTabClick:l})=>e.jsx("div",{className:`account-tab ${o===s?"active":""}`,onClick:()=>l(s),children:s}));y.displayName="AccountTab";function O(){const s=M();U();const o=f(v.selectRows),l=f(v.selectTotalFiat),r=f(v.selectLoading),[c,x]=t.useState("Exchange"),[d,m]=t.useState(!1),[n,w]=t.useState(!1),[i,C]=t.useState(()=>Y()),b=t.useMemo(()=>({USD:"$",EUR:"€",GBP:"£",JPY:"¥",CNY:"¥",AUD:"A$",CAD:"C$",CHF:"CHF",HKD:"HK$",SGD:"S$"}),[]),k=t.useCallback(a=>{x(a),s(h.doFetch(a,i.code))},[s,i.code]),S=t.useCallback(a=>{const p={code:a.code,symbol:a.symbol||b[a.code]||a.code};q(p),C(p),s(h.doFetch(c,a.code)),m(!1)},[s,c,b]),A=()=>{m(!0)},z=()=>{m(!1)},D=()=>{w(!n)},E=t.useMemo(()=>!l||n?"****":`≈ USD ${_(l,i.code,"USD")}`,[l,i.code,n]);t.useEffect(()=>{let a=!0;return(async()=>{if(a)try{await s(h.doFetch(c,i.code))}catch(u){a&&console.error("Error fetching assets:",u)}})(),()=>{a=!1}},[]),t.useEffect(()=>{let a=!0;return(async()=>{if(a)try{await s(h.doFetch(c,i.code))}catch(u){a&&console.error("Error fetching assets:",u)}})(),()=>{a=!1}},[s,c,i.code]);const F=t.useMemo(()=>r?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"asset-card placeholder",children:[e.jsxs("div",{className:"asset-header",children:[e.jsx("div",{className:"asset-icon placeholder-icon"}),e.jsx("div",{className:"asset-name placeholder-text",style:{width:"40%"}})]}),e.jsxs("div",{className:"asset-details",children:[e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label placeholder-text",style:{width:"60%"}}),e.jsx("div",{className:"asset-value placeholder-text",style:{width:"40%"}})]}),e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label placeholder-text",style:{width:"60%"}}),e.jsx("div",{className:"asset-value placeholder-text",style:{width:"40%"}})]}),e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label placeholder-text",style:{width:"60%"}}),e.jsx("div",{className:"asset-value placeholder-text",style:{width:"40%"}})]})]})]}),e.jsxs("div",{className:"asset-card placeholder",children:[e.jsxs("div",{className:"asset-header",children:[e.jsx("div",{className:"asset-icon placeholder-icon"}),e.jsx("div",{className:"asset-name placeholder-text",style:{width:"35%"}})]}),e.jsxs("div",{className:"asset-details",children:[e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label placeholder-text",style:{width:"60%"}}),e.jsx("div",{className:"asset-value placeholder-text",style:{width:"40%"}})]}),e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label placeholder-text",style:{width:"60%"}}),e.jsx("div",{className:"asset-value placeholder-text",style:{width:"40%"}})]}),e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label placeholder-text",style:{width:"60%"}}),e.jsx("div",{className:"asset-value placeholder-text",style:{width:"40%"}})]})]})]}),e.jsxs("div",{className:"asset-card placeholder",children:[e.jsxs("div",{className:"asset-header",children:[e.jsx("div",{className:"asset-icon placeholder-icon"}),e.jsx("div",{className:"asset-name placeholder-text",style:{width:"45%"}})]}),e.jsxs("div",{className:"asset-details",children:[e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label placeholder-text",style:{width:"60%"}}),e.jsx("div",{className:"asset-value placeholder-text",style:{width:"40%"}})]}),e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label placeholder-text",style:{width:"60%"}}),e.jsx("div",{className:"asset-value placeholder-text",style:{width:"40%"}})]}),e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label placeholder-text",style:{width:"60%"}}),e.jsx("div",{className:"asset-value placeholder-text",style:{width:"40%"}})]})]})]})]}):o.length===0?e.jsx("div",{className:"no-assets",children:e.jsxs("div",{className:"asset-card",children:[e.jsxs("div",{className:"asset-header",children:[e.jsx("div",{className:"asset-icon"}),e.jsx("div",{className:"asset-name",children:"No assets found"})]}),e.jsxs("div",{className:"asset-details",children:[e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label",children:"Available balance:"}),e.jsx("div",{className:"asset-value",children:n?"****":"0.00"})]}),e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label",children:"Frozen amount:"}),e.jsx("div",{className:"asset-value",children:n?"****":"0.00"})]}),e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label",children:"Valuation:"}),e.jsx("div",{className:"asset-value",children:n?"****":`${i.symbol}0.00`})]})]})]})}):o.map(a=>e.jsx(N,{asset:a,currencySymbol:i.symbol,hideAmounts:n},a.id)),[o,r,i.symbol,n]);return e.jsxs("div",{className:"container",children:[e.jsx("div",{className:"header",children:e.jsx("div",{className:"nav-bar",children:e.jsx("div",{className:"page-title",children:g("pages.wallet.myAssets")})})}),e.jsxs("div",{className:"content-wrapper",children:[e.jsx("div",{className:"valuation-section",children:e.jsxs("div",{className:"valuation-card",children:[e.jsxs("div",{className:"valuation-header",children:[e.jsxs("div",{className:"valuation-label",children:[e.jsx("i",{className:`fas ${n?"fa-eye":"fa-eye-slash"}`,onClick:D,style:{cursor:"pointer"},"aria-label":n?"Show amounts":"Hide amounts"}),g("pages.wallet.assetValuation")]}),e.jsx("div",{className:"currency-selector-modal",onClick:A,children:e.jsxs("div",{className:"currency-display",children:[e.jsx("span",{className:"currency-symbol",children:i.symbol}),e.jsx("span",{className:"currency-code",children:i.code}),e.jsx("i",{className:"fas fa-chevron-down"})]})})]}),e.jsx("div",{className:"balance-amount",children:r?e.jsx("div",{className:"balance-placeholder placeholder-text"}):n?"****":`${i.symbol}${l}`}),e.jsx("div",{className:"usd-equivalent",children:r?e.jsx("div",{className:"equivalent-placeholder placeholder-text"}):n?"****":E})]})}),e.jsxs("div",{className:"sectionn__assets",children:[e.jsx("div",{className:"actions-section",children:e.jsx("div",{className:"actions-grid",children:H.map(a=>e.jsx(j,{item:a},a.path))})}),e.jsxs("div",{className:"account-section",children:[e.jsx("div",{className:"section-title",children:g("pages.wallet.myAccount")}),e.jsx("div",{className:"account-tabs",children:I.map(a=>e.jsx(y,{tab:a,activeTab:c,onTabClick:k},a))}),e.jsx("div",{className:"asset-list",children:F})]})]})]}),d&&e.jsx($,{isOpen:d,onClose:z,selectedCurrency:i,onSelectCurrency:S}),e.jsx("style",{children:`
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

        .valuation-label i {
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        .valuation-label i:hover {
          opacity: 0.8;
        }

        /* Currency Selector Modal Style */
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
          min-height: 42px;
          display: flex;
          align-items: center;
        }

        .usd-equivalent {
          font-size: 16px;
          min-height: 24px;
          display: flex;
          align-items: center;
        }

        /* Balance Placeholders */
        .balance-placeholder {
          width: 60%;
          height: 32px;
          border-radius: 6px;
        }

        .equivalent-placeholder {
          width: 40%;
          height: 18px;
          border-radius: 4px;
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

        /* Placeholder skeleton loading styles */
        .placeholder {
          animation: shimmer 2s infinite linear;
          background: linear-gradient(
            to right,
            #f6f7f8 0%,
            #edeef1 20%,
            #f6f7f8 40%,
            #f6f7f8 100%
          );
          background-size: 800px 104px;
          position: relative;
          overflow: hidden;
        }

        .placeholder-icon,
        .placeholder-text {
          background-color: #e0e0e0;
          border-radius: 4px;
          background: linear-gradient(
            to right,
            #f6f7f8 0%,
            #edeef1 20%,
            #f6f7f8 40%,
            #f6f7f8 100%
          );
          background-size: 800px 104px;
          animation: shimmer 2s infinite linear;
        }

        .placeholder-text {
          height: 12px;
        }

        .placeholder-icon {
          width: 21px;
          height: 21px;
          border-radius: 50%;
        }

        @keyframes shimmer {
          0% {
            background-position: -400px 0;
          }
          100% {
            background-position: 400px 0;
          }
        }

        .placeholder .asset-card {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
        }

        .placeholder .asset-header,
        .placeholder .asset-details {
          opacity: 0.7;
        }

        /* Specific placeholder styles for better visual hierarchy */
        .placeholder .asset-name.placeholder-text {
          margin-left: 8px;
        }

        .placeholder .asset-column {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .placeholder .asset-label.placeholder-text {
          margin-bottom: 2px;
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
          
          .balance-placeholder {
            width: 70%;
          }
          
          .equivalent-placeholder {
            width: 50%;
          }
        }
      `})]})}const R=t.memo(O);export{R as default};
