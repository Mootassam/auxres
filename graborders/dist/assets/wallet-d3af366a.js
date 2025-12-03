import{K as N,u as w,A as y,i,j as e,D as o,L as k,B as z}from"./index-7100f67f.js";import{u as A}from"./useDispatch-b386ec41.js";function F(){const l=A(),r=N(),n=w(y.selectRows),[E,m]=i.useState(r.pathname),[d,p]=i.useState("7 days"),[h,g]=i.useState("Exchange"),u=[{path:"/withdraw",icon:"fas fa-arrow-up",name:"Withdraw"},{path:"/deposit",icon:"fas fa-arrow-down",name:"Deposit"},{path:"/transfer",icon:"fas fa-exchange-alt",name:"Transfer"},{path:"/swap",icon:"fas fa-sync-alt",name:"Swap"}],f=["Exchange","Trade","Perpetual","Finance"],c=i.useCallback(a=>{const s=parseFloat(a);return isNaN(s)?"0.00":s%1===0?s.toString()+".00":s.toFixed(2)},[]);i.useEffect(()=>{let a=!0;return(async()=>{try{await l(z.doFetch())}catch(t){a&&console.error("Error fetching assets:",t)}})(),()=>{a=!1}},[l]),i.useEffect(()=>{m(r.pathname)},[r.pathname]);const{totalValue:x,totalChange:S}=i.useMemo(()=>{let a=0,s=0;return n.forEach(t=>{const j=parseFloat(t.amount||"0");a+=j}),{totalValue:a,totalChange:s}},[n]),v=a=>{switch(a){case"ETH":return"asset-icon eth-icon";case"BTC":return"asset-icon btc-icon";case"USDC":return"asset-icon usdc-icon";default:return"asset-icon"}},b=i.useMemo(()=>n.length===0?e.jsx("div",{className:"no-assets",children:e.jsxs("div",{className:"asset-card",children:[e.jsxs("div",{className:"asset-header",children:[e.jsx("div",{className:"asset-icon"}),e.jsx("div",{className:"asset-name",children:"No assets found"})]}),e.jsxs("div",{className:"asset-details",children:[e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label",children:"Available balance:"}),e.jsx("div",{className:"asset-value",children:"0.00"})]}),e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label",children:"Frozen amount:"}),e.jsx("div",{className:"asset-value",children:"0.00"})]}),e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label",children:"Valuation:"}),e.jsx("div",{className:"asset-value",children:"$0.00"})]})]})]})}):n.map(a=>(parseFloat(a.amount||"0"),e.jsxs("div",{className:"asset-card",children:[e.jsxs("div",{className:"asset-header",children:[e.jsx("div",{className:v(a.symbol),children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${a.symbol}.png`,alt:a.symbol,style:{width:"100%"},onError:s=>{const t=s.currentTarget;t.onerror=null,t.style.display="none",t.parentElement&&(t.parentElement.innerHTML=a.symbol)}})}),e.jsx("div",{className:"asset-name",children:a.coinName})]}),e.jsxs("div",{className:"asset-details",children:[e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label",children:"Available balance:"}),e.jsx("div",{className:"asset-value",children:c(a.amount)})]}),e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label",children:"Frozen amount:"}),e.jsx("div",{className:"asset-value",children:"0.00"})]}),e.jsxs("div",{className:"asset-column",children:[e.jsx("div",{className:"asset-label",children:"Valuation:"}),e.jsxs("div",{className:"asset-value",children:["$",c(a.amount)]})]})]})]},a.id))),[n,c]);return e.jsxs("div",{className:"container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx("div",{className:"back-arrow"}),e.jsx("div",{className:"page-title",children:o("pages.wallet.myAssets")}),e.jsx("div",{className:"header-icon"})]})}),e.jsxs("div",{className:"content-wrapper",children:[e.jsx("div",{className:"valuation-section",children:e.jsxs("div",{className:"valuation-card",children:[e.jsxs("div",{className:"valuation-header",children:[e.jsxs("div",{className:"valuation-label",children:[e.jsx("i",{className:"fas fa-eye-slash"}),o("pages.wallet.assetValuation")]}),e.jsxs("select",{className:"currency-selector",children:[e.jsx("option",{children:"USD"}),e.jsx("option",{children:"EUR"}),e.jsx("option",{children:"CNY"})]})]}),e.jsx("div",{className:"balance-amount",children:x.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})}),e.jsxs("div",{className:"usd-equivalent",children:["≈$",x.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})]}),e.jsxs("div",{className:"earnings-today",children:[o("pages.wallet.todaysEarnings")," 0.00"]})]})}),e.jsxs("div",{className:"sectionn__assets",children:[e.jsxs("div",{className:"earnings-section",children:[e.jsxs("div",{className:"earnings-header",children:[e.jsx("div",{className:"earnings-title",children:o("pages.wallet.earningsTrends")}),e.jsxs("div",{className:"timeframe-selector",children:[e.jsx("div",{className:`timeframe ${d==="7 days"?"active":""}`,onClick:()=>p("7 days"),children:"7 days"}),e.jsx("div",{className:`timeframe ${d==="30 days"?"active":""}`,onClick:()=>p("30 days"),children:"30 days"})]})]}),e.jsxs("div",{className:"graph-container",children:[e.jsx("div",{className:"graph-line"}),e.jsxs("div",{className:"graph-points",children:[e.jsx("div",{className:"graph-point",style:{height:"10%"}}),e.jsx("div",{className:"graph-point",style:{height:"15%"}}),e.jsx("div",{className:"graph-point",style:{height:"8%"}}),e.jsx("div",{className:"graph-point",style:{height:"12%"}}),e.jsx("div",{className:"graph-point",style:{height:"6%"}}),e.jsx("div",{className:"graph-point",style:{height:"10%"}}),e.jsx("div",{className:"graph-point",style:{height:"5%"}})]})]}),e.jsxs("div",{className:"graph-dates",children:[e.jsx("div",{children:"11-19"}),e.jsx("div",{children:"11-21"}),e.jsx("div",{children:"11-23"}),e.jsx("div",{children:"11-25"})]}),e.jsx("div",{className:"expand-arrow",children:e.jsx("i",{className:"fas fa-chevron-down"})})]}),e.jsx("div",{className:"actions-section",children:e.jsx("div",{className:"actions-grid",children:u.map(a=>e.jsxs(k,{to:a.path,className:"action-item remove_blue",role:"button","aria-label":a.name,children:[e.jsx("div",{className:"action-icon",children:e.jsx("i",{className:a.icon,"aria-hidden":"true"})}),e.jsx("span",{className:"action-label",children:a.name})]},a.path))})}),e.jsxs("div",{className:"account-section",children:[e.jsx("div",{className:"section-title",children:o("pages.wallet.myAccount")}),e.jsx("div",{className:"account-tabs",children:f.map(a=>e.jsx("div",{className:`account-tab ${h===a?"active":""}`,onClick:()=>g(a),children:a},a))}),e.jsx("div",{className:"asset-list",children:b})]})]})]}),e.jsx("style",{children:`
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
          background-image: url('./images/background.png');
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

      `})]})}export{F as default};
