import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


Vue.config.productionTip = false

import { CONFIG_PROMISE } from "./config";

CONFIG_PROMISE.then((configuration) =>
{
  //VUE APPLICATION STARTUP
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');

});
