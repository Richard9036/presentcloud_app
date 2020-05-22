// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueResource from "vue-resource";
import less from "less";
import axios from "axios";
import Cookies from "js-cookie";
import QS from "qs";
import cookie from "./util/cookie"
Vue.prototype.cookie=cookie;
Vue.prototype.$axios = axios;
Vue.prototype.qs = QS;
Vue.use(less);
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(Cookies);
axios.defaults.withCredentials = true; //让ajax携带cookie
Vue.config.productionTip = false;

Vue.use(MintUI);

axios.defaults.baseURL = "http://localhost:8080";
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
