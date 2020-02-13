import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';

@Component({
  components: {
    chart: ECharts
  }
})
export default class PrecipitationsChart extends Vue {

  @Prop()
  precipitations: { time: Date, precipitation: number }[];

  get chartOptions() {
    if (!this.precipitations) return null;
    let co = {
      title: { text: 'Precipitations' },
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
        type: 'value'
      },
      dataset: {
        source: this.precipitations,
        dimensions: ['time', 'precipitation'],
      },
      series: [{
        name: 'average',
        type: 'bar',
        dimensions: ['time', 'precipitation'],
        lineStyle: { type: 'solid' },
        tooltip: { position: 'inside' }
      }]
    };
    console.debug("precipitations chart options", co)
    return co;
  }
}