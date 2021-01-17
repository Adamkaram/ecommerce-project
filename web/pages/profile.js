import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import Taps from "../components/Profile/Taps/Taps";
import Content from "../components/Profile/Content/Content";
import * as ProfileAction from "../redux/actions/ProfileAction";

const Profile = ({ language, getOrders }) => {
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div
      style={{
        direction: language === "en" ? "ltr" : "rtl",
        textAlign: language === "en" ? "left" : "right",
      }}
      className="profile"
    >
      <Container>
        <Tab.Container id="left-tabs-example" defaultActiveKey="user">
          <Row>
            <Taps />
            <Content />
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    language: state.user.language,
  };
};

const mapDispatchToProp = dispatch => {
  return {
    getOrders: () => dispatch(ProfileAction.getData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(Profile);
