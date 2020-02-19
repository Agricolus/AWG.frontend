import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { TemperatureDefaultChartSettings, xAxisDateFormatterGenerator } from "./chartSettings";
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
    let co = Object.assign({}, TemperatureDefaultChartSettings);
    co.dataset.source = this.temperatures;
    co.xAxis.axisLabel.formatter = xAxisDateFormatterGenerator(this.temperatures);
    console.debug("temperatures chart options", co)
    return co;
  }
}