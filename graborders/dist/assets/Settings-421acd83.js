import{i as a,j as e,L as s,a7 as v}from"./index-3c6c971f.js";import j from"./Currency-ace0af39.js";import{I as N}from"./I18nSelect-e341f8af.js";import{u as w}from"./useDispatch-55cc451c.js";const y=()=>{const o=localStorage.getItem("selectedCurrency");return o?JSON.parse(o):{code:"USD",symbol:"$"}},C=o=>{localStorage.setItem("selectedCurrency",JSON.stringify(o))},S={USD:"$",EUR:"€",GBP:"£",JPY:"¥",CNY:"¥",AUD:"A$",CAD:"C$",CHF:"CHF",HKD:"HK$",SGD:"S$"};function I(){const o=w(),[d,i]=a.useState(!1),[p,r]=a.useState(!1),[n,x]=a.useState(()=>y()),m=a.useMemo(()=>`${n.code} [${n.symbol}]`,[n]),g=()=>{o(v.doSignout())},h=t=>{const l={code:t.code,symbol:t.symbol||S[t.code]||t.code};C(l),x(l),i(!1)},f=()=>{i(!0)},u=()=>{i(!1)},b=()=>{r(!0)},c=()=>{r(!1)};return e.jsxs("div",{className:"settings-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(s,{to:"/profile",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:"Settings"})]})}),e.jsxs("div",{className:"content-card",children:[e.jsxs("div",{className:"settings-options",children:[e.jsx("div",{className:"settings-option remove_blue",onClick:b,children:e.jsxs("div",{className:"option-content-wrapper",children:[e.jsx("div",{className:"option-icon",children:e.jsx("i",{className:"fas fa-language"})}),e.jsx("div",{className:"option-content",children:e.jsx("div",{className:"option-title",children:"Language"})}),e.jsx("div",{className:"option-arrow",children:e.jsx("i",{className:"fas fa-chevron-right"})})]})}),e.jsx("div",{className:"settings-option remove_blue",onClick:f,children:e.jsxs("div",{className:"option-content-wrapper",children:[e.jsx("div",{className:"option-icon",children:e.jsx("i",{className:"fas fa-dollar-sign"})}),e.jsx("div",{className:"option-content",children:e.jsxs("div",{className:"option-title",children:["Quotation currency ",m]})}),e.jsx("div",{className:"option-arrow",children:e.jsx("i",{className:"fas fa-chevron-right"})})]})}),e.jsx(s,{to:"/color-config",className:"settings-option remove_blue",children:e.jsxs("div",{className:"option-content-wrapper",children:[e.jsx("div",{className:"option-icon",children:e.jsx("i",{className:"fas fa-palette"})}),e.jsx("div",{className:"option-content",children:e.jsx("div",{className:"option-title",children:"Color configuration"})}),e.jsx("div",{className:"option-arrow",children:e.jsx("i",{className:"fas fa-chevron-right"})})]})}),e.jsx(s,{to:"/about",className:"settings-option remove_blue",children:e.jsxs("div",{className:"option-content-wrapper",children:[e.jsx("div",{className:"option-icon",children:e.jsx("i",{className:"fas fa-info-circle"})}),e.jsx("div",{className:"option-content",children:e.jsx("div",{className:"option-title",children:"About us"})}),e.jsx("div",{className:"option-arrow",children:e.jsx("i",{className:"fas fa-chevron-right"})})]})}),e.jsx("div",{className:"settings-option version-option",children:e.jsxs("div",{className:"option-content-wrapper",children:[e.jsx("div",{className:"option-icon",children:e.jsx("i",{className:"fas fa-code-branch"})}),e.jsx("div",{className:"option-content",children:e.jsx("div",{className:"option-title",children:"Version number 1.0.0"})})]})})]}),e.jsx("div",{className:"signout-section",children:e.jsxs("button",{className:"signout-button",onClick:g,children:[e.jsx("i",{className:"fas fa-sign-out-alt"}),"Sign Out"]})})]}),e.jsx(j,{isOpen:d,onClose:u,selectedCurrency:n,onSelectCurrency:h}),p&&e.jsx("div",{className:"modal-overlay",onClick:c,children:e.jsxs("div",{className:"modal-container-bottom",onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"modal-header-bottom",children:[e.jsx("div",{className:"modal-drag-handle"}),e.jsxs("div",{className:"modal-title-wrapper",children:[e.jsx("div",{className:"modal-title",children:"Select Language"}),e.jsx("button",{className:"modal-close-btn-bottom",onClick:c,children:e.jsx("i",{className:"fas fa-times"})})]})]}),e.jsx("div",{className:"modal-content-bottom",children:e.jsx(N,{isInModal:!0})})]})}),e.jsx("style",{children:`
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

        .settings-container {
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

        /* Content Card - Matching Profile Page */
        .content-card {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 20px;
          box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.05);
          min-height: calc(100vh - 60px);
          display: flex;
          flex-direction: column;
        }

        .settings-options {
          flex: 1;
        }

        .settings-option {
          display: block;
          text-decoration: none;
          color: inherit;
          margin-bottom: 12px;
          cursor: pointer;
        }

        .settings-option:last-child {
          margin-bottom: 0;
        }

        .option-content-wrapper {
          display: flex;
          align-items: center;
          padding: 12px;
          border: 1px solid #e7eaee;
          border-radius: 7px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          background: #fff;
        }

        .settings-option:hover .option-content-wrapper {
          transform: translateY(-2px);
          border-color: #106cf5;
          box-shadow: 0 4px 12px rgba(16, 108, 245, 0.1);
        }

        .version-option .option-content-wrapper {
          cursor: default;
        }

        .version-option:hover .option-content-wrapper {
          transform: none;
          border-color: #e7eaee;
          box-shadow: none;
        }

        .option-icon {
          margin-right: 16px;
          font-size: 18px;
          color: #666;
          width: 24px;
          text-align: center;
        }

        .option-content {
          flex: 1;
        }

        .option-title {
          font-size: 14px;
          font-weight: 500;
          color: #222;
        }

        .option-arrow {
          color: #ccc;
          font-size: 12px;
          margin-left: 12px;
          transition: transform 0.3s ease;
        }

        .settings-option:hover .option-arrow {
          color: #106cf5;
          transform: translateX(3px);
        }

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

        /* Modal Styles */
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

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .settings-container {
            padding: 0;
          }

          .header {
            padding: 16px;
            min-height: 50px;
          }

          .content-card {
            padding: 16px;
          }

          .option-content-wrapper {
            padding: 10px;
          }

          .option-icon {
            font-size: 16px;
            margin-right: 12px;
          }

          .option-title {
            font-size: 13px;
          }

          .signout-button {
            padding: 10px;
            font-size: 13px;
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

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }
        }
      `})]})}export{I as default};
