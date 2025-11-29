import React from 'react'

function Home() {
  return (
    <>
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="logo">
            <i className="fas fa-coins logo-icon" />
            AureX
          </div>
          <div className="header-icons">
            <div className="icon-circle">
              <i className="far fa-envelope" />
            </div>
            <div className="icon-circle">
              <i className="far fa-user" />
            </div>
          </div>
        </div>
        {/* Hero Section */}
        <div className="hero-section">
          <div className="crypto-illustration">
            <div className="hand" />
            <div className="coin bitcoin">
              <i className="fab fa-bitcoin" />
            </div>
            <div className="coin ethereum">
              <i className="fab fa-ethereum" />
            </div>
          </div>
          <div className="slogan">Where Fortune Meets Precision</div>
        </div>
        {/* Promo Banner */}
        <div className="promo-banner">
          <div className="promo-text">
            To make financial more efficient and more freedom to wealth
          </div>
          <div className="pagination-dots">
            <div className="dot active" />
            <div className="dot" />
            <div className="dot" />
          </div>
        </div>
        {/* Announcement Card */}
        <div className="announcement-card">
          <div className="announcement-icon">
            <i className="fas fa-bullhorn" />
          </div>
          <div className="announcement-content">
            <div className="announcement-title">Maintenance notice</div>
            <div className="announcement-desc">
              Contract server upgrade and maintenance announcement on January 15,
              2023
            </div>
          </div>
        </div>
        {/* QuickTrade Card */}
        <div className="feature-card">
          <div className="quick-trade-header">
            <div>
              <div className="card-title">
                <span className="highlight">Quick</span>Trade
              </div>
              <div className="card-subtitle">
                Fast transactions and simple operation
              </div>
            </div>
            <div className="arrow-button">
              <i className="fas fa-arrow-right" />
            </div>
          </div>
        </div>
        {/* AI Trading Card */}
        <div className="ai-card">
          <div className="ai-title">AI Smart Trading</div>
          <div className="ai-description">
            An AI quantitative trading robot is an automated trading system that
            combines artificial intelligence (AI) with quantitative trading
            techniques. Its primary function is to automatically buy and sell
            financial products and cryptocurrencies based on market data and
            specific trading strategies to achieve stable profits or control risks.
          </div>
        </div>
        {/* Stats Section */}
        <div className="stats-section">
          <div className="section-title">Our Impact</div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">30M+</div>
              <div className="stat-label">Number of users</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">6000+</div>
              <div className="stat-label">Cooperating organization</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">7.8B+</div>
              <div className="stat-label">Liquidity</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">89M</div>
              <div className="stat-label">Orders processed per second</div>
            </div>
          </div>
        </div>
        {/* Services Section */}
        <div className="services-section">
          <div className="section-title">Our Services</div>
          <div className="services-grid">
            <div className="service-item">
              <div className="service-icon">
                <i className="fas fa-headset" />
              </div>
              <div className="service-title">24-hour service</div>
              <div className="service-desc">Ready to answer all your questions</div>
            </div>
            <div className="service-item">
              <div className="service-icon">
                <i className="fas fa-chart-line" />
              </div>
              <div className="service-title">High interest rate</div>
              <div className="service-desc">Finance, high return rate</div>
            </div>
            <div className="service-item">
              <div className="service-icon">
                <i className="fas fa-coins" />
              </div>
              <div className="service-title">Liquidity mining</div>
              <div className="service-desc">Liquidity makes easy profits</div>
            </div>
            <div className="service-item">
              <div className="service-icon">
                <i className="fas fa-file-contract" />
              </div>
              <div className="service-title">High contract</div>
              <div className="service-desc">
                Small capital high lever, rich easily
              </div>
            </div>
            <div className="service-item">
              <div className="service-icon">
                <i className="fas fa-users" />
              </div>
              <div className="service-title">Expert team</div>
              <div className="service-desc">
                Expert technical team at your service
              </div>
            </div>
            <div className="service-item">
              <div className="service-icon">
                <i className="fas fa-shield-alt" />
              </div>
              <div className="service-title">Security protection</div>
              <div className="service-desc">
                Powerful cloud data protect your security
              </div>
            </div>
          </div>
        </div>
        {/* News Section */}
        <div className="news-section">
          <div className="section-title">News from the circle</div>
          <div className="news-item">
            <div className="news-date">10-14-2025</div>
            <div className="news-title">
              Elon Musk Says Bitcoin Is Based on Energy, Which Is Impossible to Fake
            </div>
          </div>
          <div className="news-item">
            <div className="news-date">10-5-2025</div>
            <div className="news-title">
              Bitcoin Touches Record Price Above $125,000
            </div>
          </div>
          <div className="news-item">
            <div className="news-date">9-17-2025</div>
            <div className="news-title">
              Giant Trump statue holding Bitcoin displayed outside US Capitol to
              mark Fed rate decision
            </div>
          </div>
        </div>
        {/* Partners Section */}
        <div className="partners-section">
          <div className="partners-title">World Ecological Partner</div>
          <div className="partners-grid">
            <div className="partner-item">Binance</div>
            <div className="partner-item">Coinbase</div>
            <div className="partner-item">Kraken</div>
            <div className="partner-item">FTX</div>
            <div className="partner-item">Bitfinex</div>
            <div className="partner-item">Huobi</div>
          </div>
        </div>
        {/* CTA Section */}
        <div className="cta-section">
          <div className="cta-title">Start trading cryptocurrency?</div>
          <div className="cta-subtitle">Open your cryptocurrency account now</div>
          <div className="cta-buttons">
            <div className="cta-button">
              <i className="fab fa-android" />
              <span>Android</span>
            </div>
            <div className="cta-button">
              <i className="fab fa-apple" />
              <span>IOS</span>
            </div>
          </div>
        </div>
      </div>
      <style>{`
   
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
            gap: 16px;
        }

        .icon-circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            color: #555;
            font-size: 18px;
        }

        /* Hero Section */
        .hero-section {
            text-align: center;
            margin: 20px 0 30px;
        }

        .crypto-illustration {
            width: 100%;
            max-width: 280px;
            height: 200px;
            margin: 0 auto 20px;
            background: linear-gradient(135deg, #106cf5 0%, #0a4fc4 100%);
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
        }

        /* Promo Banner */
        .promo-banner {
            background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            color: white;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
        }

        .promo-banner::before {
            content: "";
            position: absolute;
            top: -50%;
            right: -20%;
            width: 150px;
            height: 150px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
        }

        .promo-banner::after {
            content: "";
            position: absolute;
            bottom: -30%;
            left: -10%;
            width: 120px;
            height: 120px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 50%;
        }

        .promo-text {
            font-size: 16px;
            font-weight: 500;
            line-height: 1.4;
            position: relative;
            z-index: 2;
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
            background: rgba(255, 255, 255, 0.4);
        }

        .dot.active {
            background: #106cf5;
            width: 20px;
            border-radius: 3px;
        }

        /* Announcement Card */
        .announcement-card {
            background: white;
            border-radius: 16px;
            padding: 16px;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
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
            background: white;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .quick-trade-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
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
            background: white;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .ai-title {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 12px;
            color: #222;
        }

        .ai-description {
            font-size: 15px;
            color: #555;
            line-height: 1.5;
        }

        /* Stats Section */
        .stats-section {
            background: white;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .section-title {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 20px;
            text-align: center;
            color: #222;
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
            background: white;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .services-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }

        .service-item {
            text-align: center;
            padding: 16px;
            background: #f8f9fa;
            border-radius: 12px;
        }

        .service-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #106cf5;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 10px;
            font-size: 18px;
        }

        .service-title {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 4px;
        }

        .service-desc {
            font-size: 12px;
            color: #666;
        }

        /* News Section */
        .news-section {
            background: white;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .news-item {
            padding: 12px 0;
            border-bottom: 1px solid #f1f3f4;
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
        }

        /* Partners Section */
        .partners-section {
            background: white;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .partners-title {
            font-size: 16px;
            font-weight: 600;
            text-align: center;
            margin-bottom: 16px;
            color: #222;
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
            background: white;
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
        }
      `}</style>



    </>

  )
}

export default Home