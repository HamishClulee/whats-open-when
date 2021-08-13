import "vue2-timepicker/dist/VueTimepicker.css";

import Vue from "vue";
import App from "./App.vue";
import Api from "./api";

Vue.prototype.$api = new Api();

new Vue({
  render: (h) => h(App),
}).$mount("#app");
