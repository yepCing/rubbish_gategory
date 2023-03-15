import type { App } from "vue";
import { registerVant } from "./register-vant";
export default function (app: App) {
  registerVant(app);
}
