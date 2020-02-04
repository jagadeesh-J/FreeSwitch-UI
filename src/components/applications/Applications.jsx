/*eslint-disable no-eval */
import React, { useEffect, useState, Fragment, useRef } from 'react';
import { Row, Col, Button, Container,Form,InputGroup,FormControl } from "react-bootstrap";
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
              {/* <p>Inbound</p>
              <p>OutBound</p> */}
              <Form>
                {['radio'].map(type => (
                  <div key={`default-${type}`} className="mb-3">
                    <Form.Check inline label="Inbound" name="apptype" type={type} id={`inline-${type}-1`} />
                    <Form.Check inline label="Outbound" name="apptype" type={type} id={`inline-${type}-2`} />                    
                  </div>
                ))}
              </Form>
              </Panel>
              <Panel header="Urls" key="2">

              {/* <p>http://ip:port/inboundapplicationurl</p>
              <p>http://ip:port/outboundapplicationurl</p>    */}

              <InputGroup size="sm" className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">URL</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" value="http://ip:port/inboundapplicationurl" />
              </InputGroup>

              <InputGroup size="sm" className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">URL</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" value="http://ip:port/outboundapplicationurl" />
              </InputGroup>
             
              </Panel>
              <Panel header="Application Parameters" className="customPanelStyle" key="3">
              {/* <p>Key: value</p> */}
              <Form>
                <Form.Group as={Row} controlId="formPlaintextEmail">
                  <Form.Label column sm="1">
                    Email
                  </Form.Label>
                  <Col sm="11">
                    <Form.Control plaintext defaultValue="email@example.com" />
                  </Col>
                </Form.Group>
              </Form>
              </Panel>
              <Panel header="Application Numbers" className="customPanelStyle" key="4">
              {/* <p>Range: 5001-5010</p>
              <p>Range: 5011-5020</p> */}
               <Form>
                <Form.Group as={Row} controlId="">
                  <Form.Label column sm="1">
                  Range
                  </Form.Label>
                  <Col sm="">
                    <Form.Control defaultValue="5001" />
                  </Col>
                  <Form.Label column sm="1" className="text-center">
                    -
                  </Form.Label>
                  <Col sm="">
                    <Form.Control defaultValue="5010" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="">
                  <Form.Label column sm="1">
                  Range
                  </Form.Label>
                  <Col sm="">
                    <Form.Control defaultValue="5011" />
                  </Col>
                  <Form.Label column sm="1" className="text-center">
                    -
                  </Form.Label>
                  <Col sm="">
                    <Form.Control defaultValue="5020" />
                  </Col>
                </Form.Group>
              </Form>
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
