import React, { Component } from "react";
import { faUser, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { changeHandler, redirectHelper } from "../utils/functions";
// import Axios from "axios";
import { connect } from "react-redux";
import { onLogin } from "../redux/actions";
import { userAuthMessages, messageCodes } from "../config/constants";
import { toast } from "react-toastify";
import cookies from "next-cookies";
import Link from "next/link";

interface State {
  username: string;
  password: string;
}

interface Props {
  language: string;
  token: string;
  login: (username: string, password: string) => void;
  messageCode: number | null;
}

class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  componentDidUpdate(prevProps: Props) {
    const { messageCode, language } = this.props;
    if (prevProps.messageCode !== messageCode) {
      if (messageCode) {
        if (messageCode === messageCodes.loginSuccess) {
          toast.success(userAuthMessages[messageCode][language]);
        } else {
          toast.error(userAuthMessages[messageCode][language]);
        }
      }
    }
  }

  static getInitialProps = ctx => {
    const { token } = cookies(ctx);
    const { res } = ctx;
    if (token) {
      redirectHelper(res, "/");
    }
    return {};
  };

  render() {
    const { language, login } = this.props;
    const { password, username } = this.state;

    return (
      <div
        style={{
          direction: language === "en" ? "ltr" : "rtl",
          textAlign: language === "en" ? "left" : "right",
        }}
        className="forms"
      >
        <div className="Container-forms">
          <div className="form">
            <div className="log">
              <div className="form-group">
                <h2>{language === "ar" ? "تسجيل الدخول" : "Log in"}</h2>
                <p>
                  {language === "ar"
                    ? "نسعد لرؤيتك مجددا"
                    : "it is glory to see you again."}
                </p>
                <form>
                  <div className="inputs-group">
                    <input
                      type="text"
                      value={username}
                      onChange={e => changeHandler(this, "username", e)}
                      placeholder={
                        language === "ar"
                          ? "البريد الالكتروني او اسم المستخدم"
                          : "Email or username"
                      }
                    />
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{
                        right: language === "ar" ? "12px" : null,
                        left: language === "en" ? "12px" : null,
                      }}
                    />
                  </div>
                  <div className="inputs-group">
                    <input
                      type="password"
                      value={password}
                      onChange={e => changeHandler(this, "password", e)}
                      placeholder={
                        language === "ar" ? "الرقم السري" : "PASSWORD"
                      }
                    />
                    <FontAwesomeIcon
                      icon={faUnlock}
                      style={{
                        right: language === "ar" ? "12px" : null,
                        left: language === "en" ? "12px" : null,
                      }}
                    />
                  </div>
                  <div className="buttons-group">
                    <button
                      type="button"
                      disabled={username.length < 3 && password.length < 3}
                      onClick={() => login(username, password)}
                    >
                      {language === "ar" ? "دخول" : "LOGIN"}
                    </button>
                  </div>
                  <div className="link-group">
                    <p>
                      {language === "ar" ? "عضو جديد ؟ " : "new user ? "}
                      <Link href="/register">
                        <a>
                          {language === "ar"
                            ? "انشاء حساب جديد"
                            : "Create new account"}
                        </a>
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="info">
            <div>
              <h1>
                {language === "ar" ? "مرحبا بك في ويباي" : "Welcome to Webay"}
              </h1>
              <p>
                {language === "ar"
                  ? "ادخل بياناتك الشخصية وابدأ الشراء معنا"
                  : "Please, Enter your personal details and start journey with us"}
              </p>
            </div>
          </div>
        </div>
        {/* <div className="side">
          <span />
          <span />
          <span />
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messageCode: state.user.loginMessageCode,
    language: state.user.language,
  };
};

const mapDispatchToProps = {
  login: onLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
