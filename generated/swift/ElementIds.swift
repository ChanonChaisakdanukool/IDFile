// Generated from element-ids.json. Do not edit directly.
import Foundation

public struct ElementIds {
    private init() {}
    public struct Authentication {
        private init() {}
        public struct LatestLogin {
            private init() {}
            public static let latestLoginPageLatestLoginLoginButton = "latestLoginPageLatestLoginLoginButton"
            public static let latestLoginPageLatestLoginNormalLoginButton = "latestLoginPageLatestLoginNormalLoginButton"
            public static let latestLoginPageView = "latestLoginPageView"
        }
        public struct Login {
            private init() {}
            public static let loginPageLoginButton = "loginPageLoginButton"
            public static let loginPagePhoneTextField = "loginPagePhoneTextField"
            public static let loginPageView = "loginPageView"
        }
        public struct LoginConfirm {
            private init() {}
            public static let loginConfirmPopupCancelButton = "loginConfirmPopupCancelButton"
            public static let loginConfirmPopupConfirmButton = "loginConfirmPopupConfirmButton"
            public static let loginConfirmPopupView = "loginConfirmPopupView"
        }
        public struct PhoneOtp {
            private init() {}
            public static let loginPhoneOtpPageBackButton = "loginPhoneOtpPageBackButton"
            public static let loginPhoneOtpPageMobileNoLabel = "loginPhoneOtpPageMobileNoLabel"
            public static let loginPhoneOtpPageOtpAlertLabel = "loginPhoneOtpPageOtpAlertLabel"
            public static let loginPhoneOtpPageOtpTextField = "loginPhoneOtpPageOtpTextField"
            public static let loginPhoneOtpPageRefCodeLabel = "loginPhoneOtpPageRefCodeLabel"
            public static let loginPhoneOtpPageResendButton = "loginPhoneOtpPageResendButton"
            public static let loginPhoneOtpPageView = "loginPhoneOtpPageView"
        }
    }
    public struct MainApp {
        private init() {}
        public struct Main {
            private init() {}
            public static let mainAppPageLoginButton = "mainAppPageLoginButton"
            public static let mainAppPageView = "mainAppPageView"
        }
        public struct Profile {
            private init() {}
            public static let profilePageView = "profilePageView"
        }
    }
    /// Compose a stable row ID using an opaque reference; refresh when reusing cells.
    public static func withKey(_ baseId: String, key: String) -> String {
        precondition(baseId.range(of: "^[a-z][A-Za-z0-9]*$", options: .regularExpression) != nil && !baseId.contains("\n") && !baseId.contains("\r"), "Invalid base ID")
        precondition(key.range(of: "^[A-Za-z0-9][A-Za-z0-9_-]*$", options: .regularExpression) != nil && !key.contains("\n") && !key.contains("\r"), "Invalid item key")
        return baseId + "__" + key
    }

}
