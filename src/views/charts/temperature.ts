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
export default class TemperaturesChart extends Vue {

  @Prop()
  temperatures: { time: Date, avg: number, min?: number, max?: number }[];

  get chartOptions() {
    if (!this.temperatures) return null;
    let co = {
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
        source: this.temperatures,
        dimensions: ['time', 'avg', 'min', 'max'],
      },
      series: [{
        name: 'average',
        type: 'line',
        smooth: true,
        dimensions: ['time', 'avg'],
        lineStyle: { type: 'solid' },
        tooltip: { position: 'inside' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#FF5498' // color at 0% position
            }, {
              offset: 1, color: '#FFFFFF00' // color at 100% position
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
        lineStyle: { type: 'dashed' },
        tooltip: { position: 'bottom' }
      },
      {
        name: 'maximum',
        type: 'line',
        smooth: true,
        dimensions: ['time', 'max'],
        lineStyle: { color: '#ff0000', type: 'dashed' },
        itemStyle: { color: '#ff0000' },
        tooltip: { position: 'top' }
      }]
    };
    console.debug("temperatures chart options", co)
    return co;
  }
}