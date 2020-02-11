declare namespace dto {
  interface UpdateStation {
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
    documentation: string;
    image: string;
    dateModified: Date;
    dateCreated: Date;
  }
}