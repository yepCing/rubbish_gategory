import { IWindowNative } from "./utils/native";
declare global {
  interface Window {
    native: IWindowNative;
    webkit: any;
    android_wkcon: any;
    JSBridgeFn: any;
  }
}
