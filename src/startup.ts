import { securityService } from './services/security';

export async function InitializeApp() {
  if (!securityService.isUserAuthenticated()) return;

  try {
    if (navigator.onLine)
      await securityService.autoRenewToken();
  } catch{ }
}