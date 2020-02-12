import axios from "axios";
import CONFIGURATION from "@/config";


export default class BaseRestService {
  accessToken: string | null = null;

  restClient = axios.create();

  constructor() {
    //check authentication setting
    if (CONFIGURATION.auth?.isAuthenticationNeeded) {
      console.debug("application need authentication");

      if (!this.accessToken) {
        //no authentication token, redirect to login
        console.debug("no token provided... redirecting user to login");
      }
      else {
        //token ok
        console.debug("token available: ", this.accessToken);
        //register a transformer for the authentication header
        this.restClient.defaults.transformRequest = (data, headers) => {
          headers['Authorization'] = `Basic ${this.accessToken}`;
          return data;
        }
        //register response interceptor for unauthorized access
        this.restClient.interceptors.response.use((response) => {
          return response;
        },
          (error) => {
            //check for 401 error code and in case redirect to login
            console.debug("rest call error: ", error);
          });
      }
    }
  }
}