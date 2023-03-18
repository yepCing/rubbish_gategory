import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import registerGlobal from "@/global";
import setup from "@/utils/setup";
import "./css/style.scss";

const app = createApp(App);
app.use(router).use(registerGlobal).use(setup).mount("#app");
import native from "../src/utils/native";
window.native = native;
