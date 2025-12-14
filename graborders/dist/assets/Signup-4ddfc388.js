import{t as M,u as j,v,i as t,ab as N,X as z,D as r,aa as A,Z as I,j as e,L as P,a8 as B,a9 as O}from"./index-a3888f1e.js";import{u as R,y as Y,F as q}from"./FormErrors-86b0ce33.js";import{y as p}from"./yupFormSchemas-f123b7e7.js";import{I as l}from"./InputFormItem-709dd728.js";import{I as D}from"./I18nSelect-0a5a0655.js";import{u as T}from"./useDispatch-9594a0fd.js";function G(){const c=T(),g=M(),m=j(v.selectLoading),x=j(v.selectErrorMessage);t.useState(!1);const[f,k]=t.useState(""),[u,h]=t.useState(!1),[C,b]=t.useState(""),n=()=>{const a=O(),o=B();if(!Array.isArray(o)){b("");return}const s=Object.fromEntries(o.map(d=>[d.id,d.label]));b(s[a]||"")};t.useEffect(()=>{w(),n();const a=setInterval(n,500),o=()=>n();return window.addEventListener("focus",o),()=>{clearInterval(a),window.removeEventListener("focus",o)}},[]),t.useEffect(()=>{c(N.doClearErrorMessage())},[c]),t.useEffect(()=>{u||setTimeout(n,100)},[u]);const S=z().shape({email:p.string(r("user.fields.username"),{required:!0}),password:p.string(r("user.fields.password"),{required:!0,min:8}),newPasswordConfirmation:p.string(r("user.fields.newPasswordConfirmation"),{required:!0}).oneOf([A("password"),null],r("auth.passwordChange.mustMatch")),phoneNumber:p.string(r("user.fields.phoneNumber"),{required:!0}),captcha:I().required(r("user.fields.captcha")).test("captcha-match",r("pages.signup.captchaMismatch"),function(a){return a===f})}),i=R({resolver:Y.yupResolver(S),mode:"onSubmit",defaultValues:{email:"",password:"",newPasswordConfirmation:"",phoneNumber:"",captcha:""}}),w=t.useCallback(()=>{const a="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";let o="";for(let s=0;s<6;s++)o+=a.charAt(Math.floor(Math.random()*a.length));k(o),i.setValue("captcha",""),i.clearErrors("captcha")},[i]),F=t.useCallback(a=>{const{email:o,password:s,phoneNumber:d}=a;c(N.doRegisterEmailAndPassword(o,s,d))},[c]),L=t.useCallback(()=>{g.goBack()},[g]),E=()=>{h(!0)},y=()=>{h(!1),setTimeout(n,100)};return e.jsxs("div",{style:{backgroundColor:"#ffffff",minHeight:"100vh"},children:[e.jsxs("div",{className:"header",children:[e.jsxs("button",{className:"back-button",onClick:L,children:[e.jsx("span",{className:"back-arrow",children:"←"}),e.jsx("span",{children:r("pages.signup.title")})]}),e.jsx("div",{className:"language-selector-modal",onClick:E,children:e.jsxs("div",{className:"language-display",children:[C||"Select Language",e.jsx("i",{className:"fas fa-chevron-down"})]})})]}),e.jsx("div",{className:"containera",children:e.jsxs(q,{...i,children:[x&&e.jsx("div",{className:"error-message",style:{color:"red",textAlign:"center",marginBottom:"1rem",padding:"0.5rem",backgroundColor:"#ffe6e6",borderRadius:"4px"},children:x}),e.jsxs("form",{onSubmit:i.handleSubmit(F),children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Your mailbox"}),e.jsx(l,{type:"email",name:"email",placeholder:"Please enter your email",className:"form-input",externalErrorMessage:null,autoComplete:"email"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Phone number"}),e.jsx(l,{type:"tel",name:"phoneNumber",placeholder:"Please enter your phone number",className:"form-input",autoComplete:"tel"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Verification code"}),e.jsxs("div",{className:"captcha-container",children:[e.jsxs("div",{className:"captcha-display",onClick:w,children:[e.jsx("div",{className:"captcha-text",children:f}),e.jsx("div",{className:"refresh-captcha",children:e.jsx("i",{className:"fas fa-sync-alt"})})]}),e.jsx(l,{type:"text",name:"captcha",placeholder:"Enter verification code",className:"form-input"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Password"}),e.jsx(l,{type:"password",name:"password",placeholder:"Please enter your password",className:"form-input",autoComplete:"new-password"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Confirm password"}),e.jsx(l,{type:"password",name:"newPasswordConfirmation",placeholder:"Please confirm your password",className:"form-input",autoComplete:"new-password"})]}),e.jsx("button",{className:"login-button",disabled:m,type:"submit",style:{opacity:m?.6:1},children:m?e.jsx("span",{children:r("pages.signup.creatingAccount")}):e.jsx("span",{children:r("pages.signup.createAccount")})}),e.jsx("div",{className:"footer",children:e.jsx(P,{to:"/auth/signin",className:"forgot-password",children:"Already have an account? Sign in"})})]})]})}),u&&e.jsx("div",{className:"modal-overlay",onClick:y,children:e.jsxs("div",{className:"modal-container-bottom",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header-bottom",children:[e.jsx("div",{className:"modal-drag-handle"}),e.jsxs("div",{className:"modal-title-wrapper",children:[e.jsx("div",{className:"modal-title",children:"Select Language"}),e.jsx("button",{className:"modal-close-btn-bottom",onClick:y,children:e.jsx("i",{className:"fas fa-times"})})]})]}),e.jsx("div",{className:"modal-content-bottom",children:e.jsx(D,{isInModal:!0})})]})}),e.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        /* Header Styles */
        .header {
          background-color: #007AFF;
          color: white;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 400px;
          margin: 0 auto;
          box-shadow: 0 2px 8px rgba(0, 122, 255, 0.15);
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: white;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        .back-arrow {
          font-size: 20px;
          font-weight: 300;
        }

        /* New Language Selector Modal Style */
        .language-selector-modal {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 6px;
          padding: 6px 12px;
          color: white;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
          user-select: none;
          min-width: 80px;
          justify-content: center;
        }

        .language-selector-modal:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }

        .language-display {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 500;
        }

        .language-display i {
          font-size: 10px;
          transition: transform 0.2s ease;
        }

        .language-selector-modal:hover .language-display i {
          transform: translateY(1px);
        }

        /* Main Content */
        .containera {
          max-width: 400px;
          margin: 40px auto;
          padding: 0 20px;
          flex: 1;
          width: 100%;
          background-color: #ffffff;
        }

        /* Form Styles */
        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #1D1D1F;
          font-size: 14px;
        }

        .form-input {
          width: 100%;
          padding: 16px;
          background-color: #f8f9fa;
          border: 2px solid transparent;
          border-radius: 7px;
          font-size: 14px;
          transition: all 0.2s ease;
          border: none;
          outline: none;
        }

        .form-input:focus {
          outline: none;
          background-color: white;
          border-color: #007AFF;
          box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
        }

        .form-input::placeholder {
          color: #8E8E93;
        }

        /* Captcha Styles */
        .captcha-container {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .captcha-display {
          flex: 1;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 7px;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
        }

        .captcha-text {
          color: white;
          font-size: 20px;
          font-weight: bold;
          letter-spacing: 2px;
          font-family: 'Courier New', monospace;
        }

        .refresh-captcha {
          color: white;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Buttons */
        .login-button {
          width: 100%;
          background-color: #007AFF;
          color: white;
          border: none;
          border-radius: 7px;
          padding: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 16px;
        }

        .login-button:hover:not(:disabled) {
          background-color: #0056CC;
          transform: translateY(-1px);
        }

        .login-button:disabled {
          cursor: not-allowed;
        }

        /* Footer */
        .footer {
          text-align: center;
          margin-top: 24px;
        }

        .forgot-password {
          color: #007AFF;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
        }

        .forgot-password:hover {
          text-decoration: underline;
        }

        /* Responsive */
        @media (max-width: 480px) {
          .containera {
            margin: 20px auto;
          }
          
          .header {
            padding: 12px 16px;
          }
          
          .form-input {
            padding: 14px;
          }
          
          .login-button {
            padding: 14px;
          }

          .captcha-container {
            flex-direction: column;
            gap: 12px;
          }

          .captcha-display {
            width: 100%;
          }

          .language-selector-modal {
            padding: 5px 10px;
            min-width: 70px;
          }
        }

        /* Input Form Item Override */
        .text-input {
          width: 100%;
          padding: 16px;
          background-color: #f8f9fa;
          border: 2px solid transparent;
          border-radius: 7px;
          font-size: 14px;
          transition: all 0.2s ease;
          border: none;
          outline: none;
        }

        .text-input:focus {
          outline: none;
          background-color: white;
          border-color: #007AFF;
          box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
        }

        .text-input::placeholder {
          color: #8E8E93;
        }

        /* Modal Styles for Language Selection */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        .modal-container-bottom {
          background: white;
          border-radius: 24px 24px 0 0;
          width: 100%;
          max-width: 400px;
          max-height: 85vh;
          overflow: hidden;
          box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.15);
          animation: slideUpFromBottom 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          margin: 0 auto;
        }

        .modal-header-bottom {
          padding: 16px 20px 8px 20px;
          border-bottom: 1px solid #eef2f7;
          position: relative;
        }

        .modal-drag-handle {
          width: 40px;
          height: 4px;
          background: #ddd;
          border-radius: 2px;
          margin: 0 auto 12px auto;
        }

        .modal-title-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .modal-title {
          font-size: 17px;
          font-weight: 700;
          color: #222;
          flex: 1;
          padding-right: 10px;
        }

        .modal-close-btn-bottom {
          background: #f5f7fa;
          border: none;
          color: #666;
          font-size: 16px;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .modal-close-btn-bottom:hover {
          background: #eef2f7;
          color: #333;
        }

        .modal-content-bottom {
          flex: 1;
          overflow-y: auto;
          padding: 0;
          max-height: calc(85vh - 100px);
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUpFromBottom {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 480px) {
          .modal-container-bottom {
            max-height: 90vh;
          }

          .modal-header-bottom {
            padding: 12px 16px 6px 16px;
          }

          .modal-title {
            font-size: 16px;
          }

          .modal-drag-handle {
            width: 36px;
            height: 3px;
            margin-bottom: 10px;
          }
        }
      `})]})}export{G as default};
