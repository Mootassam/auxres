import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Local imports
import actions from "src/modules/auth/authActions";
import { i18n, getLanguageCode, getLanguages } from "../../../i18n";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import InputFormItem from "src/shared/form/InputFormItem";
import selectors from "src/modules/auth/authSelectors";
import I18nSelect from "src/view/layout/I18nSelect";

function Signup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(selectors.selectLoading);
  const errorMessage = useSelector(selectors.selectErrorMessage);
  const [showPassword, setShowPassword] = useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [currentLanguageLabel, setCurrentLanguageLabel] = useState("");

  // Function to update the language label
  const updateLanguageLabel = () => {
    const currentLanguage = getLanguageCode();
    const labelLanguage = getLanguages();
    
    if (!Array.isArray(labelLanguage)) {
      setCurrentLanguageLabel("");
      return;
    }

    const languageMap = Object.fromEntries(
      labelLanguage.map((lang) => [lang.id, lang.label])
    );
    
    setCurrentLanguageLabel(languageMap[currentLanguage] || "");
  };

  // Generate initial captcha on component mount and setup language label
  useEffect(() => {
    refreshCaptcha();
    updateLanguageLabel();
    
    // Set up an interval to check for language changes
    const intervalId = setInterval(updateLanguageLabel, 500);
    
    // Also update on window focus
    const handleFocus = () => updateLanguageLabel();
    window.addEventListener('focus', handleFocus);
    
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Clear error message on component mount
  useEffect(() => {
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  // Update language label when modal closes
  useEffect(() => {
    if (!isLanguageModalOpen) {
      setTimeout(updateLanguageLabel, 100);
    }
  }, [isLanguageModalOpen]);

  // Validation schema
  const schema = yup.object().shape({
    email: yupFormSchemas.string(i18n("user.fields.username"), {
      required: true,
    }),
    password: yupFormSchemas.string(i18n("user.fields.password"), {
      required: true,
      min: 8,
    }),
    newPasswordConfirmation: yupFormSchemas
      .string(i18n("user.fields.newPasswordConfirmation"), {
        required: true,
      })
      .oneOf(
        [yup.ref("password"), null],
        i18n("auth.passwordChange.mustMatch")
      ),
    phoneNumber: yupFormSchemas.string(i18n("user.fields.phoneNumber"), {
      required: true,
    }),
    captcha: yup
      .string()
      .required(i18n("user.fields.captcha"))
      .test("captcha-match", i18n("pages.signup.captchaMismatch"), function (value) {
        return value === captchaText;
      }),
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      newPasswordConfirmation: "",
      phoneNumber: "",
      captcha: "",
    },
  });

  // Generate new captcha
  const refreshCaptcha = useCallback(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newCaptcha = "";
    for (let i = 0; i < 6; i++) {
      newCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(newCaptcha);
    // Clear captcha field when refreshing
    form.setValue("captcha", "");
    form.clearErrors("captcha");
  }, [form]);

  const onSubmit = useCallback(
    (data) => {
      // Captcha validation is already handled by yup schema
      const { email, password, phoneNumber } = data;
      dispatch(
        actions.doRegisterEmailAndPassword(
          email,
          password,
          phoneNumber,
        )
      );
    },
    [dispatch]
  );

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const openLanguageModal = () => {
    setIsLanguageModalOpen(true);
  };

  const closeLanguageModal = () => {
    setIsLanguageModalOpen(false);
    // Force update language label after modal closes
    setTimeout(updateLanguageLabel, 100);
  };

  // Handle language change from I18nSelect
  const handleLanguageChange = () => {
    updateLanguageLabel();
  };

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      {/* Header */}
      <div className="header">
        <button className="back-button" onClick={goBack}>
          <span className="back-arrow">←</span>
          <span>{i18n("pages.signup.title")}</span>
        </button>
        
        <div className="language-selector-modal" onClick={openLanguageModal}>
          <div className="language-display">
            {currentLanguageLabel || "Select Language"}
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="containera">
        <FormProvider {...form}>
          {/* Display error message if exists */}
          {errorMessage && (
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
              {errorMessage}
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
                autoComplete="email"
              />
            </div>

            {/* Phone Number Field */}
            <div className="form-group">
              <label className="form-label">Phone number</label>
              <InputFormItem
                type="tel"
                name="phoneNumber"
                placeholder="Please enter your phone number"
                className="form-input"
                autoComplete="tel"
              />
            </div>

            {/* Graphical Captcha */}
            <div className="form-group">
              <label className="form-label">Verification code</label>
              <div className="captcha-container">
                <div className="captcha-display" onClick={refreshCaptcha}>
                  <div className="captcha-text">{captchaText}</div>
                  <div className="refresh-captcha">
                    <i className="fas fa-sync-alt" />
                  </div>
                </div>
                <InputFormItem
                  type="text"
                  name="captcha"
                  placeholder="Enter verification code"
                  className="form-input"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <InputFormItem
                type="password"
                name="password"
                placeholder="Please enter your password"
                className="form-input"
                autoComplete="new-password"
              />
            </div>

            {/* Confirm Password Field */}
            <div className="form-group">
              <label className="form-label">Confirm password</label>
              <InputFormItem
                type="password"
                name="newPasswordConfirmation"
                placeholder="Please confirm your password"
                className="form-input"
                autoComplete="new-password"
              />
            </div>

            {/* Sign Up Button */}
            <button
              className="login-button"
              disabled={loading}
              type="submit"
              style={{ opacity: loading ? 0.6 : 1 }}
            >
              {loading ? (
                <span>{i18n("pages.signup.creatingAccount")}</span>
              ) : (
                <span>{i18n("pages.signup.createAccount")}</span>
              )}
            </button>

            {/* Already have account link */}
            <div className="footer">
              <Link to="/auth/signin" className="forgot-password">
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>

      {/* Language Modal */}
      {isLanguageModalOpen && (
        <div className="modal-overlay" onClick={closeLanguageModal}>
          <div
            className="modal-container-bottom"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header-bottom">
              <div className="modal-drag-handle"></div>
              <div className="modal-title-wrapper">
                <div className="modal-title">Select Language</div>
                <button
                  className="modal-close-btn-bottom"
                  onClick={closeLanguageModal}
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>

            <div className="modal-content-bottom">
              {/* Language selection component */}
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
          max-width: 400px;
          margin: 0 auto;
          box-shadow: 0 2px 8px rgba(0, 122, 255, 0.15);
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: white;
          font-size: 14px;
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

        /* Captcha Styles */
        .captcha-container {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .captcha-display {
          flex: 1;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 7px;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
        }

        .captcha-text {
          color: white;
          font-size: 20px;
          font-weight: bold;
          letter-spacing: 2px;
          font-family: 'Courier New', monospace;
        }

        .refresh-captcha {
          color: white;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
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

        /* Footer */
        .footer {
          text-align: center;
          margin-top: 24px;
        }

        .forgot-password {
          color: #007AFF;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
        }

        .forgot-password:hover {
          text-decoration: underline;
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
          
          .login-button {
            padding: 14px;
          }

          .captcha-container {
            flex-direction: column;
            gap: 12px;
          }

          .captcha-display {
            width: 100%;
          }

          .language-selector-modal {
            padding: 5px 10px;
            min-width: 70px;
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

        @media (max-width: 480px) {
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
      `}</style>
    </div>
  );
}

export default Signup;