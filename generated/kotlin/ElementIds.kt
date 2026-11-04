// Generated from element-ids.json. Do not edit directly.
package local.shared.elementids

object ElementIds {
    object Authentication {
        object EmailLogin {
            const val loginEmailPageEmailTextField = "loginEmailPageEmailTextField"
            const val loginEmailPageLoginButton = "loginEmailPageLoginButton"
            const val loginEmailPagePasswordTextField = "loginEmailPagePasswordTextField"
            const val loginEmailPageView = "loginEmailPageView"
        }
        object EmailOtp {
            const val loginEmailOtpPageOtpTextField = "loginEmailOtpPageOtpTextField"
            const val loginEmailOtpPageView = "loginEmailOtpPageView"
        }
        object LatestLogin {
            const val latestLoginPageLatestLoginLoginButton = "latestLoginPageLatestLoginLoginButton"
            const val latestLoginPageLatestLoginNormalLoginButton = "latestLoginPageLatestLoginNormalLoginButton"
            const val latestLoginPageView = "latestLoginPageView"
        }
        object Login {
            const val loginPageEmailButton = "loginPageEmailButton"
            const val loginPageLoginButton = "loginPageLoginButton"
            const val loginPagePhoneTextField = "loginPagePhoneTextField"
            const val loginPageView = "loginPageView"
        }
        object LoginConfirm {
            const val loginConfirmPopupCancelButton = "loginConfirmPopupCancelButton"
            const val loginConfirmPopupConfirmButton = "loginConfirmPopupConfirmButton"
            const val loginConfirmPopupView = "loginConfirmPopupView"
        }
        object PhoneOtp {
            const val loginPhoneOtpPageBackButton = "loginPhoneOtpPageBackButton"
            const val loginPhoneOtpPageMobileNoLabel = "loginPhoneOtpPageMobileNoLabel"
            const val loginPhoneOtpPageOtpAlertLabel = "loginPhoneOtpPageOtpAlertLabel"
            const val loginPhoneOtpPageOtpTextField = "loginPhoneOtpPageOtpTextField"
            const val loginPhoneOtpPageRefCodeLabel = "loginPhoneOtpPageRefCodeLabel"
            const val loginPhoneOtpPageResendButton = "loginPhoneOtpPageResendButton"
            const val loginPhoneOtpPageView = "loginPhoneOtpPageView"
        }
    }
    object MainApp {
        object Main {
            const val mainAppPageLoginButton = "mainAppPageLoginButton"
            const val mainAppPageView = "mainAppPageView"
        }
        object Profile {
            const val profilePageView = "profilePageView"
        }
    }
    /** Encode non-sensitive references; refresh when binding recycled cells. */
    fun withKey(baseId: String, key: String): String {
        fun encode(value: String): String =
            value.map { it.code.toString(16).padStart(4, '0') }.joinToString("")
        val base = if (Regex("[a-z][A-Za-z0-9]*").matches(baseId)) baseId else "_b" + encode(baseId)
        val item = if (Regex("[A-Za-z0-9][A-Za-z0-9_-]*").matches(key)) key else "_u" + encode(key)
        return base + "__" + item
    }

}
