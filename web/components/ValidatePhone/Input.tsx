import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  value: string | number;
  type: string;
  onChange: (name: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolderAr: string;
  placeHolderEn: string;
  language: string;
  icon: IconDefinition;
  name: string;
}

const Input: React.FC<Props> = ({
  value,
  type,
  onChange,
  placeHolderAr,
  placeHolderEn,
  language,
  icon,
  name,
}) => {
  return (
    <div className="inputs-group">
      <p
        style={{
          position: "absolute",
          left: language === "ar" ? "2%" : "90%",
          top: "50%",
          transform: "translate(-0%, -50%)",
          direction: "ltr",
          color: "#777",
        }}
      >
        +966
      </p>
      <input
        type={type}
        value={value}
        onChange={e => onChange(name, e)}
        placeholder={language === "ar" ? placeHolderAr : placeHolderEn}
        maxLength={9}
      />
      <FontAwesomeIcon
        icon={icon}
        style={{
          right: language === "ar" ? "12px" : null,
          left: language === "en" ? "12px" : null,
        }}
      />
    </div>
  );
};

export default Input;
