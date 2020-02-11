declare namespace dto {
  interface WeeklyMeasureDetail {
    stationId: string;
    year: number;
    week: number;
    date: Date;
    dateLast: Date;
    precipitations: number | null;
    solarRadiations: number | null;
    avgSolarRadiations: number | null;
    minWindSpeed: number | null;
    avgWindSpeed: number | null;
    maxWindSpeed: number | null;
    minTemperature: number | null;
    avgTemperature: number | null;
    maxTemperature: number | null;
    minRelativeHumidity: number | null;
    avgRelativeHumidity: number | null;
    maxRelativeHumidity: number | null;
    windDirection: number | null;
  }
}