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
      <input
        type={type}
        value={value}
        onChange={e => onChange(name, e)}
        placeholder={language === "ar" ? placeHolderAr : placeHolderEn}
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
