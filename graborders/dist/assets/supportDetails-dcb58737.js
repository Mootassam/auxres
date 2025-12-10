import{S as l,i as n,j as e,L as h}from"./index-8ef7e624.js";function p(){const{id:a}=l(),[i,o]=n.useState(""),[s,r]=n.useState(""),c=[{id:"1",question:"About official accounts and demo accounts",answer:"Formal accounts can use all online functions of the platform, while demo accounts can only use some of the functions of the platform to a limited extent, cannot use liquidity mining to make profits, and cannot deposit and withdraw coins. (Demo accounts can receive fixed virtual funds once on the 1st of each month)"},{id:"2",question:"What is transaction volume?",answer:"According to the relevant provisions of the Anti-Money Laundering Law, each transaction requires price control, and a certain transaction volume must be completed before the currency can be withdrawn, so as to prevent users from laundering money on the exchange! For example, if you deposit 10,000U, the transaction amount must reach the relevant specified amount!"},{id:"3",question:"Why transfer funds?",answer:"In order to ensure the independence of funds between your various accounts and facilitate your reasonable risk control, the accounts of major trading modules are divided Transfer refers to the process of converting assets between various trading accounts. "},{id:"4",question:"What are Futures?",answer:"Futures, also known as futures, are a form of trading that spans time. Buyers and sellers sign a contract to agree to deliver a specified amount of spot goods at a specified time, price and other trading conditions. Futures are usually concentrated in futures exchanges and bought and sold with standardized contracts. The assets traded are usually commodities or financial instruments. The predetermined price that both parties agree to buy and sell an asset is called the forward price."},{id:"5",question:"Why does the converted amount in assets change?",answer:"The converted value in assets is the value of the digital currency currently held in USD. It changes due to the price fluctuations of digital assets, but the amount of your digital assets does not change."},{id:"6",question:"Why is real-name authentication required?",answer:"For the safety of your funds, we limit the association of your receiving account with the real-name information of your current account."},{id:"7",question:"What are frozen assets?",answer:"Frozen assets means that when you perform transactions or withdrawal operations, the process is not fully completed. The current assets are temporarily managed by the system and cannot be freely controlled by you. It does not mean that you have lost the asset or that something is abnormal with the asset. Please rest assured."},{id:"8",question:"What are the rules of futures trading?",answer:"Participate in transactions by estimating the next price trend (up or down) of the current trading pair. The range of the increase or decrease is not calculated during settlement, and only the income is calculated based on the result of the increase or decrease The profit percentages for settlement at different delivery times are different, and the profits will be accurately displayed in the trading interface."}];return n.useEffect(()=>{const t=c.find(d=>d.id===a);t&&(o(t.question),r(t.answer))},[a]),e.jsxs("div",{className:"helpcenterdetail-container",children:[e.jsx("div",{className:"header",children:e.jsxs("div",{className:"nav-bar",children:[e.jsx(h,{to:"/support",className:"back-arrow",children:e.jsx("i",{className:"fas fa-arrow-left"})}),e.jsx("div",{className:"page-title",children:"Help Center"})]})}),e.jsx("div",{className:"content-card",children:e.jsx("div",{className:"helpcenterdetail-content",children:i&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"question-title",children:i}),e.jsx("div",{className:"divider-line"}),e.jsx("div",{className:"answer-content",children:s})]})})}),e.jsx("style",{children:`
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

        .helpcenterdetail-container {
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
        }

        .helpcenterdetail-content {
          width: 100%;
        }

        .question-title {
          font-size: 16px;
          font-weight: 600;
          color: #222;
          line-height: 1.4;
          margin-bottom: 16px;
          padding-bottom: 12px;
        }

        .divider-line {
          height: 1px;
          background-color: #e7eaee;
          margin-bottom: 16px;
          width: 100%;
        }

        .answer-content {
          font-size: 13px;
          color: #555;
          line-height: 1.6;
          white-space: pre-line;
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
          .helpcenterdetail-container {
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

          .question-title {
            font-size: 15px;
            margin-bottom: 12px;
            padding-bottom: 10px;
          }

          .answer-content {
            font-size: 13px;
          }
        }

        @media (min-width: 768px) {
          .content-card {
            border-radius: 30px 30px 0 0;
          }

          .helpcenterdetail-content {
            max-width: 600px;
            margin: 0 auto;
          }

          .question-title {
            font-size: 17px;
          }

          .answer-content {
            font-size: 13px;
          }
        }
      `})]})}export{p as default};
