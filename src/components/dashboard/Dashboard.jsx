/*eslint-disable no-eval */
import React, { useEffect, useState, Fragment, useRef } from 'react';
import { Row, Col, Button, Container } from "react-bootstrap";
import Header from "../header/Header";
import { Switch, Table, Icon, Progress } from "antd";
import moment from "moment";
import "./Dashboard.scss";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import serviceRequest from '../../serviceRequest';
import classNames from 'classnames';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  },
];

const Dashboard = props => {
  const [barData, setBarData] = useState([]);
  const [configVariables, setconfigVariables] = useState([]);
  useEffect(() => {
    async function getData() {
      const configVariables = await serviceRequest.getConfigVariables();
      console.log('configVariables:', configVariables);
      setconfigVariables(configVariables);
    }
    getData();
  }, []);

  return (
    <Col md={12} xl={10} className={classNames(props.isToggle ? '' : 'flexBasis', 'h-100 overflow-hidden')}>
      <Header setAuth={props.setAuth} />
      <Row className="mx-0 text-dark">
        <Col xs={12} className='pr-0 mBtmPx'>
          <h4 className='text-secondary mb-0'>Configuration Variables</h4>
        </Col>
      </Row>
      <Container fluid className='px-0 hFixScroll'>
        <Row noGutters={true} className="justify-content-between px-3">
          <Col sm={12} className="mBtmPx">
            <div className="mr-3 card p-3 shadow-sm">
            {configVariables.length > 0 ? <Table dataSource={configVariables} columns={columns} /> : <h4 className='position-absolute posCenter text-secondary'>No Data</h4>}              
            </div>
          </Col>
        </Row>
      </Container>
    </Col>
  );
};

export default Dashboard;
