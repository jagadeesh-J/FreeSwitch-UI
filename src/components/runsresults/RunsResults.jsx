import React, { useEffect, useState, Fragment } from "react";
import { Row, Col, Button, Container, Alert } from "react-bootstrap";
import Header from "../header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TreeView from "./TreeView";
import { Table, Menu, Dropdown, Icon, DatePicker } from "antd";
import LineChart from "../dashboard/LineChart";
import MenuItem from "antd/lib/menu/MenuItem";
// import SubMenu from "antd/lib/menu/SubMenu";
import serviceRequest from '../../serviceRequest';
import DropDownBox from './Dropdown';
import moment from "moment";
import './RunsResults.scss';
import BarChart from "../dashboard/BarChart";
import classNames from 'classnames';

const RunsResults = props => {
  const [noData, setnoData] = useState(false);
  const [trendData, setTrendData] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [runsData, setRunsData] = useState([]);
  const [isCSVLoad, setCSVLoading] = useState(false);
  const [isPDFLoad, setPDFLoading] = useState(false);
  const [fieldParams, setFieldParams] = useState([]);
  const [runsDataHeaders, setRunsDataHeaders] = useState([]);
  const [chartList, setChartList] = useState([]);
  const [chartType, setChartType] = useState('stacked');
  const [stackDetails, setStackDetails] = useState([]);
  const dateFormat = "YYYY-MM-DD";
  const { RangePicker } = DatePicker;
  const [show, setShowName] = useState(false);
  const [preTreeData, setPreTreeData] = useState({});
  const [noTrendData, setNoTrendData] = useState(false);
  const [dateRange, setDateRange] = useState([moment().subtract(7, 'days'), moment()]);
  const header = ['SuperSuite', 'Suite', 'Group', 'TestName', 'runtime', 'Run ID', 'qor', 'Run Date', 'Libero Version'];
  // const [visibleField, setVisibleField] = useState(false);
  const [barKeys, setBarKeys] = useState([]);

  // const handleFieldVisible = (flag) => {
  //   setVisibleField(flag);
  // }
  const handleCommonCalls = async (datatree) => {
    if (dateRange.length < 2) {
      setShowName(true);
      return;
    }
    const commonData = {
      start_date: dateRange[0].format(dateFormat),
      end_date: dateRange[1].format(dateFormat),
      auxiliary: []
    };
    fieldParams.forEach(item => {
      if (item.forceParameters.length > 0)
        commonData[item.type.toLowerCase()] = item.forceParameters.filter(n => n !== null && n.length > 0 && n);
      else if (item.check) {
        commonData.auxiliary.push(item.type);
      }
    });
    const RunsData = {
      ...datatree,
      ...commonData,
      pgsize: 10000,
      pgno: 1,
    }
    const RunsGraphData = {
      ...datatree,
      ...commonData,
    }
    const trend = await serviceRequest.getResultsRunsDetailGraph(RunsGraphData);
    const runsStacked = await serviceRequest.getResultsRunsStackDetail(RunsGraphData);
    const runsDetail = await serviceRequest.getResultsRunsDetail(RunsData);
    let flag = 0;
    if (trend && trend.data)
    trend.data = trend.data.filter(item => {
      if (item.data.length > 0)
        flag = 1;
      return item.id.toLowerCase() !== 'qor'; 
    });
    if (runsDetail && runsDetail.data) {
      runsDetail.data = runsDetail.data.map((d, i) => {
        d.key = i;
        return d;
      });
      runsDetail.headers = runsDetail.headers.map(item => {
        // data keys are different with header
        const dataIndex = header.indexOf(item) === -1 ? item : item.toLowerCase().replace(' ','');
        const data = {
          'key': dataIndex,
          'dataIndex': dataIndex,
          'title': item === 'runtime' ? `${item} (sec)` : item,
        }
        if (!item.includes('_min_') && !item.includes('_max_')) {
          data["sorter"] = (a, b) => {
            if (typeof a[dataIndex] === 'number')
              return a[dataIndex] - b[dataIndex];
            else
              return a[dataIndex].localeCompare(b[dataIndex], 'es', {sensitivity: 'base'});
          }
        } else {
          data.render = val => {
            return val === null ? '-' : String(val);
          }
        }
        data.width = '10rem';
        if (data.key === 'rundate') {
          data.render = value => {
            return moment(value).format('YYYY-MM-DD HH:mm:ss')
          }
          data.sorter = (a,b) => moment(a.rundate) - moment(b.rundate);
        }
        if (data.key === 'rundate' || data.key === 'testname' || data.key === 'runid' || data.key === 'liberoversion') {
          data.fixed = 'left';
        }
        return data;
      });
      setNoTrendData(flag);
      if (trend && trend.data)
        setTrendData(trend.data);
      if (runsStacked && runsStacked.data && runsStacked.data.length) {
        const keys = Object.keys(runsStacked.data[0]);
        const headerSpice = ['group', 'liberoversion', 'qor', 'rundate', 'runid', 'suite', 'supersuite']
        const barKeys = keys.filter(v => headerSpice.indexOf(v) < 0 && v);
        setBarKeys(barKeys);
        setStackDetails(runsStacked.data);
      }
      setRunsData(runsDetail.data);
      setRunsDataHeaders(runsDetail.headers);
    }
  }
  const handleTreeSelect = (datum) => {
    const { selection, ...datatree } = datum;
    setnoData(selection);
    setPreTreeData(datatree);
    if (selection) {
      handleCommonCalls(datatree);
    }
  };
  const handleAdd = () => {};
  const handleRun = (boolVal) => {
    setnoData(boolVal);
  };

  useEffect(() => {
    async function fetchData() {
      const tree = await serviceRequest.getResultsTree();
      const fieldParam = await serviceRequest.getFieldParams();
      if (fieldParam && fieldParam.data) {
        fieldParam.data.map((val) => {
          val.check = true;
          val.forceParameters = [];
          val.checked = [];
          if (val.parameters)
            val.parameters.forEach(v => {
              val.checked.push(true);
              val.forceParameters.push(v);
            });
          return val;
        });
        setFieldParams(fieldParam.data);
      }
      if (tree && tree.data)
        setTreeData(tree.data);
      setChartList(['Trend', 'Stacked']);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (isPDFLoad) {
      simulateNetworkRequest().then(() => {
        setPDFLoading(false);
      });
    }
  }, [isPDFLoad]);
  const simulateNetworkRequest = () => {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }
  const handleCSVClick = async () => {
    setCSVLoading(true);
    const commonData = {
      start_date: dateRange[0].format(dateFormat),
      end_date: dateRange[1].format(dateFormat),
      auxiliary: []
    };
    fieldParams.forEach(item => {
      if (item.forceParameters.length > 0)
        commonData[item.type.toLowerCase()] = item.forceParameters.filter(n => n !== null && n.length > 0 && n);
      else
        commonData.auxiliary.push(item.type);
    });
    const data = {
      ...preTreeData,
      ...commonData
    };
    const exportCSV = await serviceRequest.getResultsRunsDetailExport(data);
    if(exportCSV) setCSVLoading(false);
  }
  const handlePDFClick = () => {
    setPDFLoading(true);
  }
  const handleChartSelection = item => {
    setChartType(item.key.toLowerCase())
  };
  const handleCheckBox = async (i, event) => {
    fieldParams[i].forceParameters = event.target.checked ? Array.from(fieldParams[i].parameters) : [];
    if (fieldParams[i].parameters) {
      fieldParams[i].parameters.forEach((v, j) => {
        fieldParams[i].checked[j] = event.target.checked ? true : false;
        fieldParams[i].check = event.target.checked ? true : false;
      });
    } else {
      fieldParams[i].check = event.target.checked ? true : false;
    }
    // console.log('handleCheckBox', fieldParams);
    setFieldParams(fieldParams);
    await handleCommonCalls(preTreeData);
  };
  const handleCheckBoxChild = async (i, j, event) => {
    fieldParams[i].check = fieldParams[i].check && event.target.checked ? true : false;
    fieldParams[i].forceParameters[j] = event.target.checked ? event.target.value : fieldParams[i].forceParameters.splice(1, 0);
    fieldParams[i].checked[j] = event.target.checked ? true : false;
    // console.log('handleCheckBoxChild', fieldParams);
    setFieldParams(fieldParams);
    await handleCommonCalls(preTreeData);
  }
  const disabledDate = (current) => {
    return current > moment().endOf('day');
  }
  useEffect(() => {
    if (fieldParams.length > 0)
      handleCommonCalls(preTreeData);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  const menuChart = (
    <Menu selectable onSelect={handleChartSelection} defaultSelectedKeys={['Stacked']}>
      {chartList.length > 0 && chartList.map(item => {
        return <MenuItem key={item}> {item} </MenuItem>
      })}
    </Menu>
  )
  const marginSet = { top: 10, right: 200, bottom: 80, left: 60 };
  const headingTitle = preTreeData && Object.values(preTreeData)[Object.values(preTreeData).length - 1];
  const handleBarSelection = () => {};
  return (
    <Col md={props.isToggle ? 9 : 12} xl={props.isToggle ? 10 : 12} className={classNames(props.isToggle ? '' : 'flexBasis', 'h-100 overflow-hidden')}>
      <Alert className='positionSet' show={show} variant='danger' onClick={() => setShowName(false)} dismissible>
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
          <Button
            onClick={handleAdd}
            hidden
            variant="danger"
            type="button"
            size='sm'
            className="text-nowrap align-top d-none"
          >
            <FontAwesomeIcon className="fa-fw" icon={faPlus} />
            <span>Add new</span>
          </Button>
        </Col>
      </Row>
      <Row className='mx-0'>
        <Col sm={12} className='text-right'>
          <RangePicker
            defaultValue={dateRange}
            format={dateFormat}
            disabled={!noData}
            disabledDate={disabledDate}
            onChange={v => setDateRange(v)}
            className='mr-3 mBtmPx align-top w-30 text-left shadow-sm rounded borderNone'
          />
          <DropDownBox
            fieldParams={fieldParams}
            handleCheckBox={handleCheckBox}
            title="Fields"
            disabled={!noData}
            handleCheckBoxChild={handleCheckBoxChild}/>
          <Dropdown
            overlay={menuChart}
            className='mr-3 mBtmPx'
            disabled={!noData}
            trigger={['click']}>
            <Button size='sm' variant='light' className='shadow-sm bg-white rounded'>
              Charts Type <Icon type="down" className='align-middle' />
            </Button>
          </Dropdown>
          <Button
            size='sm'
            className='mBtmPx bg-white shadow-sm rounded'
            variant='light'
            disabled={!noData || isCSVLoad}
            onClick={!isCSVLoad ? handleCSVClick : null}
          >{isCSVLoad ? 'Downloading...' : 'Export to excel'}
          </Button>
          <Button
            size='sm'
            className='mBtmPx shadow-sm bg-white rounded'
            variant='light'
            hidden
            disabled={!noData || isPDFLoad}
            onClick={!isPDFLoad ? handlePDFClick : null}
          >{isPDFLoad ? 'Downloading...' : 'Export to pdf'}
          </Button>
          <Button
            hidden
            onClick={handleRun}
            variant="danger"
            type="button"
            disabled={!noData}
            size="sm"
            className="text-nowrap mBtmPx d-none"
          > Run
          </Button>
        </Col>
      </Row>
      <Row className='mx-0 hTree'>
        <Col md={4} xl={3} className='h-100'>
          {treeData.length > 0 && <TreeView treeData={treeData} handleTreeSelect={handleTreeSelect} />}
        </Col>
        <Col md={8} xl={9} className='position-relative overflow-auto h-100'>
          {!noData ? <h4 className='position-absolute posCenter text-secondary'>Select any suite</h4> :
          <Fragment>
            {trendData && <Container className='card mBtmPx hChart p-3 shadow-sm' fluid>
            <h4>{headingTitle}</h4>
            {noTrendData && chartType === 'trend' ? 
              <LineChart
                trendData={trendData}
                title='runs'
                marginSet={marginSet}
                anchor='right'
                direction='column'
                tranX={100}
                tranY={0}
              /> : chartType === 'stacked' && stackDetails && stackDetails.length > 0 ?
                <BarChart
                  barType={chartType}
                  data={stackDetails}
                  title='runsbar'
                  handleBarSelection={handleBarSelection}
                  barkeys={barKeys}
                  marginSet={marginSet}
                  anchor='right'
                  direction='column'
                  tranX={100}
                  tranY={0}
                  /> 
                   :
                  <h4 className='position-absolute posCenter text-secondary'>
                    No Data
                  </h4>
              }
          </Container>}
          {runsData && <Container className='card py-2 shadow-sm' fluid>
            <Table tableLayout='fixed' scroll={runsData.length > 0 ? { x: 1000 } : {}} dataSource={runsData} className='text-secondary' pagination={true} columns={runsDataHeaders} />
          </Container>}
          </Fragment>}
        </Col>
      </Row>
    </Col>
  );
};

export default RunsResults;
