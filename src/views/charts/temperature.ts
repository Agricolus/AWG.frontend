import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/dataset';

@Component({
  components: {
    chart: ECharts
  }
})
export default class TemperatureBarChart extends Vue {

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
        axisLabel: {
          showMinLabel: true,
          showMaxLabel: true,
          interval: 0
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: { formatter: '{value} °C' }
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