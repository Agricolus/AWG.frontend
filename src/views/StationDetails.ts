import Vue from "vue"
import { Component, Prop } from "vue-property-decorator";
import * as api from "@/apis";
import Card from "@/compontens/card.vue";
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';

@Component({
  name: "stationDetails",
  components: {
    Card, LMap, LTileLayer, LMarker, LPopup
  }
})
export default class StationDetails extends Vue {

  @Prop()
  stationId: string;

  lastMeasure: dto.WeatherObserved | null = null;
  dailyMeasure: dto.DailyMeasureDetail | null = null;

  url: String = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  zoom: number = 4;
  maxZoom: number = 16;
  minZoom: number = 2;

  center: Array<number> = [47.413220, -1.219482];




  async mounted() {
    this.lastMeasure = await api.getLastMeasure(this.stationId);
    this.dailyMeasure = await api.getLastDailyMeasure(this.stationId);
  }

}
