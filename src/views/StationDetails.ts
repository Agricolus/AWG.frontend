import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator";

import { stationsService, measuresService } from "@/services";

import Card from "@/components/card.vue";
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
  // dailyMeasure: dto.DailyMeasureDetail = null;
  dailyMeasures: dto.DailyMeasureDetail[] = null;
  rawMeasures: dto.WeatherObserved[] = null;

  timeIntervals = {
    daily: "Last 24 hours",
    weekly: "Last week",
    monthly: "Last month"
  };

  timeSelectedIntedval: string = "Last week";

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
    if (this.timeSelectedIntedval != this.timeIntervals.daily) {
      if (!this.dailyMeasures) return null;
      return this.dailyMeasures.map(dm => {
        return {
          time: dayjs(dm.date).startOf('day').toDate(),
          avg: round(dm.avgTemperature),
          min: round(dm.minTemperature),
          max: round(dm.maxTemperature)
        }
      });
    }
    if (!this.rawMeasures) return null;
    return this.rawMeasures.map(dm => {
      return { time: dm.dateObserved, avg: round(dm.temperature) }
    })
  }

  get precipitations() {
    if (this.timeSelectedIntedval != this.timeIntervals.daily) {
      if (!this.dailyMeasures) return null;
      return this.dailyMeasures.map(dm => {
        return { time: dayjs(dm.date).startOf('day').toDate(), precipitation: round(dm.precipitations) }
      });
    }
    if (!this.rawMeasures) return null;
    return this.rawMeasures.map(dm => {
      return { time: dm.dateObserved, precipitation: round(dm.precipitation) }
    })
  }

  get pressures() {
    if (this.timeSelectedIntedval != this.timeIntervals.daily) {
      if (!this.dailyMeasures) return null;
      return this.dailyMeasures.map(dm => {
        return {
          time: dayjs(dm.date).startOf('day').toDate(),
          avg: round(dm.avgTemperature),
          min: round(dm.minTemperature),
          max: round(dm.maxTemperature)
        }
      });
    }
    if (!this.rawMeasures) return null;
    return this.rawMeasures.map(dm => {
      return { time: dm.dateObserved, avg: round(dm.atmosphericPressure) }
    });
  }

  get humidity() {
    if (this.timeSelectedIntedval != this.timeIntervals.daily) {
      if (!this.dailyMeasures) return null;
      return this.dailyMeasures.map(dm => {
        return {
          time: dayjs(dm.date).startOf('day').toDate(),
          avg: round(dm.avgRelativeHumidity),
          min: round(dm.minRelativeHumidity),
          max: round(dm.maxRelativeHumidity)
        }
      });
    }
    if (!this.rawMeasures) return null;
    return this.rawMeasures.map(dm => {
      return { time: dm.dateObserved, avg: round(dm.relativeHumidity) }
    });
  }

  get cardValues() {
    if (this.timeSelectedIntedval != this.timeIntervals.daily) {
      if (!this.dailyMeasures) return null;
      return this.dailyMeasures.slice(-7).reverse().map(dm => {
        return {
          id: dm.date.getTime(),
          dateformat: 'ddd DD',
          date: dm.date,
          minTemperature: round(dm.minTemperature),
          maxTemperature: round(dm.maxTemperature),
          condition: 'sunnyDay'
        }
      });
    }
    if (!this.rawMeasures) return null;
    return this.rawMeasures.slice(-7).reverse().map(dm => {
      return {
        id: dm.id,
        dateformat: 'ddd DD HH:MM',
        date: dm.dateObserved,
        maxTemperature: round(dm.temperature),
        condition: dm.weatherType
      }
    });
  }

  openPopup(event: any) {
    event.openPopup();
  }

  goToEdit() {
    this.$router.push({ name: "station-editing", params: { stationId: this.stationId } })
  }
  changeStation(evt: Event) {
    this.$router.push({ name: "station-details", params: { stationId: (evt.target as any).value } })
  }

  @Watch("timeSelectedIntedval")
  async timeSelectedIntedvalWatcher(n, o) {
    if (n != o) {
      // this.stationIdWatcher(this.stationId, null);
      //default weekly period
      let to = new Date();
      // let to = this.lastMeasure.dateObserved;
      let from = dayjs(to).subtract(7, 'day');

      //hourly details
      if (n == this.timeIntervals.daily) {
        from = dayjs(to).subtract(24, 'hour');
        this.rawMeasures = await measuresService.getMeasuresList(this.stationId, from.toDate(), to);
      }
      //monthly period
      if (n == this.timeIntervals.monthly) {
        from = dayjs(to).subtract(1, 'month');
      }
      this.dailyMeasures = await measuresService.getLastDailyMeasures(this.stationId, from.toDate(), to);

    }
  }

  @Watch("stationId", { immediate: true })
  async stationIdWatcher(n, o) {
    if (!n || n == o) return;
    this.lastMeasure = await measuresService.getLastMeasure(this.stationId);
    this.timeSelectedIntedvalWatcher(this.timeSelectedIntedval, null);
  }

  async mounted() {
    let paginated = await stationsService.getAllActiveStations(0, 100);
    this.stations = paginated.items.sort((s1, s2) => {
      if (s1.name < s2.name) { return -1; }
      if (s1.name > s2.name) { return 1; }
      return 0;
    });
  }



}

//utility functions
function round(val: number | null, prec: number = 2): number | null {
  if (val !== null) {
    let factor = Math.pow(10, prec) * 1.0;
    return Math.round(val * factor) / factor;
  }
  return null;
}
