
import dayjs from "dayjs";

function dateformat(value: Date, format: string = "DD MMMM YYYY"): string {
  return dayjs(value).format(format);
}

type FiltersDefs = {
  [key: string]: Function;
}

export default {
  dateformat
} as FiltersDefs;

