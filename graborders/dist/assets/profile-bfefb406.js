import{t as I,u as d,v as z,ac as h,i as o,ad as D,a7 as P,j as e,L as m}from"./index-3c6c971f.js";import{u as V}from"./useDispatch-55cc451c.js";const R=[{icon:"fas fa-cog",path:"/settings",name:"Preferences"},{icon:"fas fa-shield-alt",path:"/passwordtype",name:"Security center"},{icon:"fas fa-file-alt",path:"/transferAll",name:"Account change records"},{icon:"fas fa-gift",path:"/invitation",name:"Invite friends",requiresKyc:!0},{icon:"fas fa-comment-dots",path:"/online-service",name:"Online service"},{icon:"fas fa-building",path:"/about",name:"Platform introduction"},{icon:"fas fa-question-circle",path:"/support",name:"Help center"},{icon:"fas fa-download",path:"/download",name:"Download"},{icon:"fas fa-trash-alt",name:"Clear cache",type:"action"}],n={PENDING:"pending",SUCCESS:"success",UNVERIFIED:"unverified"};function G(){const r=V(),p=I(),a=d(z.selectCurrentUser),u=d(h.selectRows);d(h.selectLoading);const[s,b]=o.useState(!1),t=o.useMemo(()=>{var i;return((i=u[0])==null?void 0:i.status)===n.PENDING?n.PENDING:a!=null&&a.kyc?n.SUCCESS:n.UNVERIFIED},[u,a==null?void 0:a.kyc]),l=o.useMemo(()=>({user:a}),[a]);o.useEffect(()=>{r(D.doFetch(l,l))},[r,l]),o.useCallback(()=>{r(P.doSignout())},[r]);const g=o.useCallback(()=>{console.log("Clearing cache..."),alert("Cache cleared successfully!")},[]),f=o.useCallback(()=>{b(!s),console.log(`Simulated trading ${s?"disabled":"enabled"}`)},[s]),w=o.useMemo(()=>R.map(i=>({...i,disabled:i.requiresKyc&&!(a!=null&&a.kyc)})),[a==null?void 0:a.kyc]),v=o.useCallback(()=>{console.log("KYC Status:",t),t===n.UNVERIFIED?(console.log("Redirecting to proof page..."),p.push("/proof")):t===n.PENDING?(console.log("Verification is pending review..."),alert("Your verification is pending review. Please wait for approval.")):console.log("User is already verified")},[t,p]),N=()=>a!=null&&a.fullName?a.fullName.charAt(0).toUpperCase():a!=null&&a.email?a.email.charAt(0).toUpperCase():"U",y=()=>{switch(t){case n.SUCCESS:return"Verified";case n.PENDING:return"Pending Review";default:return"Not Verified"}},k=()=>{switch(t){case n.SUCCESS:return"fas fa-check-circle";case n.PENDING:return"fas fa-clock";default:return"fas fa-exclamation-circle"}},j=()=>{switch(t){case n.SUCCESS:return"Verified";case n.PENDING:return"Pending";default:return"Verify Now"}},S=()=>t===n.SUCCESS||t===n.PENDING,C=()=>t===n.UNVERIFIED,E=o.useCallback((i,c)=>{if(i.type==="toggle")return e.jsxs("li",{className:"menu-item",children:[e.jsx("div",{className:"icon-container icon-green",children:e.jsx("i",{className:i.icon})}),e.jsx("div",{className:"menu-text",children:i.name}),e.jsx("div",{className:"menu-action",children:e.jsxs("label",{className:"toggle-switch",children:[e.jsx("input",{type:"checkbox",checked:s,onChange:f}),e.jsx("span",{className:"slider"})]})})]},c);if(i.type==="action")return e.jsxs("li",{className:"menu-item",onClick:g,children:[e.jsx("div",{className:"icon-container icon-gray",children:e.jsx("i",{className:i.icon})}),e.jsx("div",{className:"menu-text",children:i.name})]},c);const x=e.jsxs("li",{className:`menu-item ${i.disabled?"disabled":""}`,children:[e.jsx("div",{className:`icon-container ${i.icon.includes("exchange-alt")?"icon-green":i.icon.includes("cog")?"icon-gray":i.icon.includes("shield-alt")?"icon-blue":i.icon.includes("file-alt")||i.icon.includes("gift")?"icon-green":i.icon.includes("comment-dots")?"icon-blue":i.icon.includes("building")?"icon-green":i.icon.includes("question-circle")?"icon-gray":i.icon.includes("download")?"icon-green":"icon-gray"}`,children:e.jsx("i",{className:i.icon})}),e.jsx("div",{className:"menu-text",children:i.name}),e.jsx("div",{className:"menu-action",children:!i.disabled&&e.jsx("i",{className:"fas fa-chevron-right chevron"})})]});return i.disabled?e.jsx("div",{className:"menu-link-wrapper",children:x},i.name):e.jsx(m,{to:i.path,className:"menu-link-wrapper",children:x},i.name)},[s,f,g]);return e.jsxs("div",{className:"profile-container",children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"nav-bar",children:[e.jsx(m,{to:"/",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:"Personal Center"})]}),e.jsxs("div",{className:"profile-section",children:[e.jsx("div",{className:"avatar-container",children:e.jsx("div",{className:"avatar-ring",children:e.jsxs("div",{className:"avatar",children:[e.jsx("div",{className:"avatar-initial",children:N()}),e.jsx("div",{className:"sunglasses",children:e.jsx("i",{className:"fas fa-sunglasses"})})]})})}),e.jsx("div",{className:"username",children:(a==null?void 0:a.fullName)||(a==null?void 0:a.email)||"User"}),e.jsxs("div",{className:"user-id",children:["ID: ",(a==null?void 0:a.id)||"N/A"]}),e.jsxs("div",{className:"certification-status",children:[e.jsxs("div",{className:`status-badge ${C()?"pulse":""}`,children:[e.jsx("i",{className:`${k()} status-icon`}),y()]}),e.jsx("button",{className:"verify-button",onClick:v,disabled:S(),children:j()})]})]})]}),e.jsx("div",{className:"content-card",children:e.jsx("ul",{className:"menu-list",children:w.map((i,c)=>E(i,c))})}),e.jsx("style",{children:`
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
