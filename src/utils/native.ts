const { messageHandlers = {} } = window.webkit || {};
const appHub = window.android_wkcon || messageHandlers.wkcon;
const inLocal = /localhost/.test(location.origin);

const JSBridgeFnMap: any = {};
export function addJSBridgeFn(method: any, cb: any) {
  JSBridgeFnMap[method] = cb;
}

// callJs by native
window.JSBridgeFn = function (method: string, data: string) {
  // console.log(method, data)
  const fn = JSBridgeFnMap[method];
  if (data && typeof data == "string") {
    try {
      data = JSON.parse(data);
    } catch (e) {
      console.error("not json", data);
    }
  }
  if (typeof fn == "function") {
    fn(data);
  }
};

export const callNative = function (method: string, opts: any = {}, cb?: any) {
  if (typeof opts == "function") {
    cb = opts;
    opts = {};
  }
  if (cb) {
    addJSBridgeFn(method, cb);
  }
  console.log(method, opts);
  if (appHub) {
    opts.method = method;
    if (window.android_wkcon) {
      opts = JSON.stringify(opts);
    }
    appHub.postMessage(opts);
  }
};

export const execNative = function (method: any, opts: any = {}) {
  return new Promise((resolve, reject) => {
    if (!appHub) {
      if (method == "onPush") {
        resolve({
          granted: true,
          token:
            "006b85b6743ae2e16536ce2d61a4a8c9ccb08f51dfeac6940da2db6d91966bfd",
        });
      } else if (method == "setWebview") {
        document.title = opts.title;
      } else if (method == "getIDFA") {
        resolve(2);
      } else if (method == "paste") {
        resolve("test");
      } else if (method == "getAppInfo") {
        resolve({
          bundle: "link.hqs.riyu",
          // bundle: "com.XTZB.CoordinatedJogging",
          uuid: "test-uuid",
          idfa: "test-red-pack-1",
          // idfa: "test-red-pack-2",
          // idfa: "0000-0000",
          // idfa: "6B9FCDAE-AB22-442E-9AF8-BF2865FCC1B3", // 600
          // idfa: "B59BF099-D3D0-4FC5-BD11-71211189963E", // 773
          version: 1.4,
        });
      }
      return;
    }
    callNative(method, opts, (data: any) => {
      if (data && typeof data == "object" && data.error) {
        reject({
          message: data.error,
          name: data.name || "error",
        });
      } else resolve(data);
    });
  });
};

export const openApp = function (bundleId: any) {
  if (inLocal) {
    return true;
  }
  return execNative("openApp", {
    bundleId,
    space: "LSApplicationWorkspace",
    s1: "defaultWorkspace",
    s2: "openApplicationWithBundleID:",
  });
};
export const loadAd = function (params: any): Promise<any> {
  return new Promise((resolve, reject) => {
    if (inLocal) {
      setTimeout(() => {
        resolve(null);
      }, 1e3);
      return;
    }
    callNative("loadAd", params, (data: any) => {
      console.log(data);
      if (data.error) reject(new Error(data.error));
      else {
        if (data.type == "reward") {
          // if (data.event) resolve();
          setTimeout(() => {
            resolve(null); // 通过alert拦截 点击领奖
          }, 2e3);
        } else {
          if (data.event) {
            resolve(null);
          }
        }
      }
    });
  });
};

export const setCopy = function (string: string) {
  return execNative("paste", {
    string,
  });
};
export const openUrl = function (url: string) {
  callNative("openUrl", {
    url,
  });
};
export const openSettings = function () {
  callNative("openUrl", {
    url: "app-settings:",
  });
};

export const openLink = function (url: string, opts = {}) {
  url = url.trim();
  if (!/^http/.test(url) && /^\//.test(url)) {
    url = "https://" + url;
  }
  Object.assign(opts, { url });
  if (appHub) callNative("openLink", opts);
  else window.open(url);
};

export interface IWindowNative {
  inApp: boolean;
  listen: (method: string, opts: any, cb?: any) => void;
  exec: (method: any, opts: any) => void;
  openApp: (bundleId: any) => any;
  loadAd: (params: any) => Promise<any>;
  openUrl: (url: string) => void;
  openLink: (url: string, opts: any) => void;
  openSettings: () => void;
  setCopy: (string: string) => any;
}

const n: IWindowNative = {
  inApp: !!appHub,
  listen: callNative,
  exec: execNative,
  openApp,
  loadAd,
  openUrl,
  openLink,
  openSettings,
  setCopy,
};

export default n;
