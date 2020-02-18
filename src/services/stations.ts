import BaseRestService from "./base";
import CONFIGURATION from '@/config';

class StationsServices extends BaseRestService {
  stationsApiEndpoint: string;

  constructor() {
    super();
    this.stationsApiEndpoint = CONFIGURATION.api.apiServerUrl.concat("/api/stations");;
  }


  async getAllActiveStations(skip: number = 0, take: number = 20): Promise<dto.Paginated<dto.Device>> {
    let endpoint = `${this.stationsApiEndpoint}?skip=${skip}&take=${take}`;
    return (await this.restClient.get(endpoint)).data;
  }

  async getStation(stationId: string): Promise<dto.Device> {
    let endpoint = `${this.stationsApiEndpoint}/${stationId}`;
    return (await this.restClient.get(endpoint)).data;
  }

  async getNearestStations(lon: number, lat: number, skip: number = 0, take: number = 20): Promise<dto.Paginated<dto.Device>> {
    let endpoint = `${this.stationsApiEndpoint}/nearest?longitude=${lon}&latitude=${lat}&skip=${skip}&take=${take}`;
    return (await this.restClient.get(endpoint)).data;
  }

  async createStation(station: dto.Device): Promise<dto.Device> {
    let endpoint = `${this.stationsApiEndpoint}`;
    return (await this.restClient.post(endpoint, station)).data;
  }
  async updateStation(station: dto.Device): Promise<dto.Device> {
    let endpoint = `${this.stationsApiEndpoint}`;
    return (await this.restClient.put(endpoint, station)).data;
  }
  async deleteStation(stationId: string): Promise<void> {
    let endpoint = `${this.stationsApiEndpoint}/${stationId}`;
    return (await this.restClient.delete(endpoint)).data;
  }


}

export default new StationsServices();