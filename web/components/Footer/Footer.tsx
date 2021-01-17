import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faSnapchatGhost, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import * as ProfileActions from "../../redux/actions/ProfileAction";

import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Link from "next/link";
import { getAllChildren } from "../../redux/actions/productAction";
import translator from "../../utils/Translator";

interface Props {
  categories: Array<any>;
  children: Array<any>;
  language: any
  constants: any
}

const Footer: React.FC<Props> = ({
  categories,
  children,
  language,
  constants
}) => {
  const getCall = () => {
    const call = constants.filter(item => {
      return item.key == "contact_call";
    });
    return call[0]?.value;
  };

  const getTwitter = () => {
    const whats = constants.filter(item => {
      return item.key == "twitter";
    });
    return whats[0]?.value;
  };

  const getSnap = () => {
    const whats = constants.filter(item => {
      return item.key == "snap";
    });
    return whats[0]?.value;
  };

  const getInsta = () => {
    const whats = constants.filter(item => {
      return item.key == "insta";
    });
    return whats[0]?.value;
  };

  const callWhatsAppNumber = () => {
    const whats = constants.filter(item => {
      return item.key == "contact_whats";
    });
    return whats[0]?.value
  }
  return (
    <div
      style={{
        direction: language === "en" ? "ltr" : "rtl",
        textAlign: language === "en" ? "left" : "right",
      }}
      className="foot"
    >
      <Container>
        <Row className="header">
          <Col xs={12} md={6}>
            <h4>{language === "en" ? "We are always for your service" : "احنا دايما موجودين في خدمتك "}</h4>
          </Col>
          <Col className="conect-footer" xs={12} md={6}>
            <div>
              <span>
                <FontAwesomeIcon size="sm" icon={faPhone}></FontAwesomeIcon>
              </span>
              <div>
                <p>{language === "en" ? "Phone support" : "الدعم علي الهاتف"}</p>
                <p>{getCall()}</p>
              </div>
            </div>
            {/* <div>
              <span>
                <FontAwesomeIcon size="sm" icon={faEnvelope}></FontAwesomeIcon>
              </span>
              <div>
                <p>{language === "en" ? "Email support" : "الدعم علي البريد"}</p>
                <p>010215548858</p>
              </div>
            </div> */}
          </Col>
        </Row>
        <Row className="list-foot">
          {categories.slice(0, 6).map(items => {
            return (
              <Col key={items._id}>
                <h5>
                  {language === "en" ? items.name.en : items.name.ar}
                </h5>
                <div>
                  <ul>
                    {children.map(child => {
                      if (child.parentId == items._id) {
                        return (
                          <li key={Math.random()} ><Link href={`/search?cat=${child._id}`}>
                            <a>{language === "en" ? child.name.en : child.name.ar}</a>
                          </Link></li>
                        )
                      }
                    })}
                  </ul>
                </div>
              </Col>
            );
          })}
        </Row>
        <Row className="list-foot">
          {categories.slice(6, 99999).map(items => {
            return (
              <Col key={items._id}>
                <h5>
                  {language === "en" ? items.name.en : items.name.ar}
                </h5>
                <div>
                  <ul>
                    {children.map(child => {
                      if (child.parentId == items._id) {
                        return (
                          <li key={Math.random()} ><Link href={`/search?cat=${child._id}`}>
                            <a>{language === "en" ? child.name.en : child.name.ar}</a>
                          </Link></li>
                        )
                      }
                    })}
                  </ul>
                </div>
              </Col>
            );
          })}
        </Row>
        <Row>
          <Col xs={12}>
            <h5>{language === "en" ? "contact us" : "تواصل معانا عبر "}</h5>
            <div>
              <span>
                <a href={getSnap()} target="_blank">
                  <FontAwesomeIcon
                    size="sm"
                    icon={faSnapchatGhost}
                  ></FontAwesomeIcon>
                </a>
              </span>
              <span>
                <a href={getTwitter()} target="_blank">
                  <FontAwesomeIcon size="sm" icon={faTwitter}></FontAwesomeIcon>
                </a>
              </span>
              <span>
                <a href={getInsta()} target="_blank">
                  <FontAwesomeIcon
                    size="sm"
                    icon={faInstagram}
                  ></FontAwesomeIcon>
                </a>
              </span>
              <span>
                <a target="_blank" href={`https://wa.me/${callWhatsAppNumber()}`}>
                  <FontAwesomeIcon icon={faWhatsapp}></FontAwesomeIcon>
                </a>
              </span>
            </div>
          </Col>
          <Col xs={12}>
            <h5>{language === "en" ? "download and install our app" : "قم بتحميل التطبيق"}</h5>
            <div>
              <a href="https://play.google.com/store/apps/details?id=com.laptop" target="_blank">
                <img
                  src="https://www.google.com/intl/en/cast/about/static/images/download-badges/android-download.png"
                  alt="Contact"
                />
              </a>
              <a href="https://apps.apple.com/us/app/%D9%88%D9%8A%D8%A8%D8%A7%D9%8A-%D9%84%D9%84%D8%AA%D8%B3%D9%88%D9%82-webay-shopping/id1487385986" target="_blank">
                <img
                  src="https://www.google.com/intl/en/cast/about/static/images/download-badges/ios-download.svg"
                  alt="Contact"
                />
              </a>
            </div>
          </Col>
        </Row>
        <Row className="privcy-foot">
          <Col xs={12}>
            <div>
              <Link href="/warranty">
                <a>
                  {translator(language).warranty}
                </a>
              </Link>
            </div>
            <div>
              <Link href="/returns">
                <a>
                  {translator(language).returnsPolicy}
                </a>
              </Link>
            </div>
            <div>
              <Link href="/privacy">
                <a>
                  {translator(language).privacy}
                </a>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
      <footer>
        <p>©{new Date().getFullYear()} وي توب. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    language: state.user.language,
    categories: state.product.categories,
    children: state.product.children,
    constants: state.user.constants
  };
};

export default connect(mapStateToProps, null)(Footer);
