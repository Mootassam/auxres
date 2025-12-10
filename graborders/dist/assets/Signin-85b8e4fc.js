import{X as F,E as o,t as v,u as d,v as p,i as a,a7 as u,j as e,L as x}from"./index-8ef7e624.js";import{u as N,y as C,F as E}from"./FormErrors-6a28b8d8.js";import{y as i}from"./yupFormSchemas-c1a82b9e.js";import{I as b}from"./InputFormItem-5f0c1b08.js";import{u as S}from"./useDispatch-ca929f38.js";const z=F().shape({email:i.string(o("user.fields.username"),{required:!0}).email(o("validation.email")),password:i.string(o("user.fields.password"),{required:!0,min:6}),rememberMe:i.boolean(o("user.fields.rememberMe"))});function D(){const r=S(),g=v(),n=d(p.selectLoading),l=d(p.selectErrorMessage),[m]=a.useState({email:"",password:"",rememberMe:!0}),[t,h]=a.useState(!0);a.useEffect(()=>{r(u.doClearErrorMessage())},[r]);const s=N({resolver:C.yupResolver(z),mode:"onSubmit",defaultValues:m}),f=({email:w,password:j,rememberMe:y})=>{r(u.doSigninWithEmailAndPassword(w,j,y))},k=()=>{g.goBack()},c=()=>{h(!t),s.setValue("rememberMe",!t)};return e.jsxs("div",{style:{backgroundColor:"#ffffff",minHeight:"100vh"},children:[e.jsxs("div",{className:"header",children:[e.jsxs("button",{className:"back-button",onClick:k,children:[e.jsx("span",{className:"back-arrow",children:"←"}),e.jsx("span",{children:o("auth.signin.button")})]}),e.jsxs("select",{className:"language-selector",children:[e.jsx("option",{children:"English"}),e.jsx("option",{children:"Spanish"}),e.jsx("option",{children:"French"}),e.jsx("option",{children:"German"})]})]}),e.jsxs("div",{className:"containera",children:[e.jsxs("div",{className:"tabs",children:[e.jsx("button",{className:"tab active",children:"Mail"}),e.jsx("button",{className:"tab",children:"Phone"})]}),e.jsxs(E,{...s,children:[l&&e.jsx("div",{className:"error-message",style:{color:"red",textAlign:"center",marginBottom:"1rem",padding:"0.5rem",backgroundColor:"#ffe6e6",borderRadius:"4px"},children:l}),e.jsxs("form",{onSubmit:s.handleSubmit(f),children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Your mailbox"}),e.jsx(b,{type:"email",name:"email",placeholder:"Please enter your email",className:"form-input",externalErrorMessage:null})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Your password"}),e.jsx(b,{type:"password",name:"password",placeholder:"Please enter your password",className:"form-input",autoComplete:"current-password",externalErrorMessage:null})]}),e.jsxs("div",{className:"checkbox-group",children:[e.jsx("div",{className:`checkbox ${t?"checked":""}`,onClick:c}),e.jsx("label",{className:"checkbox-label",onClick:c,children:"Remember my password"})]}),e.jsx("button",{className:"login-button",disabled:n,type:"submit",style:{opacity:n?.6:1},children:n?e.jsx("span",{children:o("auth.signin.signingIn")}):e.jsx("span",{children:o("auth.signin.button")})}),e.jsx(x,{to:"/auth/signup",className:"signup-button-link",children:e.jsx("button",{type:"button",className:"signup-button",children:"Sign up now"})}),e.jsx("div",{className:"footer",children:e.jsx(x,{to:"/forgot-password",className:"forgot-password",children:"Forget password"})})]})]})]}),e.jsx("style",{children:`
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

        .language-selector {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 6px;
          padding: 6px 12px;
          color: white;
          font-size: 14px;
          cursor: pointer;
        }

        .language-selector option {
          background: white;
          color: #333;
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

        /* Responsive */
        @media (max-width: 480px) {
          .container {
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
      `})]})}export{D as default};
