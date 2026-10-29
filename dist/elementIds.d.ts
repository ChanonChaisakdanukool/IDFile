// Generated from element-ids.json. Do not edit directly.
export declare const ElementIds: {
  readonly authentication: {
    readonly latestLogin: {
      readonly latestLoginPageLatestLoginLoginButton: "latestLoginPageLatestLoginLoginButton";
      readonly latestLoginPageLatestLoginNormalLoginButton: "latestLoginPageLatestLoginNormalLoginButton";
      readonly latestLoginPageView: "latestLoginPageView";
    };
    readonly login: {
      readonly loginPageLoginButton: "loginPageLoginButton";
      readonly loginPagePhoneTextField: "loginPagePhoneTextField";
      readonly loginPageView: "loginPageView";
    };
    readonly loginConfirm: {
      readonly loginConfirmPopupCancelButton: "loginConfirmPopupCancelButton";
      readonly loginConfirmPopupConfirmButton: "loginConfirmPopupConfirmButton";
      readonly loginConfirmPopupView: "loginConfirmPopupView";
    };
    readonly phoneOtp: {
      readonly loginPhoneOtpPageMobileNoLabel: "loginPhoneOtpPageMobileNoLabel";
      readonly loginPhoneOtpPageOtpAlertLabel: "loginPhoneOtpPageOtpAlertLabel";
      readonly loginPhoneOtpPageOtpTextField: "loginPhoneOtpPageOtpTextField";
      readonly loginPhoneOtpPageResendButton: "loginPhoneOtpPageResendButton";
      readonly loginPhoneOtpPageView: "loginPhoneOtpPageView";
    };
  };
  readonly mainApp: {
    readonly main: {
      readonly mainAppPageLoginButton: "mainAppPageLoginButton";
      readonly mainAppPageView: "mainAppPageView";
    };
  };
};

type LeafValue<T> = T extends string ? T : { [K in keyof T]: LeafValue<T[K]> }[keyof T];
export type ElementId = LeafValue<typeof ElementIds>;
