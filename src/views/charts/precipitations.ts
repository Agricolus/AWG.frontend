import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { PrecipitationsDefaultChartSettings } from "./chartSettings";
import ECharts from 'vue-echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/grid';
import 'echarts/lib/chart/bar';

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
    let co = Object.assign({}, PrecipitationsDefaultChartSettings);
    co.dataset.source = this.precipitations;
    console.debug("precipitations chart options", co)
    return co;
  }
}