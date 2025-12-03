import{am as d,i as c,j as e,L as p,D as s,an as x,ao as f}from"./index-c64ab60b.js";const o="LAYOUT",n={MENU_TOGGLE:`${o}_MENU_TOGGLE`,MENU_HIDE:`${o}_MENU_HIDE`,MENU_SHOW:`${o}_MENU_SHOW`,MENU_SUBMENU:`${o}_SUBMENU_SHOW`,doChangeLanguage:i=>{d(i),window.location.reload()},doToggleMenu:()=>({type:n.MENU_TOGGLE}),doShowMenu:()=>({type:n.MENU_SHOW}),doHideMenu:()=>({type:n.MENU_HIDE}),dosubMenu:i=>({type:n.MENU_SUBMENU,payload:i})};function h(){const[i,r]=c.useState(null),g=async a=>{r(a);try{await n.doChangeLanguage(a)}finally{setTimeout(()=>{r(null)},300)}};return e.jsxs("div",{className:"i18n-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(p,{to:"/profile",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:s("pages.language.selectLanguage")})]})}),e.jsxs("div",{className:"content-card",children:[e.jsxs("div",{className:"language-intro",children:[e.jsx("div",{className:"language-icon",children:e.jsx("i",{className:"fas fa-language"})}),e.jsx("h2",{children:s("pages.language.choosePreferred")}),e.jsx("p",{children:"Select your preferred language for the application interface"})]}),e.jsx("div",{className:"languages-list",children:x().map(a=>{const l=f()===a.id,t=i===a.id;return e.jsxs("div",{onClick:()=>!t&&g(a.id),className:`language-item ${l?"active":""} ${t?"loading":""}`,children:[e.jsx("div",{className:"language-flag",children:e.jsx("img",{src:a.flag,alt:a.label})}),e.jsxs("div",{className:"language-info",children:[e.jsx("div",{className:"language-name",children:a.label}),e.jsx("div",{className:"language-native",children:a.nativeName||a.label})]}),l&&!t&&e.jsx("div",{className:"selected-indicator",children:e.jsx("i",{className:"fas fa-check"})}),t&&e.jsx("div",{className:"loading-indicator",children:e.jsx("i",{className:"fas fa-spinner fa-spin"})})]},a.id)})}),e.jsx("div",{className:"language-help",children:e.jsxs("p",{children:[e.jsx("i",{className:"fas fa-info-circle"}),"Changing the language will affect all text in the application"]})})]}),e.jsx("style",{children:`
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

        .i18n-container {
          max-width: 400px;
          margin: 0 auto;
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
        }

        /* Header Section - Matching Profile Page */
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
          margin-bottom: 20px;
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

        /* Content Card - Matching Profile Page */
        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 30px 20px 100px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
        }

        .language-intro {
          text-align: center;
          margin-bottom: 30px;
          padding: 0 10px;
        }

        .language-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e6f0ff 0%, #d0e2ff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: #106cf5;
          font-size: 36px;
          box-shadow: 0 8px 16px rgba(16, 108, 245, 0.15);
        }

        .language-intro h2 {
          font-size: 20px;
          font-weight: 700;
          color: #222;
          margin-bottom: 8px;
        }

        .language-intro p {
          font-size: 14px;
          color: #888f99;
          line-height: 1.4;
        }

        .languages-list {
          margin-bottom: 30px;
        }

        .language-item {
          display: flex;
          align-items: center;
          padding: 16px;
          background: #fff;
          border: 1px solid #e7eaee;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          margin-bottom: 12px;
          position: relative;
        }

        .language-item:hover {
          transform: translateY(-2px);
          border-color: #106cf5;
          box-shadow: 0 4px 12px rgba(16, 108, 245, 0.1);
        }

        .language-item.active {
          background: linear-gradient(135deg, #f0f7ff 0%, #e6f0ff 100%);
          border-color: #106cf5;
          border-width: 2px;
        }

        .language-item.loading {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .language-flag {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          overflow: hidden;
          margin-right: 16px;
          border: 2px solid #e7eaee;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .language-item.active .language-flag {
          border-color: #106cf5;
          box-shadow: 0 2px 8px rgba(16, 108, 245, 0.2);
        }

        .language-flag img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .language-info {
          flex: 1;
        }

        .language-name {
          font-size: 16px;
          font-weight: 600;
          color: #222;
          margin-bottom: 4px;
        }

        .language-native {
          font-size: 14px;
          color: #888f99;
        }

        .language-item.active .language-name {
          color: #106cf5;
        }

        .language-item.active .language-native {
          color: #666;
        }

        .selected-indicator {
          width: 24px;
          height: 24px;
          background: #106cf5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 12px;
          flex-shrink: 0;
        }

        .selected-indicator i {
          font-size: 12px;
          color: white;
        }

        .loading-indicator {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 12px;
          flex-shrink: 0;
        }

        .loading-indicator i {
          font-size: 16px;
          color: #106cf5;
        }

        .language-help {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          margin-top: 20px;
          border: 1px solid #e7eaee;
        }

        .language-help p {
          font-size: 14px;
          color: #666;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .language-help i {
          color: #106cf5;
          font-size: 16px;
        }

        /* Animations */
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(16, 108, 245, 0.4);
          }
          70% {
            box-shadow: 0 0 0 6px rgba(16, 108, 245, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(16, 108, 245, 0);
          }
        }

        .pulse {
          animation: pulse 2s infinite;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .i18n-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 25px 16px 100px;
          }

          .language-intro {
            margin-bottom: 20px;
          }

          .language-icon {
            width: 60px;
            height: 60px;
            font-size: 28px;
            margin-bottom: 16px;
          }

          .language-intro h2 {
            font-size: 18px;
          }

          .language-item {
            padding: 14px;
          }

          .language-flag {
            width: 40px;
            height: 40px;
            margin-right: 12px;
          }

          .language-name {
            font-size: 15px;
          }

          .language-native {
            font-size: 13px;
          }
        }

        @media (min-width: 768px) {
          .i18n-container {
            max-width: 400px;
          }

          .content-card {
            border-radius: 30px 30px 0 0;
          }

          .language-item {
            padding: 18px 20px;
          }
        }
      `})]})}function m(){return e.jsx(h,{})}export{m as default};
