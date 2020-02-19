import 'echarts/lib/chart/line';
import 'echarts/lib/component/axis';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import Vue from 'vue';
import ECharts from 'vue-echarts';
import { Component, Prop } from 'vue-property-decorator';
import { HumidityDefaultChartSettings, xAxisDateFormatterGenerator } from "./chartSettings";

@Component({ components: { chart: ECharts } })
export default class HumidityChart extends Vue {

  @Prop()
  humidity: { time: Date, avg: number, min?: number, max?: number }[];

  get chartOptions() {
    if (!this.humidity) return null;
    let co = Object.assign({}, HumidityDefaultChartSettings);
    co.dataset.source = this.humidity;
    co.xAxis.axisLabel.formatter = xAxisDateFormatterGenerator(this.humidity);
    return co;
  }
}
