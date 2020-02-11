import Vue from 'vue'
Vue.config.productionTip = false
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


  //VUE APPLICATION STARTUP
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app');

});
