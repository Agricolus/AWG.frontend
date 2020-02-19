import Vue from "vue"
import { Component, Watch } from 'vue-property-decorator';
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { stationsService } from "@/services";
import { stationHighlightIcon, stationIcon, defaultMapSettings, MapSettings } from "../components/moduleMap";

@Component({
  name: "home",
  components: {
    LMap, LTileLayer, LMarker, LPopup
  }
}
)
export default class Home extends Vue {

  mapSettings: MapSettings = defaultMapSettings;

  mapCenter: Array<number> = [47.413220, -1.219482];


  icon: L.Icon = stationIcon;
  highlightMarker: Array<number> | null = null;
  highlightIcon: L.Icon = stationHighlightIcon;

  stations: dto.Device[] | null = null;

  userPosition: Array<number> | null = null;

  @Watch("userPosition")
  async userPositionWatcher(n, o) {
    let userLat = (this.userPosition as number[])[0];
    let userLon = (this.userPosition as number[])[1];
    //retrieving stations based on user location
    let paginated = await stationsService.getNearestStations(userLon, userLat, 0, 10);
    this.stations = paginated.items;
  }

  async mounted() {
    //retrieveing first 10 active stations in case user does not allow the location
    let paginated = await stationsService.getAllActiveStations(0, 10);
    this.stations = paginated.items;
    navigator.geolocation.getCurrentPosition((position) => {
      //user has allowed location
      this.userPosition = [position.coords.latitude, position.coords.longitude];
      this.mapCenter = this.userPosition;
    });
  }

  goToStations() {
    this.$router.push({ name: 'stations' });
  }

  highlightStationIcon(station: dto.Device) {
    this.highlightMarker = [station.location.coordinates[1], station.location.coordinates[0]];
    this.mapCenter = [station.location.coordinates[1], station.location.coordinates[0]];
  }

};


//helper function for caltulating distance by lot-lang
//credits: https://www.geodatasource.com/developers/javascript
// function distance(lat1: number, lon1: number, lat2: number, lon2: number, unit: 'M' | 'K' | 'N' = 'K') {
//   if ((lat1 == lat2) && (lon1 == lon2)) {
//     return 0;
//   }
//   else {
//     let radlat1 = Math.PI * lat1 / 180;
//     let radlat2 = Math.PI * lat2 / 180;
//     let theta = lon1 - lon2;
//     let radtheta = Math.PI * theta / 180;
//     let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
//     if (dist > 1) {
//       dist = 1;
//     }
//     dist = Math.acos(dist);
//     dist = dist * 180 / Math.PI;
//     dist = dist * 60 * 1.1515;
//     if (unit == "K") { dist = dist * 1.609344 }
//     if (unit == "N") { dist = dist * 0.8684 }
//     return dist;
//   }
// }