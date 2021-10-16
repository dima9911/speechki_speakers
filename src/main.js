import Vue from "vue";
import Antd from "ant-design-vue";
import App from "./App";
import "ant-design-vue/dist/antd.css";
import "vue2-animate/dist/vue2-animate.min.css";

Vue.config.productionTip = false;

import axios from "axios";
Vue.prototype.$api = axios;

import accessModule from "./helpers/access-module.js";
Vue.prototype.$accessModule = accessModule;

import Debug from "./helpers/colored-console-log.js";
Vue.prototype.$debug = Debug;

import underscore from "underscore";
Vue.prototype.$_ = underscore;

Vue.use(Antd);
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
