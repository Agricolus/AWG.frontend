import Vue from "vue"
import { Component } from "vue-property-decorator";
import stationsService from "@/services/stations";

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
    this.stations = await stationsService.getAllActiveStations();
    console.debug("stations", this.stations);
  }

  goToDetails(stationId: string) {
    this.$router.push({
      name: 'station-details', params: {
        stationId: stationId
      }
    })
  }

}
