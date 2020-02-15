import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { PressureDefaultChartSettings } from "./chartSettings";

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
    let co = Object.assign({}, PressureDefaultChartSettings);
    co.dataset.source = this.pressures;
    console.debug("pressures chart options", co)
    return co;
  }
}