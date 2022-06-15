import { baseRestService } from "./base";
import { Config } from '@/config';

class MeasuresServices extends baseRestService {
  measuresApiEndpoint: string;

  constructor() {
    super();
    this.measuresApiEndpoint = Config.api.apiServerUrl.concat("/api/measures");
  }

  async getLastMeasure(stationId: string): Promise<dto.WeatherObserved> {
    return await this.Get<dto.WeatherObserved>(`${this.measuresApiEndpoint}/last?stationId=${stationId}`);
  }

  async getLastDailyMeasures(stationId: string, from: Date | null = null, to: Date | null = null): Promise<dto.DailyMeasureDetail[]> {
    return await this.Get<dto.DailyMeasureDetail[]>(`${this.measuresApiEndpoint}/daily?stationId=${stationId}&fromDate=${from.toISOString()}&toDate=${to.toISOString()}`);
  }

  async getLastWeeklyMeasures(stationId: string, from: Date | null = null, to: Date | null = null): Promise<dto.WeeklyMeasureDetail[]> {
    return await this.Get<dto.WeeklyMeasureDetail[]>(`${this.measuresApiEndpoint}/weekly?stationId=${stationId}&fromDate=${from.toISOString()}&toDate=${to.toISOString()}`);
  }

  async getLastMonthlyMeasures(stationId: string, from: Date | null = null, to: Date | null = null): Promise<dto.MonthlyMeasureDetail[]> {
    return await this.Get<dto.MonthlyMeasureDetail[]>(`${this.measuresApiEndpoint}/monthly?stationId=${stationId}&fromDate=${from.toISOString()}&toDate=${to.toISOString()}`);
  }

  async getMeasuresList(stationId: string, from: Date | null = null, to: Date | null = null): Promise<dto.WeatherObserved[]> {
    return await this.Get<dto.WeatherObserved[]>(`${this.measuresApiEndpoint}/interval?stationId=${stationId}&fromDate=${from.toISOString()}&toDate=${to.toISOString()}`);
  }

}


export default new MeasuresServices();