import{t as D,u as d,v as P,ac as h,i as o,ad as V,ab as m,j as e,L as b}from"./index-a3888f1e.js";import{u as R}from"./useDispatch-9594a0fd.js";const A=[{icon:"fas fa-cog",path:"/settings",name:"Preferences"},{icon:"fas fa-shield-alt",path:"/loginpassword",name:"Security center"},{icon:"fas fa-file-alt",path:"/transferAll",name:"Account change records"},{icon:"fas fa-comment-dots",path:"/online-service",name:"Online service"},{icon:"fas fa-building",path:"/about",name:"Platform introduction"},{icon:"fas fa-question-circle",path:"/support",name:"Help center"},{icon:"fas fa-download",path:"/download",name:"Download"},{icon:"fas fa-trash-alt",name:"Clear cache",type:"action"}],i={PENDING:"pending",SUCCESS:"success",UNVERIFIED:"unverified"};function G(){const s=R(),p=D(),a=d(P.selectCurrentUser),u=d(h.selectRows);d(h.selectLoading);const[r,w]=o.useState(!1),t=o.useMemo(()=>{var n;return((n=u[0])==null?void 0:n.status)===i.PENDING?i.PENDING:a!=null&&a.kyc?i.SUCCESS:i.UNVERIFIED},[u,a==null?void 0:a.kyc]),l=o.useMemo(()=>({user:a}),[a]);o.useEffect(()=>{s(V.doFetch(l,l))},[s,l]),o.useCallback(()=>{s(m.doSignout())},[s]);const g=o.useCallback(()=>{console.log("Clearing cache..."),alert("Cache cleared successfully!")},[]),f=o.useCallback(()=>{w(!r),console.log(`Simulated trading ${r?"disabled":"enabled"}`)},[r]),v=o.useMemo(()=>A.map(n=>({...n,disabled:n.requiresKyc&&!(a!=null&&a.kyc)})),[a==null?void 0:a.kyc]),N=o.useCallback(()=>{console.log("KYC Status:",t),t===i.UNVERIFIED?(console.log("Redirecting to proof page..."),p.push("/proof")):t===i.PENDING?(console.log("Verification is pending review..."),alert("Your verification is pending review. Please wait for approval.")):console.log("User is already verified")},[t,p]),y=()=>a!=null&&a.fullName?a.fullName.charAt(0).toUpperCase():a!=null&&a.email?a.email.charAt(0).toUpperCase():"U",k=()=>{switch(t){case i.SUCCESS:return"Verified";case i.PENDING:return"Pending Review";default:return"Not Verified"}},j=()=>{switch(t){case i.SUCCESS:return"fas fa-check-circle";case i.PENDING:return"fas fa-clock";default:return"fas fa-exclamation-circle"}},S=()=>{switch(t){case i.SUCCESS:return"Verified";case i.PENDING:return"Pending";default:return"Verify Now"}},C=()=>t===i.SUCCESS||t===i.PENDING,E=()=>t===i.UNVERIFIED,I=o.useCallback((n,c)=>{if(n.type==="toggle")return e.jsxs("li",{className:"menu-item",children:[e.jsx("div",{className:"icon-container icon-green",children:e.jsx("i",{className:n.icon})}),e.jsx("div",{className:"menu-text",children:n.name}),e.jsx("div",{className:"menu-action",children:e.jsxs("label",{className:"toggle-switch",children:[e.jsx("input",{type:"checkbox",checked:r,onChange:f}),e.jsx("span",{className:"slider"})]})})]},c);if(n.type==="action")return e.jsxs("li",{className:"menu-item",onClick:g,children:[e.jsx("div",{className:"icon-container icon-gray",children:e.jsx("i",{className:n.icon})}),e.jsx("div",{className:"menu-text",children:n.name})]},c);const x=e.jsxs("li",{className:`menu-item ${n.disabled?"disabled":""}`,children:[e.jsx("div",{className:`icon-container ${n.icon.includes("exchange-alt")?"icon-green":n.icon.includes("cog")?"icon-gray":n.icon.includes("shield-alt")?"icon-blue":n.icon.includes("file-alt")||n.icon.includes("gift")?"icon-green":n.icon.includes("comment-dots")?"icon-blue":n.icon.includes("building")?"icon-green":n.icon.includes("question-circle")?"icon-gray":n.icon.includes("download")?"icon-green":"icon-gray"}`,children:e.jsx("i",{className:n.icon})}),e.jsx("div",{className:"menu-text",children:n.name}),e.jsx("div",{className:"menu-action",children:!n.disabled&&e.jsx("i",{className:"fas fa-chevron-right chevron"})})]});return n.disabled?e.jsx("div",{className:"menu-link-wrapper",children:x},n.name):e.jsx(b,{to:n.path,className:"menu-link-wrapper",children:x},n.name)},[r,f,g]),z=()=>{s(m.doSignout())};return e.jsxs("div",{className:"profile-container",children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"nav-bar",children:[e.jsx(b,{to:"/",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:"Personal Center"})]}),e.jsxs("div",{className:"profile-section",children:[e.jsx("div",{className:"avatar-container",children:e.jsx("div",{className:"avatar-ring",children:e.jsxs("div",{className:"avatar",children:[e.jsx("div",{className:"avatar-initial",children:y()}),e.jsx("div",{className:"sunglasses",children:e.jsx("i",{className:"fas fa-sunglasses"})})]})})}),e.jsx("div",{className:"username",children:(a==null?void 0:a.fullName)||(a==null?void 0:a.email)||"User"}),e.jsxs("div",{className:"user-id",children:["ID: ",(a==null?void 0:a.id)||"N/A"]}),e.jsxs("div",{className:"certification-status",children:[e.jsxs("div",{className:`status-badge ${E()?"pulse":""}`,children:[e.jsx("i",{className:`${j()} status-icon`}),k()]}),e.jsx("button",{className:"verify-button",onClick:N,disabled:C(),children:S()})]})]})]}),e.jsxs("div",{className:"content-card",children:[e.jsx("ul",{className:"menu-list",children:v.map((n,c)=>I(n,c))}),e.jsx("div",{className:"signout-section",children:e.jsxs("button",{className:"signout-button",onClick:z,children:[e.jsx("i",{className:"fas fa-sign-out-alt"}),"Sign Out"]})})]}),e.jsx("style",{children:`


  /* Sign Out Button */
        .signout-section {
          margin-top: 30px;
          padding: 20px 0;
          border-top: 1px solid #e7eaee;
        }

        .signout-button {
          width: 100%;
          padding: 12px;
          background: #f44336;
          color: white;
          border: none;
          border-radius: 7px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .signout-button:hover {
          background: #d32f2f;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(244, 67, 54, 0.2);
        }

        .signout-button:active {
          transform: translateY(0);
        }

        .profile-container {
          max-width: 400px;
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

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

        .page-title {
          color: white;
          font-size: 17px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .verify-button {
          background: #106cf5;
          color: white;
          border: none;
          border-radius: 20px;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .verify-button:hover:not(:disabled) {
          background: #0a4fc4;
          transform: translateY(-2px);
        }

        .verify-button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }




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

        .profile-container {
          max-width: 400px;
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header Section */
        .header {
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
          min-height: 280px;
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
          font-size: 18px;
          font-weight: 600;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .profile-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;
        }

        .avatar-container {
          position: relative;
          margin-bottom: 16px;
        }

        .avatar-ring {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 2px dashed rgba(255, 255, 255, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: rotate 15s linear infinite;
        }

        .avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 40px;
          position: relative;
          overflow: hidden;
          font-weight: bold;
        }

        .avatar-initial {
          font-size: 32px;
          font-weight: 700;
        }

        .sunglasses {
          position: absolute;
          top: 30px;
          font-size: 30px;
          color: #333;
          transform: rotate(-10deg);
        }

        .username {
          color: white;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 6px;
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .user-id {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          margin-bottom: 12px;
        }

        .certification-status {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }

        .status-badge {
          border: 1px solid white;
          border-radius: 16px;
          padding: 6px 16px;
          color: white;
          font-size: 12px;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
        }

        .status-badge:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }

        .status-icon {
          font-size: 10px;
        }

        .verify-button {
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 16px;
          padding: 6px 12px;
          color: #106cf5;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .verify-button:hover:not(:disabled) {
          background: white;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .verify-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          background: rgba(255, 255, 255, 0.6);
        }

        /* Content Section */
        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 30px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
        }

        .menu-list {
          list-style: none;
        }

        .menu-link-wrapper {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .menu-item {
          display: flex;
          align-items: center;
          padding: 14px 0;
          border-bottom: 1px solid #e7eaee;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .menu-item:hover {
          background-color: rgba(16, 108, 245, 0.05);
        }

        .menu-item.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .menu-item.disabled:hover {
          background-color: transparent;
        }

        .menu-item:last-child {
          border-bottom: none;
        }

        .icon-container {
          width: 28px;
          height: 28px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
          font-size: 16px;
        }

        .icon-green {
          color: #37b66a;
        }

        .icon-gray {
          color: #666;
        }

        .icon-blue {
          color: #106cf5;
        }

        .icon-orange {
          color: #ff7a00;
        }

        .menu-text {
          flex: 1;
          font-size: 14px;
          font-weight: 500;
        }

        .menu-action {
          display: flex;
          align-items: center;
          color: #999;
        }

        .chevron {
          font-size: 14px;
          color: #ccc;
        }

        /* Toggle Switch */
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 24px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #37b66a;
        }

        input:checked + .slider:before {
          transform: translateX(20px);
        }

        /* Logout Section */
        .logout-section {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e7eaee;
        }

        .logout-button {
          width: 100%;
          padding: 12px;
          background: #f44336;
          color: white;
          border: none;
          border-radius: 7px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .logout-button:hover {
          background: #d32f2f;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(244, 67, 54, 0.2);
        }

        .logout-button:active {
          transform: translateY(0);
        }

        /* Animations */
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
          }
          70% {
            box-shadow: 0 0 0 6px rgba(255, 255, 255, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          }
        }

        .pulse {
          animation: pulse 2s infinite;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .profile-container {
            padding: 0;
          }

          .header {
            padding: 16px;
          }

          .content-card {
            padding: 25px 16px 100px;
          }

          .menu-item {
            padding: 12px 0;
          }

          .logout-button {
            padding: 10px;
            font-size: 13px;
          }
        }
      `})]})}export{G as default};
