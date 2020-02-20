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
      return station.name.toLocaleLowerCase().includes(this.needle.toLocaleLowerCase());
    })
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

  async takeThose(take: number) {
    this.pagination = await stationsService.getAllActiveStations(this.pagination.skip || undefined, take);
    this.stations = this.pagination.items;
  }

  async skipThat(skip: number) {
    this.pagination = await stationsService.getAllActiveStations(skip, this.pagination.take || undefined);
    this.stations = this.pagination.items;
  }

  async mounted() {
    this.pagination = await stationsService.getAllActiveStations();
    this.stations = this.pagination.items;
  }
}