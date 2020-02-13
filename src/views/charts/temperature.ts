import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import ECharts from 'vue-echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/grid';
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
      xAxis: {
        type: 'time',
        min: 'dataMin',
        axisLabel: { color: 'rgba(67, 66, 93, 0.5)', interval: 0 },
        splitLine: { lineStyle: { color: 'rgba(0, 0, 0, 0.1)' }, interval: 0 },
        // minorSplitLine: { show: true, lineStyle: { color: 'rgba(0, 0, 0, 0.1)' } },
        axisLine: { lineStyle: { color: 'rgba(0, 0, 0, 0.1)' } },
      },
      yAxis: {
        type: 'value',
        axisLabel: { formatter: '{value} °C', color: 'rgba(67, 66, 93, 0.5)' },
        splitLine: { lineStyle: { color: 'rgba(0, 0, 0, 0.1)' }, interval: 0 },
        // minorSplitLine: { show: true, lineStyle: { color: 'rgba(0, 0, 0, 0.1)' } },
        axisLine: { lineStyle: { color: 'rgba(0, 0, 0, 0.1)' } },
      },
      dataset: {
        source: this.temperatures,
        dimensions: ['time', 'avg', 'min', 'max'],
      },
      series: [{
        name: 'average',
        type: 'line',
        dimensions: ['time', 'avg'],
        lineStyle: { type: 'solid' },
        tooltip: { position: 'inside' }
      },
      {
        name: 'minimum',
        type: 'line',
        dimensions: ['time', 'min'],
        lineStyle: { type: 'dashed' },
        tooltip: { position: 'bottom' }
      },
      {
        name: 'maximum',
        type: 'line',
        dimensions: ['time', 'max'],
        lineStyle: {
          color: '#ff0000',
          type: 'dashed'
        },
        itemStyle: { color: '#ff0000' },
        tooltip: { position: 'top' }
      }]
    };
    console.debug("temperatures chart options", co)
    return co;
  }
}