import{X as S,D as o,t as z,u as x,v as g,i as a,a7 as u,j as e,L as b}from"./index-3c6c971f.js";import{u as M,y as E,F as A}from"./FormErrors-53875466.js";import{y as l}from"./yupFormSchemas-746ca8ac.js";import{I as h}from"./InputFormItem-d44bae00.js";import{I}from"./I18nSelect-e341f8af.js";import{u as L}from"./useDispatch-55cc451c.js";const B=S().shape({email:l.string(o("user.fields.username"),{required:!0}).email(o("validation.email")),password:l.string(o("user.fields.password"),{required:!0,min:6}),rememberMe:l.boolean(o("user.fields.rememberMe"))});function H(){const t=L(),f=z(),r=x(g.selectLoading),d=x(g.selectErrorMessage),[w]=a.useState({email:"",password:"",rememberMe:!0}),[n,k]=a.useState(!0),[y,c]=a.useState(!1);a.useEffect(()=>{t(u.doClearErrorMessage())},[t]);const s=M({resolver:E.yupResolver(B),mode:"onSubmit",defaultValues:w}),j=({email:i,password:F,rememberMe:C})=>{t(u.doSigninWithEmailAndPassword(i,F,C))},v=()=>{f.goBack()},p=()=>{k(!n),s.setValue("rememberMe",!n)},N=()=>{c(!0)},m=()=>{c(!1)};return e.jsxs("div",{style:{backgroundColor:"#ffffff",minHeight:"100vh"},children:[e.jsxs("div",{className:"header",children:[e.jsxs("button",{className:"back-button",onClick:v,children:[e.jsx("span",{className:"back-arrow",children:"←"}),e.jsx("span",{children:o("auth.signin.button")})]}),e.jsx("div",{className:"language-selector-modal",onClick:N,children:e.jsxs("div",{className:"language-display",children:["English",e.jsx("i",{className:"fas fa-chevron-down"})]})})]}),e.jsxs("div",{className:"containera",children:[e.jsxs("div",{className:"tabs",children:[e.jsx("button",{className:"tab active",children:"Mail"}),e.jsx("button",{className:"tab",children:"Phone"})]}),e.jsxs(A,{...s,children:[d&&e.jsx("div",{className:"error-message",style:{color:"red",textAlign:"center",marginBottom:"1rem",padding:"0.5rem",backgroundColor:"#ffe6e6",borderRadius:"4px"},children:d}),e.jsxs("form",{onSubmit:s.handleSubmit(j),children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Your mailbox"}),e.jsx(h,{type:"email",name:"email",placeholder:"Please enter your email",className:"form-input",externalErrorMessage:null})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Your password"}),e.jsx(h,{type:"password",name:"password",placeholder:"Please enter your password",className:"form-input",autoComplete:"current-password",externalErrorMessage:null})]}),e.jsxs("div",{className:"checkbox-group",children:[e.jsx("div",{className:`checkbox ${n?"checked":""}`,onClick:p}),e.jsx("label",{className:"checkbox-label",onClick:p,children:"Remember my password"})]}),e.jsx("button",{className:"login-button",disabled:r,type:"submit",style:{opacity:r?.6:1},children:r?e.jsx("span",{children:o("auth.signin.signingIn")}):e.jsx("span",{children:o("auth.signin.button")})}),e.jsx(b,{to:"/auth/signup",className:"signup-button-link",children:e.jsx("button",{type:"button",className:"signup-button",children:"Sign up now"})}),e.jsx("div",{className:"footer",children:e.jsx(b,{to:"/forgot-password",className:"forgot-password",children:"Forget password"})})]})]})]}),y&&e.jsx("div",{className:"modal-overlay",onClick:m,children:e.jsxs("div",{className:"modal-container-bottom",onClick:i=>i.stopPropagation(),children:[e.jsxs("div",{className:"modal-header-bottom",children:[e.jsx("div",{className:"modal-drag-handle"}),e.jsxs("div",{className:"modal-title-wrapper",children:[e.jsx("div",{className:"modal-title",children:"Select Language"}),e.jsx("button",{className:"modal-close-btn-bottom",onClick:m,children:e.jsx("i",{className:"fas fa-times"})})]})]}),e.jsx("div",{className:"modal-content-bottom",children:e.jsx(I,{isInModal:!0})})]})}),e.jsx("style",{children:`
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
          box-shadow: 0 2px 8px rgba(0, 122, 255, 0.15);
          max-width: 400px !important;
          margin: 0 auto;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: white;
          font-size: 17px;
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

        /* Tabs */
        .tabs {
          display: flex;
          background-color: #f8f9fa;
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 32px;
        }

        .tab {
          flex: 1;
          padding: 12px 16px;
          text-align: center;
          border-radius: 10px;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          background: none;
        }

        .tab.active {
          background-color: #007AFF;
          color: white;
        }

        .tab:not(.active) {
          background-color: transparent;
          color: #8E8E93;
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

        /* Checkbox */
        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
        }

        .checkbox {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #C7C7CC;
          background: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .checkbox.checked {
          background-color: #007AFF;
          border-color: #007AFF;
        }

        .checkbox.checked::after {
          content: '✓';
          color: white;
          font-size: 14px;
          font-weight: bold;
        }

        .checkbox-label {
          font-size: 14px;
          color: #1D1D1F;
          cursor: pointer;
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

        .signup-button {
          width: 100%;
          background-color: white;
          color: #007AFF;
          border: 2px solid #007AFF;
          border-radius: 7px;
          padding: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .signup-button:hover {
          background-color: #f8f9fa;
        }

        .signup-button-link {
          text-decoration: none;
          display: block;
        }

        /* Footer */
        .footer {
          text-align: right;
          margin-top: 24px;
        }

        .forgot-password {
          color: #007AFF;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
        }

        .forgot-password:hover {
          text-decoration: underline;
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
          
          .login-button, .signup-button {
            padding: 14px;
          }

          .language-selector-modal {
            padding: 5px 10px;
            min-width: 70px;
          }

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
      `})]})}export{H as default};
