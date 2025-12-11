import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "src/modules/auth/authActions";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFormItem from "src/shared/form/InputFormItem";
import selectors from "src/modules/auth/authSelectors";
import ButtonIcon from "src/shared/ButtonIcon";
import { useHistory } from "react-router-dom";
import I18nSelect from "src/view/layout/I18nSelect";

// Fixed schema with better validation
const schema = yup.object().shape({
  email: yupFormSchemas
    .string(i18n("user.fields.username"), {
      required: true,
    })
    .email(i18n("validation.email")),
  password: yupFormSchemas.string(i18n("user.fields.password"), {
    required: true,
    min: 6,
  }),
  rememberMe: yupFormSchemas.boolean(i18n("user.fields.rememberMe")),
});

function Signin() {
  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useSelector(selectors.selectLoading);
  const externalErrorMessage = useSelector(selectors.selectErrorMessage);

  const [initialValues] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });

  const [isChecked, setIsChecked] = useState(true);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  useEffect(() => {
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  const onSubmit = ({ email, password, rememberMe }) => {
    dispatch(actions.doSigninWithEmailAndPassword(email, password, rememberMe));
  };

  const goBack = () => {
    history.goBack();
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    form.setValue("rememberMe", !isChecked);
  };

  const openLanguageModal = () => {
    setIsLanguageModalOpen(true);
  };

  const closeLanguageModal = () => {
    setIsLanguageModalOpen(false);
  };

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      {/* Header */}
      <div className="header">
        <button className="back-button" onClick={goBack}>
          <span className="back-arrow">←</span>
          <span>{i18n("auth.signin.button")}</span>
        </button>

        {/* Language Selector - Now opens modal */}
        <div className="language-selector-modal" onClick={openLanguageModal}>
          <div className="language-display">
            English
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="containera">
        {/* Tabs */}
        <div className="tabs">
          <button className="tab active">Mail</button>
          <button className="tab">Phone</button>
        </div>

        <FormProvider {...form}>
          {/* Display error message if exists */}
          {externalErrorMessage && (
            <div
              className="error-message"
              style={{
                color: "red",
                textAlign: "center",
                marginBottom: "1rem",
                padding: "0.5rem",
                backgroundColor: "#ffe6e6",
                borderRadius: "4px",
              }}
            >
              {externalErrorMessage}
            </div>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="form-group">
              <label className="form-label">Your mailbox</label>
              <InputFormItem
                type="email"
                name="email"
                placeholder="Please enter your email"
                className="form-input"
                externalErrorMessage={null}
              />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label className="form-label">Your password</label>
              <InputFormItem
                type="password"
                name="password"
                placeholder="Please enter your password"
                className="form-input"
                autoComplete="current-password"
                externalErrorMessage={null}
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="checkbox-group">
              <div
                className={`checkbox ${isChecked ? 'checked' : ''}`}
                onClick={toggleCheckbox}
              ></div>
              <label className="checkbox-label" onClick={toggleCheckbox}>
                Remember my password
              </label>
            </div>

            {/* Login Button */}
            <button
              className="login-button"
              disabled={loading}
              type="submit"
              style={{ opacity: loading ? 0.6 : 1 }}
            >
              {loading ? (
                <span>{i18n("auth.signin.signingIn")}</span>
              ) : (
                <span>{i18n("auth.signin.button")}</span>
              )}
            </button>

            {/* Sign Up Button */}
            <Link to="/auth/signup" className="signup-button-link">
              <button type="button" className="signup-button">
                Sign up now
              </button>
            </Link>

            {/* Forgot Password Link */}
            <div className="footer">
              <Link to="/forgot-password" className="forgot-password">
                Forget password
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>

      {/* Language Selection Modal - Bottom Sheet Style */}
      {isLanguageModalOpen && (
        <div className="modal-overlay" onClick={closeLanguageModal}>
          <div className="modal-container-bottom" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="modal-header-bottom">
              <div className="modal-drag-handle"></div>
              <div className="modal-title-wrapper">
                <div className="modal-title">Select Language</div>
                <button className="modal-close-btn-bottom" onClick={closeLanguageModal}>
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="modal-content-bottom">
              <I18nSelect isInModal={true} />
            </div>
          </div>
        </div>
      )}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        /* Header Styles */
        .header {
          background-color: #007AFF;
          color: white;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 8px rgba(0, 122, 255, 0.15);
          max-width: 400px !important;
          margin: 0 auto;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: white;
          font-size: 17px;
          font-weight: 500;
          cursor: pointer;
        }

        .back-arrow {
          font-size: 20px;
          font-weight: 300;
        }

        /* New Language Selector Modal Style */
        .language-selector-modal {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 6px;
          padding: 6px 12px;
          color: white;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
          user-select: none;
          min-width: 80px;
          justify-content: center;
        }

        .language-selector-modal:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }

        .language-display {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 500;
        }

        .language-display i {
          font-size: 10px;
          transition: transform 0.2s ease;
        }

        .language-selector-modal:hover .language-display i {
          transform: translateY(1px);
        }

        /* Main Content */
        .containera {
          max-width: 400px;
          margin: 40px auto;
          padding: 0 20px;
          flex: 1;
          width: 100%;
          background-color: #ffffff;
        }

        /* Tabs */
        .tabs {
          display: flex;
          background-color: #f8f9fa;
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 32px;
        }

        .tab {
          flex: 1;
          padding: 12px 16px;
          text-align: center;
          border-radius: 10px;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          background: none;
        }

        .tab.active {
          background-color: #007AFF;
          color: white;
        }

        .tab:not(.active) {
          background-color: transparent;
          color: #8E8E93;
        }

        /* Form Styles */
        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #1D1D1F;
          font-size: 14px;
        }

        .form-input {
          width: 100%;
          padding: 16px;
          background-color: #f8f9fa;
          border: 2px solid transparent;
          border-radius: 7px;
          font-size: 14px;
          transition: all 0.2s ease;
          border: none;
          outline: none;
        }

        .form-input:focus {
          outline: none;
          background-color: white;
          border-color: #007AFF;
          box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
        }

        .form-input::placeholder {
          color: #8E8E93;
        }

        /* Checkbox */
        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
        }

        .checkbox {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #C7C7CC;
          background: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .checkbox.checked {
          background-color: #007AFF;
          border-color: #007AFF;
        }

        .checkbox.checked::after {
          content: '✓';
          color: white;
          font-size: 14px;
          font-weight: bold;
        }

        .checkbox-label {
          font-size: 14px;
          color: #1D1D1F;
          cursor: pointer;
        }

        /* Buttons */
        .login-button {
          width: 100%;
          background-color: #007AFF;
          color: white;
          border: none;
          border-radius: 7px;
          padding: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 16px;
        }

        .login-button:hover:not(:disabled) {
          background-color: #0056CC;
          transform: translateY(-1px);
        }

        .login-button:disabled {
          cursor: not-allowed;
        }

        .signup-button {
          width: 100%;
          background-color: white;
          color: #007AFF;
          border: 2px solid #007AFF;
          border-radius: 7px;
          padding: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .signup-button:hover {
          background-color: #f8f9fa;
        }

        .signup-button-link {
          text-decoration: none;
          display: block;
        }

        /* Footer */
        .footer {
          text-align: right;
          margin-top: 24px;
        }

        .forgot-password {
          color: #007AFF;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
        }

        .forgot-password:hover {
          text-decoration: underline;
        }

        /* Modal Styles for Language Selection */
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

        /* Responsive */
        @media (max-width: 480px) {
          .containera {
            margin: 20px auto;
          }
          
          .header {
            padding: 12px 16px;
          }
          
          .form-input {
            padding: 14px;
          }
          
          .login-button, .signup-button {
            padding: 14px;
          }

          .language-selector-modal {
            padding: 5px 10px;
            min-width: 70px;
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

        /* Input Form Item Override */
        .text-input {
          width: 100%;
          padding: 16px;
          background-color: #f8f9fa;
          border: 2px solid transparent;
          border-radius: 7px;
          font-size: 14px;
          transition: all 0.2s ease;
          border: none;
          outline: none;
        }

        .text-input:focus {
          outline: none;
          background-color: white;
          border-color: #007AFF;
          box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
        }

        .text-input::placeholder {
          color: #8E8E93;
        }
      `}</style>
    </div>
  );
}

export default Signin;