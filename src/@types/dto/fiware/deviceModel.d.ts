declare namespace dto {
  interface DeviceModel {
    id: string;
    type: string;
    source: string;
    dataProvider: string;
    category: string;
    deviceClass: string;
    controlledProperty: string[];
    function: string[];
    supportedProtocol: string[];
    supportedUnits: string[];
    energyLimitationClass: string;
    brandName: string;
    modelName: string;
    manufacturerName: string;
    name: string;
    description: string;
    documentation: Uri;
    image: Uri;
    dateModified: Date;
    dateCreated: Date;
  }
}