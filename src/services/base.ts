import Axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import Qs from "qs";
import { toDate } from '@/helpers/DateHelper';

export class baseRestService {
  protected allwaysSendAuthenticationToken: boolean = true;
  protected saveToSessionStorage: boolean = true;

  baseUrl: string = "";
  xSourceHeader: string = null;

  OnError: OnErrorDelegate;
  OnHeadersPreparing: OnHeadersPreparingDelegate;

  protected http: AxiosInstance;

  constructor() {
    this.http = Axios.create();

    baseRestService._token = JSON.parse(window.localStorage.getItem("authorizationData")) as AuthToken;

    this.setArraySerializationMethod();
  }

  private setArraySerializationMethod() {
    this.http.interceptors.request.use(async (reqConfig) => {
      //change the default serializer only if the method is a GET
      if (reqConfig.method !== "get") {
        return reqConfig;
      }
      //the 'repeat' is the standard behavior for array: arrKey=x&arrKey=y&arrKey=z....
      reqConfig.paramsSerializer = (params) => {
        return Qs.stringify(params, { arrayFormat: "repeat" });
      };
      return reqConfig;
    });
  }

  protected async getRaw(uri: string, params: object = {}, sendAuthenticationToken: boolean = false): Promise<AxiosResponse> {
    let response = await this.http.get(this.baseUrl + uri,
      {
        headers: this.prepareHeaders(this.allwaysSendAuthenticationToken || sendAuthenticationToken, false),
        params: params,
        responseType: 'arraybuffer'
      });

    if (response.status != 200 && this.OnError) this.OnError(response);
    return response;
  };

  protected async get(uri: string, params: object = {}, sendAuthenticationToken: boolean = false): Promise<AxiosResponse> {
    let response = await this.http.get(this.baseUrl + uri,
      {
        headers: this.prepareHeaders(this.allwaysSendAuthenticationToken || sendAuthenticationToken, false),
        params: params,
        transformResponse: (resp => resp ? JSON.parse(resp, toDate) : null)
      });

    if (response.status != 200 && this.OnError) this.OnError(response);
    return response;
  };

  protected async Get<TResult>(uri: string, params: object = {}, sendAuthenticationToken: boolean = false): Promise<TResult> {
    let result = await this.get(uri, params, sendAuthenticationToken);
    if (result.status == 200)
      return result.data as TResult;
    else if (this.OnError) this.OnError(result);
    return null;
  }

  protected async post(uri: string, data: any, params: object = {}, sendAuthenticationToken: boolean = false): Promise<AxiosResponse> {
    let response = await this.http.post(this.baseUrl + uri, data,
      {
        headers: this.prepareHeaders(this.allwaysSendAuthenticationToken || sendAuthenticationToken, true),
        params: params,
        transformResponse: (resp => resp ? JSON.parse(resp, toDate) : null)
      } as AxiosRequestConfig);
    if (response.status != 200 && this.OnError) this.OnError(response);
    return response;
  };

  protected async Post<TResult>(uri: string, data: any, params: object = {}, sendAuthenticationToken: boolean = false): Promise<TResult> {
    let result = await this.post(uri, data, params, sendAuthenticationToken);
    if (result.status == 200)
      return result.data as TResult;
    else if (this.OnError) this.OnError(result);
    return null;
  }

  protected async put(uri: string, data: any, params: object = {}, sendAuthenticationToken: boolean = false): Promise<AxiosResponse> {
    let response = await this.http.put(this.baseUrl + uri, data,
      {
        headers: this.prepareHeaders(this.allwaysSendAuthenticationToken || sendAuthenticationToken, true),
        params: params,
        transformResponse: (resp => resp ? JSON.parse(resp, toDate) : null)
      });
    if (response.status != 200 && this.OnError) this.OnError(response);
    return response;
  }

  protected async Put<TResult>(uri: string, data: any, params: object = {}, sendAuthenticationToken: boolean = false): Promise<TResult> {
    let result = await this.put(uri, data, params, sendAuthenticationToken);
    if (result.status == 200)
      return result.data as TResult;
    else if (this.OnError) this.OnError(result);
    return null;
  }

  protected async delete(uri: string, params: object = {}, sendAuthenticationToken: boolean = false): Promise<AxiosResponse> {
    let response = await this.http.delete(this.baseUrl + uri,
      {
        headers: this.prepareHeaders(this.allwaysSendAuthenticationToken || sendAuthenticationToken, false),
        params: params,
        transformResponse: (resp => resp ? JSON.parse(resp, toDate) : null)
      });
    if (response.status != 200 && this.OnError) this.OnError(response);
    return response;
  }

  protected async Delete<TResult>(uri: string, params: object = {}, sendAuthenticationToken: boolean = false): Promise<TResult> {
    let result = await this.delete(uri, params, sendAuthenticationToken);
    if (result.status == 200)
      return result.data as TResult;
    else if (this.OnError) this.OnError(result);
    return null;
  }

  protected prepareHeaders(auth: boolean = false, json: boolean = true): any {
    let headers: any = {};

    if (auth) {
      let authData = this.getAuthenticationToken();
      if (authData) {
        headers['Authorization'] = 'Bearer ' + authData.access_token;
      }
    }
    if (json) headers['Content-Type'] = 'application/json';

    if (this.OnHeadersPreparing) this.OnHeadersPreparing(headers);

    return headers;
  }

  protected static _token: AuthToken;

  protected getAuthenticationToken(): AuthToken {
    return baseRestService._token;
  }

  public static getAuthenticationToken(): AuthToken {
    return baseRestService._token;
  }

  protected async setAuthenticationToken(data: AuthToken) {
    window.localStorage.setItem("authorizationData", JSON.stringify(data));
    baseRestService._token = data;
  }

  protected async deleteAuthenticationToken() {
    window.localStorage.removeItem("authorizationData");
    baseRestService._token = null;
  }
}

export interface OnErrorDelegate { (data: DataResponse): void; }
interface OnHeadersPreparingDelegate { (headers: Headers): void; }

export class AuthToken {
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_in: number;
  expiration_date: number;
  resource: string;
  userName: string;
  token_type: string;
}

export class DataResponse {
  status: number;
  statusText: string;
  data: any;
}