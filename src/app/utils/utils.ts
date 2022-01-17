import * as d3 from 'd3';

const colorScale = d3
  .scaleLinear()
  .domain([1, 3.5, 6])
  // @ts-ignore
  .range(['#2c7bb6', '#ffffbf', '#d7191c'])
  // @ts-ignore
  .interpolate(d3.interpolateHcl);

  export { colorScale };
