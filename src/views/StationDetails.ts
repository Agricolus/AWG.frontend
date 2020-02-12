import Vue from "vue"
import { Component, Prop } from "vue-property-decorator";
import * as api from "@/apis";
import Card from "@/compontens/card.vue";

@Component({
  name: "stationDetails",
  components: {
    Card
  }
})
export default class StationDetails extends Vue {

  @Prop()
  stationId!: string;

  lastMeasure: dto.WeatherObserved | null = null;


  async mounted() {
    this.lastMeasure = await api.getLastMeasure(this.stationId);

    console.debug("lastMeasure", this.lastMeasure);
  }

}
