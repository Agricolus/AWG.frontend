import BaseRestService from "./base";
import CONFIGURATION from '@/config';
import { WeatherTypeEnum } from '@/enums/weatherTypeEnum';
import { WeatherMeasureVisibilityEnum } from '@/enums/weatherMeasureVisibilityEnum';
import { PressureTendencyEnum } from '@/enums/pressureTendencyEnum';
import dayjs from 'dayjs';

class MeasuresServicesMOCKED extends BaseRestService {
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
      weatherType: WeatherTypeEnum.thunder,
      dewPoint: 123,
      visibility: WeatherMeasureVisibilityEnum.veryPoor,
      temperature: 21,
      relativeHumidity: 50,
      precipitation: 5,
      windDirection: 234,
      windSpeed: 12,
      atmosphericPressure: 1234,
      pressureTendency: PressureTendencyEnum.raising,
      solarRadiation: 2,
      illuminance: 3,
      streamGauge: 4,
      snowHeight: 5,
    };// as dto.WeatherObserved;
  }

  async getLastDailyMeasures(stationId: string, from: Date | null = null, to: Date | null = null): Promise<dto.DailyMeasureDetail[]> {
    console.debug("dummy call to getLastDailyMeasure", `${this.measuresApiEndpoint}/daily?stationId=${stationId}&from=${from}&to=${to}`);
    // return __LAST_DAILY_MEASURES.filter(m => m.stationId == stationId);

    let days = Math.ceil((to.getTime() - from.getTime()) / 1000 / 60 / 60 / 24);
    let out = [];
    for (let h = 0; h < days; h++) {
      let d1 = dayjs().subtract(h, 'day');
      let t = randomFromInterval(-10, 40);
      let tmin = randomFromInterval(0, t - 1);
      let tmax = randomFromInterval(t + 1, 40);
      let hu = randomFromInterval(0, 100);
      let humin = randomFromInterval(0, hu - 1);
      let humax = randomFromInterval(hu + 1, 100);
      let ws = randomFromInterval(0, 50);
      let wsmin = randomFromInterval(0, ws - 1);
      let wsmax = randomFromInterval(ws + 1, 100);
      out.push({
        stationId: stationId,
        date: d1.toDate(),
        precipitations: getRandomVal(),
        solarRadiations: getRandomVal(),
        avgSolarRadiations: getRandomVal(),
        minWindSpeed: wsmin,
        avgWindSpeed: ws,
        maxWindSpeed: wsmax,
        minTemperature: tmin,
        avgTemperature: t,
        maxTemperature: tmax,
        minRelativeHumidity: humin,
        avgRelativeHumidity: hu,
        maxRelativeHumidity: humax,
        windDirection: getRandomVal(),
      });
    }
    return out;
  }

  async getLastWeeklyMeasures(stationId: string, from: Date | null = null, to: Date | null = null): Promise<dto.WeeklyMeasureDetail[]> {
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

  async getLastMonthlyMeasures(stationId: string, from: Date | null = null, to: Date | null = null): Promise<dto.MonthlyMeasureDetail[]> {
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

  async getMeasuresList(stationId: string, from: Date | null = null, to: Date | null = null): Promise<dto.WeatherObserved[]> {
    console.debug("dummy call to getMeasureList", `${this.measuresApiEndpoint}/interval?stationId=${stationId}&from=${from}&to=${to}`)
    let hours = Math.ceil((to.getTime() - from.getTime()) / 1000 / 60 / 60);
    let out = [];
    for (let h = 0; h < hours; h++) {
      let d1 = dayjs().subtract(h, 'hour');
      out.push({
        id: "observation-id-" + h,
        type: "observation-type",
        dataProvider: "http://dataprovider??",
        dateModified: d1.toDate(),
        dateCreated: d1.toDate(),
        name: "observation-name",
        location: "any???",
        address: "observation-address",
        dateObserved: d1.toDate(),
        source: "observation-source",
        refDevice: stationId,
        refPointOfInterest: "observation-refpoi",
        weatherType: Object.keys(WeatherTypeEnum)[randomIntFromInterval(0, 25)],
        dewPoint: getRandomVal(),
        visibility: Object.keys(WeatherMeasureVisibilityEnum)[randomIntFromInterval(0, 5)],
        temperature: getRandomVal(),
        relativeHumidity: getRandomVal(),
        precipitation: getRandomVal(),
        windDirection: getRandomVal(),
        windSpeed: getRandomVal(),
        atmosphericPressure: getRandomVal(),
        pressureTendency: Object.keys(PressureTendencyEnum)[randomIntFromInterval(0, 2)],
        solarRadiation: getRandomVal(),
        illuminance: getRandomVal(),
        streamGauge: getRandomVal(),
        snowHeight: getRandomVal(),
      });
    }
    return out;
  }
}



export default new MeasuresServicesMOCKED();


const __LAST_DAILY_MEASURES = [
  {
    stationId: 'station-1',
    date: new Date(),
    precipitations: 1.1,
    solarRadiations: 2.1,
    avgSolarRadiations: 3.1,
    minWindSpeed: 4.1,
    avgWindSpeed: 5.1,
    maxWindSpeed: 6.1,
    minTemperature: 7.1,
    avgTemperature: 8.1,
    maxTemperature: 9.1,
    minRelativeHumidity: 10.1,
    avgRelativeHumidity: 11.1,
    maxRelativeHumidity: 12.1,
    windDirection: 13.1,
  },
  {
    stationId: 'station-1',
    date: dayjs().subtract(1, 'day').toDate(),
    precipitations: 1.2,
    solarRadiations: 2.2,
    avgSolarRadiations: 3.2,
    minWindSpeed: 4.2,
    avgWindSpeed: 5.2,
    maxWindSpeed: 6.2,
    minTemperature: 7.2,
    avgTemperature: 8.2,
    maxTemperature: 9.2,
    minRelativeHumidity: 10.2,
    avgRelativeHumidity: 11.2,
    maxRelativeHumidity: 12.2,
    windDirection: 13.2,
  },
  {
    stationId: 'station-1',
    date: dayjs().subtract(2, 'day').toDate(),
    precipitations: 1.3,
    solarRadiations: 2.3,
    avgSolarRadiations: 3.3,
    minWindSpeed: 4.3,
    avgWindSpeed: 5.3,
    maxWindSpeed: 6.3,
    minTemperature: 7.3,
    avgTemperature: 8.3,
    maxTemperature: 9.3,
    minRelativeHumidity: 10.3,
    avgRelativeHumidity: 11.3,
    maxRelativeHumidity: 12.3,
    windDirection: 13.3,
  },
  {
    stationId: 'station-1',
    date: dayjs().subtract(3, 'day').toDate(),
    precipitations: 1.4,
    solarRadiations: 2.4,
    avgSolarRadiations: 3.4,
    minWindSpeed: 4.4,
    avgWindSpeed: 5.4,
    maxWindSpeed: 6.4,
    minTemperature: 7.4,
    avgTemperature: 8.4,
    maxTemperature: 9.4,
    minRelativeHumidity: 10.4,
    avgRelativeHumidity: 11.4,
    maxRelativeHumidity: 12.4,
    windDirection: 13.4,
  },
  {
    stationId: 'station-1',
    date: dayjs().subtract(4, 'day').toDate(),
    precipitations: 1.5,
    solarRadiations: 2.5,
    avgSolarRadiations: 3.5,
    minWindSpeed: 4.5,
    avgWindSpeed: 5.5,
    maxWindSpeed: 6.5,
    minTemperature: 7.5,
    avgTemperature: 8.5,
    maxTemperature: 9.5,
    minRelativeHumidity: 10.5,
    avgRelativeHumidity: 11.5,
    maxRelativeHumidity: 12.5,
    windDirection: 13.5,
  },
  {
    stationId: 'station-1',
    date: dayjs().subtract(5, 'day').toDate(),
    precipitations: 1.6,
    solarRadiations: 2.6,
    avgSolarRadiations: 3.6,
    minWindSpeed: 4.6,
    avgWindSpeed: 5.6,
    maxWindSpeed: 6.6,
    minTemperature: 7.6,
    avgTemperature: 8.6,
    maxTemperature: 9.6,
    minRelativeHumidity: 10.6,
    avgRelativeHumidity: 11.6,
    maxRelativeHumidity: 12.6,
    windDirection: 13.6,
  },
  {
    stationId: 'station-1',
    date: dayjs().subtract(6, 'day').toDate(),
    precipitations: 1.7,
    solarRadiations: 2.7,
    avgSolarRadiations: 3.7,
    minWindSpeed: 4.7,
    avgWindSpeed: 5.7,
    maxWindSpeed: 6.7,
    minTemperature: 7.7,
    avgTemperature: 8.7,
    maxTemperature: 9.7,
    minRelativeHumidity: 10.7,
    avgRelativeHumidity: 11.7,
    maxRelativeHumidity: 12.7,
    windDirection: 13.7,
  },

  {
    stationId: 'station-13',
    date: new Date(),
    precipitations: parseFloat((1.1 * Math.random() * 10).toFixed(2)),
    solarRadiations: parseFloat((2.1 * Math.random() * 10).toFixed(2)),
    avgSolarRadiations: parseFloat((3.1 * Math.random() * 10).toFixed(2)),
    minWindSpeed: parseFloat((4.1 * Math.random() * 10).toFixed(2)),
    avgWindSpeed: parseFloat((5.1 * Math.random() * 10).toFixed(2)),
    maxWindSpeed: parseFloat((6.1 * Math.random() * 10).toFixed(2)),
    minTemperature: parseFloat((7.1 * Math.random() * 10).toFixed(2)),
    avgTemperature: parseFloat((8.1 * Math.random() * 10).toFixed(2)),
    maxTemperature: parseFloat((9.1 * Math.random() * 10).toFixed(2)),
    minRelativeHumidity: parseFloat((10.1 * Math.random() * 10).toFixed(2)),
    avgRelativeHumidity: parseFloat((11.1 * Math.random() * 10).toFixed(2)),
    maxRelativeHumidity: parseFloat((12.1 * Math.random() * 10).toFixed(2)),
    windDirection: parseFloat((13.1 * Math.random() * 10).toFixed(2)),
  },
  {
    stationId: 'station-13',
    date: dayjs().subtract(1, 'day').toDate(),
    precipitations: parseFloat((1.2 * Math.random() * 10).toFixed(2)),
    solarRadiations: parseFloat((2.2 * Math.random() * 10).toFixed(2)),
    avgSolarRadiations: parseFloat((3.2 * Math.random() * 10).toFixed(2)),
    minWindSpeed: parseFloat((4.2 * Math.random() * 10).toFixed(2)),
    avgWindSpeed: parseFloat((5.2 * Math.random() * 10).toFixed(2)),
    maxWindSpeed: parseFloat((6.2 * Math.random() * 10).toFixed(2)),
    minTemperature: parseFloat((7.2 * Math.random() * 10).toFixed(2)),
    avgTemperature: parseFloat((8.2 * Math.random() * 10).toFixed(2)),
    maxTemperature: parseFloat((9.2 * Math.random() * 10).toFixed(2)),
    minRelativeHumidity: parseFloat((10.2 * Math.random() * 10).toFixed(2)),
    avgRelativeHumidity: parseFloat((11.2 * Math.random() * 10).toFixed(2)),
    maxRelativeHumidity: parseFloat((12.2 * Math.random() * 10).toFixed(2)),
    windDirection: parseFloat((13.2 * Math.random() * 10).toFixed(2)),
  },
  {
    stationId: 'station-13',
    date: dayjs().subtract(2, 'day').toDate(),
    precipitations: parseFloat((1.3 * Math.random() * 10).toFixed(2)),
    solarRadiations: parseFloat((2.3 * Math.random() * 10).toFixed(2)),
    avgSolarRadiations: parseFloat((3.3 * Math.random() * 10).toFixed(2)),
    minWindSpeed: parseFloat((4.3 * Math.random() * 10).toFixed(2)),
    avgWindSpeed: parseFloat((5.3 * Math.random() * 10).toFixed(2)),
    maxWindSpeed: parseFloat((6.3 * Math.random() * 10).toFixed(2)),
    minTemperature: parseFloat((7.3 * Math.random() * 10).toFixed(2)),
    avgTemperature: parseFloat((8.3 * Math.random() * 10).toFixed(2)),
    maxTemperature: parseFloat((9.3 * Math.random() * 10).toFixed(2)),
    minRelativeHumidity: parseFloat((10.3 * Math.random() * 10).toFixed(2)),
    avgRelativeHumidity: parseFloat((11.3 * Math.random() * 10).toFixed(2)),
    maxRelativeHumidity: parseFloat((12.3 * Math.random() * 10).toFixed(2)),
    windDirection: parseFloat((13.3 * Math.random() * 10).toFixed(2)),
  },
  {
    stationId: 'station-13',
    date: dayjs().subtract(3, 'day').toDate(),
    precipitations: parseFloat((1.4 * Math.random() * 10).toFixed(2)),
    solarRadiations: parseFloat((2.4 * Math.random() * 10).toFixed(2)),
    avgSolarRadiations: parseFloat((3.4 * Math.random() * 10).toFixed(2)),
    minWindSpeed: parseFloat((4.4 * Math.random() * 10).toFixed(2)),
    avgWindSpeed: parseFloat((5.4 * Math.random() * 10).toFixed(2)),
    maxWindSpeed: parseFloat((6.4 * Math.random() * 10).toFixed(2)),
    minTemperature: parseFloat((7.4 * Math.random() * 10).toFixed(2)),
    avgTemperature: parseFloat((8.4 * Math.random() * 10).toFixed(2)),
    maxTemperature: parseFloat((9.4 * Math.random() * 10).toFixed(2)),
    minRelativeHumidity: parseFloat((10.4 * Math.random() * 10).toFixed(2)),
    avgRelativeHumidity: parseFloat((11.4 * Math.random() * 10).toFixed(2)),
    maxRelativeHumidity: parseFloat((12.4 * Math.random() * 10).toFixed(2)),
    windDirection: parseFloat((13.4 * Math.random() * 10).toFixed(2)),
  },
  {
    stationId: 'station-13',
    date: dayjs().subtract(4, 'day').toDate(),
    precipitations: parseFloat((1.5 * Math.random() * 10).toFixed(2)),
    solarRadiations: parseFloat((2.5 * Math.random() * 10).toFixed(2)),
    avgSolarRadiations: parseFloat((3.5 * Math.random() * 10).toFixed(2)),
    minWindSpeed: parseFloat((4.5 * Math.random() * 10).toFixed(2)),
    avgWindSpeed: parseFloat((5.5 * Math.random() * 10).toFixed(2)),
    maxWindSpeed: parseFloat((6.5 * Math.random() * 10).toFixed(2)),
    minTemperature: parseFloat((7.5 * Math.random() * 10).toFixed(2)),
    avgTemperature: parseFloat((8.5 * Math.random() * 10).toFixed(2)),
    maxTemperature: parseFloat((9.5 * Math.random() * 10).toFixed(2)),
    minRelativeHumidity: parseFloat((10.5 * Math.random() * 10).toFixed(2)),
    avgRelativeHumidity: parseFloat((11.5 * Math.random() * 10).toFixed(2)),
    maxRelativeHumidity: parseFloat((12.5 * Math.random() * 10).toFixed(2)),
    windDirection: parseFloat((13.5 * Math.random() * 10).toFixed(2)),
  },
  {
    stationId: 'station-13',
    date: dayjs().subtract(5, 'day').toDate(),
    precipitations: parseFloat((1.6 * Math.random() * 10).toFixed(2)),
    solarRadiations: parseFloat((2.6 * Math.random() * 10).toFixed(2)),
    avgSolarRadiations: parseFloat((3.6 * Math.random() * 10).toFixed(2)),
    minWindSpeed: parseFloat((4.6 * Math.random() * 10).toFixed(2)),
    avgWindSpeed: parseFloat((5.6 * Math.random() * 10).toFixed(2)),
    maxWindSpeed: parseFloat((6.6 * Math.random() * 10).toFixed(2)),
    minTemperature: parseFloat((7.6 * Math.random() * 10).toFixed(2)),
    avgTemperature: parseFloat((8.6 * Math.random() * 10).toFixed(2)),
    maxTemperature: parseFloat((9.6 * Math.random() * 10).toFixed(2)),
    minRelativeHumidity: parseFloat((10.6 * Math.random() * 10).toFixed(2)),
    avgRelativeHumidity: parseFloat((11.6 * Math.random() * 10).toFixed(2)),
    maxRelativeHumidity: parseFloat((12.6 * Math.random() * 10).toFixed(2)),
    windDirection: parseFloat((13.6 * Math.random() * 10).toFixed(2)),
  },
  {
    stationId: 'station-13',
    date: dayjs().subtract(6, 'day').toDate(),
    precipitations: parseFloat((1.7 * Math.random() * 10).toFixed(2)),
    solarRadiations: parseFloat((2.7 * Math.random() * 10).toFixed(2)),
    avgSolarRadiations: parseFloat((3.7 * Math.random() * 10).toFixed(2)),
    minWindSpeed: parseFloat((4.7 * Math.random() * 10).toFixed(2)),
    avgWindSpeed: parseFloat((5.7 * Math.random() * 10).toFixed(2)),
    maxWindSpeed: parseFloat((6.7 * Math.random() * 10).toFixed(2)),
    minTemperature: parseFloat((7.7 * Math.random() * 10).toFixed(2)),
    avgTemperature: parseFloat((8.7 * Math.random() * 10).toFixed(2)),
    maxTemperature: parseFloat((9.7 * Math.random() * 10).toFixed(2)),
    minRelativeHumidity: parseFloat((10.7 * Math.random() * 10).toFixed(2)),
    avgRelativeHumidity: parseFloat((11.7 * Math.random() * 10).toFixed(2)),
    maxRelativeHumidity: parseFloat((12.7 * Math.random() * 10).toFixed(2)),
    windDirection: parseFloat((13.7 * Math.random() * 10).toFixed(2)),
  }
];



function getRandomVal(seed: number = 1) {
  return parseFloat((seed * Math.random() * 10).toFixed(2));
}

function randomFromInterval(min, max) {
  return parseFloat((Math.random() * (max - min + 1) + min).toFixed(2));
}

function randomIntFromInterval(min, max) {
  return Math.floor(randomFromInterval(min, max));
}