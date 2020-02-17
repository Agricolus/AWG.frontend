declare namespace dto {
  interface MonthlyMeasureDetail {
    stationId: string;
    year: number;
    month: number;
    date: Date;
    precipitations: number | null;
    avgRelativeHumidity: number | null;
    minRelativeHumidity: number | null;
    maxRelativeHumidity: number | null;
    avgSolarRadiations: number | null;
    minSolarRadiations: number | null;
    maxSolarRadiations: number | null;
    avgTemperature: number | null;
    minTemperature: number | null;
    maxTemperature: number | null;
    avgWindSpeed: number | null;
    minWindSpeed: number | null;
    maxWindSpeed: number | null;
    avgWindDirection: number | null;
    minWindDirection: number | null;
    maxWindDirection: number | null;
    avgAtmosphericPressure: number | null;
    minAtmosphericPressure: number | null;
    maxAtmosphericPressure: number | null;
    avgDewPoint: number | null;
    minDewPoint: number | null;
    maxDewPoint: number | null;
    avgIlluminance: number | null;
    minIlluminance: number | null;
    maxIlluminance: number | null;
    avgStreamGauge: number | null;
    minStreamGauge: number | null;
    maxStreamGauge: number | null;
    avgSnowHeight: number | null;
    minSnowHeight: number | null;
    maxSnowHeight: number | null;
  }
}