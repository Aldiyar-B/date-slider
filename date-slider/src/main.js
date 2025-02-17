import Vue from "vue";
import App from "./App.vue";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

Vue.config.productionTip = false;

Vue.component("VueSlider", VueSlider);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
