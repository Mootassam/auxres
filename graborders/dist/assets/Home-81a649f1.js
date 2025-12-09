import{i as c,j as e,L as t}from"./index-0794a010.js";function d(){const[n,r]=c.useState(0),s=["./images/slides/1.png","./images/slides/2.png","./images/slides/3.png"];return c.useEffect(()=>{const a=setInterval(()=>{r(i=>(i+1)%s.length)},3e3);return()=>clearInterval(a)},[s.length]),e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"container background",children:[e.jsxs("div",{className:"hero-section",children:[e.jsxs("div",{className:"header",children:[e.jsx("div",{className:"logo",children:e.jsx("img",{src:"./images/logo.png",style:{height:"32px"},alt:"Logo"})}),e.jsxs("div",{className:"header-icons",children:[e.jsx(t,{to:"/notification",className:"icon-circle",children:e.jsx("div",{className:"icon-circle",children:e.jsx("i",{className:"far fa-envelope"})})}),e.jsx(t,{to:"/profile",className:"icon-circle",children:e.jsx("i",{className:"far fa-user"})})]})]}),e.jsx("div",{className:"crypto-illustration",children:e.jsx("img",{src:"./images/header.png",alt:"Crypto Illustration",style:{height:"100%",width:"100%",objectFit:"contain"}})}),e.jsx("div",{className:"slogan",children:"Where Fortune Meets Precision"})]}),e.jsxs("div",{style:{padding:"0px 16px"},children:[e.jsx("div",{className:"promo-banner",children:e.jsxs("div",{className:"slider-container",children:[e.jsx("div",{className:"slides-wrapper",style:{transform:`translateX(-${n*100}%)`,transition:"transform 0.5s ease-in-out"},children:s.map((a,i)=>e.jsx("div",{className:"slide",children:e.jsx("img",{src:a,alt:`Promo ${i+1}`,className:"promo__images"})},i))}),e.jsx("div",{className:"pagination-dots",children:s.map((a,i)=>e.jsx("div",{className:`dot ${i===n?"active":""}`,onClick:()=>r(i)},i))})]})}),e.jsxs("div",{className:"announcement-card",children:[e.jsx("div",{className:"announcement-icon",children:e.jsx("i",{className:"fas fa-bullhorn"})}),e.jsxs("div",{className:"announcement-content",children:[e.jsx("div",{className:"announcement-title",children:"Maintenance notice"}),e.jsx("div",{className:"announcement-desc",children:"Contract server upgrade and maintenance announcement on January 15, 2023"})]})]}),e.jsx(t,{to:"/trade",className:"remove_blue",children:e.jsx("div",{className:"feature-card",children:e.jsxs("div",{className:"quick-trade-header",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"card-title",children:[e.jsx("span",{className:"highlight",children:"Quick"}),"Trade"]}),e.jsx("div",{className:"card-subtitle",children:"Fast transactions and simple operation"})]}),e.jsx("div",{className:"arrow-button",children:e.jsx("i",{className:"fas fa-arrow-right"})})]})})}),e.jsxs("div",{className:"ai-card",children:[e.jsx("div",{className:"ai-title",children:"AI Smart Trading"}),e.jsx("div",{className:"ai-description",children:"An AI quantitative trading robot is an automated trading system that combines artificial intelligence (AI) with quantitative trading techniques. Its primary function is to automatically buy and sell financial products and cryptocurrencies based on market data and specific trading strategies to achieve stable profits or control risks."})]}),e.jsxs("div",{className:"ai-card2",children:[e.jsx("div",{className:"ai-title",children:"Explore NFTs with AureX"}),e.jsx("div",{className:"ai-description",children:"Step into the world of NFTs with AureX, your all-in-one digital asset trading wallet. Designed for both beginners and professional traders, AureX lets you explore, buy, sell,and"})]}),e.jsxs("div",{className:"stats-section",children:[e.jsx("div",{className:"section-title",children:"Our Impact"}),e.jsxs("div",{className:"stats-grid",children:[e.jsxs("div",{className:"stat-item",children:[e.jsx("div",{className:"stat-value",children:"30M+"}),e.jsx("div",{className:"stat-label",children:"Number of users"})]}),e.jsxs("div",{className:"stat-item",children:[e.jsx("div",{className:"stat-value",children:"6000+"}),e.jsx("div",{className:"stat-label",children:"Cooperating organization"})]}),e.jsxs("div",{className:"stat-item",children:[e.jsx("div",{className:"stat-value",children:"7.8B+"}),e.jsx("div",{className:"stat-label",children:"Liquidity"})]}),e.jsxs("div",{className:"stat-item",children:[e.jsx("div",{className:"stat-value",children:"89M"}),e.jsx("div",{className:"stat-label",children:"Orders processed per second"})]})]})]}),e.jsxs("div",{className:"services-section",children:[e.jsx("div",{className:"section-title",children:"Our Services"}),e.jsx("div",{className:"section-subtitle",children:"Provide you with comprehensive 24-hour manual customer service specialist services to protect your transactions"}),e.jsxs("div",{className:"services-grid",children:[e.jsxs("div",{className:"service-item",children:[e.jsx("div",{className:"service-icon",children:e.jsx("img",{src:"./images/services/s1.png",className:"service__image",alt:"High interest rate"})}),e.jsxs("div",{className:"service__description",children:[e.jsx("div",{className:"service-title",children:"High interest rate"}),e.jsx("div",{className:"service-desc",children:"Finance, high return rate"})]})]}),e.jsxs("div",{className:"service-item",children:[e.jsx("div",{className:"service-icon",children:e.jsx("img",{src:"./images/services/s2.png",alt:"Liquidity mining",className:"service__image"})}),e.jsxs("div",{className:"service__description",children:[e.jsx("div",{className:"service-title",children:"Liquidity mining"}),e.jsx("div",{className:"service-desc",children:"Liquidity makes easy profits"})]})]}),e.jsxs("div",{className:"service-item",children:[e.jsx("div",{className:"service-icon",children:e.jsx("img",{src:"./images/services/s3.png",alt:"24-hour service",className:"service__image"})}),e.jsxs("div",{className:"service__description",children:[e.jsx("div",{className:"service-title",children:"24-hour service"}),e.jsx("div",{className:"service-desc",children:"Ready to answer all your questions"})]})]}),e.jsxs("div",{className:"service-item",children:[e.jsx("div",{className:"service-icon",children:e.jsx("img",{src:"./images/services/s4.png",alt:"High contract",className:"service__image"})}),e.jsxs("div",{className:"service__description",children:[e.jsx("div",{className:"service-title",children:"High contract"}),e.jsx("div",{className:"service-desc",children:"Small capital high lever, rich easily"})]})]}),e.jsxs("div",{className:"service-item",children:[e.jsx("div",{className:"service-icon",children:e.jsx("img",{src:"./images/services/s5.png",alt:"Expert team",className:"service__image"})}),e.jsxs("div",{className:"service__description",children:[e.jsx("div",{className:"service-title",children:"Expert team"}),e.jsx("div",{className:"service-desc",children:"Expert technical team at your service"})]})]}),e.jsxs("div",{className:"service-item",children:[e.jsx("div",{className:"service-icon",children:e.jsx("img",{src:"./images/services/s6.png",alt:"Security protection",className:"service__image"})}),e.jsxs("div",{className:"service__description",children:[e.jsx("div",{className:"service-title",children:"Security protection"}),e.jsx("div",{className:"service-desc",children:"Powerful cloud data protect your security"})]})]})]})]}),e.jsxs("div",{className:"demo-section",children:[e.jsx("div",{className:"section-title",children:"Fast swap Swap your coins without any worries"}),e.jsx("div",{className:"section-subtitle",children:"From Bitcoin to Dogecoin, we make buying and selling crypto easy. Protect your crypto with best-in-class cold storage."}),e.jsx("div",{className:"demo-photo",children:e.jsx("img",{src:"./images/demo/phone1.png",alt:"Fast swap demo",className:"image_demo"})})]}),e.jsxs("div",{className:"demo-section",children:[e.jsx("div",{className:"section-title",children:"For advanced traders Powerful tools for design"}),e.jsx("div",{className:"section-subtitle",children:"Powerful analytical tools coupled with our security guarantee provide the ultimate trading experience. Take advantage of sophisticated charting capabilities, real-time order books and deep liquidity on hundreds of markets."}),e.jsx("div",{className:"demo-photo",children:e.jsx("img",{src:"./images/demo/phone2.png",alt:"Advanced traders demo",className:"image_demo"})})]}),e.jsxs("div",{className:"demo-section",children:[e.jsx("div",{className:"section-title",children:"Smart asset wallet management Steady growth in revenue"}),e.jsx("div",{className:"section-subtitle",children:"Powerful analytical tools coupled with our security guarantee provide the ultimate trading experience. Take advantage of sophisticated charting capabilities, real-time order books and deep liquidity on hundreds of markets."}),e.jsx("div",{className:"demo-photo",children:e.jsx("img",{src:"./images/demo/phone3.png",alt:"Wallet management demo",className:"image_demo"})})]}),e.jsxs("div",{className:"demo-section",children:[e.jsx("div",{className:"section-title",children:"Liquidity mining, AI quantification"}),e.jsx("div",{className:"section-subtitle",children:"More ways to manage your assets, including liquidity mining and AI quantification, give you more choices for managing your assets and keep your assets growing"}),e.jsx("div",{className:"demo-photo",children:e.jsx("img",{src:"./images/demo/phone4.png",alt:"Liquidity mining demo",className:"image_demo"})})]}),e.jsxs("div",{className:"demo-section",children:[e.jsx("div",{className:"section-title",children:"Start trading cryptocurrency? Open your cryptocurrency now"}),e.jsx("div",{className:"section-subtitle",children:"Trade anytime and anywhere to meet the trading needs of various scenarios at any time"}),e.jsx("div",{className:"demo-photo",children:e.jsx("img",{src:"./images/demo/phone5.png",alt:"Start trading demo",className:"image_demo"})})]}),e.jsxs("div",{className:"news-section",children:[e.jsx("div",{className:"section-title",children:"News from the circle"}),e.jsxs("div",{className:"news-item",children:[e.jsxs("div",{children:[e.jsx("div",{className:"news-date",children:"10-14-2025"}),e.jsx("div",{className:"news-title",children:"Elon Musk Says Bitcoin Is Based on Energy, Which Is Impossible to Fake"})]}),e.jsx("div",{children:e.jsx("img",{src:"./images/news/elon.jpg",alt:"Elon Musk news",style:{width:"128px",height:"72px",objectFit:"cover"}})})]}),e.jsxs("div",{className:"news-item",children:[e.jsxs("div",{children:[e.jsx("div",{className:"news-date",children:"10-5-2025"}),e.jsx("div",{className:"news-title",children:"Bitcoin Touches Record Price Above $125,000"})]}),e.jsx("div",{children:e.jsx("img",{src:"./images/news/bitcoin.jpg",alt:"Bitcoin news",style:{width:"128px",height:"72px",objectFit:"cover"}})})]}),e.jsxs("div",{className:"news-item",children:[e.jsxs("div",{children:[e.jsx("div",{className:"news-date",children:"9-17-2025"}),e.jsx("div",{className:"news-title",children:"Giant Trump statue holding Bitcoin displayed outside US Capitol to mark Fed rate decision"})]}),e.jsx("img",{src:"./images/news/trump.jpg",alt:"Trump statue news",style:{width:"128px",height:"72px",objectFit:"cover"}}),e.jsx("div",{})]})]}),e.jsxs("div",{className:"partners-section",children:[e.jsx("div",{className:"partners-title",children:"World Ecological Partner"}),e.jsx("p",{className:"description__t",children:"Build consensus and create a new future for the crypto ecosystem"}),e.jsxs("div",{className:"partners-grid",children:[e.jsx("div",{className:"partner-item",children:"Binance"}),e.jsx("div",{className:"partner-item",children:"Coinbase"}),e.jsx("div",{className:"partner-item",children:"Kraken"}),e.jsx("div",{className:"partner-item",children:"FTX"}),e.jsx("div",{className:"partner-item",children:"Bitfinex"}),e.jsx("div",{className:"partner-item",children:"Huobi"})]})]})]})]}),e.jsx("style",{children:`
        .promo__images { 
            width: 100%;
            object-fit: cover;
            display: block;
        }

        .description__t {
            font-size: 10px;
            color: #888f99;
            margin-top: 10px;
            text-align: center;
        }

        .demo-photo { 
            display: flex;  
            justify-content: center;
        }

        .image_demo { 
            width: 70%;
            max-width: 300px;
        }

        .service__image { 
            width: 50px;
            height: 50px;
            object-fit: contain;
        }

        .service__description { 
            display: flex;
            flex-direction: column;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 0;
        }

        .logo {
            font-size: 24px;
            font-weight: 800;
            color: #106cf5;
            display: flex;
            align-items: center;
        }

        .logo-icon {
            margin-right: 8px;
            font-size: 22px;
        }

        .header-icons {
            display: flex;
            gap: 10px;
            align-items: center;
        }

        .icon-circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 18px;
            background: rgba(255, 255, 255, 0.2);
            text-decoration: none;
            transition: background 0.3s ease;
        }

        .icon-circle:hover {
            background: rgba(255, 255, 255, 0.3);
        }

        /* Hero Section */
        .hero-section {
            text-align: center;
            background: linear-gradient(rgb(16, 108, 245), rgb(242, 244, 247));
            padding: 0px 10px;
        }

        .crypto-illustration {
            width: 100%;
            max-width: 280px;
            height: 200px;
            margin: 0 auto 20px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            box-shadow: 0 10px 20px rgba(16, 108, 245, 0.15);
        }

        .coin {
            position: absolute;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
            font-size: 24px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .bitcoin {
            background: linear-gradient(135deg, #F7931A 0%, #F15A24 100%);
            top: 30px;
            left: 50px;
            animation: float 4s ease-in-out infinite;
        }

        .ethereum {
            background: linear-gradient(135deg, #627EEA 0%, #8A63D2 100%);
            bottom: 40px;
            right: 50px;
            animation: float 4s ease-in-out infinite 1s;
        }

        .hand {
            position: absolute;
            bottom: 0;
            width: 120px;
            height: 100px;
            background: #FFD7B5;
            border-radius: 50% 50% 0 0;
            z-index: 2;
        }

        .slogan {
            color: #106cf5;
            font-size: 18px;
            font-weight: 600;
            margin-top: 10px;
            padding-bottom: 20px;
        }

        /* Promo Banner - Auto Slider */
        .promo-banner {
            color: white;
            position: relative;
        }

        .slider-container {
            position: relative;
            width: 100%;
            overflow: hidden;
            border-radius: 16px;
        }

        .slides-wrapper {
            display: flex;
            height: 100%;
        }

        .slide {
            width: 100%;
            height: 100%;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .pagination-dots {
            display: flex;
            justify-content: center;
            margin-top: 12px;
            gap: 6px;
        }

        .dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.2);
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .dot.active {
            background: #106cf5;
            width: 20px;
            border-radius: 3px;
        }

        /* Announcement Card */
        .announcement-card {
            background: #fff;
            border-radius: 16px;
            padding: 16px;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            margin-top:10px;
        }

        .announcement-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #f0f7ff;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #106cf5;
            margin-right: 12px;
            font-size: 18px;
        }

        .announcement-content {
            flex: 1;
        }

        .announcement-title {
            font-weight: 600;
            font-size: 15px;
            margin-bottom: 4px;
        }

        .announcement-desc {
            font-size: 13px;
            color: #666;
        }

        /* Feature Cards */
        .feature-card {
            background: #fff;
            border-radius: 16px;
            padding: 10px 20px;
            margin-bottom: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .quick-trade-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .card-title {
            font-size: 18px;
            font-weight: 700;
        }

        .highlight {
            color: #106cf5;
        }

        .card-subtitle {
            font-size: 14px;
            color: #666;
            margin-bottom: 12px;
        }

        .arrow-button {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #106cf5;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
        }

        .ai-card {
            background: #f2f4f7;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            background-image: url('./images/ai.png');
            background-size: cover;
            width: 100%;
            background-position: center;  
            background-repeat: no-repeat;
            height: 470px;
            display: flex;
            flex-direction: column;
        }

        .ai-card2 {
            background: #f2f4f7;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            background-image: url('./images/ai2.png');
            background-size: cover;
            width: 100%;
            background-position: center;  
            background-repeat: no-repeat;
            height: 470px;
            display: flex;
            flex-direction: column;
        }

        .ai-title {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 8px;
            color: #222;
        }

        .ai-description {
            font-size: 14px;
            color: #888f99;
        }

        /* Stats Section */
        .stats-section {
            background: #f2f4f7;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .section-title {
            font-size: 20px;
            font-weight: 700;
            color: #222;
            margin-bottom: 10px;
        }

        .section-subtitle {
            font-size: 12px;
            color: #888f99;
            margin-top: 5px;
            margin-bottom: 25px;
            line-height: 1.4;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }

        .stat-item {
            text-align: center;
            padding: 16px;
            background: #f8f9fa;
            border-radius: 12px;
        }

        .stat-value {
            font-size: 20px;
            font-weight: 700;
            color: #106cf5;
            margin-bottom: 4px;
        }

        .stat-label {
            font-size: 14px;
            color: #666;
        }

        /* Services Section */
        .services-section {
            padding: 20px;
        }

        .demo-section {
            padding: 0 20px;
            margin-bottom: 30px;
        }

        .services-grid {
            display: flex;
            align-items: left;
            flex-direction: column;
            gap: 16px;
        }

        .service-item {
            gap: 12px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #e7eaee;
            padding-bottom: 15px;
        }

        .service-item:last-child {
            border-bottom: none;
        }

        .service-icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #f0f7ff;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            flex-shrink: 0;
        }

        .service-title {
            font-size: 14px;
            font-weight: 600;
        }

        .service-desc {
            font-size: 10px;
            color: #666;
        }

        /* News Section */
        .news-section {
            background: #f2f4f7;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .news-item {
            padding: 12px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e7eaee;
        }

        .news-item:last-child {
            border-bottom: none;
        }

        .news-date {
            font-size: 12px;
            color: #106cf5;
            margin-bottom: 4px;
        }

        .news-title {
            font-size: 15px;
            font-weight: 500;
            line-height: 1.3;
        }

        /* Partners Section */
        .partners-section {
            background: #f2f4f7;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .partners-title {
            font-size: 20px;
            font-weight: 600;
            text-align: center;
            color: #106cf5;
            margin-bottom: 10px;
        }

        .partners-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 12px;
        }

        .partner-item {
            height: 60px;
            background: #f8f9fa;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            color: #555;
            font-size: 14px;
        }

        /* CTA Section */
        .cta-section {
            background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
            border-radius: 16px;
            padding: 30px 20px;
            margin-bottom: 20px;
            color: white;
            text-align: center;
            box-shadow: 0 6px 15px rgba(16, 108, 245, 0.2);
        }

        .cta-title {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 12px;
        }

        .cta-subtitle {
            font-size: 16px;
            margin-bottom: 20px;
            opacity: 0.9;
        }

        .cta-buttons {
            display: flex;
            justify-content: center;
            gap: 12px;
        }

        .cta-button {
            padding: 10px 20px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        /* Navigation Bar */
        .nav-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #f2f4f7;
            display: flex;
            justify-content: space-around;
            padding: 12px 0;
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            z-index: 100;
            max-width: 400px;
            margin: 0 auto;
        }

        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #8e8e93;
            font-size: 12px;
            transition: color 0.2s;
        }

        .nav-item.active {
            color: #106cf5;
        }

        .nav-icon {
            font-size: 20px;
            margin-bottom: 4px;
        }

        /* Animations */
        @keyframes float {
            0% {
                transform: translateY(0) rotate(0deg);
            }
            50% {
                transform: translateY(-10px) rotate(5deg);
            }
            100% {
                transform: translateY(0) rotate(0deg);
            }
        }

        /* Responsive adjustments */
        @media (max-width: 380px) {
            .container {
                padding: 0 12px;
            }
            
            .crypto-illustration {
                height: 180px;
            }
            
            .coin {
                width: 50px;
                height: 50px;
                font-size: 20px;
            }
            
            .stats-grid, .services-grid {
                grid-template-columns: 1fr;
            }
            
            .promo__images {
                object-fit: contain;
            }
            
            .ai-card, .ai-card2 {
                height: 400px;
            }
        }
        
        @media (min-width: 768px) {
            .slider-container {
                max-width: 600px;
                margin: 0 auto;
            }
            
            .partners-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }
      `})]})}export{d as default};
