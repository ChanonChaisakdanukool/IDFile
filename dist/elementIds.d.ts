// Generated from element-ids.json. Do not edit directly.
export declare const ElementIds: {
  readonly authentication: {
    readonly emailLogin: {
      readonly loginEmailPageEmailTextField: "loginEmailPageEmailTextField";
      readonly loginEmailPageLoginButton: "loginEmailPageLoginButton";
      readonly loginEmailPagePasswordTextField: "loginEmailPagePasswordTextField";
      readonly loginEmailPageView: "loginEmailPageView";
    };
    readonly emailOtp: {
      readonly loginEmailOtpPageOtpTextField: "loginEmailOtpPageOtpTextField";
      readonly loginEmailOtpPageView: "loginEmailOtpPageView";
    };
    readonly latestLogin: {
      readonly latestLoginPageLatestLoginLoginButton: "latestLoginPageLatestLoginLoginButton";
      readonly latestLoginPageLatestLoginNormalLoginButton: "latestLoginPageLatestLoginNormalLoginButton";
      readonly latestLoginPageView: "latestLoginPageView";
    };
    readonly login: {
      readonly loginPageEmailButton: "loginPageEmailButton";
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
      readonly loginPhoneOtpPageBackButton: "loginPhoneOtpPageBackButton";
      readonly loginPhoneOtpPageMobileNoLabel: "loginPhoneOtpPageMobileNoLabel";
      readonly loginPhoneOtpPageOtpAlertLabel: "loginPhoneOtpPageOtpAlertLabel";
      readonly loginPhoneOtpPageOtpTextField: "loginPhoneOtpPageOtpTextField";
      readonly loginPhoneOtpPageRefCodeLabel: "loginPhoneOtpPageRefCodeLabel";
      readonly loginPhoneOtpPageResendButton: "loginPhoneOtpPageResendButton";
      readonly loginPhoneOtpPageView: "loginPhoneOtpPageView";
    };
  };
  readonly mainApp: {
    readonly main: {
      readonly mainAppPageLoginButton: "mainAppPageLoginButton";
      readonly mainAppPageView: "mainAppPageView";
    };
    readonly profile: {
      readonly profilePageView: "profilePageView";
    };
  };
};

type LeafValue<T> = T extends string ? T : { [K in keyof T]: LeafValue<T[K]> }[keyof T];
export type ElementId = LeafValue<typeof ElementIds>;

export declare function withKey(baseId: string, key: string): string;
