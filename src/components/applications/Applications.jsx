/*eslint-disable no-eval */
import React, { useEffect, useState, Fragment, useRef } from 'react';
import { Row, Col, Button, Container } from "react-bootstrap";
import Header from "../header/Header";
import { Collapse } from "antd";
import moment from "moment";
import serviceRequest from '../../serviceRequest';
import classNames from 'classnames';
const Applications = props => {
  const { Panel } = Collapse;
  const [barData, setBarData] = useState([]);
  useEffect(() => {
  }, []);
  const marginSet = { top: 10, right: 10, bottom: 80, left: 60 };

  return (
    <Col md={12} xl={10} className={classNames(props.isToggle ? '' : 'flexBasis', 'h-100 overflow-hidden')}>
      <Header setAuth={props.setAuth} />
      <Row className="mx-0 text-dark">
        <Col xs={12} className='pr-0 mBtmPx'>
          <h4 className='text-secondary mb-0'>Application Editor</h4>
        </Col>
      </Row>
      <Container fluid className='px-0 hFixScroll'>
        <Row noGutters={true} className="justify-content-between px-3">
          <Col sm={12} className="mBtmPx">
          <div className="mr-3 card p-3 shadow-sm">
          <Collapse bordered={false} defaultActiveKey={['1']} accordion>
              <Panel header="Select Application" className="customPanelStyle" key="1">
              <p>Inbound</p>
              <p>OutBound</p>
              </Panel>
              <Panel header="Urls" key="2">
              <p>http://ip:port/inboundapplicationurl</p>
              <p>http://ip:port/outboundapplicationurl</p>
              </Panel>
              <Panel header="Application Parameters" className="customPanelStyle" key="3">
              <p>Key: value</p>
              </Panel>
              <Panel header="Application Numbers" className="customPanelStyle" key="4">
              <p>Range: 5001-5010</p>
              <p>Range: 5011-5020</p>
              </Panel>
              </Collapse>
              <div className="text-right pt-3">
                <Button className="m-1" size="sm">Delete Application</Button>
                <Button className="m-1" size="sm">Revert</Button>
                <Button className="m-1" size="sm">Save Application</Button>
              </div>
              </div>
          </Col>
        </Row>
      </Container>
    </Col>
  );
};

export default Applications;
