////#region GENERAL
const titleColor = '#4D4F5C';
const axisLabelColor = 'rgba(67, 66, 93, 0.5)';
const axisLineColor = 'rgba(0, 0, 0, 0.1)';
const splitLineColor = 'rgba(0, 0, 0, 0.1)';
const gridBorderColor = 'rgba(0, 0, 0, 0.1)';
////#endregion

//#region TEMPERATURE CONFIGS
const avgTemperatureColor = '#E52CC0';
const minTemperatureColor = '#e52cf9';
const maxTemperatureColor = '#ff2cc0';
const fillTemperatureColorStart = '#FF5498';
const fillTemperatureColorEnd = '#FFFFFF00';

export const TemperatureDefaultChartSettings = {
  title: { text: 'Temperatures', textStyle: { color: titleColor } },
  tooltip: { trigger: 'axis' },
  grid: { right: '5%', left: '15%' },
  xAxis: {
    type: 'time',
    maxInterval: 3600 * 1000 * 24,
    axisLabel: { color: axisLabelColor, interval: 0 },
    splitLine: { show: false },
    axisLine: { lineStyle: { color: splitLineColor }, interval: 0 },
  },
  yAxis: {
    type: 'value',
    axisLabel: { formatter: '{value} °C', color: axisLabelColor },
    splitLine: { lineStyle: { color: axisLineColor }, interval: 0 },
    axisLine: { lineStyle: { color: splitLineColor } },
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
////#endregion TEMPERATURE CONFIGS


//#region HUMIDITY CONFIGS
const avgHumidityColor = '#5FE3A1';
const minHumidityColor = '#5fe3d1';
const maxHumidityColor = '#7be3a1';
const fillHumidityColorStart = '#5FE3A1';
const fillHumidityColorEnd = '#5FE3A11C';

export const HumidityDefaultChartSettings = {
  title: { text: 'Humidity', textStyle: { color: titleColor } },
  tooltip: { trigger: 'axis' },
  grid: { right: '5%', left: '15%' },
  xAxis: {
    type: 'time',
    maxInterval: 3600 * 1000 * 24,
    axisLabel: { color: axisLabelColor, interval: 0 },
    splitLine: { show: false },
    axisLine: { lineStyle: { color: splitLineColor }, interval: 0 },
  },
  yAxis: {
    type: 'value',
    axisLabel: { formatter: '{value} %', color: axisLabelColor },
    splitLine: { lineStyle: { color: axisLineColor }, interval: 0 },
    axisLine: { lineStyle: { color: splitLineColor } },
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
    lineStyle: { color: avgHumidityColor, type: 'solid' },
    itemStyle: { color: avgHumidityColor },
    tooltip: { position: 'inside' },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0, color: fillHumidityColorStart // color at 0% position
        }, {
          offset: 1, color: fillHumidityColorEnd // color at 100% position
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
    lineStyle: { color: minHumidityColor, type: 'dashed' },
    itemStyle: { color: minHumidityColor },
    tooltip: { position: 'bottom' }
  },
  {
    name: 'maximum',
    type: 'line',
    smooth: true,
    dimensions: ['time', 'max'],
    lineStyle: { color: maxHumidityColor, type: 'dashed' },
    itemStyle: { color: maxHumidityColor },
    tooltip: { position: 'top' }
  }]
};
////#endregion HUMIDITY CONFIGS


////#region PRESSURE CONFIGS
const avgPressureColor = '#FFA265';
const minPressureColor = '#ffa283';
const maxPressureColor = '#ff8766';
const fillPressureColorStart = '#5FE3A1';
const fillPressureColorEnd = '#5FE3A11C';

export const PressureDefaultChartSettings = {
  title: { text: 'Atmospheric Pressure', textStyle: { color: titleColor } },
  tooltip: { trigger: 'axis' },
  grid: { right: '5%' },
  xAxis: {
    type: 'time',
    maxInterval: 3600 * 1000 * 24,
    axisLabel: { color: axisLabelColor, interval: 0 },
    splitLine: { show: false },
    axisLine: { lineStyle: { color: splitLineColor }, interval: 0 },
  },
  yAxis: {
    type: 'value',
    axisLabel: { formatter: '{value} %', color: axisLabelColor },
    splitLine: { lineStyle: { color: axisLineColor }, interval: 0 },
    axisLine: { lineStyle: { color: splitLineColor } },
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
    lineStyle: { color: avgPressureColor, type: 'solid' },
    itemStyle: { color: avgPressureColor },
    tooltip: { position: 'inside' },
    // areaStyle: {
    //   color: {
    //     type: 'linear',
    //     x: 0,
    //     y: 0,
    //     x2: 0,
    //     y2: 1,
    //     colorStops: [{
    //       offset: 0, color: fillPressureColorStart // color at 0% position
    //     }, {
    //       offset: 1, color: fillPressureColorEnd // color at 100% position
    //     }],
    //     global: false // false by default
    //   }
    // }
  },
  {
    name: 'minimum',
    type: 'line',
    smooth: true,
    dimensions: ['time', 'min'],
    lineStyle: { color: minPressureColor, type: 'dashed' },
    itemStyle: { color: minPressureColor },
    tooltip: { position: 'bottom' }
  },
  {
    name: 'maximum',
    type: 'line',
    smooth: true,
    dimensions: ['time', 'max'],
    lineStyle: { color: maxPressureColor, type: 'dashed' },
    itemStyle: { color: maxPressureColor },
    tooltip: { position: 'top' }
  }]
};
////#endregion

////#region PRECIPITATION CONFIGS
const fillPrecipitationColorStart = '#4C7CDE';
const fillPrecipitationColorEnd = '#263E6F';
export const PrecipitationsDefaultChartSettings = {
  title: { text: 'Precipitations', textStyle: { color: titleColor } },
  tooltip: { trigger: 'item' },
  grid: { show: true, borderColor: gridBorderColor },
  xAxis: {
    type: 'time',
    maxInterval: 3600 * 1000 * 24,
    axisLabel: { color: axisLabelColor, interval: 0 },
    splitLine: { show: false },
    axisLine: { lineStyle: { color: axisLineColor }, interval: 0 },
  },
  yAxis: {
    type: 'value',
    axisLabel: { color: axisLabelColor, interval: 0 },
    splitLine: { lineStyle: { color: splitLineColor }, interval: 0 },
    axisLine: { lineStyle: { color: axisLineColor } },
  },
  dataset: {
    source: [],
    dimensions: ['time', 'precipitation'],
  },
  series: [{
    name: 'precipitations',
    type: 'bar',
    dimensions: ['time', 'precipitation'],
    tooltip: { position: 'inside' },
    color: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
        offset: 0, color: fillPrecipitationColorStart
      }, {
        offset: 1, color: fillPrecipitationColorEnd
      }],
      global: false // false by default
    }
  }]
};
////#endregion PRECIPITATION CONFIGS