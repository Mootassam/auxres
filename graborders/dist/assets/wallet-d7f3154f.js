import{i as t,j as e,L as A,N as T,u as C,A as E,E as l,D as S}from"./index-0794a010.js";import{u as I}from"./useDispatch-40015f82.js";const _=[{path:"/withdraw",icon:"fas fa-arrow-up",name:"Withdraw"},{path:"/deposit",icon:"fas fa-arrow-down",name:"Deposit"},{path:"/transfer",icon:"fas fa-exchange-alt",name:"Transfer"},{path:"/conversion",icon:"fas fa-sync-alt",name:"Swap"}],F=["Exchange","Trade","Perpetual"],D=["10%","15%","8%","12%","6%","10%","5%"],V=["11-19","11-21","11-23","11-25"],$=["7 days","30 days"],f=t.memo(({item:a})=>e.jsxs(A,{to:a.path,className:"action-item remove_blue",role:"button","aria-label":a.name,children:[e.jsx("div",{className:"action-icon",children:e.jsx("i",{className:a.icon,"aria-hidden":"true"})}),e.jsx("span",{className:"action-label",children:a.name})]}));f.displayName="QuickActionItem";const b=t.memo(({asset:a,formatAmount:n})=>{const x=(c=>{switch(c){case"ETH":return"asset-icon eth-icon";case"BTC":return"asset-icon btc-icon";case"USDC":return"asset-icon usdc-icon";default:return"asset-icon"}})(a.symbol);return e.jsxs("div",{className:"asset-card",children:[e.jsxs("div",{className:"asset-header",children:[e.jsx("div",{className:x,children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${a.symbol}.png`,alt:a.symbol,style:{width:"100%"},loading:"lazy",onError:c=>{const r=c.currentTarget;r.onerror=null,r.style.display="none",r.parentElement&&(r.parentElement.textContent=a.symbol)}})}),e.jsx("div",{className:"asset-name",children:a.coinName})]}),e.jsxs("div",{className:"asset-details",children:[e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label",children:"Available balance:"}),e.jsx("div",{className:"asset-value",children:n(a.amount)})]}),e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label",children:"Frozen amount:"}),e.jsx("div",{className:"asset-value",children:"0.00"})]}),e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label",children:"Valuation:"}),e.jsxs("div",{className:"asset-value",children:["$",n(a.amount)]})]})]})]})});b.displayName="AssetCard";const v=t.memo(({activeTimeframe:a,setActiveTimeframe:n})=>e.jsx("div",{className:"timeframe-selector",children:$.map(i=>e.jsx("div",{className:`timeframe ${a===i?"active":""}`,onClick:()=>n(i),children:i},i))}));v.displayName="TimeframeSelector";const j=t.memo(()=>e.jsxs("div",{className:"graph-container",children:[e.jsx("div",{className:"graph-line"}),e.jsx("div",{className:"graph-points",children:D.map((a,n)=>e.jsx("div",{className:"graph-point",style:{height:a}},n))})]}));j.displayName="GraphVisualization";const N=t.memo(({tab:a,activeTab:n,onTabClick:i})=>e.jsx("div",{className:`account-tab ${n===a?"active":""}`,onClick:()=>i(a),children:a}));N.displayName="AccountTab";function L(){const a=I(),n=T(),i=C(E.selectRows),[x,c]=t.useState(n.pathname),[r,w]=t.useState("7 days"),[d,y]=t.useState("Exchange"),m=t.useCallback(s=>{const o=parseFloat(s);return isNaN(o)?"0.00":o%1===0?`${o}.00`:o.toFixed(2)},[]),k=t.useCallback(s=>{y(s)},[]);t.useEffect(()=>{let s=!0,o;return(async()=>{if(s)try{clearTimeout(o),o=setTimeout(async()=>{await a(S.doFetch(d))},150)}catch(p){s&&console.error("Error fetching assets:",p)}})(),()=>{s=!1,clearTimeout(o)}},[a,d]),t.useEffect(()=>{c(n.pathname)},[n.pathname]);const{totalValue:h,totalChange:M}=t.useMemo(()=>{let s=0,o=0;for(const g of i){const p=parseFloat(g.amount||"0");s+=p}return{totalValue:s,totalChange:o}},[i]),u=t.useMemo(()=>h.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2}),[h]),z=t.useMemo(()=>i.length===0?e.jsx("div",{className:"no-assets",children:e.jsxs("div",{className:"asset-card",children:[e.jsxs("div",{className:"asset-header",children:[e.jsx("div",{className:"asset-icon"}),e.jsx("div",{className:"asset-name",children:"No assets found"})]}),e.jsxs("div",{className:"asset-details",children:[e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label",children:"Available balance:"}),e.jsx("div",{className:"asset-value",children:"0.00"})]}),e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label",children:"Frozen amount:"}),e.jsx("div",{className:"asset-value",children:"0.00"})]}),e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label",children:"Valuation:"}),e.jsx("div",{className:"asset-value",children:"$0.00"})]})]})]})}):i.map(s=>e.jsx(b,{asset:s,formatAmount:m},s.id)),[i,m]);return e.jsxs("div",{className:"container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx("div",{className:"back-arrow"}),e.jsx("div",{className:"page-title",children:l("pages.wallet.myAssets")}),e.jsx("div",{className:"header-icon"})]})}),e.jsxs("div",{className:"content-wrapper",children:[e.jsx("div",{className:"valuation-section",children:e.jsxs("div",{className:"valuation-card",children:[e.jsxs("div",{className:"valuation-header",children:[e.jsxs("div",{className:"valuation-label",children:[e.jsx("i",{className:"fas fa-eye-slash"}),l("pages.wallet.assetValuation")]}),e.jsxs("select",{className:"currency-selector",children:[e.jsx("option",{children:"USD"}),e.jsx("option",{children:"EUR"}),e.jsx("option",{children:"CNY"})]})]}),e.jsx("div",{className:"balance-amount",children:u}),e.jsxs("div",{className:"usd-equivalent",children:["≈$",u]}),e.jsxs("div",{className:"earnings-today",children:[l("pages.wallet.todaysEarnings")," 0.00"]})]})}),e.jsxs("div",{className:"sectionn__assets",children:[e.jsxs("div",{className:"earnings-section",children:[e.jsxs("div",{className:"earnings-header",children:[e.jsx("div",{className:"earnings-title",children:l("pages.wallet.earningsTrends")}),e.jsx(v,{activeTimeframe:r,setActiveTimeframe:w})]}),e.jsx(j,{}),e.jsx("div",{className:"graph-dates",children:V.map(s=>e.jsx("div",{children:s},s))}),e.jsx("div",{className:"expand-arrow",children:e.jsx("i",{className:"fas fa-chevron-down"})})]}),e.jsx("div",{className:"actions-section",children:e.jsx("div",{className:"actions-grid",children:_.map(s=>e.jsx(f,{item:s},s.path))})}),e.jsxs("div",{className:"account-section",children:[e.jsx("div",{className:"section-title",children:l("pages.wallet.myAccount")}),e.jsx("div",{className:"account-tabs",children:F.map(s=>e.jsx(N,{tab:s,activeTab:d,onTabClick:k},s))}),e.jsx("div",{className:"asset-list",children:z})]})]})]}),e.jsx("style",{children:`
        .sectionn__assets{ 
          background-color: #fff;
          height: calc(100% - 184px);
          border-radius: 21px 21px 0 0;
          overflow-y: auto;
          will-change: transform;
          margin-bottom: 40px;
        }

        .container {
          max-width: 400px;
          margin: 0 auto;
          height: 100dvh;
          position: relative;
         background: linear-gradient(135deg, #4082e3 0%, #ffffff 100%);
          background-size: cover;
          overflow-y: auto;
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

        .currency-selector {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 6px;
          padding: 4px 8px;
          color: white;
          font-size: 12px;
          cursor: pointer;
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
        }
      `})]})}const G=t.memo(L);export{G as default};
