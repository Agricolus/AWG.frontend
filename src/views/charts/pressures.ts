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
export default class PressureChart extends Vue {

  @Prop()
  pressures: { time: Date, avg: number, min?: number, max?: number }[];

  get chartOptions() {
    if (!this.pressures) return null;
    let co = {
      title: { text: 'Atmospheric Pressure' },
      tooltip: { trigger: 'axis' },
      grid: { right: '5%' },
      xAxis: {
        type: 'time',
        maxInterval: 3600 * 1000 * 24,
        axisLabel: { color: 'rgba(67, 66, 93, 0.5)', interval: 0 },
        splitLine: { lineStyle: { color: 'rgba(0, 0, 0, 0.1)' }, interval: 0 },
        axisLine: { lineStyle: { color: 'rgba(0, 0, 0, 0.1)' }, interval: 0 },
      },
      yAxis: {
        type: 'value',
        axisLabel: { formatter: '{value}', color: 'rgba(67, 66, 93, 0.5)' },
        splitLine: { lineStyle: { color: 'rgba(0, 0, 0, 0.1)' }, interval: 0 },
        axisLine: { lineStyle: { color: 'rgba(0, 0, 0, 0.1)' } },
      },
      dataset: {
        source: this.pressures,
        dimensions: ['time', 'avg', 'min', 'max'],
      },
      series: [{
        name: 'average',
        type: 'line',
        smooth: true,
        dimensions: ['time', 'avg'],
        lineStyle: { type: 'solid', color: '#FFA265' },
        itemStyle: { color: '#FFA265' },
        tooltip: { position: 'inside' }
      },
      {
        name: 'minimum',
        type: 'line',
        smooth: true,
        dimensions: ['time', 'min'],
        lineStyle: { color: '#ffa283', type: 'dashed' },
        itemStyle: { color: '#ffa283' },
        tooltip: { position: 'bottom' }
      },
      {
        name: 'maximum',
        type: 'line',
        smooth: true,
        dimensions: ['time', 'max'],
        lineStyle: { color: '#ff8766', type: 'dashed' },
        itemStyle: { color: '#ff8766' },
        tooltip: { position: 'top' }
      }]
    };
    console.debug("pressures chart options", co)
    return co;
  }
}