import React from "react";

interface Style {
  [thingName: string]: React.CSSProperties;
}
const createStyle = <M extends Style>(styles: M) => styles;

export default createStyle;
