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
  faMinusSquare,
  faPlusSquare,
  faStickyNote,
  faUser,
  faComments
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faStickyNote,
  faUser,
  faPlusSquare,
  faMinusSquare,
  faExclamationTriangle,
  faCircle,
  faEllipsisV,
  faEllipsisH,
  faComments
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
