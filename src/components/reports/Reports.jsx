import React, { useEffect, useState, Fragment } from "react";
import { Row, Col, Button, Container, Alert } from "react-bootstrap";
import Header from "../header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Table, Menu, Dropdown, Icon, DatePicker } from "antd";
import LineChart from "../dashboard/LineChart";
import MenuItem from "antd/lib/menu/MenuItem";
import serviceRequest from '../../serviceRequest';
import moment from "moment";
import './Reports.scss';
import classNames from 'classnames';

const Reports = props => {
  const [noData, setnoData] = useState(false);
  const [show, setShow] = useState(false);
  const marginSet = { top: 10, right: 200, bottom: 80, left: 60 };
  const handleBarSelection = () => {};
  return (
    <Col md={props.isToggle ? 9 : 12} xl={props.isToggle ? 10 : 12} className={classNames(props.isToggle ? '' : 'flexBasis', 'h-100 overflow-hidden')}>
      <Alert className='positionSet' show={show} variant='danger' dismissible>
        <span>
          Please select start date and end date
        </span>
      </Alert>
      <Header setAuth={props.setAuth} />
      <Row className="mx-0 text-dark">
        <Col xs={6} className='pr-0 mBtmPx'>
          <h4 className='text-secondary mb-0'>Runs and Results</h4>
        </Col>
        <Col xs={6} className="text-right pl-0 mBtmPx">
        </Col>
      </Row>
    </Col>
  );
};

export default Reports;
