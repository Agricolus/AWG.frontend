import Vue from "vue"
import { Component, Prop } from "vue-property-decorator";
import * as api from "@/apis";

@Component({
  name: "stationDetails"
})
export default class StationDetails extends Vue {

  @Prop()
  stationId!: string;

  lastMeasure: dto.WeatherObserved | null = null;


  async mounted() {
    debugger
    this.lastMeasure = await api.getLastMeasure(this.stationId);

    console.debug("lastMeasure", this.lastMeasure);
  }

}
