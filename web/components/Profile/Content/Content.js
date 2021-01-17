import React from "react";
import { Col, Tab } from "react-bootstrap";
import User from "./User/User";
import MyLocations from "./MyLocations/MyLocations";
import Orders from "./Orders/Orders";
import Wallet from "./Wallet/Wallet";
import Points from "./Points/Points";
import Returns from "./Returns/Returns";
import Delayed from "./Delayed/Delayed";
import { connect } from "react-redux";
import { userAuthMessages } from "../../../config/constants";

const Content = ({language}) => {
  return (
    <Col lg={9}>
      <Tab.Content>
        <Tab.Pane eventKey="user">
          <User language={language}/>
        </Tab.Pane>
        <Tab.Pane eventKey="orders">
          <Orders language={language}/>
        </Tab.Pane>
        <Tab.Pane eventKey="locations">
          <MyLocations language={language}/>
          {/* <Locations /> */}
        </Tab.Pane>
        <Tab.Pane eventKey="wallet">
          <Wallet language={language}/>
        </Tab.Pane>
        <Tab.Pane eventKey="points">
          <Points language={language}/>
        </Tab.Pane>
        <Tab.Pane eventKey="returns">
          <Returns language={language}/>
        </Tab.Pane>
        <Tab.Pane eventKey="delayed">
          <Delayed language={language}/>
        </Tab.Pane>
      </Tab.Content>
    </Col>
  );
};

const mapStateToProps = state => {
  return {
    language:state.user.language
  }
}

export default connect(mapStateToProps)(Content);
