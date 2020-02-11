import axios from "axios";
import CONFIGURATION from "./config";

let accessToken: string | null = null;

let restClient = axios.create();

//check authentication setting
if (CONFIGURATION.auth?.isAuthenticationNeeded) {
  console.debug("application need authentication");

  if (!accessToken) {
    //no authentication token, redirect to login
    console.debug("no token provided... redirecting user to login");
  }
  else {
    //token ok
    console.debug("token available: ", accessToken);
    //register a transformer for the authentication header
    restClient.defaults.transformRequest = (data, headers) => {
      headers['Authorization'] = `Basic ${accessToken}`;
      return data;
    }
    //register response interceptor for unauthorized access
    restClient.interceptors.response.use((response) => {
      return response;
    },
      (error) => {
        //check for 401 error code and in case redirect to login
        console.debug("rest call error: ", error);
      });
  }

}


//call to measures endpoints
let measuresApiEndpoint = CONFIGURATION.api?.apiServerUrl.concat("/api/measures/");
export async function getLastMeasure(stationId: string): Promise<dto.WeatherObserved> {
  console.debug("dummy call to getLastMeasure", measuresApiEndpoint?.concat("last"));
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
    weatherType: 1,
    dewPoint: 123,
    visibility: 1,
    temperature: 21,
    relativeHumidity: 50,
    precipitation: 5,
    windDirection: 234,
    windSpeed: 12,
    atmosphericPressure: 1234,
    pressureTendency: 1,
    solarRadiation: 2,
    illuminance: 3,
    streamGauge: 4,
    snowHeight: 5,
  };// as dto.WeatherObserved;
}

export async function getLastDailyMeasure(stationId: string, from: Date | null = null, to: Date | null = null): Promise<dto.DailyMeasureDetail[]> {
  console.debug("dummy call to getLastDailyMeasure", measuresApiEndpoint?.concat("daily"));
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

export async function getLastWeeklyMeasure(stationId: string, from: Date | null = null, to: Date | null = null): Promise<dto.WeeklyMeasureDetail[]> {
  console.debug("dummy call to getLastWeeklyMeasure", measuresApiEndpoint?.concat("last"))
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

export async function getLastMonthlyMeasure(stationId: string, from: Date | null = null, to: Date | null = null): Promise<dto.MonthlyMeasureDetail[]> {
  console.debug("dummy call to getLastMonthlyMeasure", measuresApiEndpoint?.concat("weekly"))
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

export async function getMeasureList(stationId: string, from: Date | null = null, to: Date | null = null): Promise<dto.WeatherObserved[]> {
  console.debug("dummy call to getMeasureList", measuresApiEndpoint?.concat("monthly"))
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
    weatherType: 1,
    dewPoint: 123,
    visibility: 1,
    temperature: 21,
    relativeHumidity: 50,
    precipitation: 5,
    windDirection: 234,
    windSpeed: 12,
    atmosphericPressure: 1234,
    pressureTendency: 1,
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
    weatherType: 1,
    dewPoint: 123,
    visibility: 1,
    temperature: 21,
    relativeHumidity: 50,
    precipitation: 5,
    windDirection: 234,
    windSpeed: 12,
    atmosphericPressure: 1234,
    pressureTendency: 1,
    solarRadiation: 2,
    illuminance: 3,
    streamGauge: 4,
    snowHeight: 5,
  }]; // as dto.WeatherObserved[];
}




