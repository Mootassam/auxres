import{k as j,X as oe,E as i,Y as de,Z as le,u as w,v as ce,A as me,i as o,V as G,D as pe,W as ue,j as e,L as J,a5 as K}from"./index-0794a010.js";import{u as he,y as we,c as R,F as fe}from"./FormErrors-65c61100.js";import{y as c}from"./yupFormSchemas-2f18247a.js";import{F as Q}from"./FieldFormItem-8deceba3.js";import{S as xe}from"./sucessModal-e6b8baf1.js";import{u as be}from"./useDispatch-40015f82.js";const f=s=>s.withdraw.form,ge=j([f],s=>s.record),ve=j([f],s=>!!s.initLoading),Ne=j([f],s=>!!s.saveLoading),je=j([f],s=>!!s.withdrawModal),ye={selectInitLoading:ve,selectSaveLoading:Ne,selectRecord:ge,selectModal:je,selectRaw:f},L={BTC:{min:91e-5,fee:2e-5,decimals:8},ETH:{min:.0077,fee:5e-4,decimals:8},USDT:{min:30,fee:3,decimals:2},SOL:{min:.01,fee:5e-4,decimals:6},XRP:{min:1,fee:.1,decimals:6}},Se=oe().shape({orderNo:c.string(i("entities.withdraw.fields.orderNo")),currency:c.string(i("entities.withdraw.fields.currency")),withdrawAmount:de().typeError(i("pages.withdraw.errors.amountNumber")).required(i("pages.withdraw.errors.amountRequired")).test("positive",i("pages.withdraw.errors.amountPositive"),s=>typeof s=="number"&&s>0).test("min-by-currency",i("pages.withdraw.errors.amountMin"),function(s){const{currency:d}=this.parent||{};return!d||!L[d]?!0:typeof s!="number"?!1:s>=L[d].min}),fee:c.decimal(i("entities.withdraw.fields.fee")),totalAmount:c.decimal(i("entities.withdraw.fields.totalAmount")),auditor:c.relationToOne(i("entities.withdraw.fields.auditor")),acceptTime:c.datetime(i("entities.withdraw.fields.acceptTime")),status:c.enumerator(i("entities.withdraw.fields.status"),{options:["pending","canceled","success"]}),withdrawPassword:le().required(i("pages.withdraw.errors.passwordRequired"))});function Re(){var U,Y,q,H,O,X;const s=be(),d=w(ce.selectCurrentUser),x=w(me.selectRows)||[];console.log("🚀 ~ Withdraw ~ assets:",x);const W=w(ye.selectModal),[_,E]=o.useState(""),[B,y]=o.useState(""),[a,V]=o.useState(""),[ee,te]=o.useState("ethereum"),[I,T]=o.useState(null),[b,S]=o.useState(!1),A=w(G.selectRows);w(G.selectLoading),o.useEffect(()=>{s(pe.doFetch())},[s]),o.useEffect(()=>{s(ue.doFetch())},[s]),o.useEffect(()=>{var t,r;if(a&&x.length){const M=x.find(P=>String(P.symbol).toUpperCase()===String(a).toUpperCase());T(M||null);const C=((r=(t=d==null?void 0:d.wallet)==null?void 0:t[a])==null?void 0:r.address)||"";y(C),n.setValue("currency",a)}else T(null),y(""),n.setValue("currency","")},[a,x,d]);const D={orderNo:"",currency:"",withdrawAmount:"",fee:"",totalAmount:"",auditor:"",acceptTime:"",status:"pending",withdrawAdress:"",withdrawPassword:""},n=he({resolver:we.yupResolver(Se),mode:"all",defaultValues:D}),ae=R({control:n.control,name:"withdrawAmount"}),k=R({control:n.control,name:"withdrawPassword"});R({control:n.control,name:"currency"});const l=Number(ae),$=!Number.isNaN(l)&&isFinite(l),F=I&&Number(I.amount)||0,z=L[a]||{min:0,fee:0,decimals:8},g=a?z.fee:0,v=a?z.min:0,p=a?z.decimals:8,se=$?Math.max(l-(g||0),0):0,u=(t,r=p)=>typeof t!="number"||!isFinite(t)?"0":Number(t).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:r}),h=(()=>a?!$||l<=0?{disabled:!0,label:i("pages.withdraw.validation.enterAmount"),reason:"enterAmount"}:v&&l<v?{disabled:!0,label:i("pages.withdraw.validation.belowMin",u(v),a),reason:"belowMin"}:l>F?{disabled:!0,label:i("pages.withdraw.validation.insufficientBalance"),reason:"insufficientBalance"}:l+g>F?{disabled:!0,label:i("pages.withdraw.validation.insufficientForFee"),reason:"insufficientForFee"}:!k||typeof k=="string"&&k.trim()===""?{disabled:!0,label:i("pages.withdraw.validation.enterPassword"),reason:"enterPassword"}:{disabled:!1,label:i("pages.withdraw.confirmWithdrawal"),reason:"ok"}:{disabled:!0,label:i("pages.withdraw.validation.selectCurrency"),reason:"selectCurrency"})(),ie=()=>{s(K.doClose()),n.reset(D),V(""),y(""),E(""),S(!1)},re=async t=>{if(!h.disabled){S(!0);try{t.currency=a;const r=new Date,M=`${r.getFullYear()}${String(r.getMonth()+1).padStart(2,"0")}${String(r.getDate()).padStart(2,"0")}`,C=Math.floor(Math.random()*1e7).toString().padStart(7,"0");t.orderNo=`RE${M}${C}`;const P=Number(t.withdrawAmount)||0,Z=g||0;t.fee=Z,t.totalAmount=P-Z,t.withdrawAdress=B,t.status="pending",E(t.totalAmount.toString()),await s(K.doCreate(t))}catch(r){console.error("Withdrawal submission error:",r),S(!1)}}},N=o.useMemo(()=>A.find(t=>t.id===a),[A,a]),ne=(N==null?void 0:N.network)||[];console.log("🚀 ~ Withdraw ~ selectedMethod:",N);const{errors:m}=n.formState;return e.jsxs("div",{className:"withdraw-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(J,{to:"/wallets",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:"Withdraw"}),e.jsx(J,{className:"header-icon",to:"/history",style:{color:"white"},children:e.jsx("i",{className:"fas fa-receipt"})})]})}),e.jsx("div",{className:"content-card",children:e.jsx("div",{className:"withdraw-content",children:e.jsxs("div",{className:"form-section",children:[e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Select currency"}),e.jsx("div",{className:"input-wrapper",children:e.jsx("select",{className:"currency-select",value:a,onChange:t=>{const r=t.target.value;V(r),n.setValue("currency",r),n.setValue("withdrawAmount",""),n.setValue("withdrawPassword","")},children:A.map(t=>e.jsx("option",{value:t.id,children:t.symbol},t.id))})})]}),e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Withdraw network"}),e.jsx("div",{className:"input-wrapper",children:e.jsx("select",{className:"network-select",value:ee,onChange:t=>te(t.target.value),children:ne.map(t=>e.jsx("option",{value:t.id,children:t.name},t.id))})})]}),e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Withdraw address"}),e.jsx("div",{className:"input-wrapper",children:e.jsx("input",{type:"text",className:"address-field",placeholder:"Your wallet address will appear here"})}),!B&&a&&e.jsxs("div",{className:"field-hint",children:["Please add a wallet address for ",a," to withdraw"]})]}),e.jsx(fe,{...n,children:e.jsxs("form",{onSubmit:n.handleSubmit(re),children:[e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Amount of coins withdrawn"}),e.jsx("div",{className:"input-wrapper",children:e.jsx(Q,{name:"withdrawAmount",type:"number",className:"amount-field",placeholder:"0.0",disabled:b||!a})}),e.jsxs("div",{className:"balance-text",children:["Available: ",e.jsxs("span",{className:"balance-amount",children:[u(F,p)," ",a]})]}),e.jsxs("div",{className:"field-error",children:[((U=m.withdrawAmount)==null?void 0:U.message)&&e.jsx("div",{children:(Y=m.withdrawAmount)==null?void 0:Y.message}),!((q=m.withdrawAmount)!=null&&q.message)&&h.reason==="belowMin"&&e.jsxs("div",{children:["Minimum withdrawal: ",u(v,p)," ",a]}),!((H=m.withdrawAmount)!=null&&H.message)&&h.reason==="insufficientBalance"&&e.jsx("div",{children:"Insufficient balance"})]})]}),e.jsxs("div",{className:"fee-section",children:[e.jsxs("div",{className:"fee-row",children:[e.jsx("div",{className:"fee-label",children:"Handling fee:"}),e.jsxs("div",{className:"fee-value",children:[u(g,p)," ",a]})]}),e.jsxs("div",{className:"fee-row",children:[e.jsx("div",{className:"fee-label",children:"You will receive:"}),e.jsxs("div",{className:"fee-value receive-amount",children:[u(se,p)," ",a]})]})]}),e.jsxs("div",{className:"notice-section",children:[e.jsx("div",{className:"notice-title",children:"Important notice"}),e.jsxs("div",{className:"notice-content",children:[e.jsx("div",{className:"notice-item",children:"1. In order to prevent arbitrage, you can apply for currency withdraw when the transaction volume reaches the quota."}),e.jsx("div",{className:"notice-item",children:"2. After submitting the withdraw application, the money will arrive within 24 hours. If the money does not arrive after the expected withdraw time, please consult the online customer service."}),e.jsx("div",{className:"notice-item",children:"3. After submitting the withdraw application, the funds are frozen because the withdraw is in progress and the funds are temporarily held by the system. This does not mean that you have lost the asset or that there is an abnormality with the asset."})]})]}),e.jsxs("div",{className:"input-field",children:[e.jsx("label",{className:"input-label",children:"Withdrawal Password"}),e.jsx("div",{className:"input-wrapper",children:e.jsx(Q,{name:"withdrawPassword",type:"password",className:"password-field",placeholder:"Enter your withdrawal password",disabled:b})}),e.jsx("div",{className:"field-error",children:((O=m.withdrawPassword)==null?void 0:O.message)&&e.jsx("div",{children:(X=m.withdrawPassword)==null?void 0:X.message})})]}),e.jsx("button",{type:"submit",className:"withdraw-button",disabled:h.disabled||b,children:b?e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"fas fa-spinner fa-spin",style:{marginRight:"8px"}}),"Processing..."]}):h.label})]})})]})})}),W&&e.jsx(xe,{isOpen:W,onClose:ie,type:"withdraw",amount:_,coinType:a}),e.jsx("style",{children:`
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
      `})]})}export{Re as default};
