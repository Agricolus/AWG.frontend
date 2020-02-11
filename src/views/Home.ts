import Vue from "vue"
import Component from "vue-class-component";
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

@Component({
  name: "home",
  components: {
    'l-map': LMap,
    'l-tile-layer': LTileLayer,
    'l-marker': LMarker,
    'l-popup': LPopup
  }
}
)
export default class Home extends Vue {

  url: String = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  zoom: number = 4;
  maxZoom: number = 16;
  minZoom: number = 2;

  center: Array<number> = [47.413220, -1.219482];
  markerLatLng: Array<number> = [47.313220, -1.319482]


  markerAttribution = 'idStation';   // TO RECOVER THE ID OF STATION
  icon: L.Icon = L.icon({
    iconUrl: '/assets/img/pin.png',
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, 65]
  })


  showStation(e: any) {
    console.log(e.target.options.attribution);
  }
};

