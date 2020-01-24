/*eslint-disable no-eval */
import React, { useEffect, useState, Fragment, useRef } from 'react';
import { Row, Col, Button, Container } from "react-bootstrap";
import Header from "../header/Header";
import { Table, Input, Popconfirm, Form } from "antd";
import moment from "moment";
import "./Dashboard.scss";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import serviceRequest from '../../serviceRequest';
import { columns } from '../../constants';
import classNames from 'classnames';
import EditableCell from '../editTable/Table';

const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);

const Dashboard = props => {
  const [editing, setEditing] = useState(false);
  const [configVariables, setconfigVariables] = useState([]);
  useEffect(() => {
    async function getData() {
      const varibles = await serviceRequest.getXmlData('getxml');
      setconfigVariables(varibles);
    }
    getData();
  }, []);
const updateData = async(e, preData, index) => {
  const data = await serviceRequest.updateConfigVariables(e);
  preData[index].name = data[0].name;
  preData[index].value = data[0].newValue;
  setconfigVariables(preData);
}
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
            {configVariables && configVariables.length > 0 ? <EditableCell data={configVariables} changeEvent = {updateData} /> : <h4 className='position-absolute posCenter text-secondary'>No Data</h4>}
            </div>
          </Col>
        </Row>
      </Container>
    </Col>
  );
};

export default Dashboard;
