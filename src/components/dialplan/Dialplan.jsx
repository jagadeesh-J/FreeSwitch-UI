/*eslint-disable no-eval */
import React, { useEffect, useState, Fragment, useRef } from 'react';
import { Row, Col, Button, Container, Text } from "react-bootstrap";
import Header from "../header/Header";
import serviceRequest from '../../serviceRequest';
import classNames from 'classnames';
const Dialplan = props => {
  const [xmlData, setXmlData] = useState();
  useEffect(() => {
    async function getData() {
      const xmlData = await serviceRequest.getXmlData('xmldataupdate');
      if(xmlData && xmlData.xml) setXmlData(xmlData.xml);
    }
    getData();
  }, []);
  const display = xmlData && xmlData.length > 0 ? true : false;
  return (
    <Col md={12} xl={10} className={classNames(props.isToggle ? '' : 'flexBasis', 'h-100 overflow-hidden')}>
      <Header setAuth={props.setAuth} />
      <Row className="mx-0 text-dark">
        <Col xs={12} className='pr-0 mBtmPx'>
          <h4 className='text-secondary mb-0'>Dialplan</h4>
        </Col>
      </Row>
      <Container fluid className='px-0 hFixScroll'>
        <Row noGutters={true} className="justify-content-between px-3">
          <Col sm={12} className="mBtmPx">
              <div className="mr-3 card p-3 shadow-sm">
              <div>{xmlData || 'Nodata'}</div>
              <div className={display ? "text-right" : "d-none"}>
                <Button className="m-1">Save</Button>
              </div>
              </div>
          </Col>
        </Row>
      </Container>
    </Col>
  );
};

export default Dialplan;
