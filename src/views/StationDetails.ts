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
import { CSVHelper } from '@/helpers/CSVHelper';

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
  dailyMeasures: dto.DailyMeasureDetail[] = null;
  rawMeasures: dto.WeatherObserved[] = null;

  timeIntervals = {
    daily: "Last 24 hours",
    weekly: "Last week",
    monthly: "Last month"
  };

  timeSelectedInterval: string = "Last week";

  url: String = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  zoom: number = 4;
  maxZoom: number = 16;
  minZoom: number = 2;

  stations: dto.Device[] = null;
  station: dto.Device = null;
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

  get center() {
    if (!this.station) return null;
    return this.station.location.coordinates;
  }

  get temperatures() {
    if (this.timeSelectedInterval != this.timeIntervals.daily) {
      if (!this.dailyMeasures) return [];
      return this.dailyMeasures.map(dm => {
        return {
          time: dayjs(dm.date).startOf('day').toDate(),
          avg: round(dm.avgTemperature),
          min: round(dm.minTemperature),
          max: round(dm.maxTemperature)
        }
      });
    }
    if (!this.rawMeasures) return [];
    return this.rawMeasures.map(dm => {
      return { time: dm.dateObserved, avg: round(dm.temperature) }
    })
  }

  get precipitations() {
    if (this.timeSelectedInterval != this.timeIntervals.daily) {
      if (!this.dailyMeasures) return [];
      return this.dailyMeasures.map(dm => {
        return { time: dayjs(dm.date).startOf('day').toDate(), precipitation: round(dm.precipitations) }
      });
    }
    if (!this.rawMeasures) return [];
    return this.rawMeasures.map(dm => {
      return { time: dm.dateObserved, precipitation: round(dm.precipitation) }
    })
  }

  get pressures() {
    if (this.timeSelectedInterval != this.timeIntervals.daily) {
      if (!this.dailyMeasures) return [];
      return this.dailyMeasures.map(dm => {
        return {
          time: dayjs(dm.date).startOf('day').toDate(),
          avg: round(dm.avgTemperature),
          min: round(dm.minTemperature),
          max: round(dm.maxTemperature)
        }
      });
    }
    if (!this.rawMeasures) return [];
    return this.rawMeasures.map(dm => {
      return { time: dm.dateObserved, avg: round(dm.atmosphericPressure) }
    });
  }

  get humidity() {
    if (this.timeSelectedInterval != this.timeIntervals.daily) {
      if (!this.dailyMeasures) return [];
      return this.dailyMeasures.map(dm => {
        return {
          time: dayjs(dm.date).startOf('day').toDate(),
          avg: round(dm.avgRelativeHumidity),
          min: round(dm.minRelativeHumidity),
          max: round(dm.maxRelativeHumidity)
        }
      });
    }
    if (!this.rawMeasures) return [];
    return this.rawMeasures.map(dm => {
      return { time: dm.dateObserved, avg: round(dm.relativeHumidity) }
    });
  }

  get cardValues() {
    if (this.timeSelectedInterval != this.timeIntervals.daily) {
      if (!this.dailyMeasures) return [];
      return this.dailyMeasures.slice(-7).reverse().map(dm => {
        return {
          id: dm.date.getTime(),
          dateformat: 'ddd DD',
          date: dm.date,
          avgTemperature: round(dm.avgTemperature),
          minTemperature: round(dm.minTemperature),
          maxTemperature: round(dm.maxTemperature),
          condition: 'sunnyDay'
        }
      });
    }
    if (!this.rawMeasures) return [];
    return this.rawMeasures.slice(-7).reverse().map(dm => {
      return {
        id: dm.id,
        dateformat: 'ddd DD HH:MM',
        date: dm.dateObserved,
        avgTemperature: round(dm.temperature),
        condition: dm.weatherType
      }
    });
  }

  //getters for the lastMeasure values
  get lastMeasureDateObserved() {
    return this.lastMeasure ? this.lastMeasure.dateObserved : null;
  }
  get lastMeasureWeatherType() {
    return this.lastMeasure ? this.lastMeasure.weatherType : null;
  }

  get lastMeasureWindDirection() {
    return this.lastMeasure ? this.lastMeasure.windDirection : null;
  }

  get lastMeasureSolarRadiation() {
    return this.lastMeasure ? this.lastMeasure.solarRadiation : null;
  }

  get lastMeasureTemperature() {
    return this.lastMeasure ? this.lastMeasure.temperature : null;
  }

  get lastMeasurePrecipitation() {
    return this.lastMeasure ? this.lastMeasure.precipitation : null;
  }

  get lastMeasureRelativeHumidity() {
    return this.lastMeasure ? this.lastMeasure.relativeHumidity : null;
  }

  get lastMeasureWindSpeed() {
    return this.lastMeasure ? this.lastMeasure.windSpeed : null;
  }

  get lastMeasureAtmosphericPressure() {
    return this.lastMeasure ? this.lastMeasure.atmosphericPressure : null;
  }





  checkProperty(prop: string) {
    if (!this.station || !this.station.controlledProperty) return false;
    return this.station.controlledProperty.indexOf(prop) >= 0;
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

  @Watch("timeSelectedInterval")
  async timeSelectedIntervalWatcher(n, o) {
    if (n != o) {
      //default weekly period
      let to = new Date();
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
    this.station = await stationsService.getStation(n);
    this.lastMeasure = await measuresService.getLastMeasure(n);
    this.timeSelectedIntervalWatcher(this.timeSelectedInterval, null);
  }

  async mounted() {
    let paginated = await stationsService.getAllActiveStations(0, 100);
    this.stations = paginated.items.sort((s1, s2) => {
      if (s1.name < s2.name) { return -1; }
      if (s1.name > s2.name) { return 1; }
      return 0;
    });
  }

  downloadCSV() {
    let fieldsToExport = {
      date: "date",
      precipitations: "precipitations",
      avgRelativeHumidity: "avgRelativeHumidity",
      minRelativeHumidity: "minRelativeHumidity",
      maxRelativeHumidity: "maxRelativeHumidity",
      avgSolarRadiations: "avgSolarRadiations",
      minSolarRadiations: "minSolarRadiations",
      maxSolarRadiations: "maxSolarRadiations",
      avgTemperature: "avgTemperature",
      minTemperature: "minTemperature",
      maxTemperature: "maxTemperature",
      avgWindSpeed: "avgWindSpeed",
      minWindSpeed: "minWindSpeed",
      maxWindSpeed: "maxWindSpeed",
      avgWindDirection: "avgWindDirection",
      minWindDirection: "minWindDirection",
      maxWindDirection: "maxWindDirection",
      avgAtmosphericPressure: "avgAtmosphericPressure",
      minAtmosphericPressure: "minAtmosphericPressure",
      maxAtmosphericPressure: "maxAtmosphericPressure",
      avgDewPoint: "avgDewPoint",
      minDewPoint: "minDewPoint",
      maxDewPoint: "maxDewPoint",
      avgIlluminance: "avgIlluminance",
      minIlluminance: "minIlluminance",
      maxIlluminance: "maxIlluminance",
      avgStreamGauge: "avgStreamGauge",
      minStreamGauge: "minStreamGauge",
      maxStreamGauge: "maxStreamGauge",
      avgSnowHeight: "avgSnowHeight",
      minSnowHeight: "minSnowHeight",
      maxSnowHeight: "maxSnowHeight",
    };

    let filename = this.station.name + " - " + this.timeSelectedInterval + ".csv";

    CSVHelper.exportToCsv2(fieldsToExport, this.dailyMeasures, (fieldName, fieldValue, eventElement) => {
      if (fieldName == "date") {
        fieldValue = fieldValue ? dayjs(eventElement.date).format("DD MMM YYYY, hh:mm") : null
      }
      return fieldValue;
    }, filename);
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
