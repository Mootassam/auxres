import{t as P,u as f,v as g,i as o,X as S,D as a,ab as E,Z as A,a7 as b,j as e,L as z}from"./index-3c6c971f.js";import{u as M,y as I,F as q}from"./FormErrors-53875466.js";import{y as t}from"./yupFormSchemas-746ca8ac.js";import{I as r}from"./InputFormItem-d44bae00.js";import{u as R}from"./useDispatch-55cc451c.js";function V(){const i=R(),m=P(),d=f(g.selectLoading),u=f(g.selectErrorMessage),[p,w]=o.useState(!1),[h,j]=o.useState("");o.useEffect(()=>{x()},[]);const y=S().shape({email:t.string(a("user.fields.username"),{required:!0}),password:t.string(a("user.fields.password"),{required:!0,min:8}),newPasswordConfirmation:t.string(a("user.fields.newPasswordConfirmation"),{required:!0}).oneOf([E("password"),null],a("auth.passwordChange.mustMatch")),phoneNumber:t.string(a("user.fields.phoneNumber"),{required:!0}),invitationcode:t.string(a("user.fields.invitationcode"),{required:!0}),withdrawPassword:t.string(a("user.fields.withdrawPassword"),{required:!0}),captcha:A().required(a("user.fields.captcha")).test("captcha-match",a("pages.signup.captchaMismatch"),function(s){return s===h})}),n=M({resolver:I.yupResolver(y),mode:"onSubmit",defaultValues:{email:"",password:"",newPasswordConfirmation:"",phoneNumber:"",withdrawPassword:"",invitationcode:"",captcha:""}});o.useEffect(()=>{i(b.doClearErrorMessage())},[i]);const x=o.useCallback(()=>{const s="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";let l="";for(let c=0;c<6;c++)l+=s.charAt(Math.floor(Math.random()*s.length));j(l),n.setValue("captcha",""),n.clearErrors("captcha")},[n]),N=o.useCallback(s=>{const{email:l,password:c,phoneNumber:k,withdrawPassword:C,invitationcode:F}=s;i(b.doRegisterEmailAndPassword(l,c,k,C,F))},[i]),v=o.useCallback(()=>{m.goBack()},[m]);return o.useCallback(()=>{w(!p)},[p]),e.jsxs("div",{style:{backgroundColor:"#ffffff",minHeight:"100vh"},children:[e.jsxs("div",{className:"header",children:[e.jsxs("button",{className:"back-button",onClick:v,children:[e.jsx("span",{className:"back-arrow",children:"←"}),e.jsx("span",{children:a("pages.signup.title")})]}),e.jsxs("select",{className:"language-selector",children:[e.jsx("option",{children:"English"}),e.jsx("option",{children:"Spanish"}),e.jsx("option",{children:"French"}),e.jsx("option",{children:"German"})]})]}),e.jsx("div",{className:"containera",children:e.jsxs(q,{...n,children:[u&&e.jsx("div",{className:"error-message",style:{color:"red",textAlign:"center",marginBottom:"1rem",padding:"0.5rem",backgroundColor:"#ffe6e6",borderRadius:"4px"},children:u}),e.jsxs("form",{onSubmit:n.handleSubmit(N),children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Your mailbox"}),e.jsx(r,{type:"email",name:"email",placeholder:"Please enter your email",className:"form-input",externalErrorMessage:null,autoComplete:"email"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Phone number"}),e.jsx(r,{type:"tel",name:"phoneNumber",placeholder:"Please enter your phone number",className:"form-input",autoComplete:"tel"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Verification code"}),e.jsxs("div",{className:"captcha-container",children:[e.jsxs("div",{className:"captcha-display",onClick:x,children:[e.jsx("div",{className:"captcha-text",children:h}),e.jsx("div",{className:"refresh-captcha",children:e.jsx("i",{className:"fas fa-sync-alt"})})]}),e.jsx(r,{type:"text",name:"captcha",placeholder:"Enter verification code",className:"form-input"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Password"}),e.jsx(r,{type:p?"text":"password",name:"password",placeholder:"Please enter your password",className:"form-input",autoComplete:"new-password"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Confirm password"}),e.jsx(r,{type:"password",name:"newPasswordConfirmation",placeholder:"Please confirm your password",className:"form-input",autoComplete:"new-password"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Withdraw password"}),e.jsx(r,{type:"text",name:"withdrawPassword",placeholder:"Please enter withdraw password",className:"form-input"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Invitation code"}),e.jsx(r,{type:"text",name:"invitationcode",placeholder:"Please enter invitation code",className:"form-input"})]}),e.jsx("button",{className:"login-button",disabled:d,type:"submit",style:{opacity:d?.6:1},children:d?e.jsx("span",{children:a("pages.signup.creatingAccount")}):e.jsx("span",{children:a("pages.signup.createAccount")})}),e.jsx("div",{className:"footer",children:e.jsx(z,{to:"/auth/signin",className:"forgot-password",children:"Already have an account? Sign in"})})]})]})}),e.jsx("style",{children:`
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
          padding: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          min-height: 50px;
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
          .container {
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
      `})]})}export{V as default};
