import BaseRestService from "./base";
import CONFIGURATION from '@/config';

class StationsServicesMOCKED extends BaseRestService {
  stationsApiEndpoint: string;

  constructor() {
    super();
    this.stationsApiEndpoint = (CONFIGURATION.api as any).apiServerUrl.concat("/api/stations");;
  }


  async getAllActiveStations(): Promise<dto.Device[]> {
    console.debug("dummy call to getAllActiveStations", this.stationsApiEndpoint);
    return __MOKED_STATIONS_DATAS;
  }

  async getStation(stationId: string): Promise<dto.Device> {
    console.debug("dummy call to getStation", `${this.stationsApiEndpoint}/${stationId}`);
    return (__MOKED_STATIONS_DATAS.find(d => d.id == stationId) || null) as dto.Device;
  }
  async createStation(organizationId: string, station: dto.CreateStation): Promise<dto.Device> {
    console.debug("dummy call to createStation", `${this.stationsApiEndpoint}/station?organizationId=${organizationId}`);
    return {
      id: "station-XXX",
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
  async updateStation(stationId: string, station: dto.UpdateStation): Promise<dto.Device> {
    console.debug("dummy call to updateStation", `${this.stationsApiEndpoint}/station/${stationId}`);
    let stationIdx = __MOKED_STATIONS_DATAS.findIndex(d => d.id == stationId);
    __MOKED_STATIONS_DATAS[stationIdx] = Object.assign(__MOKED_STATIONS_DATAS[stationIdx], station);
    return __MOKED_STATIONS_DATAS[stationIdx];
  }
  async deleteStation(stationId: string): Promise<void> {
    console.debug("dummy call to deleteStation", `${this.stationsApiEndpoint}/station/${stationId}`);
  }


}

export default new StationsServicesMOCKED();



const __MOKED_STATIONS_DATAS: dto.Device[] = [{
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
  location: { "type": "Point", "coordinates": [42.0, 12.0] },
  name: "station-1 name",
  description: "station-1 description",
  dateInstalled: new Date('2020-01-01'),
  dateFirstUsed: new Date('2020-01-01'),
  dateManufactured: new Date('2019-01-01'),
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
  dateLastValueReported: new Date('2020-01-01'),
  value: "station-value-??",
  dateModified: new Date('2020-01-01'),
  dateCreated: new Date('2020-01-01'),
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
  location: { "type": "Point", "coordinates": [42.91, 11.31] },
  name: "station-2 name",
  description: "station-2 bla bla",
  dateInstalled: new Date('2020-01-02'),
  dateFirstUsed: new Date('2020-01-02'),
  dateManufactured: new Date('2019-01-02'),
  hardwareVersion: "hwv-0.0.0.0",
  softwareVersion: "swv-0.0.0.0",
  firmwareVersion: "fwv-0.0.0.0",
  osVersion: "fwv-0.0.0.0",
  dateLastCalibration: new Date('2020-01-02'),
  serialNumber: "station-serial-number",
  provider: { wathever: "whenever" },
  refDeviceModel: "station-ref-dev-model",
  batteryLevel: 0,
  rssi: 1000,
  deviceState: "broken",
  dateLastValueReported: new Date('2020-01-02'),
  value: "station-value-??",
  dateModified: new Date('2020-01-02'),
  dateCreated: new Date('2020-01-02'),
  owner: [{ mine: "mine of mine", your: "not at all" }]
},
{
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
  location: { "type": "Point", "coordinates": [43.11, 11.11] },
  name: "station-3 name",
  description: "station-3 XXXXXXXXX",
  dateInstalled: new Date('2020-01-03'),
  dateFirstUsed: new Date('2020-01-03'),
  dateManufactured: new Date('2019-01-03'),
  hardwareVersion: "hwv-0.0.0.0",
  softwareVersion: "swv-0.0.0.0",
  firmwareVersion: "fwv-0.0.0.0",
  osVersion: "fwv-0.0.0.0",
  dateLastCalibration: new Date('2020-01-03'),
  serialNumber: "station-serial-number",
  provider: { wathever: "whenever" },
  refDeviceModel: "station-ref-dev-model",
  batteryLevel: 0,
  rssi: 1000,
  deviceState: "broken",
  dateLastValueReported: new Date('2020-01-03'),
  value: "station-value-??",
  dateModified: new Date('2020-01-03'),
  dateCreated: new Date('2020-01-03'),
  owner: [{ mine: "mine of mine", your: "not at all" }]
},
{
  id: "station-4",
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
  location: { "type": "Point", "coordinates": [42.41, 11.91] },
  name: "station-4 name giurgio",
  description: "station-4 string+string+string+string+string+string",
  dateInstalled: new Date('2020-01-04'),
  dateFirstUsed: new Date('2020-01-04'),
  dateManufactured: new Date('2019-01-04'),
  hardwareVersion: "hwv-0.0.0.0",
  softwareVersion: "swv-0.0.0.0",
  firmwareVersion: "fwv-0.0.0.0",
  osVersion: "fwv-0.0.0.0",
  dateLastCalibration: new Date('2020-01-04'),
  serialNumber: "station-serial-number",
  provider: { wathever: "whenever" },
  refDeviceModel: "station-ref-dev-model",
  batteryLevel: 0,
  rssi: 1000,
  deviceState: "broken",
  dateLastValueReported: new Date('2020-01-04'),
  value: "station-value-??",
  dateModified: new Date('2020-01-04'),
  dateCreated: new Date('2020-01-04'),
  owner: [{ mine: "mine of mine", your: "not at all" }]
},
{
  id: "station-5",
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
  location: { "type": "Point", "coordinates": [42.51, 12.51] },
  name: "station-5 ambaradans",
  description: "station-5 ....",
  dateInstalled: new Date('2020-01-05'),
  dateFirstUsed: new Date('2020-01-05'),
  dateManufactured: new Date('2020-01-05'),
  hardwareVersion: "hwv-0.0.0.0",
  softwareVersion: "swv-0.0.0.0",
  firmwareVersion: "fwv-0.0.0.0",
  osVersion: "fwv-0.0.0.0",
  dateLastCalibration: new Date('2020-01-05'),
  serialNumber: "station-serial-number",
  provider: { wathever: "whenever" },
  refDeviceModel: "station-ref-dev-model",
  batteryLevel: 0,
  rssi: 1000,
  deviceState: "broken",
  dateLastValueReported: new Date('2020-01-05'),
  value: "station-value-??",
  dateModified: new Date('2020-01-05'),
  dateCreated: new Date('2020-01-05'),
  owner: [{ mine: "mine of mine", your: "not at all" }]
},
{
  id: "station-6",
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
  location: { "type": "Point", "coordinates": [43.001, 12.34] },
  name: "station-6 name",
  description: "station-6 string",
  dateInstalled: new Date('2020-01-06'),
  dateFirstUsed: new Date('2020-01-06'),
  dateManufactured: new Date('2020-01-06'),
  hardwareVersion: "hwv-0.0.0.0",
  softwareVersion: "swv-0.0.0.0",
  firmwareVersion: "fwv-0.0.0.0",
  osVersion: "fwv-0.0.0.0",
  dateLastCalibration: new Date('2020-01-06'),
  serialNumber: "station-serial-number",
  provider: { wathever: "whenever" },
  refDeviceModel: "station-ref-dev-model",
  batteryLevel: 0,
  rssi: 1000,
  deviceState: "broken",
  dateLastValueReported: new Date('2020-01-06'),
  value: "station-value-??",
  dateModified: new Date('2020-01-06'),
  dateCreated: new Date('2020-01-06'),
  owner: [{ mine: "mine of mine", your: "not at all" }]
},
{
  id: "station-7",
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
  location: { "type": "Point", "coordinates": [42.17, 12.37] },
  name: "station-name",
  description: "station-string",
  dateInstalled: new Date('2020-01-07'),
  dateFirstUsed: new Date('2020-01-07'),
  dateManufactured: new Date('2020-01-07'),
  hardwareVersion: "hwv-0.0.0.0",
  softwareVersion: "swv-0.0.0.0",
  firmwareVersion: "fwv-0.0.0.0",
  osVersion: "fwv-0.0.0.0",
  dateLastCalibration: new Date('2020-01-07'),
  serialNumber: "station-serial-number",
  provider: { wathever: "whenever" },
  refDeviceModel: "station-ref-dev-model",
  batteryLevel: 0,
  rssi: 1000,
  deviceState: "broken",
  dateLastValueReported: new Date('2020-01-07'),
  value: "station-value-??",
  dateModified: new Date('2020-01-07'),
  dateCreated: new Date('2020-01-07'),
  owner: [{ mine: "mine of mine", your: "not at all" }]
},
{
  id: "station-8",
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
  location: { "type": "Point", "coordinates": [42.28, 14.08] },
  name: "station-8 name",
  description: "station-8 string",
  dateInstalled: new Date('2020-01-08'),
  dateFirstUsed: new Date('2020-01-08'),
  dateManufactured: new Date('2020-01-08'),
  hardwareVersion: "hwv-0.0.0.0",
  softwareVersion: "swv-0.0.0.0",
  firmwareVersion: "fwv-0.0.0.0",
  osVersion: "fwv-0.0.0.0",
  dateLastCalibration: new Date('2020-01-08'),
  serialNumber: "station-serial-number",
  provider: { wathever: "whenever" },
  refDeviceModel: "station-ref-dev-model",
  batteryLevel: 0,
  rssi: 1000,
  deviceState: "broken",
  dateLastValueReported: new Date('2020-01-08'),
  value: "station-value-??",
  dateModified: new Date('2020-01-08'),
  dateCreated: new Date('2020-01-08'),
  owner: [{ mine: "mine of mine", your: "not at all" }]
},
{
  id: "station-9",
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
  location: { "type": "Point", "coordinates": [41.91, 12.39] },
  name: "station-name",
  description: "station-string",
  dateInstalled: new Date('2020-01-09'),
  dateFirstUsed: new Date('2020-01-09'),
  dateManufactured: new Date('2020-01-09'),
  hardwareVersion: "hwv-0.0.0.0",
  softwareVersion: "swv-0.0.0.0",
  firmwareVersion: "fwv-0.0.0.0",
  osVersion: "fwv-0.0.0.0",
  dateLastCalibration: new Date('2020-01-09'),
  serialNumber: "station-serial-number",
  provider: { wathever: "whenever" },
  refDeviceModel: "station-ref-dev-model",
  batteryLevel: 0,
  rssi: 1000,
  deviceState: "broken",
  dateLastValueReported: new Date('2020-01-09'),
  value: "station-value-??",
  dateModified: new Date('2020-01-09'),
  dateCreated: new Date('2020-01-09'),
  owner: [{ mine: "mine of mine", your: "not at all" }]
},
{
  id: "station-10",
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
  location: { "type": "Point", "coordinates": [42.51, 15.51] },
  name: "station-10 name",
  description: "station-10 string",
  dateInstalled: new Date('2020-01-10'),
  dateFirstUsed: new Date('2020-01-10'),
  dateManufactured: new Date(),
  hardwareVersion: "hwv-0.0.0.0",
  softwareVersion: "swv-0.0.0.0",
  firmwareVersion: "fwv-0.0.0.0",
  osVersion: "fwv-0.0.0.0",
  dateLastCalibration: new Date('2020-01-10'),
  serialNumber: "station-serial-number",
  provider: { wathever: "whenever" },
  refDeviceModel: "station-ref-dev-model",
  batteryLevel: 0,
  rssi: 1000,
  deviceState: "broken",
  dateLastValueReported: new Date('2020-01-10'),
  value: "station-value-??",
  dateModified: new Date('2020-01-10'),
  dateCreated: new Date('2020-01-10'),
  owner: [{ mine: "mine of mine", your: "not at all" }]
},
{
  id: "station-11",
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
  location: { "type": "Point", "coordinates": [42.1111, 12.3111] },
  name: "station-name",
  description: "station-string",
  dateInstalled: new Date('2020-01-01'),
  dateFirstUsed: new Date('2020-01-01'),
  dateManufactured: new Date('2020-01-01'),
  hardwareVersion: "hwv-0.0.0.0",
  softwareVersion: "swv-0.0.0.0",
  firmwareVersion: "fwv-0.0.0.0",
  osVersion: "fwv-0.0.0.0",
  dateLastCalibration: new Date('2020-01-01'),
  serialNumber: "station-serial-number",
  provider: { wathever: "whenever" },
  refDeviceModel: "station-ref-dev-model",
  batteryLevel: 0,
  rssi: 1000,
  deviceState: "broken",
  dateLastValueReported: new Date('2020-01-01'),
  value: "station-value-??",
  dateModified: new Date('2020-01-01'),
  dateCreated: new Date('2020-01-01'),
  owner: [{ mine: "mine of mine", your: "not at all" }]
},
{
  id: "station-12",
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
  location: { "type": "Point", "coordinates": [42.3133, 12.33133] },
  name: "station-12 name",
  description: "station-12 string",
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
  id: "station-13",
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
  location: { "type": "Point", "coordinates": [43.11, 12.6731] },
  name: "station-13 name",
  description: "station-13 string",
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
  id: "station-14",
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
  location: { "type": "Point", "coordinates": [42.4111, 12.4131] },
  name: "station-14 name",
  description: "station-14 string",
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
