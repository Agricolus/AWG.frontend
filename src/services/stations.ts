import BaseRestService from "./base";
import CONFIGURATION from '@/config';

class StationsServices extends BaseRestService {
  stationsApiEndpoint: string;

  constructor() {
    super();
    this.stationsApiEndpoint = CONFIGURATION.api.apiServerUrl.concat("/api/stations");;
  }


  async getAllActiveStations(): Promise<dto.Device[]> {
    let endpoint = this.stationsApiEndpoint;
    return this.restClient.get(endpoint);
  }

  async getStation(stationId: string): Promise<dto.Device> {
    let endpoint = `${this.stationsApiEndpoint}/${stationId}`;
    return this.restClient.get(endpoint);
  }
  async createStation(station: dto.Device): Promise<dto.Device> {
    let endpoint = `${this.stationsApiEndpoint}/station`;
    return this.restClient.post(endpoint, station);
  }
  async updateStation(stationId: string, station: dto.Device): Promise<dto.Device> {
    let endpoint = `${this.stationsApiEndpoint}/station/${stationId}`;
    return this.restClient.put(endpoint, station);
  }
  async deleteStation(stationId: string): Promise<void> {
    let endpoint = `${this.stationsApiEndpoint}/station/${stationId}`;
    return this.restClient.delete(endpoint);
  }


}

export default new StationsServices();