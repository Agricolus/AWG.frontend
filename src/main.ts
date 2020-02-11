import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
Vue.config.productionTip = false

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-popup', LPopup);
import { CONFIG_PROMISE } from "@/config";


Vue.config.productionTip = false
CONFIG_PROMISE.then(async (configuration) => {
  //dynamic import of main vue component and routes definistions in order to ensure that all other component
  //that import the apis.ts statically will receive them already configured
  const App = (await import("@/App.vue")).default;
  const router = (await import("@/router")).default;

  //importing and registering filter vue definition
  const filters = (await import("@/filters")).default;
  for (let filterName in filters) {
    Vue.filter(filterName, filters[filterName]);
  }

CONFIG_PROMISE.then((configuration) => {
  //VUE APPLICATION STARTUP
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app');
});
