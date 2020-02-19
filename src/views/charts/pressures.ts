import 'echarts/lib/chart/line';
import 'echarts/lib/component/axis';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import Vue from 'vue';
import ECharts from 'vue-echarts';
import { Component, Prop } from 'vue-property-decorator';
import { PressureDefaultChartSettings, xAxisDateFormatterGenerator } from "./chartSettings";


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
    let co = Object.assign({}, PressureDefaultChartSettings);
    co.dataset.source = this.pressures;
    co.xAxis.axisLabel.formatter = xAxisDateFormatterGenerator(this.pressures);
    return co;
  }
}
