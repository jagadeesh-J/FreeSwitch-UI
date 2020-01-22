import React, { Fragment } from "react";
import { ResponsiveLine } from "@nivo/line";

const LineChart = props => {
  const anchor = props.anchor;
  const direction = props.direction;
  const tranX = props.tranX;
  const tranY = props.tranY;
  return (
    <Fragment>
      <ResponsiveLine
        data={props.trendData}
        margin={props.marginSet}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          stacked: false,
          min: "auto",
          max: "auto"
        }}
        colors={
          props.title === "runs"
            ? { scheme: "category10" }
            : ["#6ab04c", "#e55039"]
        }
        axisTop={null}
        axisRight={null}
        enableGridX={false}
        enableGridY={false}
        enableSlices="x"
        sliceTooltip={({ slice }) => {
          return (
            <table
              className='shadow bg-white'
            >
              <thead>
                <tr>
                  <th className='px-2 pl-1' colSpan="2"><strong>{slice.points[0].data.xFormatted}</strong></th>
                </tr>
              </thead>
              <tbody>
              {/* {
                slice.points[0].data.supersuite && <Fragment>
                  <tr><td className='px-2 pl-1'><strong>SuperSuite: </strong></td><td className='px-2 pl-1'>{slice.points[0].data.supersuite.join(', ')}</td></tr>
                  <tr><td className='px-2 pl-1'><strong>Suite: </strong></td><td className='px-2 pl-1'>{slice.points[0].data.suite.join(', ')}</td></tr>
                </Fragment>
              } */}
              {slice.points.map(point => (
                <tr
                  key={point.id}
                  style={{
                    color: point.serieColor,
                  }}
                >
                  <td className='px-2 pl-1'><strong>{point.serieId}: </strong></td>
                  <td className='px-2 pl-1'>{point.data.yFormatted}</td>
                </tr>
              ))}
              </tbody>
            </table>
          );
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "number of designs",
          legendOffset: -40,
          legendPosition: "middle"
        }}
        axisBottom={{
          tickRotation: -30,
          tickPadding: 10,
          tickSize: 5,
          format: v => (v.length > 10 ? v.substr(0, 10) + "..." : v)
        }}
        enablePoints={false}
        useMesh={true}
        legends={[
          {
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
      />
    </Fragment>
  );
};

export default LineChart;
