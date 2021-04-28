import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import Notes from "../views/Notes.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Notes",
    props: true,
    component: Notes
  }
];

const router = new VueRouter({
  routes
});

export default router;
