// Generated from element-ids.json. Do not edit directly.
export const ElementIds = Object.freeze({
  authentication: Object.freeze({
    emailLogin: Object.freeze({
      loginEmailPageEmailTextField: "loginEmailPageEmailTextField",
      loginEmailPageLoginButton: "loginEmailPageLoginButton",
      loginEmailPagePasswordTextField: "loginEmailPagePasswordTextField",
      loginEmailPageView: "loginEmailPageView",
    }),
    emailOtp: Object.freeze({
      loginEmailOtpPageOtpTextField: "loginEmailOtpPageOtpTextField",
      loginEmailOtpPageView: "loginEmailOtpPageView",
    }),
    latestLogin: Object.freeze({
      latestLoginPageLatestLoginLoginButton: "latestLoginPageLatestLoginLoginButton",
      latestLoginPageLatestLoginNormalLoginButton: "latestLoginPageLatestLoginNormalLoginButton",
      latestLoginPageView: "latestLoginPageView",
    }),
    login: Object.freeze({
      loginPageEmailButton: "loginPageEmailButton",
      loginPageLoginButton: "loginPageLoginButton",
      loginPagePhoneTextField: "loginPagePhoneTextField",
      loginPageView: "loginPageView",
    }),
    loginConfirm: Object.freeze({
      loginConfirmPopupCancelButton: "loginConfirmPopupCancelButton",
      loginConfirmPopupConfirmButton: "loginConfirmPopupConfirmButton",
      loginConfirmPopupView: "loginConfirmPopupView",
    }),
    phoneOtp: Object.freeze({
      loginPhoneOtpPageBackButton: "loginPhoneOtpPageBackButton",
      loginPhoneOtpPageMobileNoLabel: "loginPhoneOtpPageMobileNoLabel",
      loginPhoneOtpPageOtpAlertLabel: "loginPhoneOtpPageOtpAlertLabel",
      loginPhoneOtpPageOtpTextField: "loginPhoneOtpPageOtpTextField",
      loginPhoneOtpPageRefCodeLabel: "loginPhoneOtpPageRefCodeLabel",
      loginPhoneOtpPageResendButton: "loginPhoneOtpPageResendButton",
      loginPhoneOtpPageView: "loginPhoneOtpPageView",
    }),
  }),
  mainApp: Object.freeze({
    main: Object.freeze({
      mainAppPageLoginButton: "mainAppPageLoginButton",
      mainAppPageView: "mainAppPageView",
    }),
    profile: Object.freeze({
      profilePageView: "profilePageView",
    }),
  }),
});

/** Compose a stable row ID. Key is a non-sensitive reference, not a list index. */
export function withKey(baseId, key) {
  if (typeof baseId !== 'string' || /[\r\n]/.test(baseId) || !/^[a-z][A-Za-z0-9]*$/.test(baseId)) throw new TypeError('Invalid base ID.');
  if (typeof key !== 'string' || /[\r\n]/.test(key) || !/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(key)) throw new TypeError('Invalid item key. Use a non-empty ASCII reference.');
  return baseId + '__' + key;
}
