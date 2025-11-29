import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Local imports
import actions from "src/modules/auth/authActions";
import { i18n } from "../../../i18n";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import InputFormItem from "src/shared/form/InputFormItem";
import selectors from "src/modules/auth/authSelectors";
import ButtonIcon from "src/shared/ButtonIcon";

function Signup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(selectors.selectLoading);
  const errorMessage = useSelector(selectors.selectErrorMessage);
  const [showPassword, setShowPassword] = useState(false);
  const [captchaText, setCaptchaText] = useState("");

  // Generate initial captcha on component mount
  useEffect(() => {
    refreshCaptcha();
  }, []);

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
    invitationcode: yupFormSchemas.string(i18n("user.fields.invitationcode"), {
      required: true,
    }),
    withdrawPassword: yupFormSchemas.string(
      i18n("user.fields.withdrawPassword"),
      {
        required: true,
      }
    ),

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
      withdrawPassword: "",
      invitationcode: "",
      captcha: "",
    },
  });

  // Clear error message on component mount
  useEffect(() => {
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

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
      const { email, password, phoneNumber, withdrawPassword, invitationcode } =
        data;
      dispatch(
        actions.doRegisterEmailAndPassword(
          email,
          password,
          phoneNumber,
          withdrawPassword,
          invitationcode
        )
      );
    },
    [dispatch]
  );

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      {/* Header */}
      <div className="header">
        <button className="back-button" onClick={goBack}>
          <span className="back-arrow">←</span>
          <span>{i18n("pages.signup.title")}</span>
        </button>
        
        <select className="language-selector">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
        </select>
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
                type={showPassword ? "text" : "password"}
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

            {/* Withdraw Password Field */}
            <div className="form-group">
              <label className="form-label">Withdraw password</label>
              <InputFormItem
                type="text"
                name="withdrawPassword"
                placeholder="Please enter withdraw password"
                className="form-input"
              />
            </div>

            {/* Invitation Code Field */}
            <div className="form-group">
              <label className="form-label">Invitation code</label>
              <InputFormItem
                type="text"
                name="invitationcode"
                placeholder="Please enter invitation code"
                className="form-input"
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

        .language-selector {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 6px;
          padding: 6px 12px;
          color: white;
          font-size: 14px;
          cursor: pointer;
        }

        .language-selector option {
          background: white;
          color: #333;
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
          padding: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          min-height: 50px;
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
          .container {
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

export default Signup;