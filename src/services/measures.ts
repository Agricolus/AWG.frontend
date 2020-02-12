import BaseRestService from "./base";
import CONFIGURATION from '@/config';

class MeasuresServices extends BaseRestService {
  measuresApiEndpoint: string;

  constructor() {
    super();
    this.measuresApiEndpoint = (CONFIGURATION.api as any).apiServerUrl.concat("/api/measures");
  }

  async getLastMeasure(stationId: string): Promise<dto.WeatherObserved> {
    console.debug("dummy call to getLastMeasure", `${this.measuresApiEndpoint}/last?stationId=${stationId}`);
    return {
      id: "observation-id",
      type: "observation-type",
      dataProvider: "http://dataprovider??",
      dateModified: new Date(),
      dateCreated: new Date(),
      name: "observation-name",
      location: "any???",
      address: "observation-address",
      dateObserved: new Date(),
      source: "observation-source",
      refDevice: "observation-refdev",
      refPointOfInterest: "observation-refpoi",
      weatherType: dto.WeatherTypeEnum.thunder,
      dewPoint: 123,
      visibility: dto.WeatherMeasureVisibilityEnum.veryPoor,
      temperature: 21,
      relativeHumidity: 50,
      precipitation: 5,
      windDirection: 234,
      windSpeed: 12,
      atmosphericPressure: 1234,
      pressureTendency: dto.PressureTendencyEnum.raising,
      solarRadiation: 2,
      illuminance: 3,
      streamGauge: 4,
      snowHeight: 5,
    };// as dto.WeatherObserved;
  }

  async getLastDailyMeasure(stationId: string, from: Date | null = null, to: Date | null = null): Promise<dto.DailyMeasureDetail[]> {
    console.debug("dummy call to getLastDailyMeasure", `${this.measuresApiEndpoint}/daily?stationId=${stationId}&from=${from}&to=${to}`);
    return [
      {
        stationId: 'station-1',
        date: new Date(),
        precipitations: 1,
        solarRadiations: 2,
        avgSolarRadiations: 3,
        minWindSpeed: 4,
        avgWindSpeed: 5,
        maxWindSpeed: 6,
        minTemperature: 7,
        avgTemperature: 8,
        maxTemperature: 9,
        minRelativeHumidity: 10,
        avgRelativeHumidity: 11,
        maxRelativeHumidity: 12,
        windDirection: 13,
      },
      {
        stationId: 'station-2',
        date: new Date(),
        precipitations: 1,
        solarRadiations: 2,
        avgSolarRadiations: 3,
        minWindSpeed: 4,
        avgWindSpeed: 5,
        maxWindSpeed: 6,
        minTemperature: 7,
        avgTemperature: 8,
        maxTemperature: 9,
        minRelativeHumidity: 10,
        avgRelativeHumidity: 11,
        maxRelativeHumidity: 12,
        windDirection: 13,
      }
    ] as dto.DailyMeasureDetail[];
  }

  async  getLastWeeklyMeasure(stationId: string, from: Date | null = null, to: Date | null = null): Promise<dto.WeeklyMeasureDetail[]> {
    console.debug("dummy call to getLastWeeklyMeasure", `${this.measuresApiEndpoint}/weekly?stationId=${stationId}&from=${from}&to=${to}`)
    return [
      {
        stationId: 'station-1',
        date: new Date(),
        precipitations: 1,
        solarRadiations: 2,
        avgSolarRadiations: 3,
        minWindSpeed: 4,
        avgWindSpeed: 5,
        maxWindSpeed: 6,
        minTemperature: 7,
        avgTemperature: 8,
        maxTemperature: 9,
        minRelativeHumidity: 10,
        avgRelativeHumidity: 11,
        maxRelativeHumidity: 12,
        windDirection: 13,
        year: 2020,
        week: 10,
        dateLast: new Date(),
      },
      {
        stationId: 'station-2',
        date: new Date(),
        precipitations: 1,
        solarRadiations: 2,
        avgSolarRadiations: 3,
        minWindSpeed: 4,
        avgWindSpeed: 5,
        maxWindSpeed: 6,
        minTemperature: 7,
        avgTemperature: 8,
        maxTemperature: 9,
        minRelativeHumidity: 10,
        avgRelativeHumidity: 11,
        maxRelativeHumidity: 12,
        windDirection: 13,
        year: 2020,
        week: 10,
        dateLast: new Date(),
      }
    ]; // as dto.WeeklyMeasureDetail[];
  }

