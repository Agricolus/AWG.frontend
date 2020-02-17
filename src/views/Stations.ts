import Vue from "vue"
import { Component } from "vue-property-decorator";
import { stationsService } from "@/services";

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
    let paginated = await stationsService.getAllActiveStations();
    this.stations = paginated.items;
  }

  goToEdit() {
    this.$router.push({ name: 'station-editing' })
  }

  goToDetails(stationId: string) {
    this.$router.push({
      name: 'station-details', params: {
        stationId: stationId
      }
    })
  }

}
