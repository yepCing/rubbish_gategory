import type { App } from "vue";
import { showToast, showLoadingToast, closeToast } from "vant";
import type { ToastOptions } from "vant";
import native from "./native";
export default function (app: App) {
  app.provide("$showToast", showToast);
  const openLink = (url: string, title?: string) => {
    if (!/^https?:/.test(url)) {
      url = location.origin + location.pathname + "#" + url;
    }
    if (location.host.match(/localhost/)) {
      window.open(url);
    } else {
      native.exec("openLink", { url, title: title ?? "速查" });
    }
  };
  app.provide("$openLink", openLink);
  const $loading = (
    params: ToastOptions = {
      message: "加载中...",
      forbidClick: true,
    }
  ) => {
    return showLoadingToast(params);
  };
  app.provide("$loading", $loading);
  app.provide("$close", closeToast);
}
