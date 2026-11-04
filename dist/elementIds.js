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

/** Compose IDs from non-sensitive strings, preserving valid legacy IDs. */
export function withKey(baseId, key) {
  if (typeof baseId !== 'string' || typeof key !== 'string') throw new TypeError('withKey requires strings.');
  const encode = value => {
    let result = '';
    for (let index = 0; index < value.length; index++) {
      result += value.charCodeAt(index).toString(16).padStart(4, '0');
    }
    return result;
  };
  const base = /^[a-z][A-Za-z0-9]*$/.test(baseId) && !/[\r\n]/.test(baseId) ? baseId : '_b' + encode(baseId);
  const item = /^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(key) && !/[\r\n]/.test(key) ? key : '_u' + encode(key);
  return base + '__' + item;
}
