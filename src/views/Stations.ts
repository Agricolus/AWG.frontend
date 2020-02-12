import Vue from "vue"
import { Component } from "vue-property-decorator";
import * as api from "@/apis";

@Component({
  name: "stations"
})
export default class Stations extends Vue {

  $router: any
  needle: string | null = null; //text to search for

  stations: dto.Device[] | null = null;


  get filteredStations() {
    if (!this.stations) return null;
    if (!this.needle) return this.stations;
    return this.stations.filter(station => {
      return station.name.indexOf(this.needle as string) >= 0;
    })
  }

  async mounted() {
    this.stations = await api.getAllActiveStations();
  }

  goToDetails(stationId: string) {
    this.$router.push({
      name: 'StationDetails', params: {
        stationId: stationId
      }
    })
  }

}
