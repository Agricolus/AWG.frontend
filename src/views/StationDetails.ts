import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator";
// import measuresService from "@/services/measures";
// import stationService from "@/services/stations";

import { stationsService, measuresService } from "@/services";

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
  rawMeasures: dto.WeatherObserved[] = null;

  timeIntervals = {
    daily: 1,
    weekly: 2,
    monthly: 3
  };

  timeSelectedIntedval: number = 2;

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
        return { time: dayjs(dm.date).startOf('day').toDate(), avg: dm.avgTemperature, min: dm.minTemperature, max: dm.maxTemperature }
      });
    }
    if (!this.rawMeasures) return null;
    return this.rawMeasures.map(dm => {
      return { time: dm.dateObserved, avg: dm.temperature }
    })
  }

  get precipitations() {
    if (this.timeSelectedIntedval != this.timeIntervals.daily) {
      if (!this.dailyMeasures) return null;
      return this.dailyMeasures.map(dm => {
        return { time: dayjs(dm.date).startOf('day').toDate(), precipitation: dm.precipitations }
      });
    }
    if (!this.rawMeasures) return null;
    return this.rawMeasures.map(dm => {
      return { time: dm.dateObserved, precipitation: dm.precipitation }
    })
  }

  get pressures() {
    if (this.timeSelectedIntedval != this.timeIntervals.daily) {
      if (!this.dailyMeasures) return null;
      return this.dailyMeasures.map(dm => {
        return { time: dayjs(dm.date).startOf('day').toDate(), avg: dm.avgTemperature, min: dm.minTemperature, max: dm.maxTemperature }
      });
    }
    if (!this.rawMeasures) return null;
    return this.rawMeasures.map(dm => {
      return { time: dm.dateObserved, avg: dm.atmosphericPressure }
    });
  }

  get humidity() {
    if (this.timeSelectedIntedval != this.timeIntervals.daily) {
      if (!this.dailyMeasures) return null;
      return this.dailyMeasures.map(dm => {
        return { time: dayjs(dm.date).startOf('day').toDate(), avg: dm.avgRelativeHumidity, min: dm.minRelativeHumidity, max: dm.maxRelativeHumidity }
      });
    }
    if (!this.rawMeasures) return null;
    return this.rawMeasures.map(dm => {
      return { time: dm.dateObserved, avg: dm.relativeHumidity }
    });
  }

  get cardValues() {
    if (this.timeSelectedIntedval != this.timeIntervals.daily) {
      if (!this.dailyMeasures) return null;
      return this.dailyMeasures.slice(0, 7).map(dm => {
        return {
          id: dm.date.getTime(),
          dateformat: 'ddd DD',
          date: dm.date,
          minTemperature: dm.minTemperature,
          maxTemperature: dm.maxTemperature,
          condition: 'sunnyDay'
        }
      });
    }
    if (!this.rawMeasures) return null;
    return this.rawMeasures.slice(0, 7).map(dm => {
      return {
        id: dm.id,
        dateformat: 'ddd DD HH:MM',
        date: dm.dateObserved,
        maxTemperature: dm.temperature,
        condition: dm.weatherType
      }
    });
  }

  openPopup(event: any) {
    event.openPopup();
  }

  changeStation(evt: Event) {
    this.$router.push({ name: "station-details", params: { stationId: (evt.target as any).value } })
  }

  @Watch("timeSelectedIntedval")
  timeSelectedIntedvalWatcher(n, o) {
    if (n != o)
      this.stationIdWatcher(this.stationId, null);
  }

  @Watch("stationId", { immediate: true })
  async stationIdWatcher(n, o) {
    if (!n || n == o) return;
    this.lastMeasure = await measuresService.getLastMeasure(this.stationId);

    // this.rawMeasures = null;
    // this.dailyMeasures = null;

    //default weekly period
    let to = new Date();
    let from = dayjs(to).subtract(7, 'day');

    //horly details
    if (this.timeSelectedIntedval == this.timeIntervals.daily) {
      from = dayjs(to).subtract(24, 'hour');
      this.rawMeasures = await measuresService.getMeasuresList(this.stationId, from.toDate(), to);
    }
    //month period
    if (this.timeSelectedIntedval == this.timeIntervals.monthly) {
      from = dayjs(to).subtract(1, 'month');
    }
    this.dailyMeasures = await measuresService.getLastDailyMeasures(this.stationId, from.toDate(), to);


    console.debug("rawMeasures", this.rawMeasures);

    this.dailyMeasure = this.dailyMeasures[0];
  }

  async mounted() {
    let paginated = await stationsService.getAllActiveStations();
    this.stations = paginated.items;
  }

}
