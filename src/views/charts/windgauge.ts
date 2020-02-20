import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/grid';

@Component({ components: { chart: ECharts } })
export default class WindgaugeChart extends Vue {

  @Prop()
  precipitations: { time: Date, precipitation: number }[];

  get chartOptions() {
    if (!this.precipitations) return null;
    let co = {
      title: { text: 'Precipitations' },
      tooltip: { trigger: 'item' },
      grid: { show: true, borderColor: 'rgba(0, 0, 0, 0.1)' },
      xAxis: {
        type: 'time',
        maxInterval: 3600 * 1000 * 24,
        axisLabel: { color: 'rgba(67, 66, 93, 0.5)', interval: 0 },
        splitLine: { show: false },
        axisLine: { lineStyle: { color: 'rgba(0, 0, 0, 0.1)' }, interval: 0 },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: 'rgba(67, 66, 93, 0.5)', interval: 0 },
        splitLine: { lineStyle: { color: 'rgba(0, 0, 0, 0.1)' }, interval: 0 },
        axisLine: { lineStyle: { color: 'rgba(0, 0, 0, 0.1)' } },
      },
      dataset: {
        source: this.precipitations,
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
            offset: 0, color: '#4C7CDE' // color at 0% position
          }, {
            offset: 1, color: '#263E6F' // color at 100% position
          }],
          global: false // false by default
        }
      }]
    };

    return co;
  }
}