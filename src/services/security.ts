import Qs from "qs";
import { baseRestService, AuthToken } from './base';
import { Config } from '@/config';
import { createDecorator } from 'vue-class-component';

class SecurityService extends baseRestService {
  private static _myself = null;
  private static _userInfo: server.userInfo = null;

  constructor() {
    super();

    this.baseUrl = Config.auth.authenticationServerUrl;
    this.saveToSessionStorage = false;

    SecurityService._myself = this;
    SecurityService._userInfo = JSON.parse(window.localStorage.getItem("userInfo")) as server.userInfo;

    setInterval(this.autoRenewToken, Config.auth.checkSessionInterval);
  }

  async Login(username: string, password: string): Promise<server.userInfo> {
    var formdata = Qs.stringify({
      grant_type: "password",
      username: username,
      password: password,
    });

    try {
      var result = await this.http.post(this.baseUrl + "/oauth2/token", formdata, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'Authorization': 'Basic ' + btoa(Config.auth.clientId + ':' + Config.auth.clientSecret)
        }
      });
    } catch (e) {
      console.log(e);
    }

    if (result.status == 200) {
      if (result.data.expires_in) {
        result.data.expiration_date = new Date(new Date().getTime() + result.data.expires_in * 1000).getTime();
      }

      await this.setAuthenticationToken(result.data as AuthToken);

      return await this.getUserInfo();
    } else {
      await this.deleteAuthenticationToken();
      if (this.OnError != null)
        this.OnError(result);
    }
    return null;
  }

  async Logout() {
    await this.deleteAuthenticationToken();

    window.localStorage.removeItem("userInfo");

    SecurityService._userInfo = null;
    SecurityService._token = null;
  }

  public getInfo(): server.userInfo {
    return SecurityService._userInfo;
  }

  async getUserInfo(): Promise<server.userInfo> {
    var result = await this.http.get(this.baseUrl + "/user?access_token=" + baseRestService._token.access_token);
    if (result.status == 200) {
      window.localStorage.setItem("userInfo", JSON.stringify(result.data));
      SecurityService._userInfo = result.data;
      return result.data as server.userInfo;
    }
    if (result.status == 401) {
      window.localStorage.removeItem("userInfo");
      SecurityService._userInfo = null;
    }
    return null;
  }

  public isUserAuthenticated(): boolean {
    return SecurityService._userInfo != null;
  }

  async autoRenewToken() {
    var token = SecurityService._myself.getAuthenticationToken();

    if (token) {
      var now = new Date().getTime();
      var timeleft = token.expiration_date - now;
      SecurityService._myself.getUserInfo();
      if (timeleft < Config.auth.renewSessionTimeLimit * 1000) {
        await SecurityService._myself.renewToken(token);
      }
    }
  }

  public async RenewToken() {
    var token = this.getAuthenticationToken();
    await this.renewToken(token)
  }

  public getAccessToken() {
    return super.getAuthenticationToken().access_token;
  }

  private async renewToken(token: AuthToken) {
    if (token) {
      var formdata = Qs.stringify({
        grant_type: "refresh_token",
        refresh_token: token.refresh_token,
      });

      try {
        let result = await SecurityService._myself.http.post(SecurityService._myself.baseUrl + "/oauth2/token", formdata, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(Config.auth.clientId + ':' + Config.auth.clientSecret)
          }
        });

        if (result.status == 200) {
          if (result.data.expires_in) {
            result.data.expiration_date = new Date(new Date().getTime() + result.data.expires_in * 1000).getTime();
          }

          if (!result.data.refresh_token)
            result.data.refresh_token = token.refresh_token;
          SecurityService._myself.setAuthenticationToken(result.data as AuthToken);
          return;
        }
      }
      catch (ex) {
        console.debug("renew token failed: ", ex.response.data);
      }
    }
  }
}

export const securityService = new SecurityService();
