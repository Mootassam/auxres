

import React, { useMemo, useEffect, useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authActions from "src/modules/auth/authActions";
import authSelectors from "src/modules/auth/authSelectors";
import kycSelectors from "src/modules/kyc/list/kycListSelectors";
import actions from "src/modules/kyc/list/kycListActions";
import { i18n } from "../../../i18n";

// Constants for menu items
const MENU_ITEMS = [

  {
    icon: "fas fa-cog",
    path: "/settings",
    name: "Preferences",
  },
  {
    icon: "fas fa-shield-alt",
    path: "/passwordtype",
    name: "Security center",
  },
  {
    icon: "fas fa-file-alt",
    path: "/transferAll",
    name: "Account change records",
  },

  {
    icon: "fas fa-comment-dots",
    path: "/online-service",
    name: "Online service",
  },
  {
    icon: "fas fa-building",
    path: "/about",
    name: "Platform introduction",
  },
  {
    icon: "fas fa-question-circle",
    path: "/support",
    name: "Help center",
  },
  {
    icon: "fas fa-download",
    path: "/download",
    name: "Download",
  },
  {
    icon: "fas fa-trash-alt",
    name: "Clear cache",
    type: "action",
  },
];

// Status constants for better maintainability
const VERIFICATION_STATUS = {
  PENDING: "pending",
  SUCCESS: "success",
  UNVERIFIED: "unverified",
};

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory(); // Add useHistory hook
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const selectRows = useSelector(kycSelectors.selectRows);
  const loading = useSelector(kycSelectors.selectLoading);
  const [simulatedTradingEnabled, setSimulatedTradingEnabled] = useState(false);

  const kycStatus = useMemo(() => {
    if (selectRows[0]?.status === VERIFICATION_STATUS.PENDING) {
      return VERIFICATION_STATUS.PENDING;
    }
    return currentUser?.kyc
      ? VERIFICATION_STATUS.SUCCESS
      : VERIFICATION_STATUS.UNVERIFIED;
  }, [selectRows, currentUser?.kyc]);

  // Memoized user data to prevent unnecessary re-renders
  const userData = useMemo(() => ({ user: currentUser }), [currentUser]);

  useEffect(() => {
    dispatch(actions.doFetch(userData, userData));
  }, [dispatch, userData]);

  const handleSignout = useCallback(() => {
    dispatch(authActions.doSignout());
  }, [dispatch]);

  const handleClearCache = useCallback(() => {
    console.log('Clearing cache...');
    // Add your cache clearing logic here
    alert('Cache cleared successfully!');
  }, []);

  const toggleSimulatedTrading = useCallback(() => {
    setSimulatedTradingEnabled(!simulatedTradingEnabled);
    console.log(`Simulated trading ${!simulatedTradingEnabled ? 'enabled' : 'disabled'}`);
  }, [simulatedTradingEnabled]);

  const menuItems = useMemo(
    () =>
      MENU_ITEMS.map((item) => ({
        ...item,
        disabled: item.requiresKyc && !currentUser?.kyc,
      })),
    [currentUser?.kyc]
  );

  const handleVerifyNow = useCallback(() => {
    console.log('KYC Status:', kycStatus);
    
    // Only redirect to /proof if user is unverified
    if (kycStatus === VERIFICATION_STATUS.UNVERIFIED) {
      console.log('Redirecting to proof page...');
      history.push('/proof'); // Redirect to proof page
    } else if (kycStatus === VERIFICATION_STATUS.PENDING) {
      console.log('Verification is pending review...');
      // You might want to show a message here
      alert('Your verification is pending review. Please wait for approval.');
    } else {
      console.log('User is already verified');
      // No action needed for verified users
    }
  }, [kycStatus, history]);

  const getUserInitial = () => {
    if (currentUser?.fullName) {
      return currentUser.fullName.charAt(0).toUpperCase();
    } else if (currentUser?.email) {
      return currentUser.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  const getVerificationText = () => {
    switch (kycStatus) {
      case VERIFICATION_STATUS.SUCCESS:
        return "Verified";
      case VERIFICATION_STATUS.PENDING:
        return "Pending Review";
      default:
        return "Not Verified";
    }
  };

  const getVerificationIcon = () => {
    switch (kycStatus) {
      case VERIFICATION_STATUS.SUCCESS:
        return "fas fa-check-circle";
      case VERIFICATION_STATUS.PENDING:
        return "fas fa-clock";
      default:
        return "fas fa-exclamation-circle";
    }
  };

  const getVerificationButtonText = () => {
    switch (kycStatus) {
      case VERIFICATION_STATUS.SUCCESS:
        return "Verified";
      case VERIFICATION_STATUS.PENDING:
        return "Pending";
      default:
        return "Verify Now";
    }
  };

  const isVerificationButtonDisabled = () => {
    return kycStatus === VERIFICATION_STATUS.SUCCESS || kycStatus === VERIFICATION_STATUS.PENDING;
  };

  const shouldPulseBadge = () => {
    return kycStatus === VERIFICATION_STATUS.UNVERIFIED;
  };

  // Memoized render function for menu items
  const renderMenuItem = useCallback((item, index) => {
    if (item.type === "toggle") {
      return (
        <li className="menu-item" key={index}>
          <div className="icon-container icon-green">
            <i className={item.icon} />
          </div>
          <div className="menu-text">{item.name}</div>
          <div className="menu-action">
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={simulatedTradingEnabled}
                onChange={toggleSimulatedTrading}
              />
              <span className="slider"></span>
            </label>
          </div>
        </li>
      );
    }

    if (item.type === "action") {
      return (
        <li className="menu-item" key={index} onClick={handleClearCache}>
          <div className="icon-container icon-gray">
            <i className={item.icon} />
          </div>
          <div className="menu-text">{item.name}</div>
        </li>
      );
    }

    const menuItemContent = (
      <li className={`menu-item ${item.disabled ? 'disabled' : ''}`}>
        <div className={`icon-container ${item.icon.includes('exchange-alt') ? 'icon-green' :
            item.icon.includes('cog') ? 'icon-gray' :
              item.icon.includes('shield-alt') ? 'icon-blue' :
                item.icon.includes('file-alt') ? 'icon-green' :
                  item.icon.includes('gift') ? 'icon-green' :
                    item.icon.includes('comment-dots') ? 'icon-blue' :
                      item.icon.includes('building') ? 'icon-green' :
                        item.icon.includes('question-circle') ? 'icon-gray' :
                          item.icon.includes('download') ? 'icon-green' : 'icon-gray'
          }`}>
          <i className={item.icon} />
        </div>
        <div className="menu-text">{item.name}</div>
        <div className="menu-action">
          {!item.disabled && <i className="fas fa-chevron-right chevron" />}
        </div>
      </li>
    );

    return item.disabled ? (
      <div key={item.name} className="menu-link-wrapper">
        {menuItemContent}
      </div>
    ) : (
      <Link to={item.path} key={item.name} className="menu-link-wrapper">
        {menuItemContent}
      </Link>
    );
  }, [simulatedTradingEnabled, toggleSimulatedTrading, handleClearCache]);

  return (
    <div className="profile-container">
      {/* Header Section */}
      <div className="header">
        <div className="nav-bar">
          <Link to="/" className="back-arrow">
            <i className="fas fa-arrow-left" />
          </Link>
          <div className="page-title">Personal Center</div>
        </div>

        <div className="profile-section">
          <div className="avatar-container">
            <div className="avatar-ring">
              <div className="avatar">
                <div className="avatar-initial">{getUserInitial()}</div>
                <div className="sunglasses">
                  <i className="fas fa-sunglasses" />
                </div>
              </div>
            </div>
          </div>

          <div className="username">{currentUser?.fullName || currentUser?.email || 'User'}</div>
          <div className="user-id">ID: {currentUser?.id || 'N/A'}</div>

          {/* Certification Status Section */}
          <div className="certification-status">
            <div className={`status-badge ${shouldPulseBadge() ? 'pulse' : ''}`}>
              <i className={`${getVerificationIcon()} status-icon`} />
              {getVerificationText()}
            </div>
            <button
              className="verify-button"
              onClick={handleVerifyNow}
              disabled={isVerificationButtonDisabled()}
            >
              {getVerificationButtonText()}
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="content-card">
        <ul className="menu-list">
          {menuItems.map((item, index) => renderMenuItem(item, index))}
        </ul>
      </div>

      {/* Add necessary styles - make sure these are included */}
      <style>{`
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
      `}</style>
    </div>
  );
}

export default Profile;