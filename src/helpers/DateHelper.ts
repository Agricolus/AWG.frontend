// const reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z?|(\+|-)([\d|:]*))?$/;
const reISO = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/;
const reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;

export function toDate(key: string, value: string) {
  if (typeof value === "string") {
    var a = reISO.exec(value);
    if (a) {
      if (value.indexOf("Z") <= 0)
        return new Date(value + "Z");
      else
        return new Date(value);
    }
    a = reMsAjax.exec(value);
    if (a) {
      var b = a[1].split(/[-+,.]/);
      return new Date(b[0] ? +b[0] : 0 - +b[1]);
    }
  }
  return value;
}
