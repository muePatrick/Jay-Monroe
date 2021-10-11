import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircle,
  faEllipsisH,
  faEllipsisV,
  faExclamationTriangle,
  faStickyNote,
  faUser,
  faComments,
  faCogs,
  faCaretDown,
  faCaretUp,
  faPlus,
  faThumbtack,
  faFileDownload,
  faFileUpload
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faStickyNote,
  faUser,
  faPlus,
  faExclamationTriangle,
  faCircle,
  faEllipsisV,
  faEllipsisH,
  faComments,
  faCogs,
  faCaretDown,
  faCaretUp,
  faThumbtack,
  faFileDownload,
  faFileUpload
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

import VueAnimXYZ from "@animxyz/vue";
import "@animxyz/core"; // Import css here if you haven't elsewhere
Vue.use(VueAnimXYZ);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

import "./registerServiceWorker";

import { toast } from "bulma-toast";
window.alert = (content: string, options = {}) => {
  // HACK
  // eslint-disable-next-line
  const defaultOptions: any = {
    message: content,
    type: "is-success",
    dismissible: false,
    pauseOnHover: true,
    duration: 2500,
    position: "top-right",
    closeOnClick: true
  };
  options = { ...defaultOptions, ...options };
  toast(options);
};
