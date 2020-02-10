import axios from 'axios';

const configpath = "/config.".concat(process.env.NODE_ENV).concat(".json");

export var CONFIGURATION: IConfiguration = {}

export const CONFIG_PROMISE = axios.get(configpath).then((response) => {
  //   //MAGIC: globalThis è lo scopo globale cross platform (node, browser...) polyfillato.
  //   //è un'opzione per esporre nello scopo globale il valore dell'oggetto di configurazione, ma non è molto elegante
  //   (globalThis as any).config == config;
  //   (window as any).config = config;
  Object.assign(CONFIGURATION, response.data);
  return CONFIGURATION;
},
() => {
  throw "Catastrofic error! unable to load ".concat(configpath);
});

export default CONFIGURATION;


interface IConfiguration {
  env?: string,
  auth?: {
    isAuthenticationNeeded: boolean,
    authenticationServerUrl: string,
    redirectUrl: string
  },
  api?: {
    apiServerUrl: string
  }
}