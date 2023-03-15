import { AxiosHeaders } from "axios";
import H5Request from "./request/request";
// import { closeToast, showLoadingToast } from "vant";

export const h5Request = new H5Request({
  headers: new AxiosHeaders(),
  baseURL: process.env.VUE_APP_BASE_URL,
  intercepoters: {
    requestInterceptor(config) {
      return config;
    },
    responseInterceptor(res) {
      return res;
    },
  },
});
