import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import ECharts from 'vue-echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/axis';
import 'echarts/lib/chart/line';

@Component({
  components: {
    chart: ECharts
  }
})
export default class HumidityChart extends Vue {

  @Prop()
  humidity: { time: Date, avg: number, min?: number, max?: number }[];

  get chartOptions() {
    if (!this.humidity) return null;
    let co = {
      title: { text: 'Humidity' },
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
        axisLabel: { formatter: '{value} %', color: 'rgba(67, 66, 93, 0.5)' },
        splitLine: { lineStyle: { color: 'rgba(0, 0, 0, 0.1)' }, interval: 0 },
        axisLine: { lineStyle: { color: 'rgba(0, 0, 0, 0.1)' } },
      },
      dataset: {
        source: this.humidity,
        dimensions: ['time', 'avg', 'min', 'max'],
      },
      series: [{
        name: 'average',
        type: 'line',
        smooth: true,
        dimensions: ['time', 'avg'],
        lineStyle: { type: 'solid', color: '#5FE3A1' },
        itemStyle: { color: '#5FE3A1' },
        tooltip: { position: 'inside' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#5FE3A1' // color at 0% position
            }, {
              offset: 1, color: '#5FE3A11C' // color at 100% position
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
        lineStyle: { color: '#5fe3d1', type: 'dashed' },
        itemStyle: { color: '#5fe3d1' },
        tooltip: { position: 'bottom' }
      },
      {
        name: 'maximum',
        type: 'line',
        smooth: true,
        dimensions: ['time', 'max'],
        lineStyle: { color: '#7be3a1', type: 'dashed' },
        itemStyle: { color: '#7be3a1' },
        tooltip: { position: 'top' }
      }]
    };
    console.debug("humidity chart options", co)
    return co;
  }
}