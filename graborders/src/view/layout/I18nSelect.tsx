import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getLanguages, getLanguageCode, i18n } from '../../i18n';
import actions from 'src/modules/layout/layoutActions';

function I18nSelect() {
  const [loadingLanguage, setLoadingLanguage] = useState(null);

  const doChangeLanguage = async (language) => {
    setLoadingLanguage(language);
    try {
      await actions.doChangeLanguage(language);
    } finally {
      setTimeout(() => {
        setLoadingLanguage(null);
      }, 300);
    }
  };

  return (
    <div className="i18n-container">
      {/* Header Section - Matching Profile Page */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/settings" className="back-arrow">
            <i className="fas fa-arrow-left"></i>
          </Link>
          <div className="page-title">{i18n('pages.language.selectLanguage')}</div>
        </div>
      </div>

      {/* Content Card - Matching Profile Page */}
      <div className="content-card">
        <div className="language-intro">
          <div className="language-icon">
            <i className="fas fa-language"></i>
          </div>
          <h2>{i18n('pages.language.choosePreferred')}</h2>
          <p>Select your preferred language for the application interface</p>
        </div>

        <div className="languages-list">
          {getLanguages().map((language) => {
            const isActive = getLanguageCode() === language.id;
            const isLoading = loadingLanguage === language.id;
            
            return (
              <div
                key={language.id}
                onClick={() => !isLoading && doChangeLanguage(language.id)}
                className={`language-item ${
                  isActive ? 'active' : ''
                } ${isLoading ? 'loading' : ''}`}
              >
                <div className="language-flag">
                  <img src={language.flag} alt={language.label} />
                </div>
                <div className="language-info">
                  <div className="language-name">{language.label}</div>
                  <div className="language-native">{language.nativeName || language.label}</div>
                </div>
                {isActive && !isLoading && (
                  <div className="selected-indicator">
                    <i className="fas fa-check"></i>
                  </div>
                )}
                {isLoading && (
                  <div className="loading-indicator">
                    <i className="fas fa-spinner fa-spin"></i>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="language-help">
          <p>
            <i className="fas fa-info-circle"></i>
            Changing the language will affect all text in the application
          </p>
        </div>
      </div>

      <style>{`
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
      `}</style>
    </div>
  );
}

export default I18nSelect;