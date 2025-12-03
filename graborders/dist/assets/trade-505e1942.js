import{u as X,z as xe,A as be,i as a,B as fe,C as ge,D as o,E as Y,j as e,L as he}from"./index-c64ab60b.js";import{C as ye}from"./CoinSelectorSidebar-848ea6f2.js";import{u as ke}from"./useDispatch-98cd10f7.js";const p=m=>{if(m==null||m==="")return NaN;const S=Number(m);return Number.isFinite(S)?S:NaN};function Se(){const m=ke(),S=X(xe.selectRows)||[],I=X(be.selectRows)||[],[i,Z]=a.useState("BTCUSDT"),[f,ee]=a.useState("0"),[Ne,te]=a.useState("0"),[re,F]=a.useState(!1),[c,ae]=a.useState("LIMIT"),[x,z]=a.useState("0"),[g,C]=a.useState(""),[se,y]=a.useState(""),[l,$]=a.useState("buy"),[D,oe]=a.useState({asks:[],bids:[]}),[k,R]=a.useState(!0),[M,q]=a.useState(!1),[V,T]=a.useState(""),[A,ne]=a.useState("Orders"),B=a.useRef(null),K=a.useRef(null),O=a.useRef(i),Q=a.useRef(null),N=a.useRef(!0),W=a.useMemo(()=>Array.isArray(I)?I.reduce((t,r)=>(t[r.symbol]=Number(r.amount)||0,t),{}):{},[I]),v=a.useMemo(()=>i.replace("USDT",""),[i]),h=a.useMemo(()=>l==="buy"?W.USDT||0:W[v]||0,[l,v,W]),b=a.useCallback((t,r=2)=>{const s=Number(t);return Number.isFinite(s)?s.toLocaleString(void 0,{minimumFractionDigits:r,maximumFractionDigits:r}):0 .toFixed(r)},[]),_=a.useCallback(()=>{const t=Date.now().toString(36),r=Math.floor(Math.random()*1e6).toString(36);return`ORD-${t}-${r}`.toUpperCase()},[]),H=a.useCallback(()=>{Q.current&&(Q.current.abort(),Q.current=null)},[]),P=a.useCallback(()=>{[B,K].forEach(t=>{if(t.current){try{t.current.onclose=null,t.current.close()}catch{}t.current=null}})},[]);a.useEffect(()=>{N.current=!0,m(fe.doFetch()),m(ge.doFetcPending());const t=setTimeout(()=>{N.current&&R(!1)},400);return()=>{N.current=!1,clearTimeout(t),H(),P()}},[m,H,P]),a.useEffect(()=>{if(f&&f!=="0"&&(z(f),g&&!isNaN(Number(g)))){const t=Number(g)*Number(f);y(t.toFixed(2))}},[f,g]);const L=a.useCallback(t=>{const r=p(t),s=p(x);if(Number.isFinite(r)&&Number.isFinite(s)&&s>0){const n=r/s;C(n.toFixed(8))}else C("")},[x]),E=a.useCallback(t=>{const r=p(t),s=p(x);if(Number.isFinite(r)&&Number.isFinite(s)){const n=r*s;y(n.toFixed(2))}else y("")},[x]),ie=a.useCallback(t=>{const r=t.target.value;C(r),E(r)},[E]),ce=a.useCallback(t=>{const r=t.target.value;y(r),L(r)},[L]);a.useEffect(()=>{O.current=i;const t=(n,j,u)=>{if(!N.current||O.current!==i)return null;try{const d=new WebSocket(n);return d.onopen=()=>{console.log(`${u} WebSocket connected for:`,i)},d.onmessage=U=>{if(!(!N.current||O.current!==i))try{const w=JSON.parse(U.data);j(w)}catch(w){console.error(`Error parsing ${u} data:`,w)}},d.onerror=U=>{console.error(`${u} WebSocket error:`,U)},d.onclose=U=>{console.log(`${u} WebSocket closed for:`,i),N.current&&O.current===i&&U.code!==1e3&&setTimeout(()=>{if(N.current&&O.current===i){const w=t(n,j,u);u==="ticker"&&w?B.current=w:u==="depth"&&w&&(K.current=w)}},1e3)},d}catch(d){return console.error(`Error creating ${u} WebSocket:`,d),null}};P();const r=`wss://stream.binance.com:9443/ws/${i.toLowerCase()}@ticker`;B.current=t(r,n=>{n.c!==void 0&&ee(n.c),n.P!==void 0&&te(n.P)},"ticker");const s=`wss://stream.binance.com:9443/ws/${i.toLowerCase()}@depth20@100ms`;return K.current=t(s,n=>{const j=(n.asks||[]).slice(0,5).map(d=>({price:d[0],amount:d[1]})),u=(n.bids||[]).slice(0,5).map(d=>({price:d[0],amount:d[1]}));oe({asks:j,bids:u})},"depth"),()=>{P()}},[i,P]);const J=a.useMemo(()=>{const t=[...D.asks.map(r=>p(r.amount)),...D.bids.map(r=>p(r.amount))].filter(r=>Number.isFinite(r));return Math.max(...t,1)},[D]),le=a.useCallback(()=>F(!0),[]);a.useCallback(()=>F(!1),[]);const de=a.useCallback(t=>{if(!t||t===i){F(!1);return}Z(t),F(!1),R(!0),C(""),y("");const r=setTimeout(()=>{N.current&&R(!1)},300);return()=>clearTimeout(r)},[i]),pe=a.useCallback(t=>{const r=t.target.value;z(r);const s=p(g);if(Number.isFinite(s)){const n=s*Number(r);y(n.toFixed(2))}},[g]);a.useCallback(t=>{if(l==="buy"){const s=h*t;y(s.toFixed(2)),L(s)}else{const s=h*t;C(s.toFixed(8)),E(s)}},[l,h,L,E]),a.useCallback(()=>{const t=p(x),r=Number.isFinite(t)?t+1:p(f)||0;z(r.toString())},[x,f]),a.useCallback(()=>{const t=p(x);if(!Number.isFinite(t))return;const r=Math.max(1e-4,t-1);z(r.toString())},[x]);const G=a.useCallback(t=>{c==="LIMIT"&&t!==void 0&&z(t.toString())},[c]),ue=a.useCallback(async()=>{if(T(""),M)return;const t=p(g),r=p(c==="MARKET"?f:x);if(!Number.isFinite(t)||t<=0){T(o("pages.trade.errors.invalidQuantity"));return}if(!Number.isFinite(r)||r<=0){T(o("pages.trade.errors.invalidPrice"));return}if(l==="buy"){if(r*t>h){T(o("pages.trade.errors.insufficientUSDT",b(h,2)));return}}else if(t>h){T(o("pages.trade.errors.insufficientCoin",b(h,6),v));return}q(!0);try{const s=r,n=t,j=s*n,u=j*.001,d={orderNo:_(),orderType:c.toLowerCase(),tradingPair:i.replace("USDT","/USDT"),status:c==="MARKET"?"completed":"pending",direction:l.toUpperCase(),delegateType:c,delegateState:c==="MARKET"?"Filled":"Pending",orderQuantity:n,commissionPrice:s,entrustedValue:j,transactionQuantity:c==="MARKET"?n:0,transactionValue:c==="MARKET"?j:0,closingPrice:c==="MARKET"?s:0,handlingFee:c==="MARKET"?u:0,commissionTime:new Date().toISOString(),closingTime:c==="MARKET"?new Date().toISOString():null};await m(Y.doCreate(d)),C(""),y("")}catch(s){console.error("Place order error",s),T(o("pages.trade.errors.failedOrder"))}finally{q(!1)}},[M,g,c,f,x,i,l,m,_,h,v,b]),me=async(t,r)=>{r.status="canceled",m(Y.doUpdate(t,r))};return e.jsxs("div",{className:"container",children:[e.jsx("div",{className:"trade-header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsxs("div",{className:"back-arrow",children:[e.jsxs("div",{className:"trading-pair",onClick:le,children:[e.jsx("i",{className:"fas fa-chevron-down dropdown-arrow"}),i.replace("USDT","")," / USDT"]}),e.jsx("div",{children:e.jsx("p",{style:{fontSize:10},children:"Perpetual"})})]}),e.jsxs("div",{className:"header-right",children:[e.jsxs("select",{className:"trade-type-select",children:[e.jsx("option",{value:"trade",children:"Trade"}),e.jsx("option",{value:"perpetual",children:"Perpetual"})]}),e.jsx(he,{to:`market/detail/${i}`,className:"chart-icon",children:e.jsx("i",{className:"fas fa-chart-line"})})]})]})}),e.jsxs("div",{className:"main-content",children:[e.jsxs("div",{className:"trading-layout",children:[e.jsxs("div",{className:"trade-form",children:[e.jsx("div",{className:"buy-sell-tabs",role:"tablist",children:k?e.jsx("div",{className:"skeleton-tab"}):e.jsxs(e.Fragment,{children:[e.jsx("div",{role:"tab","aria-selected":l==="buy",tabIndex:0,className:`buy-tab ${l==="buy"?"active":""}`,onClick:()=>$("buy"),onKeyDown:t=>t.key==="Enter"&&$("buy"),children:o("pages.trade.buy")}),e.jsx("div",{role:"tab","aria-selected":l==="sell",tabIndex:0,className:`sell-tab ${l==="sell"?"active":""}`,onClick:()=>$("sell"),onKeyDown:t=>t.key==="Enter"&&$("sell"),children:o("pages.trade.sell")})]})}),e.jsxs("div",{className:"order-type",children:[e.jsx("div",{className:"order-type-label",children:o("pages.trade.orderType")}),k?e.jsx("div",{className:"skeleton-input"}):e.jsxs("select",{className:"order-type-select",value:c,onChange:t=>ae(t.target.value),children:[e.jsx("option",{value:"LIMIT",children:o("pages.trade.limit")}),e.jsx("option",{value:"MARKET",children:o("pages.trade.market")})]})]}),c==="LIMIT"&&e.jsxs("div",{className:"input-group",children:[e.jsx("div",{className:"input-label",children:o("pages.trade.price")}),k?e.jsx("div",{className:"skeleton-input"}):e.jsx("div",{className:"input-with-buttons",children:e.jsx("input",{className:"value-input",value:x,onChange:pe,inputMode:"decimal","aria-label":"price"})})]}),e.jsxs("div",{className:"input-group",children:[e.jsxs("div",{className:"input-label",children:[o("pages.trade.amount")," (",v,")"]}),k?e.jsx("div",{className:"skeleton-input"}):e.jsx("div",{className:"input-with-buttons",children:e.jsx("input",{className:"value-input",value:g,onChange:ie,placeholder:"0.0",inputMode:"decimal","aria-label":"quantity"})})]}),e.jsxs("div",{className:"input-group",children:[e.jsxs("div",{className:"input-label",children:[o("pages.trade.amount")," (USDT)"]}),k?e.jsx("div",{className:"skeleton-input"}):e.jsx("input",{className:"value-input",value:se,onChange:ce,placeholder:"0.0",inputMode:"decimal","aria-label":"amount in usdt"})]}),k?e.jsx("div",{className:"skeleton-balance"}):e.jsxs("div",{className:"balance-info",children:[o("pages.trade.available"),": ",b(h,l==="buy"?2:6)," ",l==="buy"?"USDT":v]}),V&&e.jsx("div",{className:"error-message",role:"alert",children:V}),k?e.jsx("div",{className:"skeleton-button"}):e.jsx("button",{className:`action-button ${l==="buy"?"buy-button":"sell-button"}`,onClick:ue,disabled:M,"aria-busy":M,children:M?o("pages.trade.placing"):`${l==="buy"?o("pages.trade.buy"):o("pages.trade.sell")} ${v}`})]}),e.jsxs("div",{className:"order-book",role:"region","aria-label":"order book",children:[e.jsxs("div",{className:"order-book-header",children:[e.jsx("span",{children:o("pages.trade.orderBook.price")}),e.jsxs("span",{children:[o("pages.trade.orderBook.amount")," (",v,")"]})]}),k?e.jsxs(e.Fragment,{children:[[...Array(5)].map((t,r)=>e.jsx("div",{className:"skeleton-order-book"},`s-a-${r}`)),e.jsx("div",{className:"skeleton-current-price"}),[...Array(5)].map((t,r)=>e.jsx("div",{className:"skeleton-order-book"},`s-b-${r}`))]}):e.jsxs(e.Fragment,{children:[D.asks.map((t,r)=>{const s=p(t.amount)||0,n=Math.min(100,s/J*100);return e.jsxs("div",{className:"order-book-row ask-row",onClick:()=>G(t.price),children:[e.jsx("div",{className:"depth-bar ask-depth",style:{width:`${n}%`}}),e.jsx("div",{className:"order-price",children:b(t.price,4)}),e.jsx("div",{className:"order-amount",children:b(t.amount,4)})]},`ask-${r}`)}),e.jsx("div",{className:"order-book-row current-price-row",children:e.jsxs("div",{className:"current-price",children:["$",b(f,2)]})}),D.bids.map((t,r)=>{const s=p(t.amount)||0,n=Math.min(100,s/J*100);return e.jsxs("div",{className:"order-book-row bid-row",onClick:()=>G(t.price),children:[e.jsx("div",{className:"depth-bar bid-depth",style:{width:`${n}%`}}),e.jsx("div",{className:"order-price",children:b(t.price,4)}),e.jsx("div",{className:"order-amount",children:b(t.amount,4)})]},`bid-${r}`)})]})]})]}),e.jsxs("div",{className:"orders-tabs",children:[e.jsx("div",{className:"orders-tabs-header",children:["Positions","Orders","History orders","Transaction history"].map(t=>e.jsx("div",{className:`orders-tab ${A===t?"active":""}`,onClick:()=>ne(t),children:t},t))}),e.jsxs("div",{className:"orders-tab-content",children:[A==="Orders"&&e.jsx(e.Fragment,{children:S&&S.length>0?e.jsx("div",{className:"orders-list",children:S.map(t=>{var r;return e.jsxs("div",{className:"order-item",children:[e.jsxs("div",{className:"order-main-info",children:[e.jsxs("div",{className:"order-pair-action",children:[e.jsx("span",{className:"order-pair",children:t.tradingPair}),e.jsx("span",{className:`order-action ${String((t==null?void 0:t.direction)||"").toLowerCase()}`,children:t.direction}),e.jsx("span",{className:"order-type-badge",children:t.orderType})]}),e.jsxs("div",{className:"order-date",children:[t.commissionTime?new Date(t.commissionTime).toLocaleDateString():"",e.jsx("span",{className:"order-time",children:t.commissionTime?new Date(t.commissionTime).toLocaleTimeString():""})]})]}),e.jsxs("div",{className:"order-details",children:[e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:o("pages.trade.openOrders.status")}),e.jsx("span",{className:`order-status ${String(t.status).toLowerCase()}`,children:t.status})]}),e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:o("pages.trade.openOrders.price")}),e.jsxs("span",{className:"order-price-value",children:[b(t.commissionPrice,4)," USDT"]})]}),e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:o("pages.trade.openOrders.amount")}),e.jsxs("span",{className:"order-amount-value",children:[t.orderQuantity," ",(r=t==null?void 0:t.tradingPair)==null?void 0:r.split("/")[0]]})]}),e.jsxs("div",{className:"order-detail",children:[e.jsx("span",{className:"detail-label",children:o("pages.trade.openOrders.total")}),e.jsxs("span",{className:"order-total",children:[b(t.entrustedValue)," USDT"]})]})]}),e.jsx("div",{className:"order-actions",children:String(t.status).toLowerCase()==="pending"||String(t.status).toLowerCase()==="partially filled"?e.jsx("button",{className:"cancel-order-btn",onClick:()=>me(t.id,t),children:o("pages.trade.openOrders.cancel")}):e.jsx("div",{className:"completed-indicator",children:e.jsx("i",{className:"fas fa-check-circle"})})})]},t.id??t.orderNo)})}):e.jsxs("div",{className:"empty-orders",children:[e.jsx("div",{className:"empty-icon",children:e.jsx("i",{className:"fas fa-clipboard-list"})}),e.jsx("div",{className:"empty-text",children:o("pages.trade.openOrders.noOrders")}),e.jsx("div",{className:"empty-subtext",children:o("pages.trade.openOrders.noOrdersSubtext")})]})}),A!=="Orders"&&e.jsxs("div",{className:"empty-tab-content",children:[e.jsx("div",{className:"empty-icon",children:e.jsx("i",{className:"fas fa-clipboard-list"})}),e.jsxs("div",{className:"empty-text",children:["No ",A.toLowerCase()," available"]})]})]})]})]}),e.jsx(ye,{isOpen:re,onClose:()=>F(!1),selectedCoin:i,onCoinSelect:de,title:"Select Trading Pair"}),e.jsx("style",{children:`
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
          font-size: 12px;
          padding: 8px;
          background: transparent;
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
      `})]})}export{Se as default};
