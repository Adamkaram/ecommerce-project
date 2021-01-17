/* eslint-disable react/no-unused-state */
import React, { Component } from "react";
import {
  faUser,
  faUnlock,
  faMailBulk,
} from "@fortawesome/free-solid-svg-icons";
import { changeHandler, redirectHelper } from "../utils/functions";
// import Axios from "axios";
import { Language } from "../utils/Translator";
import translator from "../utils/Translator";
import { connect } from "react-redux";
import { userAuthMessages, messageCodes } from "../config/constants";
import { toast } from "react-toastify";
import cookies from "next-cookies";
import Link from "next/link";
import { onRegister } from "../redux/actions";
import Input from "../components/Input";
import ValidatePhone from "../components/ValidatePhone";
import Axios from "axios";

interface State {
  username: string;
  password: string;
  name: string;
  email: string;
  phone: number;
  codeSent: boolean;
  counting: number;
  code: string;
  validCode: boolean;
}

interface Props {
  language: Language;
  token: string;
  register: ({
    username,
    password,
    name,
    email,
    phone,
  }: {
    username: string;
    password: string;
    name: string;
    email: string;
    phone: number;
  }) => void;
  messageCode: number | null;
}

const COUNT = 3;
class Login extends Component<Props, State> {
  interval;

  constructor(props: Props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      password: "",
      email: "",
      phone: null,
      codeSent: false,
      counting: COUNT,
      code: "",
      validCode: false,
    };
  }

  static getInitialProps = ctx => {
    const { token } = cookies(ctx);
    const { res } = ctx;
    if (token) {
      redirectHelper(res, "/");
    }
    return {};
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { messageCode, language } = this.props;
    if (prevProps.messageCode !== messageCode) {
      if (messageCode) {
        if (messageCode === messageCodes.loginSuccess) {
          toast.success(userAuthMessages[messageCode][language]);
        } else if (messageCode === messageCodes.registerSuccess) {
          toast.success(userAuthMessages[messageCode][language]);
        } else {
          toast.error(userAuthMessages[messageCode][language]);
        }
      }
    }
    if (prevState.counting !== this.state.counting && this.state.counting < 1) {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startInterval = () => {
    this.interval = setInterval(() => {
      this.setState(prevState => ({
        ...prevState,
        counting: prevState.counting - 1,
      }));
    }, 1000);
  };

  changeInput = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
    changeHandler(this, name, e);
  };

  sendCode = async () => {
    this.setState({ counting: COUNT });
    try {
      const response = await Axios.post("/app/verify", {
        phone: this.state.phone,
      });
      if (response.status === 200) {
        this.startInterval();
        this.setState({ codeSent: true });
      }
    } catch (error) {
      const code = error.response.status;
      if (code === 425) {
        toast.error(
          userAuthMessages[messageCodes.phoneFound][this.props.language],
        );
      } else {
        toast.error(
          userAuthMessages[messageCodes.unknownError][this.props.language],
        );
      }
    }
  };

  validateCode = async () => {
    const { language } = this.props;
    try {
      const response = await Axios.post("/app/verify/validate", {
        phone: this.state.phone,
        code: this.state.code,
      });
      if (response.status === 200) {
        this.setState({ validCode: true });
        toast.success(userAuthMessages[messageCodes.validCode][language]);
      }
    } catch (error) {
      const code = error.response.status;
      if (code === 401) {
        toast.error(userAuthMessages[messageCodes.wrongCode][language]);
      } else {
        toast.error(userAuthMessages[messageCodes.unknownError][language]);
      }
    }
  };

  editPhone = () => {
    clearInterval(this.interval);
    this.setState({ codeSent: false, counting: COUNT });
  };

  validData = () => {
    const { username, name, email, password, phone, validCode } = this.state;
    return (
      username.length < 3 &&
      password.length < 3 &&
      name.length < 3 &&
      email.length < 4 &&
      !validCode
    );
  };

  render() {
    const { language, register } = this.props;
    const strings = translator(language);
    const {
      password,
      username,
      email,
      name,
      code,
      codeSent,
      counting,
      phone,
      validCode,
    } = this.state;

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
                <h2>
                  {language === "ar" ? "انشاء حساب جديد" : "Create new account"}
                </h2>
                <p>{strings.onlyMinute}</p>
                <form>
                  <span className="text-info small">
                    {strings.allFieldsRequired}
                  </span>
                  <Input
                    type="text"
                    value={name}
                    onChange={this.changeInput}
                    placeHolderAr="الاسم بالكامل"
                    placeHolderEn="Full name"
                    icon={faUser}
                    name="name"
                    language={language}
                  />
                  <Input
                    type="text"
                    value={username}
                    onChange={this.changeInput}
                    placeHolderAr="اسم المستخدم"
                    placeHolderEn="Username"
                    icon={faUser}
                    name="username"
                    language={language}
                  />
                  <Input
                    type="email"
                    value={email}
                    onChange={this.changeInput}
                    placeHolderAr="البريد الالكتروني"
                    placeHolderEn="Email"
                    icon={faMailBulk}
                    name="email"
                    language={language}
                  />
                  <Input
                    type="password"
                    value={password}
                    onChange={this.changeInput}
                    placeHolderAr="الرقم السري"
                    placeHolderEn="Password"
                    icon={faUnlock}
                    name="password"
                    language={language}
                  />
                  <ValidatePhone
                    code={code}
                    codeSent={codeSent}
                    counting={counting}
                    phone={phone}
                    validCode={validCode}
                    language={language}
                    changePhone={this.changeInput}
                    sendCode={this.sendCode}
                    editPhone={this.editPhone}
                    validateCode={this.validateCode}
                  />
                  <div className="buttons-group">
                    <button
                      type="button"
                      disabled={this.validData()}
                      onClick={() => {
                        register({ username, password, name, email, phone });
                      }}
                    >
                      {language === "ar" ? "انشاء حساب" : "CREATE ACCOUNT"}
                    </button>
                  </div>
                  <div className="link-group">
                    <p>
                      {language === "ar"
                        ? "لديك حساب بالفعل  ؟ "
                        : "have account ? "}
                      <Link href="/login">
                        <a>{language === "ar" ? "تسجيل الدخول" : "Login"}</a>
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
  register: onRegister,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
