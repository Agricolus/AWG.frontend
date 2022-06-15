import "@fortawesome/fontawesome-free/css/all.css";
import 'weather-icons/css/weather-icons.css';

import { securityService } from '@/services/security';
import Vue from 'vue'
Vue.config.productionTip = false

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

import VTooltip from "v-tooltip";
Vue.use(VTooltip, {
  defaultPlacement: 'top',
  defaultTrigger: 'click'
});

import { InitializeApp } from './startup';

import isvalid from "./mixins/isValid";
Vue.mixin(isvalid);

Vue.config.productionTip = false;

import App from "@/App.vue";
import router from "@/router";

import filters from "@/filters";
for (let name in filters) {
  Vue.filter(name, filters[name]);
}

async function startup() {
  await securityService.RenewToken();
  await InitializeApp();
}

startup().then(() => new Vue({
  router,
  render: h => h(App)
}).$mount('#app'));