

declare const CONFIGURATION: IConfiguration;

console.log('loaded configuration', CONFIGURATION);

export const Config: IConfiguration = CONFIGURATION;

interface IConfiguration {
  env: string,
  auth: {
    authenticationServerUrl: string,
    clientId: string,
    clientSecret: string,
    checkSessionInterval: number,
    renewSessionTimeLimit: number
  },
  api: {
    apiServerUrl: string,
  },
}