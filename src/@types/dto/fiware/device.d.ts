declare namespace dto {
  interface Device {
    id: string;
    type: string;
    source: string;
    dataProvider: string;
    category: string[];
    controlledProperty: string[];
    controlledAsset: string[];
    mnc: string;
    mcc: string;
    macAddress: string[];
    ipAddress: string[];
    supportedProtocol: string[];
    configuration: any;
    location: any;
    name: string;
    description: string;
    dateInstalled: Date | null;
    dateFirstUsed: Date | null;
    dateManufactured: Date | null;
    hardwareVersion: string;
    softwareVersion: string;
    firmwareVersion: string;
    osVersion: string;
    dateLastCalibration: Date | null;
    serialNumber: string;
    provider: any;
    refDeviceModel: string;
    batteryLevel: number | null;
    rssi: number | null;
    deviceState: string;
    dateLastValueReported: Date | null;
    value: string;
    dateModified: Date;
    dateCreated: Date;
    owner: any[];
  }
}