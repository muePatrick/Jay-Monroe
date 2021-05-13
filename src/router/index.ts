import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import Notes from "../views/Notes.vue";
import Chatview from "../views/Chatview.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Notes",
    props: true,
    component: Notes
  },
  {
    path: "/chat",
    name: "Chat",
    props: false,
    component: Chatview
  },
  {
    path: "/settings",
    name: "Settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/Settings.vue")
  },
];

const router = new VueRouter({
  routes
});

export default router;
