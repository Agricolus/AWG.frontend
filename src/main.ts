import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


Vue.config.productionTip = false

import { CONFIG_PROMISE, CONFIGURATION } from "./config";

console.debug("configuration imported at app startup", CONFIGURATION);

CONFIG_PROMISE.then((configuration) =>
{
  console.debug("configuration resolved at app startup", configuration, CONFIGURATION);

  //VUE APPLICATION STARTUP
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');

});
