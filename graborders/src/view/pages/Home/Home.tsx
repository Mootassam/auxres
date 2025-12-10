
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    './images/slides/1.png',
    './images/slides/2.png',
    './images/slides/3.png'
  ];

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [slides.length]);

  return (
    <>
      <div className="container background">
        {/* Header */}
        <div className="hero-section">
          <div className="header">
            <div className="logo">
              <img src='./images/logo.png' style={{ height: '32px' }} alt="Logo" />
            </div>
            <div className="header-icons">
              <Link to="/notification" className="icon-circle">
                <div className="icon-circle">
                  <i className="far fa-envelope" />
                </div>
              </Link>
              <Link to="/profile" className="icon-circle">
                <i className="far fa-user" />
              </Link>
            </div>
          </div>
          {/* Hero Section */}

          <div className="crypto-illustration">
            <img src="./images/header.png" alt="Crypto Illustration" style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
          </div>
          <div className="slogan">Profit With Confidence</div>
        </div>
        {/* Promo Banner - Auto Slider */}


        <div style={{ padding: '0px 16px' }}>




          <div className="promo-banner">
            <div className="slider-container">
              <div
                className="slides-wrapper"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                  transition: 'transform 0.5s ease-in-out'
                }}
              >
                {slides.map((slide, index) => (
                  <div key={index} className="slide">
                    <img
                      src={slide}
                      alt={`Promo ${index + 1}`}
                      className='promo__images'
                    />
                  </div>
                ))}
              </div>

              {/* Pagination Dots */}
              <div className="pagination-dots">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
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
          <Link to="/trade" className="remove_blue">
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
          </Link>

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

          <div className="ai-card2">
            <div className="ai-title">Explore NFTs with BINEX</div>
            <div className="ai-description">
              Step into the world of NFTs with BINEX, your all-in-one digital asset trading wallet. Designed for both beginners and professional traders, BINEX lets you explore, buy, sell,and
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
            <div className='section-subtitle'>Provide you with comprehensive 24-hour manual customer service specialist services to protect your transactions</div>
            <div className="services-grid">

              <div className="service-item">
                <div className="service-icon">
                  <img src="./images/services/s1.png" className='service__image' alt="High interest rate" />
                </div>
                <div className="service__description">
                  <div className="service-title">High interest rate</div>
                  <div className="service-desc">Finance, high return rate</div>
                </div>
              </div>

              <div className="service-item">
                <div className="service-icon">
                  <img src="./images/services/s2.png" alt="Liquidity mining" className='service__image' />
                </div>
                <div className="service__description">
                  <div className="service-title">Liquidity mining</div>
                  <div className="service-desc">Liquidity makes easy profits</div>
                </div>
              </div>

              <div className="service-item">
                <div className="service-icon">
                  <img src="./images/services/s3.png" alt="24-hour service" className='service__image' />
                </div>
                <div className="service__description">
                  <div className="service-title">24-hour service</div>
                  <div className="service-desc">Ready to answer all your questions</div>
                </div>
              </div>

              <div className="service-item">
                <div className="service-icon">
                  <img src="./images/services/s4.png" alt="High contract" className='service__image' />
                </div>
                <div className="service__description">
                  <div className="service-title">High contract</div>
                  <div className="service-desc">Small capital high lever, rich easily</div>
                </div>
              </div>

              <div className="service-item">
                <div className="service-icon">
                  <img src="./images/services/s5.png" alt="Expert team" className='service__image' />
                </div>
                <div className="service__description">
                  <div className="service-title">Expert team</div>
                  <div className="service-desc">Expert technical team at your service</div>
                </div>
              </div>

              <div className="service-item">
                <div className="service-icon">
                  <img src="./images/services/s6.png" alt="Security protection" className='service__image' />
                </div>
                <div className="service__description">
                  <div className="service-title">Security protection</div>
                  <div className="service-desc">Powerful cloud data protect your security</div>
                </div>
              </div>
            </div>
          </div>
          <div className="demo-section">
            <div className="section-title">Fast swap
              Swap your coins without any worries</div>
            <div className='section-subtitle'>From Bitcoin to Dogecoin, we make buying and selling crypto easy. Protect your crypto with best-in-class cold storage.</div>
            <div className="demo-photo">
              <img src="./images/demo/phone1.png" alt="Fast swap demo" className='image_demo' />
            </div>
          </div>

          <div className="demo-section">
            <div className="section-title">For advanced traders
              Powerful tools for design</div>
            <div className='section-subtitle'>Powerful analytical tools coupled with our security guarantee provide the ultimate trading experience. Take advantage of sophisticated charting capabilities, real-time order books and deep liquidity on hundreds of markets.</div>
            <div className="demo-photo">
              <img src="./images/demo/phone2.png" alt="Advanced traders demo" className='image_demo' />
            </div>
          </div>

          <div className="demo-section">
            <div className="section-title">Smart asset wallet management
              Steady growth in revenue</div>
            <div className='section-subtitle'>Powerful analytical tools coupled with our security guarantee provide the ultimate trading experience. Take advantage of sophisticated charting capabilities, real-time order books and deep liquidity on hundreds of markets.</div>
            <div className="demo-photo">
              <img src="./images/demo/phone3.png" alt="Wallet management demo" className='image_demo' />
            </div>
          </div>

          <div className="demo-section">
            <div className="section-title">Liquidity mining, AI quantification</div>
            <div className='section-subtitle'>More ways to manage your assets, including liquidity mining and AI quantification, give you more choices for managing your assets and keep your assets growing</div>
            <div className="demo-photo">
              <img src="./images/demo/phone4.png" alt="Liquidity mining demo" className='image_demo' />
            </div>
          </div>

          <div className="demo-section">
            <div className="section-title">Start trading cryptocurrency?
              Open your cryptocurrency now</div>
            <div className='section-subtitle'>Trade anytime and anywhere to meet the trading needs of various scenarios at any time
            </div>
            <div className="demo-photo">
              <img src="./images/demo/phone5.png" alt="Start trading demo" className='image_demo' />
            </div>
          </div>

          {/* News Section */}
          <div className="news-section">
            <div className="section-title">News from the circle</div>
            <div className="news-item">
              <div>
                <div className="news-date">10-14-2025</div>
                <div className="news-title">
                  Elon Musk Says Bitcoin Is Based on Energy, Which Is Impossible to Fake
                </div>
              </div>
              <div>
                <img src="./images/news/elon.jpg" alt="Elon Musk news" style={{ width: "128px", height: "72px", objectFit: "cover" }} />
              </div>
            </div>
            <div className="news-item">
              <div>
                <div className="news-date">10-5-2025</div>
                <div className="news-title">
                  Bitcoin Touches Record Price Above $125,000
                </div>
              </div>
              <div>
                <img src="./images/news/bitcoin.jpg" alt="Bitcoin news" style={{ width: "128px", height: "72px", objectFit: "cover" }} />
              </div>
            </div>
            <div className="news-item">
              <div>
                <div className="news-date">9-17-2025</div>
                <div className="news-title">
                  Giant Trump statue holding Bitcoin displayed outside US Capitol to
                  mark Fed rate decision
                </div>
              </div>
              <img src="./images/news/trump.jpg" alt="Trump statue news" style={{ width: "128px", height: "72px", objectFit: "cover" }} />
              <div></div>
            </div>
          </div>

          {/* Partners Section */}
          <div className="partners-section">
            <div className="partners-title">World Ecological Partner</div>
            <p className='description__t'>
              Build consensus and create a new future for the crypto ecosystem
            </p>
            <div className="partners-grid">
              <div className="partner-item">Binance</div>
              <div className="partner-item">Coinbase</div>
              <div className="partner-item">Kraken</div>
              <div className="partner-item">FTX</div>
              <div className="partner-item">Bitfinex</div>
              <div className="partner-item">Huobi</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
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
        background: linear-gradient(180deg, #0c396c, #0a66ff, #f2f4f7);


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
      `}</style>
    </>
  )
}

export default Home