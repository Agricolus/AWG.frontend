
import dayjs from "dayjs";

function dateformat(value: Date, format: string = "DD MMMM YYYY"): string {
  let valuedayjs = dayjs(value);
  return valuedayjs.isValid() ? valuedayjs.format(format) : null;
}

function weatherConditionIcon(value: string): string {
  switch (value) {
    case 'clearNight': return 'wi wi-night-clear'
    case 'sunnyDay': return 'wi wi-day-sunny'
    case 'slightlyCloudy': return 'wi wi-day-cloudy'
    case 'partlyCloudy': return 'wi wi-cloud'
    case 'mist': return 'wi wi-day-fog'
    case 'fog': return 'wi wi-fog'

    case 'highClouds': return 'wi wi-cloudy'
    case 'cloudy': return 'wi wi-cloudy'
    case 'veryCloudy': return 'wi wi-cloudy'

    case 'overcast': return 'wi wi-cloudy'
    case 'lightRainShower': return 'wi wi-day-rain'
    case 'drizzle': return 'wi wi-day-rain'
    case 'lightRain': return 'wi wi-day-rain'
    case 'heavyRainShower': return 'wi wi-rain'

    case 'sleetShower': return 'wi wi-day-snow'
    case 'sleet': return 'wi wi-day-snow'

    case 'hailShower': return 'wi wi-day-hail'
    case 'hail': return 'wi wi-hail'
    case 'shower': return 'wi wi-hail'

    case 'lightSnow': return 'wi wi-day-snow'
    case 'snow': return 'wi wi-snow'
    case 'heavySnowShower': return 'wi wi-snow'
    case 'heavySnow': return 'wi wi-snow'

    case 'thunderShower': return 'wi wi-day-thunderstorm'
    case 'thunder': return 'wi wi-day-thunderstorm'
    default: return 'fas fa-minus'
  }
}

type FiltersDefs = {
  [key: string]: Function;
}

export default {
  dateformat,
  weatherConditionIcon
} as FiltersDefs;

