// Generated from element-ids.json. Do not edit directly.
export const ElementIds = Object.freeze({
  authentication: Object.freeze({
    latestLogin: Object.freeze({
      latestLoginPageLatestLoginLoginButton: "latestLoginPageLatestLoginLoginButton",
      latestLoginPageLatestLoginNormalLoginButton: "latestLoginPageLatestLoginNormalLoginButton",
      latestLoginPageView: "latestLoginPageView",
    }),
    login: Object.freeze({
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
      loginPhoneOtpPageMobileNoLabel: "loginPhoneOtpPageMobileNoLabel",
      loginPhoneOtpPageOtpAlertLabel: "loginPhoneOtpPageOtpAlertLabel",
      loginPhoneOtpPageOtpTextField: "loginPhoneOtpPageOtpTextField",
      loginPhoneOtpPageResendButton: "loginPhoneOtpPageResendButton",
      loginPhoneOtpPageView: "loginPhoneOtpPageView",
    }),
  }),
  mainApp: Object.freeze({
    main: Object.freeze({
      mainAppPageLoginButton: "mainAppPageLoginButton",
      mainAppPageView: "mainAppPageView",
    }),
  }),
});

type LeafValue<T> = T extends string ? T : { [K in keyof T]: LeafValue<T[K]> }[keyof T];
export type ElementId = LeafValue<typeof ElementIds>;
