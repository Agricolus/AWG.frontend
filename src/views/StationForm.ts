import Vue from "vue"
import Component from "vue-class-component";
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Datepicker from 'vuejs-datepicker';
import { stationsService } from "@/services";
import { Prop } from 'vue-property-decorator';
import GeoJSON from 'geojson';
import { AlertHelper } from '@/helpers/AlertHelper';

@Component({
  name: "stationForm",
  components: {
    LMap, LTileLayer, LMarker, LPopup, Datepicker
  }
}
)
export default class StationForm extends Vue {

  @Prop()
  stationId: string;

  stationForm = {
    name: '',
    controlledProperty: [],
    location: null,
    dateInstalled: null,
    source: '',
    dataProvider: '',
    description: '',
    serialNumber: '',
    refDeviceModel: ''
  };

  lng: number | null = null;
  lat: number | null = null;

  url: String = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  zoom: number = 6;
  maxZoom: number = 16;
  minZoom: number = 2;

  userPosition: Array<number> | null = null;
  center: Array<number> = [47.413220, -1.219482];

  markerLatLng: Array<number> | null = null;
  icon: L.Icon = L.icon({
    iconUrl: '/assets/img/pin.png',
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, 75]
  })

  showOptionData: boolean = false;


  get controlledProperties() {

    return [
      { id: 'atmosphericPressure', description: 'Atmospheric pressure' },
      { id: 'dewPoint', description: 'Dew point' },
      { id: 'illuminance', description: 'Illuminance' },
      { id: 'precipitation', description: 'Precipitation' },
      { id: 'pressureTendency', description: 'Pressure tendency' },
      { id: 'relativeHumidity', description: 'Relative humidity' },
      { id: 'snowHeight', description: 'Snow height' },
      { id: 'solarRadiation', description: 'Solar radiation' },
      { id: 'streamGauge', description: 'Stream gauge' },
      { id: 'temperature', description: 'Temperature' },
      { id: 'visibility', description: 'Visibility' },
      { id: 'weatherType', description: 'Weather type' },
      { id: 'windDirection', description: 'Wind direction' },
      { id: 'windSpeed', description: 'Wind speed' }
    ]
  }

  addControlledProperty(p) {
    if (!this.isSelected(p)) {
      this.stationForm.controlledProperty.push(p)
    } else {
      let idx = this.stationForm.controlledProperty.indexOf(p);
      this.stationForm.controlledProperty.splice(idx, 1)
    }
  }

  isSelected(p) {
    return this.stationForm.controlledProperty.indexOf(p) > -1
  }

  onclickMap(e) {
    this.addMarker(e.latlng.lat, e.latlng.lng);
  }

  addMarker(lat: number, lng: number) {
    this.markerLatLng = [lat, lng];
    this.lat = lat;
    this.lng = lng
  }

  async initData() {
    if (this.stationId) {
      let station = await stationsService.getStation(this.stationId);
      this.stationForm = Object.assign({}, station);
      this.addMarker(station.location.coordinates[1], station.location.coordinates[0]);
      this.center = [station.location.coordinates[1], station.location.coordinates[0]];

    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userPosition = [position.coords.latitude, position.coords.longitude];
        this.center = this.userPosition;
      });
    }
  }

  back() {
    this.$router.back();
  }

  async save() {
    this.stationForm.location = (GeoJSON as any).parse({ lat: this.lat, lng: this.lng }, { Point: ['lat', 'lng'] }).geometry;
    if (this.stationId) {
      await stationsService.updateStation(this.stationForm as dto.Device);
    } else {
      await stationsService.createStation(this.stationForm as dto.Device);
    }
    AlertHelper.showInfo('Station successfully saved', '');
    this.back();
  }

  deleting: boolean = false;
  async deleteStation() {
    if (this.deleting) return;

    this.deleting = true;

    await stationsService.deleteStation(this.stationId);

    this.deleting = false;

    AlertHelper.showInfo('Station successfully deleted', '')

    this.$router.push({ name: 'stations' });
  }

  mounted() {
    this.initData()
  }
}
