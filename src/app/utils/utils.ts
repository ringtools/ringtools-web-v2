import * as d3 from 'd3';

const colorScale = d3
  .scaleLinear()
  .domain([1, 3.5, 6])
  // @ts-ignore
  .range(['#2c7bb6', '#ffffbf', '#d7191c'])
  // @ts-ignore
  .interpolate(d3.interpolateHcl);

const copyToClipboard = (data: string) => {
  const listener = (e: ClipboardEvent) => {
    if (!e.clipboardData) return;
    e.clipboardData.setData('text/plain', data);
    e.preventDefault();
    document.removeEventListener('copy', listener);
  };
  document.addEventListener('copy', listener);
  document.execCommand('copy');
};

const stringToBoolean = (string: string) => {
  switch (string.toLowerCase().trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true;

    case 'false':
    case 'no':
    case '0':
    case null:
      return false;

    default:
      return Boolean(string);
  }
};

export { colorScale, copyToClipboard, stringToBoolean };
