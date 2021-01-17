import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import translator, { Language } from "../../../utils/Translator";
import { connect } from "react-redux";
import { Dropdown } from "react-bootstrap";
import Link from "next/link";

interface Props {
  language: Language;
  favorites: string;
}

const LoginUser: React.FC<Props> = ({ language, favorites }) => {
  const strings = translator(language);
  return (
    <>
      {/* <span>
        <FontAwesomeIcon className="searchIcon" icon={faUser} size="lg" />
        <p>{strings.account}</p>
      </span> */}

      <Dropdown>
        <Dropdown.Toggle
          id="account-menu"
          variant="link"
          style={{ color: "#fff" }}
        >
          {/* <FontAwesomeIcon className="searchIcon" icon={faUser} size="lg" /> */}
          <FontAwesomeIcon className="searchIcon" icon={faUser} size="lg" />
          {strings.account}
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ textAlign: "inherit" }}>
          <Dropdown.Item>
            <Link href="/profile">
              <a>{strings.account}</a>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link href="/api/logout">
              <a>{strings.logout}</a>
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Link href="/favorites">
        <a>
          <div className="fav-button">
            <div>
              <FontAwesomeIcon icon={faHeart} />
              <div>
                <p>{favorites.length}</p>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
};

const mapStateToProps = state => {
  return {
    language: state.user.language,
    favorites: state.profile.favorites,
  };
};

export default connect(mapStateToProps)(LoginUser);
