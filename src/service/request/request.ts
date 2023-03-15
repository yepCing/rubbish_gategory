import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
interface h5Interceptors {
  requestInterceptor?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig;
  requestInterceptorCatch?: (config: any) => any;
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse;
  responseInterceptorCatch?: (config: any) => any;
}
interface h5RequestConfig extends InternalAxiosRequestConfig {
  intercepoters?: h5Interceptors;
  body?: any;
}
class h5Request {
  instance: AxiosInstance;
  interceptors?: h5Interceptors;
  constructor(config: h5RequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.intercepoters;
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
  }
  request<T = any>(config: h5RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.intercepoters?.requestInterceptor) {
        config = config.intercepoters.requestInterceptor(config);
      }
      this.instance
        .request(config)
        .then((res) => {
          if (config.intercepoters?.responseInterceptor) {
            res = config.intercepoters?.responseInterceptor(res);
          }
          resolve(res.data);
        })
        .catch((error) => {
          if (config.intercepoters?.responseInterceptorCatch) {
            error = config.intercepoters?.responseInterceptorCatch(error);
          }
          reject(error);
        });
    });
  }
  get<T>(config: h5RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }
  post<T>(config: h5RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }
  put<T>(config: h5RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "PUT" });
  }
  delete<T>(config: h5RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }
}
export default h5Request;
