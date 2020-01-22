/*eslint-disable no-eval */
import React, { useEffect, useState, Fragment, useRef } from 'react';
import { Row, Col, Button, Container } from "react-bootstrap";
import Header from "../header/Header";
import { Switch, DatePicker, Table, Icon, Progress } from "antd";
import moment from "moment";
import "./Dashboard.scss";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import serviceRequest from '../../serviceRequest';
import classNames from 'classnames';

const Dashboard = props => {
  const [barData, setBarData] = useState([]);
  useEffect(() => {
  }, []);
  const marginSet = { top: 10, right: 10, bottom: 80, left: 60 };

  return (
    <Col md={12} xl={10} className={classNames(props.isToggle ? '' : 'flexBasis', 'h-100 overflow-hidden')}>
      <Header setAuth={props.setAuth} />
      <Row className="mx-0 text-dark">
        <Col xs={12} className='pr-0 mBtmPx'>
          <h4 className='text-secondary mb-0'>Dashboard</h4>
        </Col>
      </Row>
      <Container fluid className='px-0 hFixScroll'>
        <Row noGutters={true} className="justify-content-between px-3">
          <Col sm={12} className="mBtmPx">
            <div className="mr-3 hChart card p-3 shadow-sm">
              <h4 className='position-absolute posCenter text-secondary'>No Data</h4>
            </div>
          </Col>
        </Row>
      </Container>
    </Col>
  );
};

export default Dashboard;
