import axios from "axios";
import CONFIGURATION from "@/config";

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

//calls to measures endpoints
let measuresApiEndpoint = CONFIGURATION.api?.apiServerUrl.concat("/api/measures");
export async function getLastMeasure(stationId: string): Promise<dto.WeatherObserved> {
  console.debug("dummy call to getLastMeasure", `${measuresApiEndpoint}/last?stationId=${stationId}`);
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

export async function getLastDailyMeasure(stationId: string, from: Date | null = null, to: Date | null = null): Promise<dto.DailyMeasureDetail[]> {
  console.debug("dummy call to getLastDailyMeasure", `${measuresApiEndpoint}/daily?stationId=${stationId}&from=${from}&to=${to}`);
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
  console.debug("dummy call to getLastWeeklyMeasure", `${measuresApiEndpoint}/weekly?stationId=${stationId}&from=${from}&to=${to}`)
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
  console.debug("dummy call to getLastMonthlyMeasure", `${measuresApiEndpoint}/monthly?stationId=${stationId}&from=${from}&to=${to}`)
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
  console.debug("dummy call to getMeasureList", `${measuresApiEndpoint}/interval?stationId=${stationId}&from=${from}&to=${to}`)
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


//calls to stations endpoints
let stationsApiEndpoint = CONFIGURATION.api?.apiServerUrl.concat("/api/stations");
export async function getAllActiveStations(): Promise<dto.Device[]> {
  console.debug("dummy call to getAllActiveStations", stationsApiEndpoint);
  return [{
    id: "station-1",
    type: "station-type",
    source: "station-source",
    dataProvider: "station-dataprovider",
    category: ["station-category"],
    controlledProperty: ["station-property-1", "station-property-2"],
    controlledAsset: ["station-asset-1", "station-aseet-2"],
    supportedProtocol: ["station-supportedProtocol-1", "station-supportedProtocol-2"],
    mnc: "station-mnc",
    mcc: "station-mcc",
    macAddress: ["station-mac-1", "station-mac-2"],
    ipAddress: ["station-IP-address-1"],
    configuration: { wathever: "whenever" },
    location: { geojson: "should be" },
    name: "station-name",
    description: "station-string",
    dateInstalled: new Date(),
    dateFirstUsed: new Date(),
    dateManufactured: new Date(),
    hardwareVersion: "hwv-0.0.0.0",
    softwareVersion: "swv-0.0.0.0",
    firmwareVersion: "fwv-0.0.0.0",
    osVersion: "fwv-0.0.0.0",
    dateLastCalibration: new Date(),
    serialNumber: "station-serial-number",
    provider: { wathever: "whenever" },
    refDeviceModel: "station-ref-dev-model",
    batteryLevel: 0,
    rssi: 1000,
    deviceState: "broken",
    dateLastValueReported: new Date(),
    value: "station-value-??",
    dateModified: new Date(),
    dateCreated: new Date(),
    owner: [{ mine: "mine of mine", your: "not at all" }]
  },
  {
    id: "station-2",
    type: "station-type",
    source: "station-source",
    dataProvider: "station-dataprovider",
    category: ["station-category"],
    controlledProperty: ["station-property-1", "station-property-2"],
    controlledAsset: ["station-asset-1", "station-aseet-2"],
    supportedProtocol: ["station-supportedProtocol-1", "station-supportedProtocol-2"],
    mnc: "station-mnc",
    mcc: "station-mcc",
    macAddress: ["station-mac-1", "station-mac-2"],
    ipAddress: ["station-IP-address-1"],
    configuration: { wathever: "whenever" },
    location: { geojson: "should be" },
    name: "station-name",
    description: "station-string",
    dateInstalled: new Date(),
    dateFirstUsed: new Date(),
    dateManufactured: new Date(),
    hardwareVersion: "hwv-0.0.0.0",
    softwareVersion: "swv-0.0.0.0",
    firmwareVersion: "fwv-0.0.0.0",
    osVersion: "fwv-0.0.0.0",
    dateLastCalibration: new Date(),
    serialNumber: "station-serial-number",
    provider: { wathever: "whenever" },
    refDeviceModel: "station-ref-dev-model",
    batteryLevel: 0,
    rssi: 1000,
    deviceState: "broken",
    dateLastValueReported: new Date(),
    value: "station-value-??",
    dateModified: new Date(),
    dateCreated: new Date(),
    owner: [{ mine: "mine of mine", your: "not at all" }]
  }];
}

export async function getStation(stationId: string): Promise<dto.Device> {
  console.debug("dummy call to getStation", `${stationsApiEndpoint}/${stationId}`);
  return {
    id: "station-1",
    type: "station-type",
    source: "station-source",
    dataProvider: "station-dataprovider",
    category: ["station-category"],
    controlledProperty: ["station-property-1", "station-property-2"],
    controlledAsset: ["station-asset-1", "station-aseet-2"],
    supportedProtocol: ["station-supportedProtocol-1", "station-supportedProtocol-2"],
    mnc: "station-mnc",
    mcc: "station-mcc",
    macAddress: ["station-mac-1", "station-mac-2"],
    ipAddress: ["station-IP-address-1"],
    configuration: { wathever: "whenever" },
    location: { geojson: "should be" },
    name: "station-name",
    description: "station-string",
    dateInstalled: new Date(),
    dateFirstUsed: new Date(),
    dateManufactured: new Date(),
    hardwareVersion: "hwv-0.0.0.0",
    softwareVersion: "swv-0.0.0.0",
    firmwareVersion: "fwv-0.0.0.0",
    osVersion: "fwv-0.0.0.0",
    dateLastCalibration: new Date(),
    serialNumber: "station-serial-number",
    provider: { wathever: "whenever" },
    refDeviceModel: "station-ref-dev-model",
    batteryLevel: 0,
    rssi: 1000,
    deviceState: "broken",
    dateLastValueReported: new Date(),
    value: "station-value-??",
    dateModified: new Date(),
    dateCreated: new Date(),
    owner: [{ mine: "mine of mine", your: "not at all" }]
  };
}
export async function createStation(organizationId: string, station: dto.CreateStation): Promise<dto.Device> {
  console.debug("dummy call to createStation", `${stationsApiEndpoint}/station?organizationId=${organizationId}`);
  return {
    id: "station-3",
    type: "station-type",
    source: "station-source",
    dataProvider: "station-dataprovider",
    category: ["station-category"],
    controlledProperty: ["station-property-1", "station-property-2"],
    controlledAsset: ["station-asset-1", "station-aseet-2"],
    supportedProtocol: ["station-supportedProtocol-1", "station-supportedProtocol-2"],
    mnc: "station-mnc",
    mcc: "station-mcc",
    macAddress: ["station-mac-1", "station-mac-2"],
    ipAddress: ["station-IP-address-1"],
    configuration: { wathever: "whenever" },
    location: { geojson: "should be" },
    name: "station-name",
    description: "station-string",
    dateInstalled: new Date(),
    dateFirstUsed: new Date(),
    dateManufactured: new Date(),
    hardwareVersion: "hwv-0.0.0.0",
    softwareVersion: "swv-0.0.0.0",
    firmwareVersion: "fwv-0.0.0.0",
    osVersion: "fwv-0.0.0.0",
    dateLastCalibration: new Date(),
    serialNumber: "station-serial-number",
    provider: { wathever: "whenever" },
    refDeviceModel: "station-ref-dev-model",
    batteryLevel: 0,
    rssi: 1000,
    deviceState: "broken",
    dateLastValueReported: new Date(),
    value: "station-value-??",
    dateModified: new Date(),
    dateCreated: new Date(),
    owner: [{ mine: "mine of mine", your: "not at all" }]
  };
}
export async function updateStation(stationId: string, station: dto.UpdateStation): Promise<dto.Device> {
  console.debug("dummy call to updateStation", `${stationsApiEndpoint}/station/${stationId}`);
  return {
    id: "station-1",
    type: "station-type",
    source: "station-source",
    dataProvider: "station-dataprovider",
    category: ["station-category"],
    controlledProperty: ["station-property-1", "station-property-2"],
    controlledAsset: ["station-asset-1", "station-aseet-2"],
    supportedProtocol: ["station-supportedProtocol-1", "station-supportedProtocol-2"],
    mnc: "station-mnc",
    mcc: "station-mcc",
    macAddress: ["station-mac-1", "station-mac-2"],
    ipAddress: ["station-IP-address-1"],
    configuration: { wathever: "whenever" },
    location: { geojson: "should be" },
    name: "station-name (updated)",
    description: "station-string",
    dateInstalled: new Date(),
    dateFirstUsed: new Date(),
    dateManufactured: new Date(),
    hardwareVersion: "hwv-0.0.0.0",
    softwareVersion: "swv-0.0.0.0",
    firmwareVersion: "fwv-0.0.0.0",
    osVersion: "fwv-0.0.0.0",
    dateLastCalibration: new Date(),
    serialNumber: "station-serial-number",
    provider: { wathever: "whenever" },
    refDeviceModel: "station-ref-dev-model",
    batteryLevel: 0,
    rssi: 1000,
    deviceState: "broken",
    dateLastValueReported: new Date(),
    value: "station-value-??",
    dateModified: new Date(),
    dateCreated: new Date(),
    owner: [{ mine: "mine of mine", your: "not at all" }]
  };
}
export async function deleteStation(stationId: string): Promise<void> {
  console.debug("dummy call to updateStation", `${deleteStation}/station/${stationId}`);
}