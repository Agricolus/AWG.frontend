import { Component, Vue } from 'vue-property-decorator';
import { securityService } from '@/services/security';
import { InitializeApp } from '@/startup';
import { Config } from '@/config';

@Component({})
export default class Login extends Vue {
  username: string = null;
  password: string = null;
  incorrectCredentials: boolean = false;

  created() {
    if (securityService.isUserAuthenticated())
      this.$router.push({ name: "main" });
  }

  async login() {
    try {
      this.incorrectCredentials = false;

      await securityService.Login(this.username, this.password);

      InitializeApp();

      this.$router.push({ name: "main" });

    } catch (err) {
      this.incorrectCredentials = true;
    }
  }

  get authenticationServerUrl() {
    return Config.auth.authenticationServerUrl;
  }
}