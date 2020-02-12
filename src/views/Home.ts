import Vue from "vue"
import Component from "vue-class-component";
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import * as api from "@/apis";

@Component({
  name: "home",
  components: {
    LMap, LTileLayer, LMarker, LPopup
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
  icon: L.Icon = L.icon({
    iconUrl: '/assets/img/pin.png',
    iconSize: [32, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, 75]
  })

  stations: dto.Device[] | null = null;

  userPosition: Array<number> | null = null;

  get filteredStations(): dto.Device[] {
    if (!this.stations) return [];
    //first 10 station by distance from user position, or by last reading date. but first we filter by the presence of the relevant attribute
    if (!this.userPosition) //no user position: falling back to sort by last reading date
      return this.stations.filter(station => station.dateLastValueReported).sort((stationA, stationB) => {
        let stationAdate = stationA.dateLastValueReported?.getTime() as number;
        let stationBdate = stationB.dateLastValueReported?.getTime() as number;
        return stationBdate - stationAdate;
      }).slice(0, 10);
    if (this.userPosition) //user position: sort by distance
      return this.stations.filter(station => station.location).sort((stationA, stationB) => {
        let userLat = (this.userPosition as number[])[0];
        let userLon = (this.userPosition as number[])[1];
        let stationALat = stationA.location.coordinates[0];
        let stationALon = stationA.location.coordinates[1];
        let stationBLat = stationB.location.coordinates[0];
        let stationBLon = stationB.location.coordinates[1];
        let stationAdistance = distance(userLat, userLon, stationALat, stationALon);
        let stationBdistance = distance(userLat, userLon, stationBLat, stationBLon);
        return stationBdistance - stationAdistance;
      }).slice(0, 10);
    return [];
  }

  async mounted() {
    this.stations = await api.getAllActiveStations();
    navigator.geolocation.getCurrentPosition((position) => {
      this.userPosition = [position.coords.latitude, position.coords.longitude];
      this.center = this.userPosition;
    });
  }

};


//helper function for caltulating distance by lot-lang
//credits: https://www.geodatasource.com/developers/javascript
function distance(lat1: number, lon1: number, lat2: number, lon2: number, unit: 'M' | 'K' | 'N' = 'K') {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    let radlat1 = Math.PI * lat1 / 180;
    let radlat2 = Math.PI * lat2 / 180;
    let theta = lon1 - lon2;
    let radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist;
  }
}