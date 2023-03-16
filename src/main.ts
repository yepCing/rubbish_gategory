import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import registerGlobal from "@/global";
import "./css/style.scss";
const app = createApp(App);
app.use(router).use(registerGlobal).mount("#app");
