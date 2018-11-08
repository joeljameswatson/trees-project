import React from 'react';
import { GradientDarkgreenGreen } from '@vx/gradient';
import { scaleBand, scaleLinear } from "@vx/scale";
import { AxisBottom, AxisLeft } from "@vx/axis";
import { Group } from "@vx/group";
import { Bar } from "@vx/shape";

export default function DistributionChart(props) {
  const { data, width, height } = props; 
    
  const x = d => d.range;
  const y = d => d.count;

  const margin = {
    top: 35,
    bottom: 35,
    left: 35,
    right: 20
  };

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const xScale = scaleBand({
    rangeRound: [0, xMax],
    domain: data.map(x),
    padding: 0.1
  });
  
  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, Math.max(...data.map(y))]
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
          hideAxisLine
          hideTicks
          scale={yScale}
          top={0}
          left={0}
        />
        <AxisBottom
          hideAxisLine
          hideTicks
          scale={xScale}
          top={yMax}
        />
        <Group top={0}>
          {data.map((d, i) => {
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
