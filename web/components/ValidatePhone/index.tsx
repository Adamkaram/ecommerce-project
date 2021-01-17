import React from "react";
import Input from "./Input";
import MainInput from "../Input";
import { faPhone, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

interface Props {
  phone: number;
  codeSent: boolean;
  counting: number;
  code: string;
  validCode: boolean;
  changePhone: (name: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  language: string;
  sendCode: () => void;
  editPhone: () => void;
  validateCode: () => void;
}

const ValidatePhone: React.FC<Props> = ({
  phone,
  code,
  codeSent,
  counting,
  validCode,
  changePhone,
  language,
  sendCode,
  editPhone,
  validateCode,
}) => {
  const notSent = () => {
    return (
      <div className="phone-container">
        <Input
          type="number"
          value={phone}
          onChange={changePhone}
          placeHolderAr="رقم الهاتف الخاص بك"
          placeHolderEn="Phone number"
          icon={faPhone}
          name="phone"
          language={language}
        />
        <Button
          block
          variant="info"
          disabled={disableSend()}
          onClick={() => sendCode()}
        >
          {language === "ar" ? "تحقق من الرقم" : "validate phone"}
        </Button>
      </div>
    );
  };

  const sent = () => {
    if (!validCode) {
      return (
        <div>
          <MainInput
            type="text"
            value={code}
            onChange={changePhone}
            placeHolderAr="كود التحقق"
            placeHolderEn="Verification code"
            icon={faCheckCircle}
            name="code"
            language={language}
          />
          <Button block onClick={() => validateCode()}>
            {language === "ar" ? "تحقق" : "validate"}
          </Button>
          <span>
            {language === "ar"
              ? "يمكنك اعادة ارسال رسالة بعد"
              : "you can ask for new message after"}
            {` ${counting} ثانية`}
            <Button
              variant="link"
              disabled={counting > 0}
              onClick={() => sendCode()}
            >
              {language === "ar" ? "اعادة ارسال" : "Send new message"}
            </Button>
            او
            <Button variant="link" onClick={() => editPhone()}>
              {language === "ar" ? "تغيير الرقم" : "Change number"}
            </Button>
          </span>
        </div>
      );
    }
    return <p>تم التحقق من رقم الهاتف</p>;
  };

  const _validate = () => {
    if (!codeSent) return notSent();
    return sent();
  };

  const disableSend = () => {
    if (!phone) {
      return true;
    }
    const stringPhone = phone.toString();
    if (stringPhone.length === 9 && stringPhone[0] == "5") {
      return false;
    }
    return true;
  };

  return _validate();
};

export default ValidatePhone;
