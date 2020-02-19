import iziToast, { IziToastSettings } from "izitoast";

export class AlertHelper {
  public static showInfo(title: string, description: string, timeout: number | string | boolean = 5000, buttons = {}, onClosed = function () { }) {
    let id = typeof timeout === "string" ? timeout : null;
    let tout = typeof timeout === "number" || typeof timeout === "boolean" ? timeout : null;
    let close = id ? false : true;
    try {
      iziToast.success({
        id: id,
        timeout: timeout,
        titleColor: '#43425d',
        titleSize: '15px',
        close: close,
        theme: "light",
        title: title,
        message: description,
        progressBarColor: '#fafafa',
        icon: "fas fa-check fa-2x",
        iconColor: "#43425d",
        position: "topRight",
        progressBarEasing: 'linear',
        progressBar: true,
        closeOnEscape: false,
        drag: false,
        buttons: buttons,
        onClosed: onClosed,
      } as any);
    } catch (err) { }
  }

  private static operation: number = 0;
  public static showLoader(info: string) {

    try {
      iziToast.info({
        id: "toastLoading",
        timeout: 15000,
        icon: "fas fa-circle-notch fa-spin fa-fw",
        position: "bottomLeft",
        toastOnce: true,
        theme: "dark",
        // title: localizeFunction(info),
        close: false,
        width: 200,
        transitionIn: "fadeIn",
        transitionOut: "fadeOut",
        progressBarEasing: 'linear',
        progressBar: true,
        progressBarColor: "#c9243f",
        closeOnEscape: false,
        drag: false,
        onClosed: function () {
          AlertHelper.operation = 0;
        }
      } as any);
    } catch (err) { }

    AlertHelper.operation++;
  }

  public static hideLoader() {
    AlertHelper.operation--;

    if (AlertHelper.operation < 1) {
      try {
        var toast = document.querySelector('#toastLoading') as any;
        (iziToast as any).hide(toast);
      } catch (err) { }
    }
  }

  public static showError(title: string, description: string, timeout: number | boolean = 30000, position: string = "topLeft", close = true) {
    try {
      iziToast.error({
        timeout: timeout, theme: "dark",
        title: title,
        message: description,
        class: "agr-error",
        icon: "fas fa-exclamation-circle fa-2x",
        position: position,
        progressBarEasing: 'linear',
        progressBar: true,
        progressBarColor: "#c9243f",
        closeOnEscape: false,
        close: close,
        drag: false,
      } as any);
    } catch (err) { }
  }

  public static hideInfo(id: string) {
    iziToast.hide(("#" + id) as any, null, null);
  }
}
