import React, { Fragment } from 'react';
import { ResponsiveBar } from "@nivo/bar";

const BarChart = (props) => {
  const legendY = props.title === 'runsbar' ? "value" : "number of designs";
  const indexBy = props.title === 'runsbar'  ? "runid-libv" : "runid";
  const anchor = props.anchor;
  const direction = props.direction;
  const tranX = props.tranX;
  const tranY = props.tranY;
  return (
      <ResponsiveBar
        data={props.data}
        keys={props.barkeys}
        indexBy={indexBy}
        margin={props.marginSet}
        padding={0.2}
        onMouseEnter={(_data, event) => {
          event.target.style.cursor = props.title === 'runsbar' ? 'default' : 'pointer';
        }}
        innerPadding={props.title === 'runsbar' ? 0 : 2}
        groupMode={props.barType}
        enableLabel={false}
        axisTop={null}
        axisRight={null}
        enableGridX={false}
        labelTextColor='#ffffff'
        colors={props.title === 'runsbar' ? { scheme: "category10" } : ['#e55039', '#6ab04c']}
        enableGridY={false}
        onClick={props.handleBarSelection}
        tooltip={({ id, value, color, data }) => (
          <table style={{ color }}>
            <tbody>
              <tr><td className='pl-1'><strong>Run ID: </strong></td><td className='px-2 pl-1'>{data[indexBy]}</td></tr>
              {props.title !== 'runsbar' && <Fragment>
              <tr><td className='pl-1 text-nowrap'><strong>Libero Version: </strong></td><td className='px-2 pl-1'>{data.liberoversion}</td></tr>
              <tr><td className='pl-1'><strong>SuperSuite: </strong></td><td className='px-2 pl-1'>{data.supersuite.join(', ')}</td></tr>
              <tr><td className='pl-1'><strong>Suite: </strong></td><td className='px-2 pl-1'>{data.suite.join(', ')}</td></tr>
              <tr><td className='pl-1'><strong>Group: </strong></td><td className='px-2 pl-1'>{data.group.join(', ')}</td></tr></Fragment>}
              <tr><td className='pl-1'><span className="text-capitalize"><strong>{id}: </strong></span></td><td className='px-2 pl-1'>{value}</td></tr>
            </tbody>
          </table>
        )}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: legendY,
          legendPosition: "middle",
          legendOffset: -40
        }}
        axisBottom={{
          tickRotation: -30,
          tickPadding: 10,
          tickSize: 5,
          format: v => v.length > 10 ? v.substr(0, 10) + '...' : v
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: anchor,
            direction: direction,
            justify: false,
            translateX: tranX,
            translateY: tranY,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        animate={true}
      />
  );
};

export default BarChart;
