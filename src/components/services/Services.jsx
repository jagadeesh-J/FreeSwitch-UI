/*eslint-disable no-eval */
import React, { useEffect, useState, Fragment, useRef } from 'react';
import { Row, Col, Button, Container, Text, Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import { List, Avatar } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from "../header/Header";
import serviceRequest from '../../serviceRequest';
import classNames from 'classnames';
import "./Services.scss";
const data = [
  {
    title: 'Request CLI',
    image: 'cogs'
  },
  {
    title: 'Ngnix',
    image: 'cogs'
  }
];
const Services = props => {
  const [xmlData, setXmlData] = useState();
  const xml = useRef();
  useEffect(() => {
    async function getData() {
      const xmlData = await serviceRequest.getXmlData('xmldataupdate');
      if(xmlData && xmlData.xml) setXmlData(xmlData.xml);
    }
    getData();
  }, []);
  const display = xmlData && xmlData.length > 0 ? true : false;
  return (
    <Col md={12} xl={10} id="services" className={classNames(props.isToggle ? '' : 'flexBasis', 'h-100 overflow-hidden')}>
      <Header setAuth={props.setAuth} />
      <Row className="mx-0 text-dark">
        <Col xs={12} className='pr-0 mBtmPx'>
          <h4 className='text-secondary mb-0'>Services</h4>
        </Col>
      </Row>
      <Container fluid className='px-0 hFixScroll'>
        <Row noGutters={true} className="justify-content-between px-3">
          <Col sm={12} className="mBtmPx">
              <div className="mr-3 card p-3 shadow-sm">
              <div className="text-dark">
              <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<h6>{item.title}</h6>}
                        description={
                          <React.Fragment>
                          <button type="button" className="m-1 btn btn-outline-primary p-1" size="sm">Start</button>
                          <button type="button" className="m-1 btn btn-outline-danger p-1" size="sm">Stop</button>
                          <OverlayTrigger
                            key={index}
                            placement='bottom'
                            overlay={
                              <Tooltip className="toolTip" id={`tooltip-${index}`}>
                                Refresh
                              </Tooltip>
                            }
                          >
                          <button type="button" className="m-1 btn btn-outline-success p-1" size="sm"><FontAwesomeIcon variant="secondary" icon="redo" /></button>
                          </OverlayTrigger>
                          </React.Fragment>}
                      />
                    </List.Item>
                  )}
                />
              </div>
              </div>
          </Col>
        </Row>
      </Container>
    </Col>
  );
};

export default Services;
