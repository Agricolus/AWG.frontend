import BaseRestService from "./base";
import CONFIGURATION from '@/config';

class MeasuresServices extends BaseRestService {
  measuresApiEndpoint: string;

  constructor() {
    super();
    this.measuresApiEndpoint = CONFIGURATION.api!.apiServerUrl.concat("/api/measures");
  }

  async getLastMeasure(stationId: string): Promise<dto.WeatherObserved> {
    let endpoint = `${this.measuresApiEndpoint}/last?stationId=${stationId}`;
    return this.restClient.get(endpoint);
  }

  async getLastDailyMeasure(stationId: string, from: Date | null = null, to: Date | null = null): Promise<dto.DailyMeasureDetail[]> {
    let endpoint = `${this.measuresApiEndpoint}/daily?stationId=${stationId}&from=${from}&to=${to}`;
    return this.restClient.get(endpoint);
  }

  async  getLastWeeklyMeasure(stationId: string, from: Date | null = null, to: Date | null = null): Promise<dto.WeeklyMeasureDetail[]> {
    let endpoint = `${this.measuresApiEndpoint}/weekly?stationId=${stationId}&from=${from}&to=${to}`;
    return this.restClient.get(endpoint);
  }

  async getLastMonthlyMeasure(stationId: string, from: Date | null = null, to: Date | null = null): Promise<dto.MonthlyMeasureDetail[]> {
    let endpoint = `${this.measuresApiEndpoint}/monthly?stationId=${stationId}&from=${from}&to=${to}`;
    return this.restClient.get(endpoint);
  }

  async getMeasureList(stationId: string, from: Date | null = null, to: Date | null = null): Promise<dto.WeatherObserved[]> {
    let endpoint = `${this.measuresApiEndpoint}/interval?stationId=${stationId}&from=${from}&to=${to}`;
    return this.restClient.get(endpoint);
  }

}


export default new MeasuresServices();