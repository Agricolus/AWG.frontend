import Vue from "vue";
import Component from 'vue-class-component';

import CONFIGURATION from "./config";

@Component({})
export default class App extends Vue {
  get appconfig() {
    return CONFIGURATION;
  }
  mounted (): void {
    if (CONFIGURATION.env == 'development')
      console.debug("global configuration:", CONFIGURATION);
  }
}
