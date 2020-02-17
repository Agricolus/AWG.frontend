import axios from "axios";
import CONFIGURATION from "@/config";


export default class BaseRestService {
  private static accessToken: string | null = null;

  restClient = axios.create();

  constructor() {
    //check authentication setting
    if (CONFIGURATION.auth?.isAuthenticationNeeded) {
      console.debug("application need authentication");

      if (!BaseRestService.accessToken) {
        //no authentication token, redirect to login
        console.debug("no token provided... redirecting user to login");
      }
      else {
        //token ok
        console.debug("token available: ", BaseRestService.accessToken);
        //register a transformer for the authentication header
        this.restClient.defaults.transformRequest = (data, headers) => {
          headers['Authorization'] = `Basic ${BaseRestService.accessToken}`;
          return data;
        }

      }
    }
    //register response interceptor for unauthorized access
    this.restClient.interceptors.response.use((response) => {
      return response;
    },
      (error) => {
        //check for 401 error code and in case redirect to login ???
        // if (error.response.status == 401) {
        //   //redirect to auth service
        // }
        //other server error response
        console.error("REST CALL ERROR CODE: %O\nREST CALL ERROR MESSAGE: %O", error.response.status, error.response.data);
        throw "api_error";
      });
    //custom deserialization
    this.restClient.defaults.transformResponse = (data, header) => {
      if (header['content-type'] && header['content-type'].indexOf("application/json") >= 0) {
        return JSON.parse(data || null, this.JSONDeserializer)
      }
      return data;
    };
  }


  //custom JSON deserializer to give back date strings as date object
  private JSONDeserializer(key: string, value: any) {
    const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z?$/;
    if (typeof value === "string" && dateFormat.test(value)) {
      return new Date(value);
    }
    return value;
  }

}