import{k,X as he,E as i,Y as ue,Z as we,u as b,v as fe,A as xe,i as c,V as ge,D as be,W as ye,j as e,L as re,a5 as ie}from"./index-8ef7e624.js";import{u as ve,y as je,c as P,F as Ne}from"./FormErrors-6a28b8d8.js";import{y as u}from"./yupFormSchemas-c1a82b9e.js";import{F as I}from"./FieldFormItem-992bc5bc.js";import{S as Se}from"./sucessModal-745f2e8f.js";import{u as ke}from"./useDispatch-ca929f38.js";const y=a=>a.withdraw.form,Ae=k([y],a=>a.record),ze=k([y],a=>!!a.initLoading),Ce=k([y],a=>!!a.saveLoading),Fe=k([y],a=>!!a.withdrawModal),ne={selectInitLoading:ze,selectSaveLoading:Ce,selectRecord:Ae,selectModal:Fe,selectRaw:y},W={BTC:{min:91e-5,fee:2e-5,decimals:8},ETH:{min:.0077,fee:5e-4,decimals:8},USDT:{min:30,fee:3,decimals:2},SOL:{min:.01,fee:5e-4,decimals:6},XRP:{min:1,fee:.1,decimals:6}},Me=he().shape({orderNo:u.string(i("entities.withdraw.fields.orderNo")),currency:u.string(i("entities.withdraw.fields.currency")),withdrawAmount:ue().typeError(i("pages.withdraw.errors.amountNumber")).required(i("pages.withdraw.errors.amountRequired")).test("positive",i("pages.withdraw.errors.amountPositive"),a=>typeof a=="number"&&a>0).test("min-by-currency",i("pages.withdraw.errors.amountMin"),function(a){const{currency:m}=this.parent||{};return!m||!W[m]?!0:typeof a!="number"?!1:a>=W[m].min}),fee:u.decimal(i("entities.withdraw.fields.fee")),totalAmount:u.decimal(i("entities.withdraw.fields.totalAmount")),auditor:u.relationToOne(i("entities.withdraw.fields.auditor")),acceptTime:u.datetime(i("entities.withdraw.fields.acceptTime")),status:u.enumerator(i("entities.withdraw.fields.status"),{options:["pending","canceled","success"]}),withdrawPassword:we().required(i("pages.withdraw.errors.passwordRequired"))});function Ve(){var X,Z,G,J,K,Q,_,ee,te,se;const a=ke(),m=b(fe.selectCurrentUser),A=b(xe.selectRows)||[],D=b(ne.selectModal),[oe,T]=c.useState(""),[Ee,z]=c.useState(""),[s,C]=c.useState(""),[v,V]=c.useState(""),[B,$]=c.useState(null),[H,U]=c.useState(!1),p=b(ge.selectRows),F=b(ne.selectSaveLoading);c.useEffect(()=>{a(be.doFetch("exchange"))},[a]),c.useEffect(()=>{a(ye.doFetch())},[a]),c.useEffect(()=>{if(p&&p.length>0&&!s){const t=p[0];C(t.symbol||t.id),l.setValue("currency",t.symbol||t.id)}},[p]),c.useEffect(()=>{var t,n;if(s&&A.length){const r=A.find(L=>String(L.symbol).toUpperCase()===String(s).toUpperCase());$(r||null);const o=((n=(t=m==null?void 0:m.wallet)==null?void 0:t[s])==null?void 0:n.address)||"";z(o),l.setValue("currency",s)}else $(null),z(""),l.setValue("currency","")},[s,A,m]);const q={orderNo:"",currency:"",withdrawAmount:"",fee:"",totalAmount:"",auditor:"",acceptTime:"",status:"pending",withdrawAdress:"",withdrawPassword:""},l=ve({resolver:je.yupResolver(Me),mode:"all",defaultValues:q}),le=P({control:l.control,name:"withdrawAmount"}),M=P({control:l.control,name:"withdrawPassword"});P({control:l.control,name:"currency"});const h=Number(le),Y=!Number.isNaN(h)&&isFinite(h),E=B&&Number(B.amount)||0,R=W[s]||{min:0,fee:0,decimals:8},j=s?R.fee:0,N=s?R.min:0,f=s?R.decimals:8,S=c.useMemo(()=>p==null?void 0:p.find(t=>t.symbol===s||t.id===s),[p,s]),d=(S==null?void 0:S.network)||[];c.useEffect(()=>{d.length>0&&!v&&V(d[0].id||d[0].name)},[S,d]);const ce=Y?Math.max(h-(j||0),0):0,x=(t,n=f)=>typeof t!="number"||!isFinite(t)?"0":Number(t).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:n}),O=t=>`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${t}.png`,g=(()=>s?!Y||h<=0?{disabled:!0,label:i("pages.withdraw.validation.enterAmount"),reason:"enterAmount"}:N&&h<N?{disabled:!0,label:i("pages.withdraw.validation.belowMin",x(N),s),reason:"belowMin"}:h>E?{disabled:!0,label:i("pages.withdraw.validation.insufficientBalance"),reason:"insufficientBalance"}:h+j>E?{disabled:!0,label:i("pages.withdraw.validation.insufficientForFee"),reason:"insufficientForFee"}:!M||typeof M=="string"&&M.trim()===""?{disabled:!0,label:i("pages.withdraw.validation.enterPassword"),reason:"enterPassword"}:{disabled:!1,label:i("pages.withdraw.confirmWithdrawal"),reason:"ok"}:{disabled:!0,label:i("pages.withdraw.validation.selectCurrency"),reason:"selectCurrency"})(),de=()=>{a(ie.doClose()),l.reset(q),C(""),z(""),T("")},pe=async t=>{if(!g.disabled)try{t.currency=s;const n=new Date,r=`${n.getFullYear()}${String(n.getMonth()+1).padStart(2,"0")}${String(n.getDate()).padStart(2,"0")}`,o=Math.floor(Math.random()*1e7).toString().padStart(7,"0");t.orderNo=`RE${r}${o}`;const L=Number(t.withdrawAmount)||0,ae=j||0;t.fee=ae,t.totalAmount=L-ae,t.status="pending",T(t.totalAmount.toString()),await a(ie.doCreate(t))}catch(n){console.error("Withdrawal submission error:",n)}},me=t=>{C(t.symbol||t.id),l.setValue("currency",t.symbol||t.id),l.setValue("withdrawAmount",""),l.setValue("withdrawPassword",""),U(!1)},{errors:w}=l.formState;return e.jsxs("div",{className:"withdraw-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(re,{to:"/wallets",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:"Withdraw"}),e.jsx(re,{className:"header-icon",to:"/history",style:{color:"white"},children:e.jsx("i",{className:"fas fa-receipt"})})]})}),e.jsx("div",{className:"content-card",children:e.jsx("div",{className:"withdraw-content",children:e.jsxs("div",{className:"form-section",children:[e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Select currency"}),e.jsxs("div",{className:"custom-select-wrapper",children:[e.jsxs("div",{className:"currency-select-trigger",onClick:()=>U(!H),children:[s?e.jsxs("div",{className:"selected-currency",children:[e.jsx("div",{className:"currency-icon",children:e.jsx("img",{src:O(s),alt:s,onError:t=>{const n=t.target;if(n&&n instanceof HTMLImageElement){n.onerror=null,n.style.display="none";const r=n.parentElement;r&&(r.textContent=s.charAt(0),r.style.background="#f0f0f0",r.style.color="#333",r.style.fontSize="14px",r.style.fontWeight="bold",r.style.display="inline-flex",r.style.alignItems="center",r.style.justifyContent="center",r.style.width="24px",r.style.height="24px",r.style.borderRadius="50%")}}})}),e.jsx("span",{className:"currency-text",children:s})]}):e.jsx("span",{className:"placeholder",children:"Select Currency"}),e.jsx("i",{className:"fas fa-chevron-down dropdown-arrow"})]}),H&&e.jsx("div",{className:"currency-dropdown",children:p.map(t=>e.jsxs("div",{className:"currency-option",onClick:()=>me(t),children:[e.jsx("div",{className:"currency-icon",children:e.jsx("img",{src:O(t.symbol),alt:t.symbol,onError:n=>{const r=n.target;if(r&&r instanceof HTMLImageElement){r.onerror=null,r.style.display="none";const o=r.parentElement;o&&(o.textContent=t.symbol.charAt(0),o.style.background="#f0f0f0",o.style.color="#333",o.style.fontSize="14px",o.style.fontWeight="bold",o.style.display="inline-flex",o.style.alignItems="center",o.style.justifyContent="center",o.style.width="24px",o.style.height="24px",o.style.borderRadius="50%")}}})}),e.jsx("span",{className:"currency-text",children:t.symbol}),t.name&&e.jsxs("span",{className:"currency-name",children:[" - ",t.name]})]},t.id))})]})]}),s&&d.length>0&&e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Withdraw network"}),e.jsxs("div",{className:"custom-select-wrapper",children:[e.jsxs("div",{className:"network-select-trigger",children:[e.jsxs("div",{className:"selected-network",children:[e.jsx("i",{className:"fas fa-network-wired network-icon"}),e.jsx("span",{className:"network-text",children:((X=d.find(t=>t.id===v||t.name===v))==null?void 0:X.name)||((Z=d[0])==null?void 0:Z.name)||"Select Network"})]}),e.jsx("i",{className:"fas fa-chevron-down dropdown-arrow"})]}),e.jsx("select",{className:"network-select",value:v||((G=d[0])==null?void 0:G.id)||((J=d[0])==null?void 0:J.name)||"",onChange:t=>V(t.target.value),style:{display:"none"},children:d.map(t=>e.jsx("option",{value:t.id||t.name,children:t.name},t.id||t.name))})]})]}),e.jsx(Ne,{...l,children:e.jsxs("form",{onSubmit:l.handleSubmit(pe),children:[e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Withdraw address"}),e.jsx("div",{className:"input-wrapper",children:e.jsx(I,{name:"withdrawAdress",type:"text",className:"address-field",placeholder:"Your wallet address will appear here"})}),e.jsx("br",{})]}),e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Amount of coins withdrawn"}),e.jsx("div",{className:"input-wrapper",children:e.jsx(I,{name:"withdrawAmount",type:"number",className:"amount-field",placeholder:"0.0"})}),e.jsxs("div",{className:"balance-text",children:["Available: ",e.jsxs("span",{className:"balance-amount",children:[x(E,f)," ",s]})]}),e.jsxs("div",{className:"field-error",children:[((K=w.withdrawAmount)==null?void 0:K.message)&&e.jsx("div",{children:(Q=w.withdrawAmount)==null?void 0:Q.message}),!((_=w.withdrawAmount)!=null&&_.message)&&g.reason==="belowMin"&&e.jsxs("div",{children:["Minimum withdrawal: ",x(N,f)," ",s]}),!((ee=w.withdrawAmount)!=null&&ee.message)&&g.reason==="insufficientBalance"&&e.jsx("div",{children:"Insufficient balance"})]})]}),e.jsxs("div",{className:"fee-section",children:[e.jsxs("div",{className:"fee-row",children:[e.jsx("div",{className:"fee-label",children:"Handling fee:"}),e.jsxs("div",{className:"fee-value",children:[x(j,f)," ",s]})]}),e.jsxs("div",{className:"fee-row",children:[e.jsx("div",{className:"fee-label",children:"You will receive:"}),e.jsxs("div",{className:"fee-value receive-amount",children:[x(ce,f)," ",s]})]})]}),e.jsxs("div",{className:"notice-section",children:[e.jsx("div",{className:"notice-title",children:"Important notice"}),e.jsxs("div",{className:"notice-content",children:[e.jsx("div",{className:"notice-item",children:"1. In order to prevent arbitrage, you can apply for currency withdraw when the transaction volume reaches the quota."}),e.jsx("div",{className:"notice-item",children:"2. After submitting the withdraw application, the money will arrive within 24 hours. If the money does not arrive after the expected withdraw time, please consult the online customer service."}),e.jsx("div",{className:"notice-item",children:"3. After submitting the withdraw application, the funds are frozen because the withdraw is in progress and the funds are temporarily held by the system. This does not mean that you have lost the asset or that there is an abnormality with the asset."})]})]}),e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Withdrawal Password"}),e.jsx("div",{className:"input-wrapper",children:e.jsx(I,{name:"withdrawPassword",type:"password",className:"password-field",placeholder:"Enter your withdrawal password",disabled:F})}),e.jsx("div",{className:"field-error",children:((te=w.withdrawPassword)==null?void 0:te.message)&&e.jsx("div",{children:(se=w.withdrawPassword)==null?void 0:se.message})})]}),e.jsx("button",{type:"submit",className:"withdraw-button",disabled:g.disabled||F,children:F?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),"Processing..."]}):g.label})]})})]})})}),D&&e.jsx(Se,{isOpen:D,onClose:de,type:"withdraw",amount:oe,coinType:s}),e.jsx("style",{children:`
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
          min-height: 60px;
          position: relative;
          padding: 15px 20px;
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

        .custom-select-wrapper {
          position: relative;
        }

        .currency-select-trigger,
        .network-select-trigger {
          width: 100%;
          padding: 12px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 12px;
          background-color: white;
          color: #333;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
        }

        .currency-select-trigger:hover,
        .network-select-trigger:hover {
          border-color: #106cf5;
        }

        .selected-currency,
        .selected-network {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .currency-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .currency-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .currency-text,
        .network-text {
          font-size: 12px;
          font-weight: 500;
        }

        .network-icon {
          color: #106cf5;
          font-size: 14px;
        }

        .dropdown-arrow {
          color: #666;
          font-size: 12px;
          transition: transform 0.3s ease;
        }

        .currency-select-trigger.active .dropdown-arrow {
          transform: rotate(180deg);
        }

        /* Currency Dropdown */
        .currency-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          margin-top: 4px;
          max-height: 200px;
          overflow-y: auto;
          z-index: 1000;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .currency-option {
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .currency-option:hover {
          background-color: #f5f7fa;
        }

        .currency-option .currency-icon {
          width: 24px;
          height: 24px;
        }

        .currency-name {
          font-size: 11px;
          color: #666;
        }

        .placeholder {
          color: #999;
        }

        .input-wrapper {
          position: relative;
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
          padding: 12px;
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
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

          .currency-select-trigger,
          .network-select-trigger,
          .address-field,
          .amount-field,
          .password-field {
            padding: 12px;
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

          .currency-icon {
            width: 20px;
            height: 20px;
          }

          .currency-text, .network-text {
            font-size: 11px;
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
      `})]})}export{Ve as default};
