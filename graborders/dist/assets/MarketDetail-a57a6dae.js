import{n as re,t as ne,S as le,i,o as A,j as e}from"./index-3c6c971f.js";import{F as oe}from"./FuturesChart-344d8cd4.js";import{C as ce}from"./CoinSelectorSidebar-93ca996d.js";function de(){const B=ne(),{id:p}=le(),[f,S]=i.useState(null),[b,k]=i.useState(null),[I,T]=i.useState(null),[V,C]=i.useState(null),[Q,D]=i.useState(null),[X,U]=i.useState(null),[G,L]=i.useState([]),[g,R]=i.useState(null),[o,te]=i.useState(p||"BTCUSDT"),[me,z]=i.useState(!0),[P,K]=i.useState("orderBook"),[W,H]=i.useState(!1),q=i.useRef(null),M=i.useRef(null),O=i.useRef(null),x=i.useRef(o),N=i.useRef({}),w=i.useRef(null),Y=[{symbol:"BTCUSDT",name:"BTC / USDT"},{symbol:"ETHUSDT",name:"ETH / USDT"},{symbol:"DOTUSDT",name:"DOT / USDT"},{symbol:"XRPUSDT",name:"XRP / USDT"},{symbol:"LINKUSDT",name:"LINK / USDT"},{symbol:"BCHUSDT",name:"BCH / USDT"},{symbol:"LTCUSDT",name:"LTC / USDT"},{symbol:"ADAUSDT",name:"ADA / USDT"},{symbol:"EOSUSDT",name:"EOS / USDT"},{symbol:"TRXUSDT",name:"TRX / USDT"},{symbol:"DASHUSDT",name:"DASH / USDT"},{symbol:"FILUSDT",name:"FIL / USDT"},{symbol:"YFIUSDT",name:"YFI / USDT"},{symbol:"ZECUSDT",name:"ZEC / USDT"},{symbol:"DOGEUSDT",name:"DOGE / USDT"}],v=i.useCallback((t,s=4)=>{const n=Number(t);return isNaN(n)?"0.0000":n.toLocaleString(void 0,{minimumFractionDigits:s,maximumFractionDigits:s})},[]),$=i.useCallback(t=>{const s=Number(t);return isNaN(s)?"0.00":s>=1e9?(s/1e9).toFixed(2)+"B":s>=1e6?(s/1e6).toFixed(2)+"M":s>=1e3?(s/1e3).toFixed(2)+"K":s.toFixed(2)},[]),F=i.useCallback(()=>{Object.values(N.current).forEach(t=>{t&&clearTimeout(t)}),N.current={},[q,M,O].forEach(t=>{if(t.current){try{t.current.onclose=null,t.current.close()}catch(s){console.warn("Error closing WebSocket:",s)}t.current=null}})},[]),E=i.useCallback(()=>{w.current&&(w.current.abort(),w.current=null)},[]),Z=i.useCallback(()=>{S(null),k(null),T(null),C(null),D(null),U(null),L([]),R(null)},[]);i.useEffect(()=>{p&&p!==o&&(console.log("Coin changing from",o,"to",p),E(),F(),Z(),x.current=p,te(p))},[p,o,F,Z,E]);const _=i.useCallback(async t=>{if(!t)return;E(),w.current=new AbortController;const s=w.current.signal;try{z(!0);const n=new Promise((a,l)=>{setTimeout(()=>l(new Error("Request timeout")),5e3)}),m=Promise.all([A.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${t}`,{signal:s}),A.get(`https://api.binance.com/api/v3/trades?symbol=${t}&limit=10`,{signal:s}),A.get(`https://api.binance.com/api/v3/depth?symbol=${t}&limit=10`,{signal:s})]),[c,j,r]=await Promise.race([m,n]);if(x.current===t){const a=c.data;S(a.lastPrice||a.c),k(a.priceChangePercent||a.P),T(a.highPrice||a.h),C(a.lowPrice||a.l),D(a.volume||a.v),U(a.quoteVolume||a.q),L(j.data.slice(0,5)),R(r.data),z(!1),console.log("Initial data loaded for:",t)}}catch(n){if(n.name==="AbortError"){console.log("Request aborted for:",t);return}console.error("Error fetching initial data for",t,":",n),x.current===t&&(z(!1),S("0.0000"),k("0.00"),T("0.0000"),C("0.0000"),D("0.00"),U("0.00"))}},[E]);i.useEffect(()=>{const t=o;if(!t)return;console.log("Setting up WebSockets for:",t),x.current=t,_(t);let s=!0;const n=(r,a,l)=>{if(!s||x.current!==t)return null;try{const d=new WebSocket(r);return d.onopen=()=>{console.log(`${l} WebSocket connected for:`,t)},d.onmessage=y=>{if(!(!s||x.current!==t))try{const u=JSON.parse(y.data);a(u)}catch(u){console.error(`Error parsing ${l} data:`,u)}},d.onclose=y=>{console.log(`${l} WebSocket closed for:`,t,"Code:",y.code),s&&x.current===t&&y.code!==1e3&&(N.current[l]=setTimeout(()=>{if(s&&x.current===t){console.log(`Reconnecting ${l} WebSocket for:`,t);const u=n(r,a,l);l==="ticker"&&u?M.current=u:l==="trade"&&u?q.current=u:l==="depth"&&u&&(O.current=u)}},1e3))},d.onerror=y=>{console.error(`${l} WebSocket error for ${t}:`,y)},d}catch(d){return console.error(`Error creating ${l} WebSocket:`,d),null}},m=`wss://stream.binance.com:9443/ws/${t.toLowerCase()}@ticker`;M.current=n(m,r=>{S(r.c),k(r.P),T(r.h),C(r.l),D(r.v),U(r.q)},"ticker");const c=`wss://stream.binance.com:9443/ws/${t.toLowerCase()}@trade`;q.current=n(c,r=>{L(a=>[r,...a.slice(0,9)])},"trade");const j=`wss://stream.binance.com:9443/ws/${t.toLowerCase()}@depth`;return O.current=n(j,r=>{R(a=>a&&{lastUpdateId:r.u,bids:r.b&&r.b.length>0?r.b:a.bids,asks:r.a&&r.a.length>0?r.a:a.asks})},"depth"),()=>{console.log("Cleaning up WebSockets for:",t),s=!1,Object.values(N.current).forEach(r=>{r&&clearTimeout(r)}),N.current={},F()}},[o,_,F]);const se=i.useCallback(()=>{B.goBack()},[B]),ae=t=>{if(t===o){H(!1);return}console.log("Selecting new coin:",t),B.push(`/market/detail/${t}`)},J=()=>{H(!W)},ie=i.useMemo(()=>{const t=Y.find(s=>s.symbol===o);return t?t.name:`${o.replace("USDT","")} / USDT`},[o]),h=i.useCallback(({width:t="100%",height:s="1em"})=>e.jsx("div",{className:"loading-placeholder",style:{width:t,height:s}}),[]),ee=i.useMemo(()=>{if(!g||!g.bids||!g.asks)return{buySide:[],sellSide:[]};const t=m=>{if(!m||m.length===0)return[];const c=m.map(a=>Number(a[1])).filter(a=>!isNaN(a));if(c.length===0)return[];const j=Math.max(...c),r=Math.min(...c);return m.slice(0,10).map(a=>{const l=Number(a[1]);let d=0;return j>r&&(d=(l-r)/(j-r)*100),d=Math.max(d,10),{amount:$(a[1]),price:v(a[0]),intensity:Math.min(d,95)}})},s=t(g.bids),n=t(g.asks);if(s.length===0){const m=f?Number(f):1;for(let c=0;c<10;c++)s.push({amount:"0.00",price:(m*(1-(c+1)*.001)).toFixed(4),intensity:20+c*5}),n.push({amount:"0.00",price:(m*(1+(c+1)*.001)).toFixed(4),intensity:20+c*5})}return{buySide:s,sellSide:n}},[g,f,v,$]);return e.jsxs("div",{className:"market-detail-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx("div",{className:"back-arrow",onClick:se,children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsxs("div",{className:"trading-pair",onClick:J,children:[ie,e.jsx("i",{className:`fas fa-chevron-down dropdown-arrow ${W?"rotate":""}`})]}),e.jsx("div",{className:"header-icon",onClick:J,children:e.jsx("i",{className:"fas fa-bars"})})]})}),e.jsx(ce,{isOpen:W,onClose:()=>H(!1),selectedCoin:o,onCoinSelect:ae,availableCoins:Y,title:"Select Trading Pair"}),e.jsx("div",{className:"price-section",children:e.jsxs("div",{className:"price-main-row",children:[e.jsxs("div",{className:"price-left-section",children:[e.jsx("div",{className:"current-price",children:f!==null?e.jsx("span",{style:{color:b&&parseFloat(b)<0?"#f56c6c":"#37b66a"},children:v(f)}):e.jsx(h,{width:"120px",height:"28px"})}),e.jsxs("div",{className:"price-info-row",children:[e.jsx("div",{className:"usd-price",children:f!==null?`$${Number(f).toFixed(2)}`:"$0.00"}),e.jsx("div",{className:"price-change",style:{color:b&&parseFloat(b)<0?"#f56c6c":"#37b66a"},children:b!==null?`${parseFloat(b)<0?"−":"+"}${Math.abs(parseFloat(b)).toFixed(2)}%`:e.jsx(h,{width:"60px",height:"16px"})})]})]}),e.jsxs("div",{className:"stats-grid",children:[e.jsxs("div",{className:"stat-row",children:[e.jsxs("div",{className:"stat-item",children:[e.jsx("div",{className:"stat-label",children:"24H High"}),e.jsx("div",{className:"stat-value",children:I!==null?v(I):e.jsx(h,{width:"60px",height:"12px"})})]}),e.jsxs("div",{className:"stat-item",children:[e.jsxs("div",{className:"stat-label",children:["24H Volume(",o.replace("USDT",""),")"]}),e.jsx("div",{className:"stat-value",children:Q!==null?$(Q):e.jsx(h,{width:"60px",height:"12px"})})]})]}),e.jsxs("div",{className:"stat-row",children:[e.jsxs("div",{className:"stat-item",children:[e.jsx("div",{className:"stat-label",children:"24H Low"}),e.jsx("div",{className:"stat-value",children:V!==null?v(V):e.jsx(h,{width:"60px",height:"12px"})})]}),e.jsxs("div",{className:"stat-item",children:[e.jsx("div",{className:"stat-label",children:"24H Volume(USDT)"}),e.jsx("div",{className:"stat-value",children:X!==null?$(X):e.jsx(h,{width:"60px",height:"12px"})})]})]})]})]})}),e.jsx("div",{className:"chart-section",children:e.jsx(oe,{symbol:o},o)}),e.jsxs("div",{className:"tabs-section",children:[e.jsxs("div",{className:"tabs-header",children:[e.jsx("div",{className:`tab ${P==="orderBook"?"active":""}`,onClick:()=>K("orderBook"),children:"Order"}),e.jsx("div",{className:`tab ${P==="transactions"?"active":""}`,onClick:()=>K("transactions"),children:"Last transaction"})]}),e.jsxs("div",{className:"tab-content",children:[P==="orderBook"&&e.jsx("div",{className:"modern-order-book",children:e.jsxs("div",{className:"order-book-table",children:[e.jsxs("div",{className:"table-header",children:[e.jsxs("div",{className:"buy-section",children:[e.jsx("div",{className:"column-header",children:"Buy"}),e.jsx("div",{className:"column-header",children:"Quantity"}),e.jsx("div",{className:"column-header",children:"Price (usdt)"})]}),e.jsxs("div",{className:"sell-section",children:[e.jsx("div",{className:"column-header",children:"Price (usdt)"}),e.jsx("div",{className:"column-header",children:"Quantity"}),e.jsx("div",{className:"column-header",style:{textAlign:"right"},children:"Sell"})]})]}),e.jsx("div",{className:"table-body",children:ee.buySide.map((t,s)=>{const n=ee.sellSide[s]||{amount:"0.00",price:"0.0000",intensity:20};return e.jsxs("div",{className:"table-row",children:[e.jsxs("div",{className:"buy-section",children:[e.jsx("div",{className:"cell buy-cell",children:s+1}),e.jsx("div",{className:"cell quantity",children:t.amount}),e.jsxs("div",{className:"cell price-cell",children:[e.jsx("div",{className:"heatmap-bar buy-heatmap",style:{width:`${t.intensity}%`}}),e.jsx("span",{className:"price-value buy-price",children:t.price})]})]}),e.jsxs("div",{className:"sell-section",children:[e.jsxs("div",{className:"cell price-cell",children:[e.jsx("div",{className:"heatmap-bar sell-heatmap",style:{width:`${n.intensity}%`}}),e.jsx("span",{className:"price-value sell-price",children:n.price})]}),e.jsx("div",{className:"cell quantity",children:n.amount}),e.jsx("div",{className:"cell sell-cell",children:s+1})]})]},s)})})]})}),P==="transactions"&&e.jsxs("div",{className:"transactions-container",children:[e.jsxs("div",{className:"transactions-header",children:[e.jsx("div",{className:"header-item",children:"Time"}),e.jsx("div",{className:"header-item",children:"Price"}),e.jsx("div",{className:"header-item",children:"Quantity"})]}),e.jsx("div",{className:"transactions-list",children:G.length>0?G.slice(0,10).map((t,s)=>e.jsxs("div",{className:"transaction-item",children:[e.jsx("div",{className:"transaction-time",children:new Date(t.T).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"})}),e.jsx("div",{className:`transaction-price ${t.m?"sell":"buy"}`,children:v(t.p)}),e.jsx("div",{className:"transaction-amount",children:Number(t.q).toFixed(4)})]},`${t.t}-${t.T}-${s}`)):Array.from({length:5}).map((t,s)=>e.jsxs("div",{className:"transaction-item",children:[e.jsx("div",{className:"transaction-time",children:e.jsx(h,{width:"50px",height:"14px"})}),e.jsx("div",{className:"transaction-price",children:e.jsx(h,{width:"60px",height:"14px"})}),e.jsx("div",{className:"transaction-amount",children:e.jsx(h,{width:"50px",height:"14px"})})]},s))})]})]})]}),e.jsx("style",{children:`
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
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .trading-pair:hover {
          opacity: 0.8;
        }

        .dropdown-arrow {
          font-size: 12px;
          transition: transform 0.3s ease;
          color: #6c757d;
        }

        .dropdown-arrow.rotate {
          transform: rotate(180deg);
        }

        .header-icon {
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .header-icon:hover {
          opacity: 0.8;
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
      `})]})}const pe=re.memo(de);export{pe as default};
