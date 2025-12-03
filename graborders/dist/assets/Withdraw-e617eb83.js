import{k as v,X as se,D as s,a0 as ne,Z as re,u as P,v as oe,A as le,i as l,B as de,j as e,L as ce,a4 as G}from"./index-7100f67f.js";import{y as c,u as me,a as pe,d as B,F as ue}from"./FormErrors-883b8349.js";import{F as J}from"./FieldFormItem-1a42b099.js";import{S as he}from"./sucessModal-b83d59c1.js";import{u as we}from"./useDispatch-b386ec41.js";const f=i=>i.withdraw.form,fe=v([f],i=>i.record),xe=v([f],i=>!!i.initLoading),be=v([f],i=>!!i.saveLoading),ge=v([f],i=>!!i.withdrawModal),ve={selectInitLoading:xe,selectSaveLoading:be,selectRecord:fe,selectModal:ge,selectRaw:f},M={BTC:{min:91e-5,fee:2e-5,decimals:8},ETH:{min:.0077,fee:5e-4,decimals:8},USDT:{min:30,fee:3,decimals:2},SOL:{min:.01,fee:5e-4,decimals:6},XRP:{min:1,fee:.1,decimals:6}},Ne=[{value:"ethereum",label:"Ethereum (ERC20)"},{value:"bsc",label:"Binance Smart Chain (BEP20)"},{value:"tron",label:"Tron (TRC20)"},{value:"polygon",label:"Polygon"},{value:"solana",label:"Solana"},{value:"bitcoin",label:"Bitcoin"}],je=se().shape({orderNo:c.string(s("entities.withdraw.fields.orderNo")),currency:c.string(s("entities.withdraw.fields.currency")),withdrawAmount:ne().typeError(s("pages.withdraw.errors.amountNumber")).required(s("pages.withdraw.errors.amountRequired")).test("positive",s("pages.withdraw.errors.amountPositive"),i=>typeof i=="number"&&i>0).test("min-by-currency",s("pages.withdraw.errors.amountMin"),function(i){const{currency:o}=this.parent||{};return!o||!M[o]?!0:i>=M[o].min}),fee:c.decimal(s("entities.withdraw.fields.fee")),totalAmount:c.decimal(s("entities.withdraw.fields.totalAmount")),auditor:c.relationToOne(s("entities.withdraw.fields.auditor")),acceptTime:c.datetime(s("entities.withdraw.fields.acceptTime")),status:c.enumerator(s("entities.withdraw.fields.status"),{options:["pending","canceled","success"]}),withdrawPassword:re().required(s("pages.withdraw.errors.passwordRequired"))});function Ce(){var $,D,H,q,Y,X;const i=we(),o=P(oe.selectCurrentUser),N=P(le.selectRows)||[],R=P(ve.selectModal),[K,E]=l.useState(""),[T,j]=l.useState(""),[a,L]=l.useState(""),[Q,_]=l.useState("ethereum"),[I,V]=l.useState(null),[x,y]=l.useState(!1);l.useEffect(()=>{i(de.doFetch())},[i]),l.useEffect(()=>{var t,n;if(a&&N.length){const k=N.find(C=>String(C.symbol).toUpperCase()===String(a).toUpperCase());V(k||null);const z=((n=(t=o==null?void 0:o.wallet)==null?void 0:t[a])==null?void 0:n.address)||"";j(z),r.setValue("currency",a)}else V(null),j(""),r.setValue("currency","")},[a,N,o]);const W={orderNo:"",currency:"",withdrawAmount:"",fee:"",totalAmount:"",auditor:"",acceptTime:"",status:"pending",withdrawAdress:"",withdrawPassword:""},r=me({resolver:pe.yupResolver(je),mode:"all",defaultValues:W}),ee=B({control:r.control,name:"withdrawAmount"}),S=B({control:r.control,name:"withdrawPassword"});B({control:r.control,name:"currency"});const d=Number(ee),O=!Number.isNaN(d)&&isFinite(d),A=I&&Number(I.amount)||0,F=M[a]||{min:0,fee:0,decimals:8},b=a?F.fee:0,g=a?F.min:0,u=a?F.decimals:8,te=O?Math.max(d-(b||0),0):0,h=(t,n=u)=>typeof t!="number"||!isFinite(t)?"0":Number(t).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:n}),w=(()=>a?!O||d<=0?{disabled:!0,label:s("pages.withdraw.validation.enterAmount"),reason:"enterAmount"}:g&&d<g?{disabled:!0,label:s("pages.withdraw.validation.belowMin",h(g),a),reason:"belowMin"}:d>A?{disabled:!0,label:s("pages.withdraw.validation.insufficientBalance"),reason:"insufficientBalance"}:d+b>A?{disabled:!0,label:s("pages.withdraw.validation.insufficientForFee"),reason:"insufficientForFee"}:!S||typeof S=="string"&&S.trim()===""?{disabled:!0,label:s("pages.withdraw.validation.enterPassword"),reason:"enterPassword"}:{disabled:!1,label:s("pages.withdraw.confirmWithdrawal"),reason:"ok"}:{disabled:!0,label:s("pages.withdraw.validation.selectCurrency"),reason:"selectCurrency"})(),ae=()=>{i(G.doClose()),r.reset(W),L(""),j(""),E(""),y(!1)},ie=async t=>{if(!w.disabled){y(!0);try{t.currency=a;const n=new Date,k=`${n.getFullYear()}${String(n.getMonth()+1).padStart(2,"0")}${String(n.getDate()).padStart(2,"0")}`,z=Math.floor(Math.random()*1e7).toString().padStart(7,"0");t.orderNo=`RE${k}${z}`;const C=Number(t.withdrawAmount)||0,Z=b||0;t.fee=Z,t.totalAmount=C-Z,t.withdrawAdress=T,t.status="pending",E(t.totalAmount.toString()),await i(G.doCreate(t))}catch(n){console.error("Withdrawal submission error:",n),y(!1)}}},U=[{id:"BTC",name:"Bitcoin",icon:"fab fa-btc",color:"#F3BA2F"},{id:"ETH",name:"Ethereum",icon:"fab fa-ethereum",color:"#627EEA"},{id:"USDT",name:"Tether",icon:"fas fa-dollar-sign",color:"#26A17B"},{id:"SOL",name:"Solana",icon:"fas fa-bolt",color:"#00FFA3"},{id:"XRP",name:"Ripple",icon:"fas fa-exchange-alt",color:"#23292F"}],m=U.find(t=>t.id===a),{errors:p}=r.formState;return e.jsxs("div",{className:"withdraw-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(ce,{to:"/wallets",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:"Withdraw"})]})}),e.jsx("div",{className:"content-card",children:e.jsx("div",{className:"withdraw-content",children:e.jsxs("div",{className:"form-section",children:[e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Select currency"}),e.jsxs("div",{className:"input-wrapper",children:[e.jsxs("select",{className:"currency-select",value:a,onChange:t=>{const n=t.target.value;L(n),r.setValue("currency",n),r.setValue("withdrawAmount",""),r.setValue("withdrawPassword","")},children:[e.jsx("option",{value:"",children:"Select currency"}),U.map(t=>e.jsxs("option",{value:t.id,children:[t.name," (",t.id,")"]},t.id))]}),a&&e.jsx("div",{className:"currency-select-icon",style:{color:m==null?void 0:m.color},children:e.jsx("i",{className:m==null?void 0:m.icon})})]})]}),e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Withdraw network"}),e.jsx("div",{className:"input-wrapper",children:e.jsx("select",{className:"network-select",value:Q,onChange:t=>_(t.target.value),children:Ne.map(t=>e.jsx("option",{value:t.value,children:t.label},t.value))})})]}),e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Withdraw address"}),e.jsx("div",{className:"input-wrapper",children:e.jsx("input",{type:"text",className:"address-field",placeholder:"Your wallet address will appear here"})}),!T&&a&&e.jsxs("div",{className:"field-hint",children:["Please add a wallet address for ",a," to withdraw"]})]}),e.jsx(ue,{...r,children:e.jsxs("form",{onSubmit:r.handleSubmit(ie),children:[e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Amount of coins withdrawn"}),e.jsx("div",{className:"input-wrapper",children:e.jsx(J,{name:"withdrawAmount",type:"number",className:"amount-field",placeholder:"0.0",step:"any",min:"0",disabled:x||!a})}),e.jsxs("div",{className:"balance-text",children:["Available: ",e.jsxs("span",{className:"balance-amount",children:[h(A,u)," ",a]})]}),e.jsxs("div",{className:"field-error",children:[(($=p.withdrawAmount)==null?void 0:$.message)&&e.jsx("div",{children:(D=p.withdrawAmount)==null?void 0:D.message}),!((H=p.withdrawAmount)!=null&&H.message)&&w.reason==="belowMin"&&e.jsxs("div",{children:["Minimum withdrawal: ",h(g,u)," ",a]}),!((q=p.withdrawAmount)!=null&&q.message)&&w.reason==="insufficientBalance"&&e.jsx("div",{children:"Insufficient balance"})]})]}),e.jsxs("div",{className:"fee-section",children:[e.jsxs("div",{className:"fee-row",children:[e.jsx("div",{className:"fee-label",children:"Handling fee:"}),e.jsxs("div",{className:"fee-value",children:[h(b,u)," ",a]})]}),e.jsxs("div",{className:"fee-row",children:[e.jsx("div",{className:"fee-label",children:"You will receive:"}),e.jsxs("div",{className:"fee-value receive-amount",children:[h(te,u)," ",a]})]})]}),e.jsxs("div",{className:"notice-section",children:[e.jsx("div",{className:"notice-title",children:"Important notice"}),e.jsxs("div",{className:"notice-content",children:[e.jsx("div",{className:"notice-item",children:"1. In order to prevent arbitrage, you can apply for currency withdraw when the transaction volume reaches the quota."}),e.jsx("div",{className:"notice-item",children:"2. After submitting the withdraw application, the money will arrive within 24 hours. If the money does not arrive after the expected withdraw time, please consult the online customer service."}),e.jsx("div",{className:"notice-item",children:"3. After submitting the withdraw application, the funds are frozen because the withdraw is in progress and the funds are temporarily held by the system. This does not mean that you have lost the asset or that there is an abnormality with the asset."})]})]}),e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Withdrawal Password"}),e.jsx("div",{className:"input-wrapper",children:e.jsx(J,{name:"withdrawPassword",type:"password",className:"password-field",placeholder:"Enter your withdrawal password",disabled:x})}),e.jsx("div",{className:"field-error",children:((Y=p.withdrawPassword)==null?void 0:Y.message)&&e.jsx("div",{children:(X=p.withdrawPassword)==null?void 0:X.message})})]}),e.jsx("button",{type:"submit",className:"withdraw-button",disabled:w.disabled||x,children:x?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),"Processing..."]}):w.label})]})})]})})}),R&&e.jsx(he,{isOpen:R,onClose:ae,type:"withdraw",amount:K,coinType:a}),e.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        body {
          background-color: #f5f7fa;
          color: #333;
          line-height: 1.6;
          overflow-x: hidden;
        }

        .withdraw-container {
          max-width: 400px;
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header Section - Matching HelpCenter */
        .header {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          min-height: 60px;
          position: relative;
          padding: 20px;
        }

        .nav-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-arrow {
          color: white;
          font-size: 20px;
          font-weight: 300;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }

        .back-arrow:hover {
          opacity: 0.8;
        }

        .page-title {
          color: white;
          font-size: 17px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        /* Content Card - Matching HelpCenter */
        .content-card {
          background: #f2f4f7;
          border-radius: 40px 40px 0 0;
          padding: 20px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        .withdraw-content {
          width: 100%;
        }

        /* Form Sections */
        .form-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .input-field {
          display: flex;
          flex-direction: column;
        }

        .input-label {
          font-size: 12px;
          font-weight: 600;
          color: #222;
          margin-bottom: 8px;
        }

        .input-wrapper {
          position: relative;
        }

        .currency-select, .network-select {
          width: 100%;
          padding: 12px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 12px;
          background-color: white;
          color: #333;
          appearance: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .currency-select:focus, .network-select:focus {
          outline: none;
          border-color: #106cf5;
          box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.1);
        }

        .currency-select-icon {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 20px;
          pointer-events: none;
        }

        .address-field, .amount-field, .password-field {
          width: 100%;
          padding: 12px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 12px;
          background-color: white;
          color: #333;
          transition: all 0.3s ease;
        }

        .address-field:disabled {
          background-color: #f8f9fa;
          color: #666;
          cursor: not-allowed;
        }

        .amount-field:focus, .password-field:focus {
          outline: none;
          border-color: #106cf5;
          box-shadow: 0 0 0 3px rgba(16, 108, 245, 0.1);
        }

        .balance-text {
          font-size: 14px;
          color: #666;
          margin-top: 8px;
        }

        .balance-amount {
          font-weight: 600;
          color: #106cf5;
        }

        /* Fee Section */
        .fee-section {
          background: white;
          border-radius: 8px;
          padding: 16px;
          margin: 10px 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .fee-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .fee-row:last-child {
          border-bottom: none;
        }

        .fee-label {
          font-size: 14px;
          color: #666;
        }

        .fee-value {
          font-size: 15px;
          font-weight: 600;
          color: #222;
        }

        .receive-amount {
          color: #106cf5;
          font-size: 16px;
        }

        /* Notice Section */
        .notice-section {
          background: white;
          border-radius: 8px;
          padding: 16px;
          margin: 10px 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .notice-title {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-bottom: 12px;
        }

        .notice-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .notice-item {
          font-size: 10px;
          color: #666;
          line-height: 1.4;
        }

        /* Field Error */
        .field-error {
          font-size: 12px;
          color: #e53935;
          margin-top: 6px;
          min-height: 20px;
        }

        .field-hint {
          font-size: 12px;
          color: #ff9800;
          margin-top: 6px;
        }

        /* Withdraw Button */
        .withdraw-button {
          width: 100%;
          padding: 16px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 20px;
        }

        .withdraw-button:hover:not(:disabled) {
          background: #0a4fc4;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(16, 108, 245, 0.3);
        }

        .withdraw-button:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .withdraw-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 16px;
            border-radius: 30px 30px 0 0;
          }

          .currency-select, .network-select, .address-field, .amount-field, .password-field {
            padding: 12px ;
            font-size: 14px;
          }

          .input-label {
            font-size: 13px;
          }

          .balance-text {
            font-size: 13px;
          }

          .fee-section, .notice-section {
            padding: 12px;
          }

          .fee-label, .fee-value {
            font-size: 13px;
          }

          .notice-title {
            font-size: 13px;
          }

          .notice-item {
            font-size: 10px;
          }

          .withdraw-button {
            padding: 12px;
            font-size: 15px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }

          .withdraw-content {
            max-width: 600px;
            margin: 0 auto;
          }
        }
      `})]})}export{Ce as default};
