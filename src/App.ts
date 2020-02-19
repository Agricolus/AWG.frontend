import Vue from "vue";
import Component from 'vue-class-component';

import CONFIGURATION, { IConfiguration } from "./config";

@Component({})
export default class App extends Vue {
  get appconfig(): IConfiguration {
    return CONFIGURATION;
  }
}
