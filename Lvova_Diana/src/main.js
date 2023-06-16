import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css";
import "material-icons/iconfont/material-icons.css";
import "./assets/style/main.scss";
import "./config/firebase.config";
import VueApexCharts from "vue-apexcharts";

const icons = require.context('@/components/icons', false, /icon-\w+(-)?\w+\.(vue)$/)

icons.keys().forEach(iconFile => {
  const componentConfig = icons(iconFile)

  const componentName = iconFile
    .replace('.vue', '')
    .replace('./', '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(' ')
    .map(word => word.toLowerCase())
    .join('-')

  Vue.component(componentName, componentConfig.default || componentConfig)
})

Vue.component("apexchart", VueApexCharts)
Vue.use(Vuesax);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    store.dispatch("stateChanged");
  }
}).$mount("#app");
