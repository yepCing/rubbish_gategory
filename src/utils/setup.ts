import type { App } from "vue";
import { showToast, showLoadingToast, closeToast } from "vant";
import type { ToastOptions } from "vant";
export default function (app: App) {
  const global = app.config.globalProperties;
  // app.provide()
  global.$showToast = showToast;
  global.$loading = (
    params: ToastOptions = {
      message: "加载中...",
      forbidClick: true,
    }
  ) => {
    return showLoadingToast(params);
  };
  global.$close = closeToast;
}
