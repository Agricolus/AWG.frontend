export class CSVHelper {
  private static separator: string = ",";

  private static processRow(row: Array<any>) {
    let result = row.reduce((r, i) => {
      return r + '"' + (i || "").toString().replace(/"/g, '""') + '"' + this.separator;
    }, "");
    return result + "\r\n";
  };

  static exportToCsv2(fieldsToExport: any, data: Array<any>, discriminatorFunction: Function, filename, separator: string = ",") {
    this.separator = separator;
    let header = [];
    let csvdata = data.map((originalElement) => {
      let row = [];
      for (let fieldName in fieldsToExport) {
        if (originalElement.hasOwnProperty(fieldName)) {
          let h = fieldsToExport[fieldName]
          if (header.indexOf(h) < 0 || h == "") {
            header.push(h);
          }
          let fieldValue = originalElement[fieldName];
          if (discriminatorFunction)
            fieldValue = discriminatorFunction(fieldName, fieldValue, originalElement);
          row.push(fieldValue);
        }
      }
      return row;
    });
    csvdata.unshift(header);
    this.exportToCsv(filename, csvdata);
  }

  static exportToCsv(filename: string, rows: Array<Array<any>>) {
    let csvString = "";
    for (let i = 0; i < rows.length; i++) {
      csvString += CSVHelper.processRow(rows[i]);
    }
    let blob = new Blob(["\ufeff", csvString], { type: "text/csv;charset=utf-8;" });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      let link = document.createElement("a");
      if (link.download !== undefined) {
        // feature detection
        // Browsers that support HTML5 download attribute
        let url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
}