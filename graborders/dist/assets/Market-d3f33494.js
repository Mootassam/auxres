import{i as c,j as e,L,o as z}from"./index-001d1709.js";const R=()=>{const[T,f]=c.useState({}),[h,j]=c.useState(""),[N,S]=c.useState(!0),l=c.useRef(null),m=c.useRef(null),p=c.useRef(!0),i=c.useMemo(()=>["SHIBUSDT","USDCUSDT","DOGEUSDT","TRXUSDT","XRPUSDT","ADAUSDT","FILUSDT","TONUSDT","MATICUSDT","DOTUSDT","SOLUSDT","TRUMPUSDT","EOSUSDT","LINKUSDT","ZECUSDT","DASHUSDT","LTCUSDT","ETHUSDT","BCHUSDT","BNBUSDT","BTCUSDT","XMRUSDT","YFIUSDT"],[]),x=c.useCallback(r=>r>=1e9?(r/1e9).toFixed(1)+"B":r>=1e6?(r/1e6).toFixed(1)+"M":r.toFixed(0),[]),b=c.useCallback(r=>{const a=Number(r);return isNaN(a)?"0.00":a.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:a<1?6:4})},[]),v=c.useCallback(()=>{m.current&&(m.current.abort(),m.current=null)},[]),D=c.useCallback(()=>{if(l.current){try{l.current.onclose=null,l.current.close()}catch(r){console.warn("Error closing WebSocket:",r)}l.current=null}},[]);c.useEffect(()=>((async()=>{try{S(!0),v(),m.current=new AbortController;const a=m.current.signal,s=new Promise((o,d)=>{setTimeout(()=>d(new Error("Request timeout")),5e3)}),g=`https://api.binance.com/api/v3/ticker/24hr?symbols=[${i.map(o=>`"${o}"`).join(",")}]`,y=z.get(g,{signal:a}),u=await Promise.race([y,s]),n={};u.data.forEach(o=>{const d=o.symbol,P=d.replace("USDT",""),E=parseFloat(o.priceChangePercent)>=0,F=Math.abs(Number(o.priceChangePercent)).toFixed(2);n[d]={symbol:d,name:`${P}/USDT`,price:b(o.lastPrice),change:o.priceChange,changePercent:F,volume:o.volume,volumeFormatted:x(Number(o.volume)),isPositive:E,quoteVolume:parseFloat(o.quoteVolume)}}),i.forEach(o=>{if(!n[o]){const d=o.replace("USDT","");n[o]={symbol:o,name:`${d}/USDT`,price:"0.00",change:"0.00",changePercent:"0.00",volume:"0",volumeFormatted:"0",isPositive:!0,quoteVolume:0}}}),p.current&&(f(n),S(!1))}catch(a){if(a.name==="AbortError"){console.log("Request aborted");return}console.error("Error fetching market data:",a);const s={};i.forEach(t=>{const g=t.replace("USDT","");s[t]={symbol:t,name:`${g}/USDT`,price:"0.00",change:"0.00",changePercent:"0.00",volume:"0",volumeFormatted:"0",isPositive:!0,quoteVolume:0}}),p.current&&(f(s),S(!1))}})(),()=>{v()}),[i,b,x,v]),c.useEffect(()=>{p.current=!0;const r=()=>{try{const a=i.map(s=>`${s.toLowerCase()}@ticker`).join("/");l.current=new WebSocket(`wss://stream.binance.com:9443/ws/${a}`),l.current.onopen=()=>{console.log("Market WebSocket connected")},l.current.onmessage=s=>{if(p.current)try{const t=JSON.parse(s.data),g=Array.isArray(t)?t:[t];f(y=>{const u={...y};return g.forEach(n=>{if(i.includes(n.s)&&u[n.s]){const o=parseFloat(n.P)>=0,d=Math.abs(Number(n.P)).toFixed(2);u[n.s]={...u[n.s],price:b(n.c),change:n.p,changePercent:d,volume:n.v,volumeFormatted:x(Number(n.v)),isPositive:o,quoteVolume:parseFloat(n.q)}}}),u})}catch(t){console.error("Error parsing WebSocket data:",t)}},l.current.onerror=s=>{console.error("Market WebSocket error:",s)},l.current.onclose=s=>{console.log("Market WebSocket closed, code:",s.code),s.code!==1e3&&p.current&&setTimeout(()=>{p.current&&r()},2e3)}}catch(a){console.error("Error setting up WebSocket:",a)}};return r(),()=>{p.current=!1,D()}},[i,b,x,D]);const w=c.useMemo(()=>{const r=Object.values(T);if(r.length===0)return[];let a=r;if(h){const s=h.toLowerCase();a=a.filter(t=>t.name.toLowerCase().includes(s)||t.symbol.toLowerCase().includes(s))}return i.map(s=>a.find(t=>t.symbol===s)).filter(Boolean)},[T,h,i]),U=r=>{j(r.target.value)},k=c.useCallback(()=>{j("")},[]),C=c.useCallback(({pair:r})=>e.jsxs("div",{className:"table-row",children:[e.jsxs("div",{className:"pair-col",children:[e.jsx("div",{className:"crypto-icon",children:r.replace("USDT","").substring(0,2)}),e.jsxs("span",{children:[r.replace("USDT",""),"/USDT"]})]}),e.jsxs("div",{className:"price-col",children:[e.jsx("div",{className:"crypto-price",children:"..."}),e.jsx("div",{className:"usd-price",children:"..."})]}),e.jsx("div",{className:"change-col",children:e.jsx("span",{className:"change-positive",children:"..."})})]}),[]);return e.jsxs("div",{className:"container",style:{backgroundColor:"#106cf5"},children:[e.jsxs("div",{className:"header",children:[e.jsx("div",{className:"header-title",children:"Blockchain"}),e.jsxs("div",{className:"search-bar",children:[e.jsx("i",{className:"fas fa-search"}),e.jsx("input",{type:"text",placeholder:"Search crypto...",value:h,onChange:U}),h&&e.jsx("button",{className:"clear-search",onClick:k,style:{background:"none",border:"none",color:"rgba(255, 255, 255, 0.8)",cursor:"pointer",fontSize:"18px",padding:"0 5px"},children:"×"})]})]}),e.jsxs("div",{className:"content",style:{borderRadius:"21px 21px 0 0",backgroundColor:"white",padding:"20px 16px 100px"},children:[e.jsxs("div",{className:"table-header",children:[e.jsx("div",{className:"pair-col",style:{fontSize:12},children:"Trading Pair"}),e.jsx("div",{className:"price-col",style:{fontSize:12},children:"Latest Price"}),e.jsx("div",{className:"change-col",style:{fontSize:12},children:"24H Change"})]}),N?e.jsx("div",{children:i.map(r=>e.jsx(C,{pair:r},r))}):w.length>0?e.jsx(e.Fragment,{children:w.map(r=>e.jsx(L,{to:`/market/detail/${r.symbol}`,className:"remove_blue",children:e.jsxs("div",{className:"table-row",children:[e.jsxs("div",{className:"pair-col",children:[e.jsx("div",{className:"crypto-icon",children:e.jsx("img",{src:`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${r.name.split("/")[0]}.png`,style:{width:25,height:25},alt:r.name.split("/")[0],onError:a=>{const s=a.target;s.style.display="none";const t=s.parentElement;t&&(t.innerHTML=r.name.split("/")[0].substring(0,2),t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.width="32px",t.style.height="32px",t.style.borderRadius="50%",t.style.color="#106cf5",t.style.fontSize="14px")}})}),e.jsx("span",{children:r.name})]}),e.jsxs("div",{className:"price-col",children:[e.jsxs("div",{className:"crypto-price",children:["$",r.price]}),e.jsxs("div",{className:"usd-price",children:["$",r.price]})]}),e.jsx("div",{className:"change-col",children:e.jsxs("span",{className:r.isPositive?"change-positive":"change-negative",children:[r.isPositive?"+":"",r.changePercent,"%"]})})]})},r.symbol))}):e.jsx("div",{style:{textAlign:"center",padding:"40px 20px",color:"#666",fontSize:"16px"},children:"No cryptocurrencies found"})]}),e.jsx("style",{children:`
        .container {
          max-width: 400px;
          width: 100%;
          margin: 0 auto;
        }

        /* Header Styles */
        .header {
          background-color: #106cf5;
          color: white;
          padding: 10px 20px 20px;
          position: relative;
        }

        .header-title {
          text-align: center;
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .search-bar {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 25px;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          backdrop-filter: blur(10px);
        }

        .search-bar i {
          margin-right: 10px;
          color: rgba(255, 255, 255, 0.8);
        }

        .search-bar input {
          background: transparent;
          border: none;
          color: white;
          font-size: 12px;
          width: 100%;
          outline: none;
        }

        .search-bar input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        /* Main Content */
        .table-header {
          display: flex;
          color: #6c757d;
          font-size: 12px;
        }

        .table-row {
          display: flex;
          align-items: center;
          transition: background-color 0.2s;
          margin-top: 8px !important;
          border-radius: 8px;
        }

        .table-row:hover {
          background-color: #f8f9fa;
        }

        .pair-col {
          flex: 2;
          display: flex;
          align-items: center;
        }

        .price-col {
          flex: 2;
          text-align: right;
          margin-right: 15px;
        }

        .change-col {
          flex: 1;
          text-align: right;
        }

        .crypto-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          font-size: 14px;
          color: #106cf5;
          background: #f0f4ff;
          overflow: hidden;
        }

        .crypto-icon img {
          border-radius: 50%;
        }

        .crypto-price {
          font-size: 16px;
        }

        .usd-price {
          font-size: 12px;
          color: #6c757d;
          margin-top: 2px;
        }

        .change-positive {
          background-color: #37b66a;
          color: white;
          padding: 6px 10px;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 500;
          display: inline-block;
          min-width: 70px;
          text-align: center;
        }

        .change-negative {
          background-color: #e53858;
          color: white;
          padding: 6px 10px;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 500;
          display: inline-block;
          min-width: 70px;
          text-align: center;
        }

        .remove_blue {
          text-decoration: none;
          color: inherit;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .table-row {
            padding: 10px 12px;
          }

          .crypto-icon {
            width: 28px;
            height: 28px;
            margin-right: 10px;
          }

          .crypto-price {
            font-size: 14px;
          }
        }

        /* Animation for price updates */
        @keyframes highlightUpdate {
          0% {
            background-color: rgba(55, 182, 106, 0.1);
          }
          100% {
            background-color: transparent;
          }
        }

        .price-update {
          animation: highlightUpdate 1s ease-in-out;
        }
      `})]})};export{R as default};
