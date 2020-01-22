/*eslint-disable no-eval */
import { keyMirror } from "../modules/helpers";
import React from "react";
import { Progress } from "antd";
import moment from "moment";

/**
 * @namespace Constants
 * @desc App constants
 */

/**
 * @constant {Object} ActionTypes
 * @memberof Constants
 */
export const ActionTypes = keyMirror({
  LOAD_APP_CONFIG_LOADING: undefined,
  LOAD_APP_CONFIG_SUCCESS: undefined,
  LOAD_APP_CONFIG_ERROR: undefined
});

/**
 * @constant {Object} STATUS
 * @memberof Constants
 */
export const STATUS = {
  IDLE: "idle",
  RUNNING: "running",
  READY: "ready",
  SUCCESS: "success",
  ERROR: "error"
};

export const datum = [
  {
    id: "FAIL",
    data: [
      {
        x: "01/01",
        y: 0
      },
      {
        x: "02/01",
        y: 70
      },
      {
        x: "03/01",
        y: 30
      },
      {
        x: "04/01",
        y: 80
      }
    ]
  },
  {
    id: "PASS",
    data: [
      {
        x: "01/01",
        y: 20
      },
      {
        x: "02/01",
        y: 0
      },
      {
        x: "03/01",
        y: 80
      },
      {
        x: "04/01",
        y: 50
      }
    ]
  }
];

export const data = [
  {
    runid: "Run 1",
    PASS: 90,
    FAIL: 74
  },
  {
    runid: "Run 2",
    PASS: 145,
    FAIL: 181
  },
  {
    runid: "Run 3",
    PASS: 155,
    FAIL: 34
  }
];

export const dataSource = [
  {
    key: "1",
    ssuite: "Test_SS",
    suite: "Test_Suite",
    curiteration: 1,
    progress: "7/50",
    starttime: "01/01"
  }
];

export const columns = [
  {
    title: "Super Suite",
    dataIndex: "ssuite",
    key: "ssuite"
  },
  {
    title: "Suite",
    dataIndex: "suite",
    key: "suite"
  },
  {
    title: "Current Iteration",
    dataIndex: "curiteration",
    key: "curiteration"
  },
  {
    title: "Progress",
    dataIndex: "progress",
    key: "progress"
  },
  {
    title: "Start Time",
    dataIndex: "starttime",
    key: "starttime"
  }
];

export const pastSource = [
  {
    key: "1",
    ssuite: "Test_SS1",
    suite: "Test_Suite1",
    noiteration: 2,
    status: "49/50",
    duration: "3hrs",
    action: "Result"
  },
  {
    key: "2",
    ssuite: "Test_SS2",
    suite: "Test_Suite2",
    noiteration: 1,
    status: "7/50",
    duration: "3hrs",
    action: "In Progress"
  }
];

export const pastCol = [
  {
    title: "Super Suite",
    dataIndex: "ssuite",
    key: "ssuite"
  },
  {
    title: "Suite",
    dataIndex: "suite",
    key: "suite"
  },
  {
    title: "Number of Iterations",
    dataIndex: "noiteration",
    key: "noiteration"
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration"
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
  {
    title: "Status(Pass/Fail)",
    dataIndex: "status",
    key: "status"
  },
];
export const treeDatas = [
  {
    children: [
      {
        children: [
          {
            children: [{ isLeaf: true, title: "Clock_Generation_Delay" }],
            key: "0-0-0",
            title: "staopconstraint"
          },
          {
            children: [{ isLeaf: true, title: "importing_hdl_file" }],
            key: "0-0-1",
            title: "importing_hdl"
          },
          {
            children: [{ isLeaf: true, title: "dynamic_switching_CoreABC" }],
            key: "0-0-2",
            title: "dynamic_switching_CoreABC"
          }
        ],
        key: "0-0",
        title: "STA"
      }
    ],
    key: "0",
    title: "SmartFusion2"
  },
  {
    children: [
      {
        children: [
          {
            children: [
              { isLeaf: true, title: "Inferring_assymetric_RAM_case2" }
            ],
            key: "1-0-0",
            title: "Inferring_Asymmetric_RAM_case2"
          },
          {
            children: [
              { isLeaf: true, title: "Inferring_assymetric_RAM_case1" }
            ],
            key: "1-0-1",
            title: "Inferring_Asymmetric_RAM_case1"
          }
        ],
        key: "1-0",
        title: "STA"
      }
    ],
    key: "1",
    title: "PolarFire"
  }
];
export const activeHeader = [
  {
    key: 'runid',
    dataIndex: 'runid',
    title: 'Run ID',
    // sorter: (a, b) => a.runid.localeCompare(b.runid, 'es', {sensitivity: 'base'}),
  },
  {
    key: 'supersuite',
    dataIndex: 'supersuite',
    title: 'SuperSuite',
    render: value => value.join(', ')
    // sorter: (a, b) => a.supersuite.localeCompare(b.supersuite, 'es', {sensitivity: 'base'}),
  },
  {
    key: 'suite',
    dataIndex: 'suite',
    title: 'Suite',
    // sorter: (a, b) => a.suite.localeCompare(b.suite, 'es', {sensitivity: 'base'}),
  },
  {
    key: 'rundate',
    dataIndex: 'rundate',
    title: 'Date',
    render: value => moment(value).format('YYYY-MM-DD')
    // sorter: (a, b) => moment(a.rundate) - moment(b.rundate),
  },
  {
    key: 'progress',
    dataIndex: 'progress',
    title: 'Progress',
    // sorter: (a, b) => eval(a.progress)*100 - eval(b.progress)*100,
    render: value => {
      return <Progress percent={eval(value)*100} status="active" />;
    }
  }
];
export const pastHeader = [
  {
    key: 'runid',
    dataIndex: 'runid',
    title: 'Run ID',
  },
  {
    key: 'supersuite',
    dataIndex: 'supersuite',
    title: 'SuperSuite',
  },
  {
    key: 'suite',
    dataIndex: 'suite',
    title: 'Suite',
  },
  {
    key: 'rundate',
    dataIndex: 'rundate',
    title: 'Date',
    render: value => moment(value).format('YYYY-MM-DD')
  },
  {
    key: 'status',
    dataIndex: 'status',
    title: 'Status(Pass/Fail)',
    render: text => {
      let color = '';
      if (text.toLowerCase() === 'fail')
        color = '#e55039';
      else if (text.toLowerCase() === 'pass')
        color = '#6ab04c';
      else if (text.toLowerCase() === 'active')
        color = '#FF8C00';
      return <span style={{color: color}}>{text}</span>;
    }
  },
];
export const pieChart = [
  {
    "id": "lisp",
    "label": "lisp",
    "value": 406,
    "color": "hsl(104, 70%, 50%)"
  },
  {
    "id": "java",
    "label": "java",
    "value": 403,
    "color": "hsl(121, 70%, 50%)"
  },
  {
    "id": "haskell",
    "label": "haskell",
    "value": 139,
    "color": "hsl(270, 70%, 50%)"
  },
  {
    "id": "make",
    "label": "make",
    "value": 353,
    "color": "hsl(25, 70%, 50%)"
  },
  {
    "id": "hack",
    "label": "hack",
    "value": 571,
    "color": "hsl(286, 70%, 50%)"
  }
];
