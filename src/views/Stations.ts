import Vue from "vue"
import { Component, Watch } from "vue-property-decorator";
import { stationsService } from "@/services";

import pagination from "@/components/pagination.vue";

@Component({
  name: "stations",
  components: { pagination }
})
export default class Stations extends Vue {

  $router: any
  needle: string | null = null; //text to search for

  stations: dto.Device[] | null = null;
  pagination: dto.Paginated<dto.Device> = {
    totalCount: null,
    skip: 0,
    take: 5,
    items: null
  };


  get filteredStations() {
    if (!this.stations) return null;
    if (!this.needle) return this.stations;
    return this.stations.filter(station => {
      return station.name.indexOf(this.needle as string) >= 0;
    })
  }

  // @Watch("pagination", { immediate: true })
  // async paginationWatcher(n, o) {
  //   console.debug("what's going on?", n, o);
  //   this.pagination = await stationsService.getAllActiveStations(this.pagination.skip || undefined, this.pagination.take || undefined);
  //   this.stations = this.pagination.items;
  //   console.debug("stations", this.stations);
  // }

  goToDetails(stationId: string) {
    this.$router.push({
      name: 'station-details', params: {
        stationId: stationId
      }
    })
  }
  async takeThose(take: number) {
    console.debug("takeThose > skipping %O - taking %O", this.pagination.skip, take);
    this.pagination = await stationsService.getAllActiveStations(this.pagination.skip || undefined, take);
    this.stations = this.pagination.items;
    console.debug("stations", this.stations);
  }
  async skipThat(skip: number) {
    console.debug("skipThat > skipping %O - taking %O", skip, this.pagination.take);
    this.pagination = await stationsService.getAllActiveStations(skip, this.pagination.take || undefined);
    this.stations = this.pagination.items;
    console.debug("stations", this.stations);
  }

  async mounted() {
    this.pagination = await stationsService.getAllActiveStations();
    this.stations = this.pagination.items;
    console.debug("stations", this.stations);
  }
}
