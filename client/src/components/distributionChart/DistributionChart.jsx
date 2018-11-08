import React from 'react';
import { GradientDarkgreenGreen } from '@vx/gradient';
import { scaleBand, scaleLinear } from "@vx/scale";
import { AxisBottom, AxisLeft } from "@vx/axis";
import { Group } from "@vx/group";
import { Bar } from "@vx/shape";

export default function DistributionChart(props) {
  const { data, width, height } = props; 
  
  const chartData = data.map((count, index) => ({ count, range: `range-label${index}`}));

  const x = d => d.range;
  const y = d => d.count;

  const margin = {
    top: 35,
    bottom: 30,
    left: 20,
    right: 10
  };

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const xScale = scaleBand({
    rangeRound: [0, xMax],
    domain: chartData.map(x),
    padding: 0.3
  });
  
  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, Math.max(...chartData.map(y))]
  });
  
  return (
    <React.Fragment>
      <GradientDarkgreenGreen id="gradient" />
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={`url(#gradient)`}
      />
      <Group top={margin.top} left={margin.left}>
        <AxisLeft
          tickLabelProps={() => ({
            fill: '#ffffff',
            fontSize: 9,
          })}
          hideAxisLine
          hideTicks
          scale={yScale}
          top={0}
          left={0}
        />
        <AxisBottom
          left={10}
          tickFormat={(value, index) => {
            
            return `${index || ''}0m - ${index + 1}0m`
         
          }}
          tickLabelProps={(value, index) => ({
            fill: '#ffffff',
            fontSize: 9,
            textAnchor: 'middle',
          })}
          hideAxisLine
          hideTicks
          scale={xScale}
          top={yMax}
        />
        <Group top={0} left={10}>
          {chartData.map((d, i) => {
            const barHeight = yMax - yScale(y(d));
            return (
              <Group key={`bar-${x(d)}`}>
                <Bar
                  width={xScale.bandwidth()}
                  height={barHeight}
                  x={xScale(x(d))}
                  y={yMax - barHeight}
                  fill="rgba(23, 233, 217, .5)"
                  data={{ x: x(d), y: y(d) }}
                />
              </Group>
            );
          })}
        </Group>
      </Group>
    </React.Fragment>
  );
}
