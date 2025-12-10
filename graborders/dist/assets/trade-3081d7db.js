import{u as S,z as ue,A as pe,B as me,C as V,i as s,D as Ke,E as i,F as fe,G as J,j as t,L as Qe,H as qe,I as Y,J as We}from"./index-8ef7e624.js";import{C as He}from"./CoinSelectorSidebar-c0d6e210.js";import{u as _e}from"./useDispatch-ca929f38.js";const m=l=>{if(l==null||l==="")return NaN;const P=Number(l);return Number.isFinite(P)?P:NaN};function Xe(){const l=_e(),P=S(ue.selectRows)||[],B=S(pe.selectRows)||[],G=S(me.selectRows)||[],X=S(V.selectRows)||[],xe=S(V.pendingRows),Z=S(ue.selectLoading),ee=S(V.selectLoading),te=S(me.selectLoading),ge=S(pe.selectLoading),[d,be]=s.useState("BTCUSDT"),[h,he]=s.useState("0"),[Ve,ye]=s.useState("0"),[ve,D]=s.useState(!1),[x,Ne]=s.useState("LIMIT"),[F,ae]=s.useState("0"),[y,T]=s.useState(""),[je,w]=s.useState(""),[u,U]=s.useState("buy"),[L,we]=s.useState({asks:[],bids:[]}),[A,$]=s.useState(!1),[re,v]=s.useState(""),[n,ke]=s.useState("Positions"),[c,Ce]=s.useState("trade"),[se,Se]=s.useState("10"),[oe,Te]=s.useState("30s"),Fe=[{value:30,label:"30s - 20%"},{value:60,label:"60s - 30%"},{value:120,label:"120s - 50%"},{value:86400,label:"24h - 60%"},{value:172800,label:"48h - 70%"},{value:259200,label:"72h - 80%"},{value:604800,label:"7d - 90%"},{value:1296e3,label:"15d - 100%"}],Pe=["1","2","3","5","10","20","50","100"],N=s.useRef(null),j=s.useRef(null),K=s.useRef(d),Q=s.useRef(null),z=s.useRef(!0),k=s.useMemo(()=>d.replace("USDT",""),[d]),q=s.useMemo(()=>Array.isArray(B)?B.reduce((e,a)=>(e[a.symbol]=Number(a.amount)||0,e),{}):{},[B]),g=s.useMemo(()=>u==="buy"?q.USDT||0:q[k]||0,[u,k,q]),f=s.useCallback((e,a=2)=>{const o=Number(e);return Number.isFinite(o)?o.toLocaleString(void 0,{minimumFractionDigits:a,maximumFractionDigits:a}):0 .toFixed(a)},[]),E=s.useCallback(e=>{const a=Number(e);return Number.isFinite(a)?new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}).format(a):"$0.00"},[]),De=s.useCallback(e=>{try{return new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}catch{return"Invalid date"}},[]),W=s.useCallback(e=>{try{return new Date(e).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0})}catch{return"Invalid time"}},[]),Le=s.useCallback(e=>e?e<60?`${e}s`:e<3600?`${Math.floor(e/60)}m`:e<86400?`${Math.floor(e/3600)}h`:e<604800?`${Math.floor(e/86400)}d`:`${Math.floor(e/86400)}d`:"N/A",[]),Ae=(e,a,o)=>{const r={icon:"fa-exchange-alt",typeText:i("pages.history.transactionTypes.transaction"),iconClass:"swap",color:"#627EEA",amountColor:a==="in"?"#2ff378":"#FF6838"};switch(e){case"deposit":r.icon="fa-arrow-down",r.typeText=i("pages.history.transactionTypes.deposit"),r.iconClass="deposit",r.color="#F3BA2F",r.amountColor="#2ff378";break;case"withdraw":r.icon="fa-arrow-up",r.typeText=i("pages.history.transactionTypes.withdrawal"),r.iconClass="withdraw",r.color="#FF6838",r.amountColor="#FF6838";break;case"futures_profit":r.icon="fa-chart-line",r.typeText=i("pages.history.transactionTypes.futuresProfit"),r.iconClass="futures-profit",r.color="#00C076",r.amountColor="#00C076";break;case"futures_loss":r.icon="fa-chart-line",r.typeText=i("pages.history.transactionTypes.futuresLoss"),r.iconClass="futures-loss",r.color="#FF6838",r.amountColor="#FF6838";break;case"futures_reserved":r.icon="fa-clock",r.typeText=i("pages.history.transactionTypes.futuresReserved"),r.iconClass="futures-reserved",r.color="#FF9800",r.amountColor="#FF6838";break;case"order_reserved":r.icon="fa-clock",r.typeText=i("pages.history.transactionTypes.orderReserved"),r.iconClass="order-reserved",r.color="#FF9800",r.amountColor="#FF6838";break;default:r.icon="fa-exchange-alt",r.typeText=i("pages.history.transactionTypes.transaction"),r.iconClass="default",r.color="#627EEA",r.amountColor="#627EEA"}return r},ie=s.useCallback(()=>{const e=Date.now().toString(36),a=Math.floor(Math.random()*1e6).toString(36);return`ORD-${e}-${a}`.toUpperCase()},[]),ne=s.useCallback(()=>{Q.current&&(Q.current.abort(),Q.current=null)},[]),ce=s.useCallback(()=>{N.current&&(N.current.close(),N.current=null),j.current&&(j.current.close(),j.current=null)},[]),I=s.useCallback(e=>{const a=m(e),o=m(F);if(Number.isFinite(a)&&Number.isFinite(o)&&o>0){const r=a/o;T(r.toFixed(8))}else T("")},[F]),O=s.useCallback(e=>{const a=m(e),o=m(F);if(Number.isFinite(a)&&Number.isFinite(o)){const r=a*o;w(r.toFixed(2))}else w("")},[F]),le=s.useMemo(()=>{const e=[...L.asks.map(a=>m(a.amount)),...L.bids.map(a=>m(a.amount))].filter(a=>Number.isFinite(a));return Math.max(...e,1)},[L]),ze=e=>{const a={color:"#6c757d",bgColor:"#e9ecef",text:e||"Unknown"};switch(e==null?void 0:e.toLowerCase()){case"long":a.color="#37b66a",a.bgColor="rgba(55, 182, 106, 0.1)",a.text="Long";break;case"short":a.color="#f56c6c",a.bgColor="rgba(245, 108, 108, 0.1)",a.text="Short";break;case"closed":a.color="#106cf5",a.bgColor="rgba(16, 108, 245, 0.1)",a.text="Closed";break;case"liquidated":a.color="#dc3545",a.bgColor="rgba(220, 53, 69, 0.1)",a.text="Liquidated";break}return a};s.useEffect(()=>(z.current=!0,l(Ke.doFetch(c)),()=>{z.current=!1,ne(),ce()}),[l,ne,ce,c]),s.useEffect(()=>{if(!z.current)return;let e;return e=setTimeout(()=>{if(n==="Transaction history"){l(qe.doFetch());return}c==="perpetual"?n==="Positions"?l(J.doFetchPending()):n==="History orders"&&l(J.doFetch()):c==="trade"&&(n==="Positions"?l(Y.doFetchPending()):n==="History orders"&&l(Y.doFetch()))},100),()=>{clearTimeout(e)}},[l,c,n]),s.useEffect(()=>{if(h&&h!=="0"&&(ae(h),y&&!isNaN(Number(y)))){const e=Number(y)*Number(h);w(e.toFixed(2))}},[h,y]);const Me=s.useCallback(e=>{const a=e.target.value;T(a),O(a)},[O]),Ue=s.useCallback(e=>{const a=e.target.value;w(a),a!==""?I(a):T("")},[I]),de=async()=>{const e=parseFloat(h||"0")||0,o={futuresStatus:u==="buy"?"long":"short",profitAndLossAmount:"",leverage:parseInt(se,10),control:"loss",operate:"low",futureCoin:d.replace("USDT","/USDT"),closePositionTime:"",closePositionPrice:"",openPositionTime:new Date().toISOString(),openPositionPrice:e,contractDuration:oe,futuresAmount:je};try{const r=await l(We.doCreate(o)),b=r!=null&&r.id?r:r==null?void 0:r.payload;return b!=null&&b.id?(T(""),w(""),n==="Positions"&&l(Y.doFetchPending()),b):null}catch(r){throw console.error("create error",r),r}};s.useEffect(()=>{K.current=d;const e=(r,b,C)=>{if(!z.current||K.current!==d)return null;try{const p=new WebSocket(r);return p.onopen=()=>{console.log(`${C} WebSocket connected for:`,d)},p.onmessage=R=>{if(!(!z.current||K.current!==d))try{const _=JSON.parse(R.data);b(_)}catch(_){console.error(`Error parsing ${C} data:`,_)}},p.onerror=R=>{console.error(`${C} WebSocket error:`,R)},p.onclose=R=>{console.log(`${C} WebSocket closed for:`,d)},p}catch(p){return console.error(`Error creating ${C} WebSocket:`,p),null}};N.current&&(N.current.close(),N.current=null),j.current&&(j.current.close(),j.current=null);const a=`wss://stream.binance.com:9443/ws/${d.toLowerCase()}@ticker`;N.current=e(a,r=>{r.c!==void 0&&he(r.c),r.P!==void 0&&ye(r.P)},"ticker");const o=`wss://stream.binance.com:9443/ws/${d.toLowerCase()}@depth20@100ms`;return j.current=e(o,r=>{const b=(r.asks||[]).slice(0,5).map(p=>({price:p[0],amount:p[1]})),C=(r.bids||[]).slice(0,5).map(p=>({price:p[0],amount:p[1]}));we({asks:b,bids:C})},"depth"),()=>{N.current&&(N.current.close(),N.current=null),j.current&&(j.current.close(),j.current=null)}},[d]);const $e=s.useCallback(()=>D(!0),[]);s.useCallback(()=>D(!1),[]);const Ee=s.useCallback(e=>{if(!e||e===d){D(!1);return}be(e),D(!1),T(""),w("")},[d]),Ie=s.useCallback(e=>{const a=e.target.value;ae(a);const o=m(y);if(Number.isFinite(o)){const r=o*Number(a);w(r.toFixed(2))}},[y]);s.useCallback(e=>{if(u==="buy"){const o=g*e;w(o.toFixed(2)),I(o)}else{const o=g*e;T(o.toFixed(8)),O(o)}},[u,g,I,O]);const Oe=s.useCallback(async()=>{if(v(""),!A)if(c==="trade"){const e=m(y);if(!Number.isFinite(e)||e<=0){v(i("pages.trade.errors.invalidQuantity"));return}if(u==="buy"){if(m(h)*e>g){v(i("pages.trade.errors.insufficientUSDT",f(g,2)));return}}else if(e>g){v(i("pages.trade.errors.insufficientCoin",f(g,6),k));return}$(!0);try{await de()}catch(a){console.error("Trade create error",a),v(i("pages.trade.errors.failedOrder"))}finally{$(!1)}}else{const e=m(y),a=m(x==="MARKET"?h:F);if(!Number.isFinite(e)||e<=0){v(i("pages.trade.errors.invalidQuantity"));return}if(!Number.isFinite(a)||a<=0){v(i("pages.trade.errors.invalidPrice"));return}if(u==="buy"){if(a*e>g){v(i("pages.trade.errors.insufficientUSDT",f(g,2)));return}}else if(e>g){v(i("pages.trade.errors.insufficientCoin",f(g,6),k));return}$(!0);try{const o=a,r=e,b=o*r,C=b*.001,p={orderNo:ie(),orderType:x.toLowerCase(),tradingPair:d.replace("USDT","/USDT"),status:x==="MARKET"?"completed":"pending",direction:u.toUpperCase(),delegateType:x,delegateState:x==="MARKET"?"Filled":"Pending",orderQuantity:r,commissionPrice:o,entrustedValue:b,transactionQuantity:x==="MARKET"?r:0,transactionValue:x==="MARKET"?b:0,closingPrice:x==="MARKET"?o:0,handlingFee:x==="MARKET"?C:0,commissionTime:new Date().toISOString(),closingTime:x==="MARKET"?new Date().toISOString():null};await l(fe.doCreate(p)),T(""),w(""),n==="Positions"&&l(J.doFetchPending())}catch(o){console.error("Place order error",o),v(i("pages.trade.errors.failedOrder"))}finally{$(!1)}}},[A,y,x,h,F,d,u,l,ie,g,k,f,c,de]),Re=async(e,a)=>{a.status="canceled",l(fe.doUpdate(e,a))},H=s.useMemo(()=>n==="Transaction history"?te:c==="perpetual"?Z:c==="trade"?ee:!1,[n,c,Z,ee,te]),M=s.useMemo(()=>n==="Transaction history"?G:c==="perpetual"&&n==="Positions"?P.filter(e=>e.status==="pending"):c==="perpetual"&&n==="History orders"?P.filter(e=>e.status!=="pending"):c==="trade"&&n==="Positions"?xe:c==="trade"&&n==="History orders"?X.filter(e=>e.closePositionTime):[],[n,c,P,X,G]),Be=s.useMemo(()=>H?!1:M.length===0,[H,M]);return t.jsxs("div",{className:"container",children:[t.jsx("div",{className:"trade-header",children:t.jsxs("div",{className:"nav-bar",children:[t.jsxs("div",{className:"back-arrow",children:[t.jsxs("div",{className:"trading-pair",onClick:$e,children:[t.jsx("i",{className:"fas fa-chevron-down dropdown-arrow"}),d.replace("USDT","")," / USDT"]}),t.jsx("div",{children:t.jsx("p",{style:{fontSize:10},children:c==="trade"?"Trade":"Perpetual"})})]}),t.jsxs("div",{className:"header-right",children:[t.jsxs("select",{className:"trade-type-select",value:c,onChange:e=>Ce(e.target.value),children:[t.jsx("option",{value:"trade",children:"Trade"}),t.jsx("option",{value:"perpetual",children:"Perpetual"})]}),t.jsx(Qe,{to:`market/detail/${d}`,className:"chart-icon",children:t.jsx("i",{className:"fas fa-chart-line"})})]})]})}),t.jsxs("div",{className:"main-content",children:[t.jsxs("div",{className:"trading-layout",children:[t.jsxs("div",{className:"trade-form",children:[t.jsxs("div",{className:"buy-sell-tabs",role:"tablist",children:[t.jsx("div",{role:"tab","aria-selected":u==="buy",tabIndex:0,className:`buy-tab ${u==="buy"?"active":""}`,onClick:()=>U("buy"),onKeyDown:e=>e.key==="Enter"&&U("buy"),children:i("pages.trade.long")}),t.jsx("div",{role:"tab","aria-selected":u==="sell",tabIndex:0,className:`sell-tab ${u==="sell"?"active":""}`,onClick:()=>U("sell"),onKeyDown:e=>e.key==="Enter"&&U("sell"),children:i("pages.trade.short")})]}),c==="trade"&&t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"input-group",children:[t.jsx("div",{className:"input-label",children:"Trading Period"}),t.jsx("select",{className:"order-type-select",value:oe,onChange:e=>Te(e.target.value),children:Fe.map(e=>t.jsx("option",{value:e.value,children:e.label},e.value))})]}),t.jsxs("div",{className:"input-group",children:[t.jsx("div",{className:"input-label",children:"Leverage"}),t.jsx("select",{className:"order-type-select",value:se,onChange:e=>Se(e.target.value),children:Pe.map(e=>t.jsxs("option",{value:e,children:[e,"x"]},e))})]})]}),c==="perpetual"&&t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"order-type",children:[t.jsx("div",{className:"order-type-label",children:i("pages.trade.orderType")}),t.jsxs("select",{className:"order-type-select",value:x,onChange:e=>Ne(e.target.value),children:[t.jsx("option",{value:"LIMIT",children:i("pages.trade.limit")}),t.jsx("option",{value:"MARKET",children:i("pages.trade.market")})]})]}),x==="LIMIT"&&t.jsxs("div",{className:"input-group",children:[t.jsx("div",{className:"input-label",children:i("pages.trade.price")}),t.jsx("div",{className:"input-with-buttons",children:t.jsx("input",{className:"value-input",value:F,onChange:Ie,inputMode:"decimal","aria-label":"price"})})]})]}),t.jsxs("div",{className:"input-group",children:[t.jsxs("div",{className:"input-label",children:[i("pages.trade.amount")," (",k,")"]}),t.jsx("div",{className:"input-with-buttons",children:t.jsx("input",{className:"value-input",value:y,onChange:Me,placeholder:"0.0",inputMode:"decimal","aria-label":"quantity"})})]}),t.jsxs("div",{className:"input-group",children:[t.jsxs("div",{className:"input-label",children:[i("pages.trade.amount")," (USDT)"]}),t.jsx("input",{className:"value-input",onChange:Ue,placeholder:"0.0",inputMode:"decimal","aria-label":"amount in usdt"})]}),t.jsxs("div",{className:"balance-info",children:[i("pages.trade.available"),": ",f(g,u==="buy"?2:6)," ",u==="buy"?"USDT":k]}),re&&t.jsx("div",{className:"error-message",role:"alert",children:re}),t.jsx("button",{className:`action-button ${u==="buy"?"buy-button":"sell-button"}`,onClick:Oe,disabled:A||ge,"aria-busy":A,children:A?i("pages.trade.placing"):`${u==="buy"?i("pages.trade.buy"):i("pages.trade.sell")} ${k}`})]}),t.jsxs("div",{className:"order-book",role:"region","aria-label":"order book",children:[t.jsxs("div",{className:"order-book-header",children:[t.jsx("span",{children:i("pages.trade.orderBook.price")}),t.jsxs("span",{children:[i("pages.trade.orderBook.amount")," (",k,")"]})]}),L.asks.map((e,a)=>{const o=m(e.amount)||0,r=Math.min(100,o/le*100);return t.jsxs("div",{className:"order-book-row ask-row",children:[t.jsx("div",{className:"depth-bar ask-depth",style:{width:`${r}%`}}),t.jsx("div",{className:"order-price",children:f(e.price,4)}),t.jsx("div",{className:"order-amount",children:f(e.amount,4)})]},`ask-${a}`)}),t.jsx("div",{className:"order-book-row current-price-row",children:t.jsxs("div",{className:"current-price",children:["$",f(h,2)]})}),L.bids.map((e,a)=>{const o=m(e.amount)||0,r=Math.min(100,o/le*100);return t.jsxs("div",{className:"order-book-row bid-row",children:[t.jsx("div",{className:"depth-bar bid-depth",style:{width:`${r}%`}}),t.jsx("div",{className:"order-price",children:f(e.price,4)}),t.jsx("div",{className:"order-amount",children:f(e.amount,4)})]},`bid-${a}`)})]})]}),t.jsxs("div",{className:"orders-tabs",children:[t.jsx("div",{className:"orders-tabs-header",children:["Positions","History orders","Transaction history"].map(e=>t.jsx("div",{className:`orders-tab ${n===e?"active":""}`,onClick:()=>ke(e),children:e},e))}),t.jsx("div",{className:"orders-tab-content",children:H?t.jsx("div",{className:"loading-skeleton",children:[...Array(3)].map((e,a)=>t.jsx("div",{className:"skeleton-item"},a))}):Be?t.jsxs("div",{className:"empty-orders",children:[t.jsx("div",{className:"empty-icon",children:t.jsx("i",{className:"fas fa-inbox"})}),t.jsxs("div",{className:"empty-text",children:["No ",n.toLowerCase()," found"]}),t.jsx("div",{className:"empty-subtext",children:n==="Transaction history"?"Your transactions will appear here":`Your ${n.toLowerCase()} will appear here`})]}):n==="Transaction history"?t.jsx("div",{className:"transactions-list",children:M.map(e=>{const a=Ae(e.type,e.direction,e.relatedAsset),o=e.direction==="in"?"+":"-";return t.jsxs("div",{className:"transaction-item",children:[t.jsx("div",{className:"transaction-icon",style:{backgroundColor:a.color},children:t.jsx("i",{className:`fas ${a.icon}`})}),t.jsxs("div",{className:"transaction-details",children:[t.jsxs("div",{className:"transaction-main",children:[t.jsx("div",{className:"transaction-type",children:a.typeText}),t.jsxs("div",{className:"transaction-amount",style:{color:a.amountColor},children:[o,f(e.amount,2)," ",e.asset]})]}),t.jsxs("div",{className:"transaction-secondary",children:[t.jsx("div",{className:"transaction-status",children:t.jsx("span",{className:`status-badge status-${e.status}`,children:e.status})}),t.jsxs("div",{className:"transaction-date",children:[De(e.createdAt)," ",W(e.createdAt)]})]})]})]},e.id??e._id)})}):c==="perpetual"?t.jsx("div",{className:"orders-list",children:M.map(e=>{var a;return t.jsxs("div",{className:"order-item",children:[t.jsxs("div",{className:"order-main-info",children:[t.jsxs("div",{className:"order-pair-action",children:[t.jsx("span",{className:"order-pair",children:e.tradingPair}),t.jsx("span",{className:`order-action ${String((e==null?void 0:e.direction)||"").toLowerCase()}`,children:e.direction}),t.jsx("span",{className:"order-type-badge",children:e.orderType})]}),t.jsxs("div",{className:"order-date",children:[e.commissionTime?new Date(e.commissionTime).toLocaleDateString():"",t.jsx("span",{className:"order-time",children:e.commissionTime?new Date(e.commissionTime).toLocaleTimeString():""})]})]}),t.jsxs("div",{className:"order-details",children:[t.jsxs("div",{className:"order-detail",children:[t.jsx("span",{className:"detail-label",children:"Status"}),t.jsx("span",{className:`order-status ${String(e.status).toLowerCase()}`,children:e.status})]}),t.jsxs("div",{className:"order-detail",children:[t.jsx("span",{className:"detail-label",children:"Price"}),t.jsxs("span",{className:"order-price-value",children:[f(e.commissionPrice,4)," USDT"]})]}),t.jsxs("div",{className:"order-detail",children:[t.jsx("span",{className:"detail-label",children:"Amount"}),t.jsxs("span",{className:"order-amount-value",children:[e.orderQuantity," ",(a=e==null?void 0:e.tradingPair)==null?void 0:a.split("/")[0]]})]}),t.jsxs("div",{className:"order-detail",children:[t.jsx("span",{className:"detail-label",children:"Total"}),t.jsxs("span",{className:"order-total",children:[f(e.entrustedValue)," USDT"]})]})]}),t.jsx("div",{className:"order-actions",children:String(e.status).toLowerCase()==="pending"||String(e.status).toLowerCase()==="partially filled"?t.jsx("button",{className:"cancel-order-btn",onClick:()=>Re(e.id,e),children:"Cancel"}):t.jsx("div",{className:"completed-indicator",children:t.jsx("i",{className:"fas fa-check-circle"})})})]},e.id??e.orderNo)})}):t.jsx("div",{className:"futures-list",children:M.map(e=>{const a=ze(e.futuresStatus),o=e.profitAndLossAmount?m(e.profitAndLossAmount):0,r=o>=0;return t.jsxs("div",{className:"future-item",children:[t.jsxs("div",{className:"future-header",children:[t.jsxs("div",{className:"future-pair-status",children:[t.jsx("span",{className:"future-pair",children:e.futureCoin||"Unknown"}),t.jsx("span",{className:"future-status",style:{color:a.color,backgroundColor:a.bgColor},children:a.text})]}),t.jsxs("div",{className:"future-leverage",children:[e.leverage,"x"]})]}),t.jsxs("div",{className:"future-details",children:[t.jsxs("div",{className:"future-detail-row",children:[t.jsx("span",{className:"detail-label",children:"Amount"}),t.jsx("span",{className:"detail-value",children:E(e.futuresAmount)})]}),t.jsxs("div",{className:"future-detail-row",children:[t.jsx("span",{className:"detail-label",children:"Duration"}),t.jsx("span",{className:"detail-value",children:Le(e.contractDuration)})]}),t.jsxs("div",{className:"future-detail-row",children:[t.jsx("span",{className:"detail-label",children:"Entry Price"}),t.jsx("span",{className:"detail-value",children:E(e.openPositionPrice)})]}),e.closePositionPrice&&t.jsxs("div",{className:"future-detail-row",children:[t.jsx("span",{className:"detail-label",children:"Exit Price"}),t.jsx("span",{className:"detail-value",children:E(e.closePositionPrice)})]}),(o!==0||e.profitAndLossAmount)&&t.jsxs("div",{className:"future-detail-row",children:[t.jsx("span",{className:"detail-label",children:"P&L"}),t.jsxs("span",{className:`detail-value ${r?"profit":"loss"}`,children:[r?"+":"",E(o)]})]})]}),t.jsxs("div",{className:"future-footer",children:[t.jsxs("div",{className:"future-timestamp",children:[t.jsx("div",{className:"timestamp-label",children:"Opened"}),t.jsx("div",{className:"timestamp-value",children:e.openPositionTime?W(e.openPositionTime):"N/A"})]}),e.closePositionTime&&t.jsxs("div",{className:"future-timestamp",children:[t.jsx("div",{className:"timestamp-label",children:"Closed"}),t.jsx("div",{className:"timestamp-value",children:W(e.closePositionTime)})]})]})]},e.id??e._id)})})})]})]}),t.jsx(He,{isOpen:ve,onClose:()=>D(!1),selectedCoin:d,onCoinSelect:Ee,title:"Select Trading Pair"}),t.jsx("style",{children:`
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
          color: #6c757d;
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
        }
      `})]})}export{Xe as default};
