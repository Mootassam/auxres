import{u as T,A as ne,B as le,C as ce,D as q,i as o,j as s,E as Ke,F as _e,G as V,H as de,I as G,k as t,L as He,J as Qe}from"./index-f8e2a10d.js";import{C as qe}from"./CoinSelectorSidebar-cc614062.js";import{u as Ve}from"./useDispatch-90964a93.js";const f=l=>{if(l==null||l==="")return NaN;const y=Number(l);return Number.isFinite(y)?y:NaN},Ge=[{value:30,label:"30s - 20%"},{value:60,label:"60s - 30%"},{value:120,label:"120s - 50%"},{value:86400,label:"24h - 60%"},{value:172800,label:"48h - 70%"},{value:259200,label:"72h - 80%"},{value:604800,label:"7d - 90%"},{value:1296e3,label:"15d - 100%"}],We=["1","2","3","5","10","20","50","100"],pe=(l,y,w=!0)=>{const N=o.useRef(null),h=o.useRef(y);return o.useEffect(()=>{h.current=y},[y]),o.useEffect(()=>{if(!w||!l){N.current&&(N.current.close(),N.current=null);return}try{const v=new WebSocket(l);return N.current=v,v.onopen=()=>{console.log(s("pages.trade.websocketConnected"),l)},v.onmessage=D=>{try{const P=JSON.parse(D.data);h.current(P)}catch(P){console.error(s("pages.trade.websocketParseError"),P)}},v.onerror=D=>{console.error(s("pages.trade.websocketError"),D)},v.onclose=()=>{console.log(s("pages.trade.websocketClosed"))},()=>{v.readyState===WebSocket.OPEN&&v.close()}}catch(v){console.error(s("pages.trade.websocketCreateError"),v)}},[l,w]),N},ue=({onPercentageSelect:l,currentPercentage:y=0})=>{const w=[0,25,50,75,100],N=h=>{l(h/100)};return t.jsxs("div",{className:"percentage-progress-bar",children:[t.jsx("div",{className:"progress-bar-labels",children:w.map(h=>t.jsxs("span",{className:"progress-label",children:[h,"%"]},h))}),t.jsxs("div",{className:"progress-bar-track",children:[t.jsx("div",{className:"progress-bar-fill",style:{width:`${y}%`}}),t.jsx("div",{className:"progress-bar-markers",children:w.map(h=>t.jsx("div",{className:`progress-marker ${h<=y?"active":""}`,onClick:()=>N(h)},h))})]})]})};function et(){const l=Ve(),y=T(ne.selectRows)||[],w=T(le.selectRows)||[],N=T(ce.selectRows)||[],h=T(q.selectRows)||[],v=T(q.pendingRows),D=T(ne.selectLoading),P=T(q.selectLoading),W=T(ce.selectLoading),me=T(le.selectLoading),[p,fe]=o.useState("BTCUSDT"),[x,ge]=o.useState("0"),[Je,xe]=o.useState("0"),[be,L]=o.useState(!1),[b,he]=o.useState("LIMIT"),[S,J]=o.useState("0"),[X,M]=o.useState(""),[m,F]=o.useState(""),[u,O]=o.useState("buy"),[E,ye]=o.useState({asks:[],bids:[]}),[A,I]=o.useState(!1),[Y,k]=o.useState(""),[c,ve]=o.useState("Positions"),[n,Ne]=o.useState("trade"),[K,je]=o.useState("10"),[_,we]=o.useState("30"),Z=o.useRef(null),U=o.useRef(!0),ee=o.useRef(p),g=o.useCallback((e,a=2)=>{const i=Number(e);return Number.isFinite(i)?i.toLocaleString(void 0,{minimumFractionDigits:a,maximumFractionDigits:a}):0 .toFixed(a)},[]),R=o.useCallback(e=>{const a=Number(e);return Number.isFinite(a)?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}).format(a):s("common.currencyFormat","0.00")},[]),ke=o.useCallback(e=>{try{return new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}catch{return s("common.invalidDate")}},[]),H=o.useCallback(e=>{try{return new Date(e).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0})}catch{return s("common.invalidTime")}},[]),Ce=o.useCallback(e=>e?e<60?`${e}s`:e<3600?`${Math.floor(e/60)}m`:e<86400?`${Math.floor(e/3600)}h`:e<604800?`${Math.floor(e/86400)}d`:`${Math.floor(e/86400)}d`:"N/A",[]),C=o.useMemo(()=>p.replace("USDT",""),[p]),B=o.useMemo(()=>{if(!Array.isArray(w))return{};const e={};for(const a of w)a.symbol&&a.amount&&(e[a.symbol]=Number(a.amount)||0);return e},[w]),d=o.useMemo(()=>n==="trade"||u==="buy"?B.USDT||0:B[C]||0,[n,u,C,B]),te=o.useMemo(()=>{if(n==="trade"){const e=f(m);if(!Number.isFinite(e)||e<=0||d<=0)return 0;const a=e/d*100;return Math.min(100,Math.max(0,a))}else if(u==="buy"){const e=f(m);if(!Number.isFinite(e)||e<=0||d<=0)return 0;const a=e/d*100;return Math.min(100,Math.max(0,a))}else{const e=f(m),a=f(x);if(!Number.isFinite(e)||e<=0||!Number.isFinite(a)||a<=0||d<=0)return 0;const r=e/a/d*100;return Math.min(100,Math.max(0,r))}},[n,u,m,d,x]),Te=o.useMemo(()=>n==="trade"?`${s("pages.trade.available")}: ${g(d,2)} USDT`:u==="buy"?`${s("pages.trade.available")}: ${g(d,2)} USDT`:`${s("pages.trade.available")}: ${g(d,6)} ${C}`,[n,u,d,C,g]),Se=o.useMemo(()=>A?s("pages.trade.placing"):n==="trade"?`${u==="buy"?s("pages.trade.long"):s("pages.trade.short")} (USDT)`:`${u==="buy"?s("pages.trade.buy"):s("pages.trade.sell")} ${C}`,[A,n,u,C]),Fe=o.useMemo(()=>p?`wss://stream.binance.com:9443/ws/${p.toLowerCase()}@ticker`:null,[p]),De=o.useMemo(()=>p?`wss://stream.binance.com:9443/ws/${p.toLowerCase()}@depth20@100ms`:null,[p]),Pe=o.useCallback(e=>{e.c!==void 0&&ge(e.c),e.P!==void 0&&xe(e.P)},[]),Me=o.useCallback(e=>{const a=(e.asks||[]).slice(0,5).map(r=>({price:r[0],amount:r[1]})),i=(e.bids||[]).slice(0,5).map(r=>({price:r[0],amount:r[1]}));ye({asks:a,bids:i})},[]);pe(Fe,Pe,U.current),pe(De,Me,U.current);const z=o.useCallback(e=>{const a=f(e),i=f(n==="perpetual"&&b==="LIMIT"?S:x);if(Number.isFinite(a)&&Number.isFinite(i)&&i>0){const r=a/i;M(r.toFixed(8))}else M("")},[n,b,S,x]);o.useEffect(()=>(U.current=!0,l(Ke.doFetch(n)),()=>{U.current=!1,Z.current&&Z.current.abort()}),[l,n]),o.useEffect(()=>{if(!U.current)return;const a=setTimeout(()=>{if(c==="Transaction history"){l(Qe.doFetch());return}n==="perpetual"?c==="Positions"?l(G.doFetchPending()):c==="History orders"&&l(G.doFetch()):n==="trade"&&(c==="Positions"?l(V.doFetchPending()):c==="History orders"&&l(V.doFetch()))},100);return()=>clearTimeout(a)},[l,n,c]),o.useEffect(()=>{x&&x!=="0"&&(J(x),m&&!isNaN(Number(m))&&z(m))},[x,m,z]),o.useEffect(()=>{ee.current!==p&&(M(""),F(""),ee.current=p)},[p]);const ae=o.useCallback(e=>{const a=e.target.value;F(a),a!==""?z(a):M("")},[z]),Ae=o.useCallback(e=>{const a=e.target.value;J(a),m&&!isNaN(Number(m))&&z(m)},[m,z]),se=o.useCallback(e=>{if(n==="trade"){const i=d*e;F(i.toFixed(2))}else if(u==="buy"){const i=d*e;F(i.toFixed(2))}else{const i=d*e,r=f(x)||f(S)||1,j=i*r;F(j.toFixed(2))}},[n,u,d,x,S]),re=o.useCallback(async()=>{const e=parseFloat(x||"0")||0,i={futuresStatus:u==="buy"?"long":"short",profitAndLossAmount:"",leverage:parseInt(K,10),control:"loss",operate:"low",futureCoin:p.replace("USDT","/USDT"),closePositionTime:"",closePositionPrice:"",openPositionTime:new Date().toISOString(),openPositionPrice:e,contractDuration:_,futuresAmount:m};try{const r=await l(_e.doCreate(i)),j=r!=null&&r.id?r:r==null?void 0:r.payload;return j!=null&&j.id?(M(""),F(""),c==="Positions"&&l(V.doFetchPending()),j):null}catch(r){throw console.error(s("pages.trade.errors.createError"),r),r}},[x,u,K,p,_,m,l,c]),ze=o.useCallback(()=>L(!0),[]);o.useCallback(()=>L(!1),[]);const Le=o.useCallback(e=>{if(!e||e===p){L(!1);return}fe(e),L(!1)},[p]),oe=o.useCallback(()=>{const e=Date.now().toString(36),a=Math.floor(Math.random()*1e6).toString(36);return s("pages.trade.orderNumberFormat",e,a)},[]),Ee=o.useCallback(async()=>{if(k(""),!A)if(n==="trade"){const e=f(m);if(!Number.isFinite(e)||e<=0){k(s("pages.trade.errors.invalidAmount"));return}if(e>d){k(s("pages.trade.errors.insufficientUSDT",g(d,2)));return}I(!0);try{await re()}catch(a){console.error(s("pages.trade.errors.createError"),a),k(s("pages.trade.errors.failedOrder"))}finally{I(!1)}}else{const e=f(b==="MARKET"?x:S),a=f(X);if(!Number.isFinite(a)||a<=0){k(s("pages.trade.errors.invalidQuantity"));return}if(!Number.isFinite(e)||e<=0){k(s("pages.trade.errors.invalidPrice"));return}if(u==="buy"){if(e*a>d){k(s("pages.trade.errors.insufficientUSDT",g(d,2)));return}}else if(a>d){k(s("pages.trade.errors.insufficientCoin",g(d,6),C));return}I(!0);try{const i=e,r=a,j=i*r,Re=j*.001,Be={orderNo:oe(),orderType:b.toLowerCase(),tradingPair:p.replace("USDT","/USDT"),status:b==="MARKET"?"completed":"pending",direction:u.toUpperCase(),delegateType:b,delegateState:b==="MARKET"?"Filled":"Pending",orderQuantity:r,commissionPrice:i,entrustedValue:j,transactionQuantity:b==="MARKET"?r:0,transactionValue:b==="MARKET"?j:0,closingPrice:b==="MARKET"?i:0,handlingFee:b==="MARKET"?Re:0,commissionTime:new Date().toISOString(),closingTime:b==="MARKET"?new Date().toISOString():null};await l(de.doCreate(Be)),M(""),F(""),c==="Positions"&&l(G.doFetchPending())}catch(i){console.error(s("pages.trade.errors.placeOrderError"),i),k(s("pages.trade.errors.failedOrder"))}finally{I(!1)}}},[A,X,b,x,S,p,u,l,oe,d,C,g,n,re,m,c]),Ue=o.useCallback(async(e,a)=>{a.status="canceled",l(de.doUpdate(e,a))},[l]),ie=o.useMemo(()=>{const e=[...E.asks.map(a=>f(a.amount)),...E.bids.map(a=>f(a.amount))].filter(a=>Number.isFinite(a));return Math.max(...e,1)},[E]),$e=o.useCallback((e,a,i)=>{const r={icon:"fa-exchange-alt",typeText:s("pages.history.transactionTypes.transaction"),iconClass:"swap",color:"#627EEA",amountColor:a==="in"?"#2ff378":"#FF6838"};switch(e){case"deposit":r.icon="fa-arrow-down",r.typeText=s("pages.history.transactionTypes.deposit"),r.iconClass="deposit",r.color="#F3BA2F",r.amountColor="#2ff378";break;case"withdraw":r.icon="fa-arrow-up",r.typeText=s("pages.history.transactionTypes.withdrawal"),r.iconClass="withdraw",r.color="#FF6838",r.amountColor="#FF6838";break;case"futures_profit":r.icon="fa-chart-line",r.typeText=s("pages.history.transactionTypes.futuresProfit"),r.iconClass="futures-profit",r.color="#00C076",r.amountColor="#00C076";break;case"futures_loss":r.icon="fa-chart-line",r.typeText=s("pages.history.transactionTypes.futuresLoss"),r.iconClass="futures-loss",r.color="#FF6838",r.amountColor="#FF6838";break;case"futures_reserved":r.icon="fa-clock",r.typeText=s("pages.history.transactionTypes.futuresReserved"),r.iconClass="futures-reserved",r.color="#FF9800",r.amountColor="#FF6838";break;case"order_reserved":r.icon="fa-clock",r.typeText=s("pages.history.transactionTypes.orderReserved"),r.iconClass="order-reserved",r.color="#FF9800",r.amountColor="#FF6838";break;default:r.icon="fa-exchange-alt",r.typeText=s("pages.history.transactionTypes.transaction"),r.iconClass="default",r.color="#627EEA",r.amountColor="#627EEA"}return r},[]),Oe=o.useCallback(e=>{const a={color:"#6c757d",bgColor:"#e9ecef",text:e||s("common.unknown")};switch(e==null?void 0:e.toLowerCase()){case"long":a.color="#37b66a",a.bgColor="rgba(55, 182, 106, 0.1)",a.text=s("pages.trade.futuresStatus.long");break;case"short":a.color="#f56c6c",a.bgColor="rgba(245, 108, 108, 0.1)",a.text=s("pages.trade.futuresStatus.short");break;case"closed":a.color="#106cf5",a.bgColor="rgba(16, 108, 245, 0.1)",a.text=s("pages.trade.futuresStatus.closed");break;case"liquidated":a.color="#dc3545",a.bgColor="rgba(220, 53, 69, 0.1)",a.text=s("pages.trade.futuresStatus.liquidated");break}return a},[]),Q=o.useMemo(()=>c==="Transaction history"?W:n==="perpetual"?D:n==="trade"?P:!1,[c,n,D,P,W]),$=o.useMemo(()=>c==="Transaction history"?N:n==="perpetual"&&c==="Positions"?y.filter(e=>e.status==="pending"):n==="perpetual"&&c==="History orders"?y.filter(e=>e.status!=="pending"):n==="trade"&&c==="Positions"?v:n==="trade"&&c==="History orders"?h.filter(e=>e.closePositionTime):[],[c,n,y,h,N,v]),Ie=o.useMemo(()=>Q?!1:$.length===0,[Q,$]);return t.jsxs("div",{className:"container",children:[t.jsx("div",{className:"trade-header",children:t.jsxs("div",{className:"nav-bar",children:[t.jsxs("div",{className:"back-arrow",children:[t.jsxs("div",{className:"trading-pair",onClick:ze,children:[t.jsx("i",{className:"fas fa-chevron-down dropdown-arrow"}),p.replace("USDT","")," / USDT"]}),t.jsx("div",{children:t.jsx("p",{style:{fontSize:10},children:n==="trade"?s("pages.trade.tradingMode.trade"):s("pages.trade.tradingMode.perpetual")})})]}),t.jsxs("div",{className:"header-right",children:[t.jsxs("select",{className:"trade-type-select",value:n,onChange:e=>Ne(e.target.value),children:[t.jsx("option",{value:"trade",children:s("pages.trade.tradingMode.trade")}),t.jsx("option",{value:"perpetual",children:s("pages.trade.tradingMode.perpetual")})]}),t.jsx(He,{to:`market/detail/${p}`,className:"chart-icon",children:t.jsx("i",{className:"fas fa-chart-line"})})]})]})}),t.jsxs("div",{className:"main-content",children:[t.jsxs("div",{className:"trading-layout",children:[t.jsxs("div",{className:"trade-form",children:[t.jsxs("div",{className:"buy-sell-tabs",role:"tablist",children:[t.jsx("div",{role:"tab","aria-selected":u==="buy",tabIndex:0,className:`buy-tab ${u==="buy"?"active":""}`,onClick:()=>O("buy"),onKeyDown:e=>e.key==="Enter"&&O("buy"),children:s("pages.trade.long")}),t.jsx("div",{role:"tab","aria-selected":u==="sell",tabIndex:0,className:`sell-tab ${u==="sell"?"active":""}`,onClick:()=>O("sell"),onKeyDown:e=>e.key==="Enter"&&O("sell"),children:s("pages.trade.short")})]}),n==="trade"&&t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"input-group",children:[t.jsx("div",{className:"input-label",children:s("pages.trade.tradingPeriod")}),t.jsx("select",{className:"order-type-select",value:_,onChange:e=>we(e.target.value),children:Ge.map(e=>t.jsx("option",{value:e.value,children:e.label},e.value))})]}),t.jsxs("div",{className:"input-group",children:[t.jsx("div",{className:"input-label",children:s("pages.trade.leverage")}),t.jsx("select",{className:"order-type-select",value:K,onChange:e=>je(e.target.value),children:We.map(e=>t.jsxs("option",{value:e,children:[e,"x"]},e))})]}),t.jsxs("div",{className:"input-group",children:[t.jsxs("div",{className:"input-label",children:[s("pages.trade.amount")," (USDT)"]}),t.jsx("div",{className:"input-with-buttons",children:t.jsx("input",{className:"value-input",value:m,onChange:ae,placeholder:"0.0",inputMode:"decimal","aria-label":s("pages.trade.amount")})}),t.jsx(ue,{onPercentageSelect:se,currentPercentage:te})]})]}),n==="perpetual"&&t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"order-type",children:[t.jsx("div",{className:"order-type-label",children:s("pages.trade.orderType")}),t.jsxs("select",{className:"order-type-select",value:b,onChange:e=>he(e.target.value),children:[t.jsx("option",{value:"LIMIT",children:s("pages.trade.limit")}),t.jsx("option",{value:"MARKET",children:s("pages.trade.market")})]})]}),b==="LIMIT"&&t.jsxs("div",{className:"input-group",children:[t.jsx("div",{className:"input-label",children:s("pages.trade.price")}),t.jsx("div",{className:"input-with-buttons",children:t.jsx("input",{className:"value-input",value:S,onChange:Ae,inputMode:"decimal","aria-label":s("pages.trade.price")})})]}),t.jsxs("div",{className:"input-group",children:[t.jsxs("div",{className:"input-label",children:[s("pages.trade.amount")," (USDT)"]}),t.jsx("div",{className:"input-with-buttons",children:t.jsx("input",{className:"value-input",value:m,onChange:ae,placeholder:"0.0",inputMode:"decimal","aria-label":s("pages.trade.amount")})}),t.jsx(ue,{onPercentageSelect:se,currentPercentage:te})]})]}),t.jsx("div",{className:"balance-info",children:Te}),Y&&t.jsx("div",{className:"error-message",role:"alert",children:Y}),t.jsx("button",{className:`action-button ${u==="buy"?"buy-button":"sell-button"}`,onClick:Ee,disabled:A||me,"aria-busy":A,children:Se})]}),t.jsxs("div",{className:"order-book",role:"region","aria-label":"order book",children:[t.jsxs("div",{className:"order-book-header",children:[t.jsx("span",{children:s("pages.trade.orderBook.price")}),t.jsxs("span",{children:[s("pages.trade.orderBook.amount")," (",C,")"]})]}),E.asks.map((e,a)=>{const i=f(e.amount)||0,r=Math.min(100,i/ie*100);return t.jsxs("div",{className:"order-book-row ask-row",children:[t.jsx("div",{className:"depth-bar ask-depth",style:{width:`${r}%`}}),t.jsx("div",{className:"order-price",children:g(e.price,4)}),t.jsx("div",{className:"order-amount",children:g(e.amount,4)})]},`ask-${a}`)}),t.jsx("div",{className:"order-book-row current-price-row",children:t.jsxs("div",{className:"current-price",children:["$",g(x,2)]})}),E.bids.map((e,a)=>{const i=f(e.amount)||0,r=Math.min(100,i/ie*100);return t.jsxs("div",{className:"order-book-row bid-row",children:[t.jsx("div",{className:"depth-bar bid-depth",style:{width:`${r}%`}}),t.jsx("div",{className:"order-price",children:g(e.price,4)}),t.jsx("div",{className:"order-amount",children:g(e.amount,4)})]},`bid-${a}`)})]})]}),t.jsxs("div",{className:"orders-tabs",children:[t.jsx("div",{className:"orders-tabs-header",children:[s("pages.trade.tabs.positions"),s("pages.trade.tabs.historyOrders"),s("pages.trade.tabs.transactionHistory")].map(e=>t.jsx("div",{className:`orders-tab ${c===e?"active":""}`,onClick:()=>ve(e),children:e},e))}),t.jsx("div",{className:"orders-tab-content",children:Q?t.jsx("div",{className:"loading-skeleton",children:[...Array(3)].map((e,a)=>t.jsx("div",{className:"skeleton-item"},a))}):Ie?t.jsxs("div",{className:"empty-orders",children:[t.jsx("div",{className:"empty-icon",children:t.jsx("i",{className:"fas fa-inbox"})}),t.jsx("div",{className:"empty-text",children:s("pages.trade.noData",c.toLowerCase())}),t.jsx("div",{className:"empty-subtext",children:c===s("pages.trade.tabs.transactionHistory")?s("pages.trade.noTransactionsText"):s("pages.trade.noOrdersText",c.toLowerCase())})]}):c===s("pages.trade.tabs.transactionHistory")?t.jsx("div",{className:"transactions-list",children:$.map(e=>{const a=$e(e.type,e.direction,e.relatedAsset),i=e.direction==="in"?"+":"-";return t.jsxs("div",{className:"transaction-item",children:[t.jsx("div",{className:"transaction-icon",style:{backgroundColor:a.color},children:t.jsx("i",{className:`fas ${a.icon}`})}),t.jsxs("div",{className:"transaction-details",children:[t.jsxs("div",{className:"transaction-main",children:[t.jsx("div",{className:"transaction-type",children:a.typeText}),t.jsxs("div",{className:"transaction-amount",style:{color:a.amountColor},children:[i,g(e.amount,2)," ",e.asset]})]}),t.jsxs("div",{className:"transaction-secondary",children:[t.jsx("div",{className:"transaction-status",children:t.jsx("span",{className:`status-badge status-${e.status}`,children:e.status})}),t.jsxs("div",{className:"transaction-date",children:[ke(e.createdAt)," ",H(e.createdAt)]})]})]})]},e.id??e._id)})}):n==="perpetual"?t.jsx("div",{className:"orders-list",children:$.map(e=>{var a;return t.jsxs("div",{className:"order-item",children:[t.jsxs("div",{className:"order-main-info",children:[t.jsxs("div",{className:"order-pair-action",children:[t.jsx("span",{className:"order-pair",children:e.tradingPair}),t.jsx("span",{className:`order-action ${String((e==null?void 0:e.direction)||"").toLowerCase()}`,children:e.direction}),t.jsx("span",{className:"order-type-badge",children:e.orderType})]}),t.jsxs("div",{className:"order-date",children:[e.commissionTime?new Date(e.commissionTime).toLocaleDateString():"",t.jsx("span",{className:"order-time",children:e.commissionTime?new Date(e.commissionTime).toLocaleTimeString():""})]})]}),t.jsxs("div",{className:"order-details",children:[t.jsxs("div",{className:"order-detail",children:[t.jsx("span",{className:"detail-label",children:s("pages.trade.orderDetails.status")}),t.jsx("span",{className:`order-status ${String(e.status).toLowerCase()}`,children:e.status})]}),t.jsxs("div",{className:"order-detail",children:[t.jsx("span",{className:"detail-label",children:s("pages.trade.orderDetails.price")}),t.jsxs("span",{className:"order-price-value",children:[g(e.commissionPrice,4)," USDT"]})]}),t.jsxs("div",{className:"order-detail",children:[t.jsx("span",{className:"detail-label",children:s("pages.trade.orderDetails.amount")}),t.jsxs("span",{className:"order-amount-value",children:[e.orderQuantity," ",(a=e==null?void 0:e.tradingPair)==null?void 0:a.split("/")[0]]})]}),t.jsxs("div",{className:"order-detail",children:[t.jsx("span",{className:"detail-label",children:s("pages.trade.orderDetails.total")}),t.jsxs("span",{className:"order-total",children:[g(e.entrustedValue)," USDT"]})]})]}),t.jsx("div",{className:"order-actions",children:String(e.status).toLowerCase()==="pending"||String(e.status).toLowerCase()==="partially filled"?t.jsx("button",{className:"cancel-order-btn",onClick:()=>Ue(e.id,e),children:s("pages.trade.cancel")}):t.jsx("div",{className:"completed-indicator",children:t.jsx("i",{className:"fas fa-check-circle"})})})]},e.id??e.orderNo)})}):t.jsx("div",{className:"futures-list",children:$.map(e=>{const a=Oe(e.futuresStatus),i=e.profitAndLossAmount?f(e.profitAndLossAmount):0,r=i>=0;return t.jsxs("div",{className:"future-item",children:[t.jsxs("div",{className:"future-header",children:[t.jsxs("div",{className:"future-pair-status",children:[t.jsx("span",{className:"future-pair",children:e.futureCoin||s("common.unknown")}),t.jsx("span",{className:"future-status",style:{color:a.color,backgroundColor:a.bgColor},children:a.text})]}),t.jsxs("div",{className:"future-leverage",children:[e.leverage,"x"]})]}),t.jsxs("div",{className:"future-details",children:[t.jsxs("div",{className:"future-detail-row",children:[t.jsx("span",{className:"detail-label",children:s("pages.trade.futuresDetails.amount")}),t.jsx("span",{className:"detail-value",children:R(e.futuresAmount)})]}),t.jsxs("div",{className:"future-detail-row",children:[t.jsx("span",{className:"detail-label",children:s("pages.trade.futuresDetails.duration")}),t.jsx("span",{className:"detail-value",children:Ce(e.contractDuration)})]}),t.jsxs("div",{className:"future-detail-row",children:[t.jsx("span",{className:"detail-label",children:s("pages.trade.futuresDetails.entryPrice")}),t.jsx("span",{className:"detail-value",children:R(e.openPositionPrice)})]}),e.closePositionPrice&&t.jsxs("div",{className:"future-detail-row",children:[t.jsx("span",{className:"detail-label",children:s("pages.trade.futuresDetails.exitPrice")}),t.jsx("span",{className:"detail-value",children:R(e.closePositionPrice)})]}),(i!==0||e.profitAndLossAmount)&&t.jsxs("div",{className:"future-detail-row",children:[t.jsx("span",{className:"detail-label",children:s("pages.trade.futuresDetails.pnl")}),t.jsxs("span",{className:`detail-value ${r?"profit":"loss"}`,children:[r?"+":"",R(i)]})]})]}),t.jsxs("div",{className:"future-footer",children:[t.jsxs("div",{className:"future-timestamp",children:[t.jsx("div",{className:"timestamp-label",children:s("pages.trade.futuresDetails.opened")}),t.jsx("div",{className:"timestamp-value",children:e.openPositionTime?H(e.openPositionTime):s("common.na")})]}),e.closePositionTime&&t.jsxs("div",{className:"future-timestamp",children:[t.jsx("div",{className:"timestamp-label",children:s("pages.trade.futuresDetails.closed")}),t.jsx("div",{className:"timestamp-value",children:H(e.closePositionTime)})]})]})]},e.id??e._id)})})})]})]}),t.jsx(qe,{isOpen:be,onClose:()=>L(!1),selectedCoin:p,onCoinSelect:Le,title:s("pages.trade.coinSelector.title")}),t.jsx("style",{children:`
        /* Container */
        .container {
          background-color: rgb(16, 108, 245);
          color: #FFFFFF;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          max-width: 400px;
          margin: 0 auto;
          overflow-x: hidden;
        }
        
        /* Trade Header */
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

        select option {
          color: #000;
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

        /* Trade Form - 50% width */
        .trade-form {
          display: flex;
          width: 50%;
          flex-direction: column;
        }

        /* Order Book */
        .order-book {
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        /* Percentage Progress Bar - Modern Design */
        .percentage-progress-bar {
          margin-top: 12px;
          width: 100%;
        }

        .progress-bar-labels {
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
          font-size: 10px;
          color: #6c757d;
          font-weight: 500;
        }

        .progress-label {
          position: relative;
          text-align: center;
          width: 20%;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .progress-label:hover {
          color: #106cf5;
        }

        .progress-bar-track {
          position: relative;
          width: 100%;
          height: 4px;
          background-color: #e9ecef;
          border-radius: 2px;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .progress-bar-fill {
          position: absolute;
          height: 100%;
          background-color: #106cf5;
          border-radius: 2px;
          transition: width 0.3s ease;
          box-shadow: 0 1px 2px rgba(16, 108, 245, 0.2);
        }

        .progress-bar-markers {
          position: absolute;
          top: -4px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          pointer-events: none;
        }

        .progress-marker {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #ffffff;
          border: 2px solid #e9ecef;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          pointer-events: auto;
        }

        .progress-marker:hover {
          transform: scale(1.2);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        }

        .progress-marker.active {
          background-color: #106cf5;
          border-color: #106cf5;
          box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.2);
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

        .loading-skeleton {
          padding: 10px 0;
        }

        .skeleton-item {
          height: 60px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 8px;
          margin-bottom: 10px;
        }

        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
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

        /* Transaction Item Styles */
        .transactions-list {
          padding: 0 4px;
        }

        .transaction-item {
          display: flex;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .transaction-item:last-child {
          border-bottom: none;
        }

        .transaction-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          flex-shrink: 0;
        }

        .transaction-icon i {
          color: white;
          font-size: 14px;
        }

        .transaction-details {
          flex: 1;
          min-width: 0;
        }

        .transaction-main {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 4px;
        }

        .transaction-type {
          font-size: 12px;
          font-weight: 500;
          color: #1a1a1a;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: 8px;
        }

        .transaction-amount {
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
        }

        .transaction-secondary {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .transaction-status {
          font-size: 10px;
        }

        .status-badge {
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: 500;
          text-transform: capitalize;
        }

        .status-completed,
        .status-success {
          background-color: rgba(55, 182, 106, 0.1);
          color: #37b66a;
        }

        .status-pending {
          background-color: rgba(16, 108, 245, 0.1);
          color: #106cf5;
        }

        .status-failed,
        .status-cancelled {
          background-color: rgba(245, 108, 108, 0.1);
          color: #f56c6c;
        }

        .transaction-date {
          font-size: 10px;
          color: #8c98a4;
        }

        /* Order Item Styles */
        .orders-list {
          padding: 0 4px;
          color:#000;
        }

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
          color:#000
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

        /* Future Item Styles */
        .futures-list {
          padding: 0 4px;
        }

        .future-item {
          background-color: #f8fbff;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 10px;
        }

        .future-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .future-pair-status {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .future-pair {
          font-weight: 600;
          font-size: 12px;
          color:#000;
        }

        .future-status {
          font-size: 11px;
          padding: 3px 8px;
          border-radius: 12px;
          font-weight: 600;
        }

        .future-leverage {
          font-size: 11px;
          font-weight: 600;
          color: #106cf5;
          background-color: rgba(16, 108, 245, 0.1);
          padding: 3px 8px;
          border-radius: 12px;
        }

        .future-details {
          margin-bottom: 12px;
        }

        .future-detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .detail-label {
          font-size: 11px;
          color: #6c757d;
        }

        .detail-value {
          font-size: 11px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .detail-value.profit {
          color: #37b66a;
        }

        .detail-value.loss {
          color: #f56c6c;
        }

        .future-footer {
          display: flex;
          justify-content: space-between;
          padding-top: 8px;
          border-top: 1px solid #eef2f6;
        }

        .future-timestamp {
          text-align: center;
        }

        .timestamp-label {
          font-size: 10px;
          color: #6c98a4;
          margin-bottom: 2px;
        }

        .timestamp-value {
          font-size: 10px;
          font-weight: 600;
          color: #1a1a1a;
        }

        /* Empty State */
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
          
          .trade-form {
            width: 48%;
          }
        }
      `})]})}export{et as default};