  async getLastMonthlyMeasure(stationId: string, from: Date | null = null, to: Date | null = null): Promise<dto.MonthlyMeasureDetail[]> {
    console.debug("dummy call to getLastMonthlyMeasure", `${this.measuresApiEndpoint}/monthly?stationId=${stationId}&from=${from}&to=${to}`)
    return [{
      stationId: 'station-1',
      date: new Date(),
      precipitations: 1,
      solarRadiations: 2,
      avgSolarRadiations: 3,
      minWindSpeed: 4,
      avgWindSpeed: 5,
      maxWindSpeed: 6,
      minTemperature: 7,
      avgTemperature: 8,
      maxTemperature: 9,
      minRelativeHumidity: 10,
      avgRelativeHumidity: 11,
      maxRelativeHumidity: 12,
      windDirection: 13,
      year: 2020,
      month: 1
    },
    {
      stationId: 'station-2',
      date: new Date(),
      precipitations: 1,
      solarRadiations: 2,
      avgSolarRadiations: 3,
      minWindSpeed: 4,
      avgWindSpeed: 5,
      maxWindSpeed: 6,
      minTemperature: 7,
      avgTemperature: 8,
      maxTemperature: 9,
      minRelativeHumidity: 10,
      avgRelativeHumidity: 11,
      maxRelativeHumidity: 12,
      windDirection: 13,
      year: 2020,
      month: 1
    }];// as dto.MonthlyMeasureDetail[];
  }

  async getMeasureList(stationId: string, from: Date | null = null, to: Date | null = null): Promise<dto.WeatherObserved[]> {
    console.debug("dummy call to getMeasureList", `${this.measuresApiEndpoint}/interval?stationId=${stationId}&from=${from}&to=${to}`)
    return [{
      id: "observation-id-1",
      type: "observation-type",
      dataProvider: "http://dataprovider??",
      dateModified: new Date(),
      dateCreated: new Date(),
      name: "observation-name",
      location: "any???",
      address: "observation-address",
      dateObserved: new Date(),
      source: "observation-source",
      refDevice: "observation-refdev",
      refPointOfInterest: "observation-refpoi",
      weatherType: dto.WeatherTypeEnum.thunder,
      dewPoint: 123,
      visibility: dto.WeatherMeasureVisibilityEnum.veryPoor,
      temperature: 21,
      relativeHumidity: 50,
      precipitation: 5,
      windDirection: 234,
      windSpeed: 12,
      atmosphericPressure: 1234,
      pressureTendency: dto.PressureTendencyEnum.raising,
      solarRadiation: 2,
      illuminance: 3,
      streamGauge: 4,
      snowHeight: 5,
    },
    {
      id: "observation-id-2",
      type: "observation-type",
      dataProvider: "http://dataprovider??",
      dateModified: new Date(),
      dateCreated: new Date(),
      name: "observation-name",
      location: "any???",
      address: "observation-address",
      dateObserved: new Date(),
      source: "observation-source",
      refDevice: "observation-refdev",
      refPointOfInterest: "observation-refpoi",
      weatherType: dto.WeatherTypeEnum.thunder,
      dewPoint: 123,
      visibility: dto.WeatherMeasureVisibilityEnum.veryPoor,
      temperature: 21,
      relativeHumidity: 50,
      precipitation: 5,
      windDirection: 234,
      windSpeed: 12,
      atmosphericPressure: 1234,
      pressureTendency: dto.PressureTendencyEnum.raising,
      solarRadiation: 2,
      illuminance: 3,
      streamGauge: 4,
      snowHeight: 5,
    }]; // as dto.WeatherObserved[];
  }

}