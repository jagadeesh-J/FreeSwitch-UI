/*eslint-disable no-eval */
import React, { useEffect, useState, Fragment, useRef } from 'react';
import { Row, Col, Button, Container, Form } from "react-bootstrap";
import Header from "../header/Header";
import { Collapse } from "antd";
import serviceRequest from '../../serviceRequest';
import classNames from 'classnames';
import './Extensions.scss';
const Extensions = props => {
  const { Panel } = Collapse;
  const [extansionData, setExtansionData] = useState([]);
  useEffect(() => {
    async function getData() {
      const data = await serviceRequest.getXmlData('xmlfiles');
      if(data && data.xml) setExtansionData(data.xml);
    }
    getData();
  }, []);
  const disabled = extansionData.length > 0 ? true : false;
  return (
    <Col md={12} xl={10} id="extensions" className={classNames(props.isToggle ? '' : 'flexBasis', 'h-100 overflow-hidden')}>
      <Header setAuth={props.setAuth} />
      <Row className="mx-0 text-dark">
        <Col xs={12} className='pr-0 mBtmPx'>
          <h4 className='text-secondary mb-0'>Extensions Editor</h4>
        </Col>
      </Row>
      <Container fluid className='px-0 hFixScroll'>
        <Row noGutters={true} className="justify-content-between px-3">
          <Col sm={12} className="mBtmPx">
          <div className="mr-3 card p-3 shadow-sm">
          <Collapse bordered={false} defaultActiveKey={['0']} accordion>
          {
            extansionData && extansionData.length > 0 ? extansionData.map((value, index) => {
              return <Panel header={value.file_name} className="customPanelStyle" key={index}>
                <p>{ value.file_content ?
                  <Form.Group>
                    <Form.Control border={false} as="textarea" defaultValue={value.file_content} onChange={(e) => setExtansionData(e.target.value)} />
                  </Form.Group> : 'Nodata'}</p>
                </Panel>
              }) : <Panel header="No Data" key="1">
            </Panel>
          }
              </Collapse>
              <div className={disabled ? "text-right pt-3" : 'd-none'}>
                <Button className="m-1 btn-sm">Delete Application</Button>
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

export default Extensions;
