import{u as C,z as ne,A as ce,B as le,C as H,i as r,D as n,E as Ke,F as _e,G as q,H as de,I as V,j as t,L as Qe,J as We}from"./index-3c6c971f.js";import{C as He}from"./CoinSelectorSidebar-93ca996d.js";import{u as qe}from"./useDispatch-55cc451c.js";const f=c=>{if(c==null||c==="")return NaN;const y=Number(c);return Number.isFinite(y)?y:NaN},Ve=[{value:30,label:"30s - 20%"},{value:60,label:"60s - 30%"},{value:120,label:"120s - 50%"},{value:86400,label:"24h - 60%"},{value:172800,label:"48h - 70%"},{value:259200,label:"72h - 80%"},{value:604800,label:"7d - 90%"},{value:1296e3,label:"15d - 100%"}],Ge=["1","2","3","5","10","20","50","100"],ue=(c,y,w=!0)=>{const N=r.useRef(null),h=r.useRef(y);return r.useEffect(()=>{h.current=y},[y]),r.useEffect(()=>{if(!w||!c){N.current&&(N.current.close(),N.current=null);return}try{const v=new WebSocket(c);return N.current=v,v.onopen=()=>{console.log(`WebSocket connected: ${c}`)},v.onmessage=F=>{try{const D=JSON.parse(F.data);h.current(D)}catch(D){console.error("Error parsing WebSocket data:",D)}},v.onerror=F=>{console.error("WebSocket error:",F)},v.onclose=()=>{console.log("WebSocket closed")},()=>{v.readyState===WebSocket.OPEN&&v.close()}}catch(v){console.error("Error creating WebSocket:",v)}},[c,w]),N},pe=({onPercentageSelect:c,currentPercentage:y=0})=>{const w=[0,25,50,75,100],N=h=>{c(h/100)};return t.jsxs("div",{className:"percentage-progress-bar",children:[t.jsx("div",{className:"progress-bar-labels",children:w.map(h=>t.jsxs("span",{className:"progress-label",children:[h,"%"]},h))}),t.jsxs("div",{className:"progress-bar-track",children:[t.jsx("div",{className:"progress-bar-fill",style:{width:`${y}%`}}),t.jsx("div",{className:"progress-bar-markers",children:w.map(h=>t.jsx("div",{className:`progress-marker ${h<=y?"active":""}`,onClick:()=>N(h)},h))})]})]})};function et(){const c=qe(),y=C(ne.selectRows)||[],w=C(ce.selectRows)||[],N=C(le.selectRows)||[],h=C(H.selectRows)||[],v=C(H.pendingRows),F=C(ne.selectLoading),D=C(H.selectLoading),G=C(le.selectLoading),me=C(ce.selectLoading),[u,fe]=r.useState("BTCUSDT"),[b,xe]=r.useState("0"),[Je,be]=r.useState("0"),[ge,z]=r.useState(!1),[g,he]=r.useState("LIMIT"),[S,J]=r.useState("0"),[Y,A]=r.useState(""),[m,P]=r.useState(""),[p,I]=r.useState("buy"),[U,ye]=r.useState({asks:[],bids:[]}),[M,O]=r.useState(!1),[X,k]=r.useState(""),[l,ve]=r.useState("Positions"),[i,Ne]=r.useState("trade"),[K,je]=r.useState("10"),[_,we]=r.useState("30"),Z=r.useRef(null),$=r.useRef(!0),ee=r.useRef(u),x=r.useCallback((e,s=2)=>{const o=Number(e);return Number.isFinite(o)?o.toLocaleString(void 0,{minimumFractionDigits:s,maximumFractionDigits:s}):0 .toFixed(s)},[]),R=r.useCallback(e=>{const s=Number(e);return Number.isFinite(s)?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}).format(s):"$0.00"},[]),ke=r.useCallback(e=>{try{return new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}catch{return"Invalid date"}},[]),Q=r.useCallback(e=>{try{return new Date(e).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0})}catch{return"Invalid time"}},[]),Te=r.useCallback(e=>e?e<60?`${e}s`:e<3600?`${Math.floor(e/60)}m`:e<86400?`${Math.floor(e/3600)}h`:e<604800?`${Math.floor(e/86400)}d`:`${Math.floor(e/86400)}d`:"N/A",[]),T=r.useMemo(()=>u.replace("USDT",""),[u]),B=r.useMemo(()=>{if(!Array.isArray(w))return{};const e={};for(const s of w)s.symbol&&s.amount&&(e[s.symbol]=Number(s.amount)||0);return e},[w]),d=r.useMemo(()=>i==="trade"||p==="buy"?B.USDT||0:B[T]||0,[i,p,T,B]),te=r.useMemo(()=>{if(i==="trade"){const e=f(m);if(!Number.isFinite(e)||e<=0||d<=0)return 0;const s=e/d*100;return Math.min(100,Math.max(0,s))}else if(p==="buy"){const e=f(m);if(!Number.isFinite(e)||e<=0||d<=0)return 0;const s=e/d*100;return Math.min(100,Math.max(0,s))}else{const e=f(m),s=f(b);if(!Number.isFinite(e)||e<=0||!Number.isFinite(s)||s<=0||d<=0)return 0;const a=e/s/d*100;return Math.min(100,Math.max(0,a))}},[i,p,m,d,b]),Ce=r.useMemo(()=>i==="trade"?`Available: ${x(d,2)} USDT`:p==="buy"?`Available: ${x(d,2)} USDT`:`Available: ${x(d,6)} ${T}`,[i,p,d,T,x]),Se=r.useMemo(()=>M?n("pages.trade.placing"):i==="trade"?`${p==="buy"?n("pages.trade.long"):n("pages.trade.short")} (USDT)`:`${p==="buy"?n("pages.trade.buy"):n("pages.trade.sell")} ${T}`,[M,i,p,T]),Pe=r.useMemo(()=>u?`wss://stream.binance.com:9443/ws/${u.toLowerCase()}@ticker`:null,[u]),Fe=r.useMemo(()=>u?`wss://stream.binance.com:9443/ws/${u.toLowerCase()}@depth20@100ms`:null,[u]),De=r.useCallback(e=>{e.c!==void 0&&xe(e.c),e.P!==void 0&&be(e.P)},[]),Ae=r.useCallback(e=>{const s=(e.asks||[]).slice(0,5).map(a=>({price:a[0],amount:a[1]})),o=(e.bids||[]).slice(0,5).map(a=>({price:a[0],amount:a[1]}));ye({asks:s,bids:o})},[]);ue(Pe,De,$.current),ue(Fe,Ae,$.current);const L=r.useCallback(e=>{const s=f(e),o=f(i==="perpetual"&&g==="LIMIT"?S:b);if(Number.isFinite(s)&&Number.isFinite(o)&&o>0){const a=s/o;A(a.toFixed(8))}else A("")},[i,g,S,b]);r.useEffect(()=>($.current=!0,c(Ke.doFetch(i)),()=>{$.current=!1,Z.current&&Z.current.abort()}),[c,i]),r.useEffect(()=>{if(!$.current)return;const s=setTimeout(()=>{if(l==="Transaction history"){c(We.doFetch());return}i==="perpetual"?l==="Positions"?c(V.doFetchPending()):l==="History orders"&&c(V.doFetch()):i==="trade"&&(l==="Positions"?c(q.doFetchPending()):l==="History orders"&&c(q.doFetch()))},100);return()=>clearTimeout(s)},[c,i,l]),r.useEffect(()=>{b&&b!=="0"&&(J(b),m&&!isNaN(Number(m))&&L(m))},[b,m,L]),r.useEffect(()=>{ee.current!==u&&(A(""),P(""),ee.current=u)},[u]);const se=r.useCallback(e=>{const s=e.target.value;P(s),s!==""?L(s):A("")},[L]),Me=r.useCallback(e=>{const s=e.target.value;J(s),m&&!isNaN(Number(m))&&L(m)},[m,L]),ae=r.useCallback(e=>{if(i==="trade"){const o=d*e;P(o.toFixed(2))}else if(p==="buy"){const o=d*e;P(o.toFixed(2))}else{const o=d*e,a=f(b)||f(S)||1,j=o*a;P(j.toFixed(2))}},[i,p,d,b,S]),re=r.useCallback(async()=>{const e=parseFloat(b||"0")||0,o={futuresStatus:p==="buy"?"long":"short",profitAndLossAmount:"",leverage:parseInt(K,10),control:"loss",operate:"low",futureCoin:u.replace("USDT","/USDT"),closePositionTime:"",closePositionPrice:"",openPositionTime:new Date().toISOString(),openPositionPrice:e,contractDuration:_,futuresAmount:m};try{const a=await c(_e.doCreate(o)),j=a!=null&&a.id?a:a==null?void 0:a.payload;return j!=null&&j.id?(A(""),P(""),l==="Positions"&&c(q.doFetchPending()),j):null}catch(a){throw console.error("create error",a),a}},[b,p,K,u,_,m,c,l]),Le=r.useCallback(()=>z(!0),[]);r.useCallback(()=>z(!1),[]);const ze=r.useCallback(e=>{if(!e||e===u){z(!1);return}fe(e),z(!1)},[u]),oe=r.useCallback(()=>{const e=Date.now().toString(36),s=Math.floor(Math.random()*1e6).toString(36);return`ORD-${e}-${s}`.toUpperCase()},[]),Ue=r.useCallback(async()=>{if(k(""),!M)if(i==="trade"){const e=f(m);if(!Number.isFinite(e)||e<=0){k(n("pages.trade.errors.invalidAmount"));return}if(e>d){k(n("pages.trade.errors.insufficientUSDT",x(d,2)));return}O(!0);try{await re()}catch(s){console.error("Trade create error",s),k(n("pages.trade.errors.failedOrder"))}finally{O(!1)}}else{const e=f(g==="MARKET"?b:S),s=f(Y);if(!Number.isFinite(s)||s<=0){k(n("pages.trade.errors.invalidQuantity"));return}if(!Number.isFinite(e)||e<=0){k(n("pages.trade.errors.invalidPrice"));return}if(p==="buy"){if(e*s>d){k(n("pages.trade.errors.insufficientUSDT",x(d,2)));return}}else if(s>d){k(n("pages.trade.errors.insufficientCoin",x(d,6),T));return}O(!0);try{const o=e,a=s,j=o*a,Re=j*.001,Be={orderNo:oe(),orderType:g.toLowerCase(),tradingPair:u.replace("USDT","/USDT"),status:g==="MARKET"?"completed":"pending",direction:p.toUpperCase(),delegateType:g,delegateState:g==="MARKET"?"Filled":"Pending",orderQuantity:a,commissionPrice:o,entrustedValue:j,transactionQuantity:g==="MARKET"?a:0,transactionValue:g==="MARKET"?j:0,closingPrice:g==="MARKET"?o:0,handlingFee:g==="MARKET"?Re:0,commissionTime:new Date().toISOString(),closingTime:g==="MARKET"?new Date().toISOString():null};await c(de.doCreate(Be)),A(""),P(""),l==="Positions"&&c(V.doFetchPending())}catch(o){console.error("Place order error",o),k(n("pages.trade.errors.failedOrder"))}finally{O(!1)}}},[M,Y,g,b,S,u,p,c,oe,d,T,x,i,re,m,l]),$e=r.useCallback(async(e,s)=>{s.status="canceled",c(de.doUpdate(e,s))},[c]),ie=r.useMemo(()=>{const e=[...U.asks.map(s=>f(s.amount)),...U.bids.map(s=>f(s.amount))].filter(s=>Number.isFinite(s));return Math.max(...e,1)},[U]),Ee=r.useCallback((e,s,o)=>{const a={icon:"fa-exchange-alt",typeText:n("pages.history.transactionTypes.transaction"),iconClass:"swap",color:"#627EEA",amountColor:s==="in"?"#2ff378":"#FF6838"};switch(e){case"deposit":a.icon="fa-arrow-down",a.typeText=n("pages.history.transactionTypes.deposit"),a.iconClass="deposit",a.color="#F3BA2F",a.amountColor="#2ff378";break;case"withdraw":a.icon="fa-arrow-up",a.typeText=n("pages.history.transactionTypes.withdrawal"),a.iconClass="withdraw",a.color="#FF6838",a.amountColor="#FF6838";break;case"futures_profit":a.icon="fa-chart-line",a.typeText=n("pages.history.transactionTypes.futuresProfit"),a.iconClass="futures-profit",a.color="#00C076",a.amountColor="#00C076";break;case"futures_loss":a.icon="fa-chart-line",a.typeText=n("pages.history.transactionTypes.futuresLoss"),a.iconClass="futures-loss",a.color="#FF6838",a.amountColor="#FF6838";break;case"futures_reserved":a.icon="fa-clock",a.typeText=n("pages.history.transactionTypes.futuresReserved"),a.iconClass="futures-reserved",a.color="#FF9800",a.amountColor="#FF6838";break;case"order_reserved":a.icon="fa-clock",a.typeText=n("pages.history.transactionTypes.orderReserved"),a.iconClass="order-reserved",a.color="#FF9800",a.amountColor="#FF6838";break;default:a.icon="fa-exchange-alt",a.typeText=n("pages.history.transactionTypes.transaction"),a.iconClass="default",a.color="#627EEA",a.amountColor="#627EEA"}return a},[n]),Ie=r.useCallback(e=>{const s={color:"#6c757d",bgColor:"#e9ecef",text:e||"Unknown"};switch(e==null?void 0:e.toLowerCase()){case"long":s.color="#37b66a",s.bgColor="rgba(55, 182, 106, 0.1)",s.text="Long";break;case"short":s.color="#f56c6c",s.bgColor="rgba(245, 108, 108, 0.1)",s.text="Short";break;case"closed":s.color="#106cf5",s.bgColor="rgba(16, 108, 245, 0.1)",s.text="Closed";break;case"liquidated":s.color="#dc3545",s.bgColor="rgba(220, 53, 69, 0.1)",s.text="Liquidated";break}return s},[]),W=r.useMemo(()=>l==="Transaction history"?G:i==="perpetual"?F:i==="trade"?D:!1,[l,i,F,D,G]),E=r.useMemo(()=>l==="Transaction history"?N:i==="perpetual"&&l==="Positions"?y.filter(e=>e.status==="pending"):i==="perpetual"&&l==="History orders"?y.filter(e=>e.status!=="pending"):i==="trade"&&l==="Positions"?v:i==="trade"&&l==="History orders"?h.filter(e=>e.closePositionTime):[],[l,i,y,h,N,v]),Oe=r.useMemo(()=>W?!1:E.length===0,[W,E]);return t.jsxs("div",{className:"container",children:[t.jsx("div",{className:"trade-header",children:t.jsxs("div",{className:"nav-bar",children:[t.jsxs("div",{className:"back-arrow",children:[t.jsxs("div",{className:"trading-pair",onClick:Le,children:[t.jsx("i",{className:"fas fa-chevron-down dropdown-arrow"}),u.replace("USDT","")," / USDT"]}),t.jsx("div",{children:t.jsx("p",{style:{fontSize:10},children:i==="trade"?"Trade":"Perpetual"})})]}),t.jsxs("div",{className:"header-right",children:[t.jsxs("select",{className:"trade-type-select",value:i,onChange:e=>Ne(e.target.value),children:[t.jsx("option",{value:"trade",children:"Trading"}),t.jsx("option",{value:"perpetual",children:"Perpetual"})]}),t.jsx(Qe,{to:`market/detail/${u}`,className:"chart-icon",children:t.jsx("i",{className:"fas fa-chart-line"})})]})]})}),t.jsxs("div",{className:"main-content",children:[t.jsxs("div",{className:"trading-layout",children:[t.jsxs("div",{className:"trade-form",children:[t.jsxs("div",{className:"buy-sell-tabs",role:"tablist",children:[t.jsx("div",{role:"tab","aria-selected":p==="buy",tabIndex:0,className:`buy-tab ${p==="buy"?"active":""}`,onClick:()=>I("buy"),onKeyDown:e=>e.key==="Enter"&&I("buy"),children:n("pages.trade.long")}),t.jsx("div",{role:"tab","aria-selected":p==="sell",tabIndex:0,className:`sell-tab ${p==="sell"?"active":""}`,onClick:()=>I("sell"),onKeyDown:e=>e.key==="Enter"&&I("sell"),children:n("pages.trade.short")})]}),i==="trade"&&t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"input-group",children:[t.jsx("div",{className:"input-label",children:"Trading Period"}),t.jsx("select",{className:"order-type-select",value:_,onChange:e=>we(e.target.value),children:Ve.map(e=>t.jsx("option",{value:e.value,children:e.label},e.value))})]}),t.jsxs("div",{className:"input-group",children:[t.jsx("div",{className:"input-label",children:"Leverage"}),t.jsx("select",{className:"order-type-select",value:K,onChange:e=>je(e.target.value),children:Ge.map(e=>t.jsxs("option",{value:e,children:[e,"x"]},e))})]}),t.jsxs("div",{className:"input-group",children:[t.jsxs("div",{className:"input-label",children:[n("pages.trade.amount")," (USDT)"]}),t.jsx("div",{className:"input-with-buttons",children:t.jsx("input",{className:"value-input",value:m,onChange:se,placeholder:"0.0",inputMode:"decimal","aria-label":"amount in usdt"})}),t.jsx(pe,{onPercentageSelect:ae,currentPercentage:te})]})]}),i==="perpetual"&&t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"order-type",children:[t.jsx("div",{className:"order-type-label",children:n("pages.trade.orderType")}),t.jsxs("select",{className:"order-type-select",value:g,onChange:e=>he(e.target.value),children:[t.jsx("option",{value:"LIMIT",children:n("pages.trade.limit")}),t.jsx("option",{value:"MARKET",children:n("pages.trade.market")})]})]}),g==="LIMIT"&&t.jsxs("div",{className:"input-group",children:[t.jsx("div",{className:"input-label",children:n("pages.trade.price")}),t.jsx("div",{className:"input-with-buttons",children:t.jsx("input",{className:"value-input",value:S,onChange:Me,inputMode:"decimal","aria-label":"price"})})]}),t.jsxs("div",{className:"input-group",children:[t.jsxs("div",{className:"input-label",children:[n("pages.trade.amount")," (USDT)"]}),t.jsx("div",{className:"input-with-buttons",children:t.jsx("input",{className:"value-input",value:m,onChange:se,placeholder:"0.0",inputMode:"decimal","aria-label":"amount in usdt"})}),t.jsx(pe,{onPercentageSelect:ae,currentPercentage:te})]})]}),t.jsx("div",{className:"balance-info",children:Ce}),X&&t.jsx("div",{className:"error-message",role:"alert",children:X}),t.jsx("button",{className:`action-button ${p==="buy"?"buy-button":"sell-button"}`,onClick:Ue,disabled:M||me,"aria-busy":M,children:Se})]}),t.jsxs("div",{className:"order-book",role:"region","aria-label":"order book",children:[t.jsxs("div",{className:"order-book-header",children:[t.jsx("span",{children:n("pages.trade.orderBook.price")}),t.jsxs("span",{children:[n("pages.trade.orderBook.amount")," (",T,")"]})]}),U.asks.map((e,s)=>{const o=f(e.amount)||0,a=Math.min(100,o/ie*100);return t.jsxs("div",{className:"order-book-row ask-row",children:[t.jsx("div",{className:"depth-bar ask-depth",style:{width:`${a}%`}}),t.jsx("div",{className:"order-price",children:x(e.price,4)}),t.jsx("div",{className:"order-amount",children:x(e.amount,4)})]},`ask-${s}`)}),t.jsx("div",{className:"order-book-row current-price-row",children:t.jsxs("div",{className:"current-price",children:["$",x(b,2)]})}),U.bids.map((e,s)=>{const o=f(e.amount)||0,a=Math.min(100,o/ie*100);return t.jsxs("div",{className:"order-book-row bid-row",children:[t.jsx("div",{className:"depth-bar bid-depth",style:{width:`${a}%`}}),t.jsx("div",{className:"order-price",children:x(e.price,4)}),t.jsx("div",{className:"order-amount",children:x(e.amount,4)})]},`bid-${s}`)})]})]}),t.jsxs("div",{className:"orders-tabs",children:[t.jsx("div",{className:"orders-tabs-header",children:["Positions","History orders","Transaction history"].map(e=>t.jsx("div",{className:`orders-tab ${l===e?"active":""}`,onClick:()=>ve(e),children:e},e))}),t.jsx("div",{className:"orders-tab-content",children:W?t.jsx("div",{className:"loading-skeleton",children:[...Array(3)].map((e,s)=>t.jsx("div",{className:"skeleton-item"},s))}):Oe?t.jsxs("div",{className:"empty-orders",children:[t.jsx("div",{className:"empty-icon",children:t.jsx("i",{className:"fas fa-inbox"})}),t.jsxs("div",{className:"empty-text",children:["No ",l.toLowerCase()," found"]}),t.jsx("div",{className:"empty-subtext",children:l==="Transaction history"?"Your transactions will appear here":`Your ${l.toLowerCase()} will appear here`})]}):l==="Transaction history"?t.jsx("div",{className:"transactions-list",children:E.map(e=>{const s=Ee(e.type,e.direction,e.relatedAsset),o=e.direction==="in"?"+":"-";return t.jsxs("div",{className:"transaction-item",children:[t.jsx("div",{className:"transaction-icon",style:{backgroundColor:s.color},children:t.jsx("i",{className:`fas ${s.icon}`})}),t.jsxs("div",{className:"transaction-details",children:[t.jsxs("div",{className:"transaction-main",children:[t.jsx("div",{className:"transaction-type",children:s.typeText}),t.jsxs("div",{className:"transaction-amount",style:{color:s.amountColor},children:[o,x(e.amount,2)," ",e.asset]})]}),t.jsxs("div",{className:"transaction-secondary",children:[t.jsx("div",{className:"transaction-status",children:t.jsx("span",{className:`status-badge status-${e.status}`,children:e.status})}),t.jsxs("div",{className:"transaction-date",children:[ke(e.createdAt)," ",Q(e.createdAt)]})]})]})]},e.id??e._id)})}):i==="perpetual"?t.jsx("div",{className:"orders-list",children:E.map(e=>{var s;return t.jsxs("div",{className:"order-item",children:[t.jsxs("div",{className:"order-main-info",children:[t.jsxs("div",{className:"order-pair-action",children:[t.jsx("span",{className:"order-pair",children:e.tradingPair}),t.jsx("span",{className:`order-action ${String((e==null?void 0:e.direction)||"").toLowerCase()}`,children:e.direction}),t.jsx("span",{className:"order-type-badge",children:e.orderType})]}),t.jsxs("div",{className:"order-date",children:[e.commissionTime?new Date(e.commissionTime).toLocaleDateString():"",t.jsx("span",{className:"order-time",children:e.commissionTime?new Date(e.commissionTime).toLocaleTimeString():""})]})]}),t.jsxs("div",{className:"order-details",children:[t.jsxs("div",{className:"order-detail",children:[t.jsx("span",{className:"detail-label",children:"Status"}),t.jsx("span",{className:`order-status ${String(e.status).toLowerCase()}`,children:e.status})]}),t.jsxs("div",{className:"order-detail",children:[t.jsx("span",{className:"detail-label",children:"Price"}),t.jsxs("span",{className:"order-price-value",children:[x(e.commissionPrice,4)," USDT"]})]}),t.jsxs("div",{className:"order-detail",children:[t.jsx("span",{className:"detail-label",children:"Amount"}),t.jsxs("span",{className:"order-amount-value",children:[e.orderQuantity," ",(s=e==null?void 0:e.tradingPair)==null?void 0:s.split("/")[0]]})]}),t.jsxs("div",{className:"order-detail",children:[t.jsx("span",{className:"detail-label",children:"Total"}),t.jsxs("span",{className:"order-total",children:[x(e.entrustedValue)," USDT"]})]})]}),t.jsx("div",{className:"order-actions",children:String(e.status).toLowerCase()==="pending"||String(e.status).toLowerCase()==="partially filled"?t.jsx("button",{className:"cancel-order-btn",onClick:()=>$e(e.id,e),children:"Cancel"}):t.jsx("div",{className:"completed-indicator",children:t.jsx("i",{className:"fas fa-check-circle"})})})]},e.id??e.orderNo)})}):t.jsx("div",{className:"futures-list",children:E.map(e=>{const s=Ie(e.futuresStatus),o=e.profitAndLossAmount?f(e.profitAndLossAmount):0,a=o>=0;return t.jsxs("div",{className:"future-item",children:[t.jsxs("div",{className:"future-header",children:[t.jsxs("div",{className:"future-pair-status",children:[t.jsx("span",{className:"future-pair",children:e.futureCoin||"Unknown"}),t.jsx("span",{className:"future-status",style:{color:s.color,backgroundColor:s.bgColor},children:s.text})]}),t.jsxs("div",{className:"future-leverage",children:[e.leverage,"x"]})]}),t.jsxs("div",{className:"future-details",children:[t.jsxs("div",{className:"future-detail-row",children:[t.jsx("span",{className:"detail-label",children:"Amount"}),t.jsx("span",{className:"detail-value",children:R(e.futuresAmount)})]}),t.jsxs("div",{className:"future-detail-row",children:[t.jsx("span",{className:"detail-label",children:"Duration"}),t.jsx("span",{className:"detail-value",children:Te(e.contractDuration)})]}),t.jsxs("div",{className:"future-detail-row",children:[t.jsx("span",{className:"detail-label",children:"Entry Price"}),t.jsx("span",{className:"detail-value",children:R(e.openPositionPrice)})]}),e.closePositionPrice&&t.jsxs("div",{className:"future-detail-row",children:[t.jsx("span",{className:"detail-label",children:"Exit Price"}),t.jsx("span",{className:"detail-value",children:R(e.closePositionPrice)})]}),(o!==0||e.profitAndLossAmount)&&t.jsxs("div",{className:"future-detail-row",children:[t.jsx("span",{className:"detail-label",children:"P&L"}),t.jsxs("span",{className:`detail-value ${a?"profit":"loss"}`,children:[a?"+":"",R(o)]})]})]}),t.jsxs("div",{className:"future-footer",children:[t.jsxs("div",{className:"future-timestamp",children:[t.jsx("div",{className:"timestamp-label",children:"Opened"}),t.jsx("div",{className:"timestamp-value",children:e.openPositionTime?Q(e.openPositionTime):"N/A"})]}),e.closePositionTime&&t.jsxs("div",{className:"future-timestamp",children:[t.jsx("div",{className:"timestamp-label",children:"Closed"}),t.jsx("div",{className:"timestamp-value",children:Q(e.closePositionTime)})]})]})]},e.id??e._id)})})})]})]}),t.jsx(He,{isOpen:ge,onClose:()=>z(!1),selectedCoin:u,onCoinSelect:ze,title:"Select Trading Pair"}),t.jsx("style",{children:`
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
