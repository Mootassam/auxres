import{k as F,X as we,D as a,Y as ue,Z as fe,u as v,v as xe,A as ge,i as c,V as be,E as ye,W as Ne,j as e,L as re,a5 as ne}from"./index-3c6c971f.js";import{u as ve,y as je,c as P,F as Se}from"./FormErrors-53875466.js";import{y as u}from"./yupFormSchemas-746ca8ac.js";import{F as V}from"./FieldFormItem-0206dc1d.js";import{S as ke}from"./sucessModal-d3ee4c8e.js";import{u as Ae}from"./useDispatch-55cc451c.js";const j=n=>n.withdraw.form,Ce=F([j],n=>n.record),ze=F([j],n=>!!n.initLoading),Fe=F([j],n=>!!n.saveLoading),Me=F([j],n=>!!n.withdrawModal),ae={selectInitLoading:ze,selectSaveLoading:Fe,selectRecord:Ce,selectModal:Me,selectRaw:j},B={BTC:{min:91e-5,fee:2e-5,decimals:8},ETH:{min:.0077,fee:5e-4,decimals:8},USDT:{min:30,fee:3,decimals:2},SOL:{min:.01,fee:5e-4,decimals:6},XRP:{min:1,fee:.1,decimals:6},BNB:{min:.01,fee:5e-4,decimals:6},TRX:{min:1,fee:.1,decimals:6},SHIB:{min:1e5,fee:1e4,decimals:0},DAI:{min:30,fee:3,decimals:2},USDC:{min:30,fee:3,decimals:2},DOGE:{min:10,fee:1,decimals:2}},Ee=we().shape({orderNo:u.string(a("entities.withdraw.fields.orderNo")),currency:u.string(a("entities.withdraw.fields.currency")),withdrawAmount:ue().typeError(a("pages.withdraw.errors.amountNumber")).required(a("pages.withdraw.errors.amountRequired")).test("positive",a("pages.withdraw.errors.amountPositive"),n=>typeof n=="number"&&n>0).test("min-by-currency",a("pages.withdraw.errors.amountMin"),function(n){const{currency:m}=this.parent||{};return!m||!B[m]?!0:typeof n!="number"?!1:n>=B[m].min}),fee:u.decimal(a("entities.withdraw.fields.fee")),totalAmount:u.decimal(a("entities.withdraw.fields.totalAmount")),auditor:u.relationToOne(a("entities.withdraw.fields.auditor")),acceptTime:u.datetime(a("entities.withdraw.fields.acceptTime")),status:u.enumerator(a("entities.withdraw.fields.status"),{options:["pending","canceled","success"]}),withdrawPassword:fe().required(a("pages.withdraw.errors.passwordRequired"))});function Te(){var G,Z,J,K,Q,ee,te;const n=Ae(),m=v(xe.selectCurrentUser),M=v(ge.selectRows)||[],T=v(ae.selectModal),[ie,W]=c.useState(""),[oe,S]=c.useState(""),[r,E]=c.useState(""),[x,g]=c.useState(""),[U,$]=c.useState(null),[H,q]=c.useState(!1),[O,k]=c.useState(!1),p=v(be.selectRows),R=v(ae.selectSaveLoading);c.useEffect(()=>{n(ye.doFetch("exchange"))},[n]),c.useEffect(()=>{n(Ne.doFetch())},[n]),c.useEffect(()=>{if(p&&p.length>0&&!r){const t=p[0],s=t.symbol||t.id;E(s),o.setValue("currency",s),t.network&&t.network.length>0&&g(t.network[0]._id||t.network[0].name)}},[p]),c.useEffect(()=>{var t,s;if(r&&M.length){const i=M.find(l=>String(l.symbol).toUpperCase()===String(r).toUpperCase());$(i||null);const d=((s=(t=m==null?void 0:m.wallet)==null?void 0:t[r])==null?void 0:s.address)||"";S(d),o.setValue("currency",r),d&&o.setValue("withdrawAdress",d)}else $(null),S(""),o.setValue("currency",""),o.setValue("withdrawAdress","")},[r,M,m]);const _={orderNo:"",currency:"",withdrawAmount:"",fee:"",totalAmount:"",auditor:"",acceptTime:"",status:"pending",withdrawAdress:"",withdrawPassword:""},o=ve({resolver:je.yupResolver(Ee),mode:"all",defaultValues:_}),le=P({control:o.control,name:"withdrawAmount"}),D=P({control:o.control,name:"withdrawPassword"});P({control:o.control,name:"currency"});const h=Number(le),X=!Number.isNaN(h)&&isFinite(h),L=U&&Number(U.amount)||0,I=B[r]||{min:0,fee:0,decimals:8},A=r?I.fee:0,C=r?I.min:0,b=r?I.decimals:8,z=c.useMemo(()=>!p||!r?null:p.find(t=>{const s=t.symbol||t.id||"";return String(s).toUpperCase()===String(r).toUpperCase()}),[p,r]),w=(z==null?void 0:z.network)||[];c.useEffect(()=>{if(w.length>0){const t=w[0];g(t._id||t.name),k(!1)}else g("")},[z,w]);const ce=X?Math.max(h-(A||0),0):0,y=(t,s=b)=>typeof t!="number"||!isFinite(t)?"0":Number(t).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:s}),Y=t=>`https://images.weserv.nl/?url=https://bin.bnbstatic.com/static/assets/logos/${t?t.toUpperCase():""}.png`,de=t=>{g(t._id||t.name),k(!1)},N=(()=>{if(!r)return{disabled:!0,label:a("pages.withdraw.validation.selectCurrency"),reason:"selectCurrency"};if(w.length>0&&!x)return{disabled:!0,label:a("pages.withdraw.validation.selectNetwork"),reason:"selectNetwork"};if(!X||h<=0)return{disabled:!0,label:a("pages.withdraw.validation.enterAmount"),reason:"enterAmount"};if(C&&h<C)return{disabled:!0,label:a("pages.withdraw.validation.belowMin",y(C),r),reason:"belowMin"};if(h>L)return{disabled:!0,label:a("pages.withdraw.validation.insufficientBalance"),reason:"insufficientBalance"};if(h+A>L)return{disabled:!0,label:a("pages.withdraw.validation.insufficientForFee"),reason:"insufficientForFee"};const t=o.getValues("withdrawAdress");return!t||t.trim()===""?{disabled:!0,label:a("pages.withdraw.validation.enterAddress"),reason:"enterAddress"}:!D||typeof D=="string"&&D.trim()===""?{disabled:!0,label:a("pages.withdraw.validation.enterPassword"),reason:"enterPassword"}:{disabled:!1,label:a("pages.withdraw.confirmWithdrawal"),reason:"ok"}})(),pe=()=>{n(ne.doClose()),o.reset(_),E(""),S(""),W(""),g("")},me=async t=>{if(!N.disabled)try{t.currency=r;const s=new Date,i=`${s.getFullYear()}${String(s.getMonth()+1).padStart(2,"0")}${String(s.getDate()).padStart(2,"0")}`,d=Math.floor(Math.random()*1e7).toString().padStart(7,"0");t.orderNo=`RE${i}${d}`;const l=Number(t.withdrawAmount)||0,se=A||0;t.fee=se,t.totalAmount=l-se,t.status="pending",t.network=x,W(t.totalAmount.toString()),await n(ne.doCreate(t))}catch(s){console.error("Withdrawal submission error:",s)}},he=t=>{const s=t.symbol||t.id;E(s),o.setValue("currency",s),o.setValue("withdrawAmount",""),o.setValue("withdrawPassword",""),o.setValue("withdrawAdress",""),q(!1),k(!1)},{errors:f}=o.formState;return e.jsxs("div",{className:"withdraw-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(re,{to:"/wallets",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:"Withdraw"}),e.jsx(re,{className:"header-icon",to:"/history",style:{color:"white"},children:e.jsx("i",{className:"fas fa-receipt"})})]})}),e.jsx("div",{className:"content-card",children:e.jsx("div",{className:"withdraw-content",children:e.jsxs("div",{className:"form-section",children:[e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Select currency"}),e.jsxs("div",{className:"custom-select-wrapper",children:[e.jsxs("div",{className:"currency-select-trigger",onClick:()=>q(!H),children:[r?e.jsxs("div",{className:"selected-currency",children:[e.jsx("div",{className:"currency-icon",children:e.jsx("img",{src:Y(r),alt:r,onError:t=>{const s=t.target;if(s&&s instanceof HTMLImageElement){s.onerror=null,s.style.display="none";const i=s.parentElement;i&&(i.textContent=r.charAt(0),i.style.background="#f0f0f0",i.style.color="#333",i.style.fontSize="14px",i.style.fontWeight="bold",i.style.display="inline-flex",i.style.alignItems="center",i.style.justifyContent="center",i.style.width="24px",i.style.height="24px",i.style.borderRadius="50%")}}})}),e.jsx("span",{className:"currency-text",children:r})]}):e.jsx("span",{className:"placeholder",children:"Select Currency"}),e.jsx("i",{className:"fas fa-chevron-down dropdown-arrow"})]}),H&&e.jsx("div",{className:"currency-dropdown",children:p&&p.length>0?p.map(t=>{const s=t.symbol||t.id;return e.jsxs("div",{className:"currency-option",onClick:()=>he(t),children:[e.jsx("div",{className:"currency-icon",children:e.jsx("img",{src:Y(s),alt:s,onError:i=>{const d=i.target;if(d&&d instanceof HTMLImageElement){d.onerror=null,d.style.display="none";const l=d.parentElement;l&&(l.textContent=s.charAt(0),l.style.background="#f0f0f0",l.style.color="#333",l.style.fontSize="14px",l.style.fontWeight="bold",l.style.display="inline-flex",l.style.alignItems="center",l.style.justifyContent="center",l.style.width="24px",l.style.height="24px",l.style.borderRadius="50%")}}})}),e.jsx("span",{className:"currency-text",children:s}),t.name&&e.jsxs("span",{className:"currency-name",children:[" - ",t.name]})]},t.id||s)}):e.jsx("div",{className:"no-options",children:"No currencies available"})})]})]}),r&&w.length>0&&e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Withdraw network"}),e.jsxs("div",{className:"custom-select-wrapper",children:[e.jsxs("div",{className:"network-select-trigger",onClick:()=>k(!O),children:[e.jsxs("div",{className:"selected-network",children:[e.jsx("i",{className:"fas fa-network-wired network-icon"}),e.jsx("span",{className:"network-text",children:((G=w.find(t=>t._id===x||t.id===x||t.name===x))==null?void 0:G.name)||"Select Network"})]}),e.jsx("i",{className:"fas fa-chevron-down dropdown-arrow"})]}),O&&e.jsx("div",{className:"network-dropdown",children:w.map(t=>e.jsxs("div",{className:"network-option",onClick:()=>de(t),children:[e.jsx("i",{className:"fas fa-network-wired network-icon-small"}),e.jsx("span",{className:"network-text",children:t.name})]},t._id||t.id||t.name))})]})]}),e.jsx(Se,{...o,children:e.jsxs("form",{onSubmit:o.handleSubmit(me),children:[e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Withdraw address"}),e.jsx("div",{className:"input-wrapper",children:e.jsx(V,{name:"withdrawAdress",type:"text",className:"address-field",placeholder:"Enter your wallet address",value:oe,onChange:t=>S(t.target.value)})}),e.jsx("br",{})]}),e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Amount of coins withdrawn"}),e.jsx("div",{className:"input-wrapper",children:e.jsx(V,{name:"withdrawAmount",type:"number",className:"amount-field",placeholder:"0.0",step:"any"})}),e.jsxs("div",{className:"balance-text",children:["Available: ",e.jsxs("span",{className:"balance-amount",children:[y(L,b)," ",r]})]}),e.jsxs("div",{className:"field-error",children:[((Z=f.withdrawAmount)==null?void 0:Z.message)&&e.jsx("div",{children:(J=f.withdrawAmount)==null?void 0:J.message}),!((K=f.withdrawAmount)!=null&&K.message)&&N.reason==="belowMin"&&e.jsxs("div",{children:["Minimum withdrawal: ",y(C,b)," ",r]}),!((Q=f.withdrawAmount)!=null&&Q.message)&&N.reason==="insufficientBalance"&&e.jsx("div",{children:"Insufficient balance"})]})]}),e.jsxs("div",{className:"fee-section",children:[e.jsxs("div",{className:"fee-row",children:[e.jsx("div",{className:"fee-label",children:"Handling fee:"}),e.jsxs("div",{className:"fee-value",children:[y(A,b)," ",r]})]}),e.jsxs("div",{className:"fee-row",children:[e.jsx("div",{className:"fee-label",children:"You will receive:"}),e.jsxs("div",{className:"fee-value receive-amount",children:[y(ce,b)," ",r]})]})]}),e.jsxs("div",{className:"notice-section",children:[e.jsx("div",{className:"notice-title",children:"Important notice"}),e.jsxs("div",{className:"notice-content",children:[e.jsx("div",{className:"notice-item",children:"1. In order to prevent arbitrage, you can apply for currency withdraw when the transaction volume reaches the quota."}),e.jsx("div",{className:"notice-item",children:"2. After submitting the withdraw application, the money will arrive within 24 hours. If the money does not arrive after the expected withdraw time, please consult the online customer service."}),e.jsx("div",{className:"notice-item",children:"3. After submitting the withdraw application, the funds are frozen because the withdraw is in progress and the funds are temporarily held by the system. This does not mean that you have lost the asset or that there is an abnormality with the asset."})]})]}),e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Withdrawal Password"}),e.jsx("div",{className:"input-wrapper",children:e.jsx(V,{name:"withdrawPassword",type:"password",className:"password-field",placeholder:"Enter your withdrawal password",disabled:R})}),e.jsx("div",{className:"field-error",children:((ee=f.withdrawPassword)==null?void 0:ee.message)&&e.jsx("div",{children:(te=f.withdrawPassword)==null?void 0:te.message})})]}),e.jsx("button",{type:"submit",className:"withdraw-button",disabled:N.disabled||R,children:R?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),"Processing..."]}):N.label})]})})]})})}),T&&e.jsx(ke,{isOpen:T,onClose:pe,type:"withdraw",amount:ie,coinType:r}),e.jsx("style",{children:`
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
        .currency-dropdown,
        .network-dropdown {
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

        .currency-option,
        .network-option {
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .currency-option:hover,
        .network-option:hover {
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

        .network-icon-small {
          color: #106cf5;
          font-size: 12px;
        }

        .no-options {
          padding: 12px;
          color: #999;
          font-size: 12px;
          text-align: center;
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
      `})]})}export{Te as default};
