import React, { useState } from "react";

import { Tabs, Tab } from "react-bootstrap";
import { Species, TranslatableString } from "../../../utils/interfaces";
import translator, { Language } from "../../../utils/Translator";
import { connect } from "react-redux";

interface Props {
  description: TranslatableString;
  attr: Species[];
  language: Language;
}

const ControlledTabs: React.FC<Props> = ({ attr, description, language }) => {
  const [key, setKey] = useState("profile");
  const strings = translator(language);

  return (
    <div className="container-tap">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={k => setKey(k)}
      >
        <Tab eventKey="profile" title={strings.specifications}>
          <div className="tablesContainer">
            <table>
              <tbody>
                {attr.map((atr, i) => {
                  return (
                    <tr
                      key={i.toString()}
                      style={{
                        backgroundColor:
                          i % 2 === 0 ? "rgba(94, 92, 230, 0.08)" : "#fff",
                      }}
                    >
                      <td>{atr.title[language]}</td>
                      <td>{atr.details[language]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Tab>
        <Tab eventKey="home" title={strings.details}>
          <div className="view">
            <h6>{strings.details}</h6>
            <p>{description[language]}</p>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    language: state.user.language,
  };
};

export default connect(mapStateToProps)(ControlledTabs);
