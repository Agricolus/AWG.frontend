import { baseRestService } from "./base";
import { Config } from '@/config';

class StationsServices extends baseRestService {
  stationsApiEndpoint: string;

  constructor() {
    super();
    this.stationsApiEndpoint = Config.api.apiServerUrl.concat("/api/stations");;
  }

  async getAllActiveStations(skip: number = 0, take: number = 20): Promise<dto.Paginated<dto.Device>> {
    return await this.Get<dto.Paginated<dto.Device>>(`${this.stationsApiEndpoint}?skip=${skip}&take=${take}`);
  }

  async getStation(stationId: string): Promise<dto.Device> {
    return await this.Get<dto.Device>(`${this.stationsApiEndpoint}/${stationId}`);
  }

  async getNearestStations(lon: number, lat: number, skip: number = 0, take: number = 20): Promise<dto.Paginated<dto.Device>> {
    return await this.Get<dto.Paginated<dto.Device>>(`${this.stationsApiEndpoint}/nearest?longitude=${lon}&latitude=${lat}&skip=${skip}&take=${take}`);
  }

  async createStation(station: dto.Device): Promise<dto.Device> {
    return await this.Post<dto.Device>(`${this.stationsApiEndpoint}`, station);
  }
  async updateStation(station: dto.Device): Promise<dto.Device> {
    return await this.Put<dto.Device>(`${this.stationsApiEndpoint}`, station);
  }
  async deleteStation(stationId: string): Promise<void> {
    return await this.Delete(`${this.stationsApiEndpoint}/${stationId}`);
  }
}

export default new StationsServices();