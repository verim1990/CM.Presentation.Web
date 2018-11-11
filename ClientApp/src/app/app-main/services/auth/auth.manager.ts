import { UserManager } from 'oidc-client';

// Models
import { AuthUser } from '../../models/auth/auth-user.model';
import { AuthSettings } from '../../models/auth/auth-settings.model';
import { Environment } from '../../models/config/environment.model';

export class AuthManager extends UserManager {
  constructor(
    environment: Environment
  ) {
    super(new AuthSettings(environment));
  }

  getUser(): Promise<AuthUser> {
    return super.getUser();
  }
}
