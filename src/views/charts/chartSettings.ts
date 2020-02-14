const avgTemperatureColor = '#E52CC0';
const minTemperatureColor = '#e52cf9';
const maxTemperatureColor = '#ff2cc0';
const fillTemperatureColorStart = '#FF5498';
const fillTemperatureColorEnd = '#FFFFFF00';

export const TemperatureDefaultChartSettings = {
  title: { text: 'Temperatures' },
  tooltip: { trigger: 'axis' },
  grid: { right: '5%', left: '15%' },
  xAxis: {
    type: 'time',
    maxInterval: 3600 * 1000 * 24,
    axisLabel: { color: 'rgba(67, 66, 93, 0.5)', interval: 0 },
    splitLine: { lineStyle: { color: 'rgba(0, 0, 0, 0.1)' }, interval: 0 },
    axisLine: { lineStyle: { color: 'rgba(0, 0, 0, 0.1)' }, interval: 0 },
  },
  yAxis: {
    type: 'value',
    axisLabel: { formatter: '{value} °C', color: 'rgba(67, 66, 93, 0.5)' },
    splitLine: { lineStyle: { color: 'rgba(0, 0, 0, 0.1)' }, interval: 0 },
    axisLine: { lineStyle: { color: 'rgba(0, 0, 0, 0.1)' } },
  },
  dataset: {
    source: [],
    dimensions: ['time', 'avg', 'min', 'max'],
  },
  series: [{
    name: 'average',
    type: 'line',
    smooth: true,
    dimensions: ['time', 'avg'],
    lineStyle: { color: avgTemperatureColor, type: 'solid' },
    itemStyle: { color: avgTemperatureColor },
    tooltip: { position: 'inside' },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0, color: fillTemperatureColorStart // color at 0% position
        }, {
          offset: 1, color: fillTemperatureColorEnd // color at 100% position
        }],
        global: false // false by default
      }
    }
  },
  {
    name: 'minimum',
    type: 'line',
    smooth: true,
    dimensions: ['time', 'min'],
    lineStyle: { color: minTemperatureColor, type: 'dashed' },
    itemStyle: { color: minTemperatureColor },
    tooltip: { position: 'bottom' }
  },
  {
    name: 'maximum',
    type: 'line',
    smooth: true,
    dimensions: ['time', 'max'],
    lineStyle: { color: maxTemperatureColor, type: 'dashed' },
    itemStyle: { color: maxTemperatureColor },
    tooltip: { position: 'top' }
  }]
};