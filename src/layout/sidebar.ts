import Vue from "vue"
import Component from "vue-class-component";
import { securityService } from '@/services/security';
import { Config } from '@/config';

@Component({ name: "sidebar" })
export default class SideBar extends Vue {
  user: server.userInfo = null;

  async mounted() {
    this.user = await securityService.getUserInfo();
  }

  get isAdmin() {
    return this.user && this.user.id == 'admin';
  }

  get authenticationServerUrl() {
    return Config.auth.authenticationServerUrl + '/idm/applications/' + Config.auth.clientId;
  }

  logout() {
    securityService.Logout();
    window.location = (window.location.origin as any);
  }
}
