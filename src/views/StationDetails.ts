import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator";
import measuresService from "@/services/measures_mock";
import stationService from "@/services/stations_mock";
import Card from "@/compontens/card.vue";
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import L from 'leaflet';
import dayjs from 'dayjs';

import TemperaturesChart from "./charts/temperature.vue";
import PrecipitationsChart from "./charts/precipitations.vue";
import PressuresChart from "./charts/pressures.vue";
import HumidityChart from "./charts/humidity.vue";

@Component({
  name: "stationDetails",
  components: {
    Card, LMap, LTileLayer, LMarker, LPopup, TemperaturesChart, PrecipitationsChart, PressuresChart, HumidityChart
  }
})
export default class StationDetails extends Vue {

  @Prop()
  stationId: string;

  lastMeasure: dto.WeatherObserved = null;
  dailyMeasure: dto.DailyMeasureDetail = null;
  dailyMeasures: dto.DailyMeasureDetail[] = null;

  url: String = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  zoom: number = 4;
  maxZoom: number = 16;
  minZoom: number = 2;

  stations: dto.Device[] = null;

  icon: L.Icon = L.icon({
    iconUrl: '/assets/img/pin.png',
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, 75]
  });

  highlighticon: L.Icon = L.icon({
    iconUrl: '/assets/img/pin.png',
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, 75]
  });

  get station() {
    if (!this.stations) return null;
    return this.stations.find(s => s.id == this.stationId);
  }

  get center() {
    if (!this.station) return null;
    return this.station.location.coordinates;
  }

  get temperatures() {
    if (!this.dailyMeasures) return null;
    return this.dailyMeasures.map(dm => {
      return { time: dayjs(dm.date).startOf('day').toDate(), avg: dm.avgTemperature, min: dm.minTemperature, max: dm.maxTemperature }
    })
  }

  get precipitations() {
    if (!this.dailyMeasures) return null;
    return this.dailyMeasures.map(dm => {
      return { time: dayjs(dm.date).startOf('day').toDate(), precipitation: dm.precipitations }
    })
  }

  get pressures() {
    if (!this.dailyMeasures) return null;
    return this.dailyMeasures.map(dm => {
      return { time: dayjs(dm.date).startOf('day').toDate(), avg: dm.avgTemperature, min: dm.minTemperature, max: dm.maxTemperature }
    })
  }

  get humidity() {
    if (!this.dailyMeasures) return null;
    return this.dailyMeasures.map(dm => {
      return { time: dayjs(dm.date).startOf('day').toDate(), avg: dm.avgRelativeHumidity, min: dm.minRelativeHumidity, max: dm.maxRelativeHumidity }
    })
  }


  openPopup(event: any) {
    event.openPopup();
  }

  changeStation(evt: Event) {
    this.$router.push({ name: "station-details", params: { stationId: (evt.target as any).value } })
  }

  @Watch("stationId", { immediate: true })
  async stationIdWatcher(n, o) {
    if (!n || n == o) return;
    this.lastMeasure = await measuresService.getLastMeasure(this.stationId);

    let from = dayjs().subtract(7, 'day');
    let to = new Date();
    this.dailyMeasures = await measuresService.getLastDailyMeasures(this.stationId, from.toDate(), to);

    this.dailyMeasure = this.dailyMeasures[0];
  }

  async mounted() {
    // this.lastMeasure = await measuresService.getLastMeasure(this.stationId);

    // let from = dayjs().subtract(7, 'day');
    // let to = new Date();
    // this.dailyMeasures = await measuresService.getLastDailyMeasures(this.stationId, from.toDate(), to);

    // this.dailyMeasure = this.dailyMeasures[0];

    this.stations = await stationService.getAllActiveStations();
  }

}
