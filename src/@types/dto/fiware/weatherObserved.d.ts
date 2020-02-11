declare namespace dto {
  interface WeatherObserved {
    id: string;
    type: string;
    dataProvider: Uri;
    dateModified: Date;
    dateCreated: Date;
    name: string;
    location: any;
    address: string;
    dateObserved: Date;
    source: string;
    refDevice: string;
    refPointOfInterest: string;
    weatherType: WeatherTypeEnum;
    dewPoint: number;
    visibility: WeatherMeasureVisibilityEnum;
    temperature: number;
    relativeHumidity: number;
    precipitation: number;
    windDirection: number;
    windSpeed: number;
    atmosphericPressure: number;
    pressureTendency: PressureTendencyEnum;
    solarRadiation: number;
    illuminance: number;
    streamGauge: number;
    snowHeight: number;
  }
}