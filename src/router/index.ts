import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/MainView.vue"),
  },
  {
    path: "/search",
    name: "SearchRubbish",
    component: () => import("../views/SearchRubbish/SearchRubbish.vue"),
  },
  {
    path: "/detail/:name",
    name: "DetailRubbish",
    component: () => import("../views/DetailRubbish/DetailRubbish.vue"),
  },
  {
    path: "/category",
    name: "Category",
    component: () => import("../views/CategoryRubbish/CategoryRubbish.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
