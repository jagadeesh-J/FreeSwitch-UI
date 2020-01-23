/*eslint-disable no-eval */
import React, { useEffect, useState, Fragment, useRef } from 'react';
import { Row, Col, Button, Container } from "react-bootstrap";
import Header from "../header/Header";
import { Collapse } from "antd";
import moment from "moment";
import serviceRequest from '../../serviceRequest';
import classNames from 'classnames';
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const Extensions = props => {
  const { Panel } = Collapse;
  const [extansionData, setExtansionData] = useState([]);
  useEffect(() => {
    async function getData() {
      const data = await serviceRequest.getExtentionData();
      if(data && data.xml) setExtansionData(data.xml);
    }
    getData();
  }, []);
  return (
    <Col md={12} xl={10} className={classNames(props.isToggle ? '' : 'flexBasis', 'h-100 overflow-hidden')}>
      <Header setAuth={props.setAuth} />
      <Row className="mx-0 text-dark">
        <Col xs={12} className='pr-0 mBtmPx'>
          <h4 className='text-secondary mb-0'>Extensions Editor</h4>
        </Col>
      </Row>
      <Container fluid className='px-0 hFixScroll'>
        <Row noGutters={true} className="justify-content-between px-3">
          <Col sm={12} className="mBtmPx">
          <Collapse defaultActiveKey={['0']} accordion>
          {
            extansionData && extansionData.length > 0 ? extansionData.map((value, index) => {
              return <Panel header={value.file_name} key={index}>
                <p>{value.file_content}</p>
                </Panel>
              }) : <Panel header="No Data" key="1">
              <p>{text}</p>
            </Panel>
          }
              </Collapse>
              <div className="float-right">
                <Button className="m-1">Delete Application</Button>
                <Button className="m-1">Revert</Button>
                <Button className="m-1">Save Application</Button>
              </div>
          </Col>
        </Row>
      </Container>
    </Col>
  );
};

export default Extensions;
