import { Environment } from '../config/environment.model';

export class AuthSettings {
  authority: string;
  redirect_uri: string;
  post_logout_redirect_uri: string;
  silent_redirect_uri: string;

  client_id: string;
  response_type: string;
  scope: string;

  automaticSilentRenew: boolean;
  accessTokenExpiringNotificationTime: number;
  silentRequestTimeout: number;

  filterProtocolClaims: boolean;
  loadUserInfo: boolean;

  constructor(environment: Environment) {
    return {
      authority: `${environment.identityUrl}/`,
      redirect_uri: `${environment.webUrl}/auth/callback`,
      post_logout_redirect_uri: `${environment.webUrl}/`,
      silent_redirect_uri: `${environment.webUrl}/auth/renewal`,

      client_id: 'js',
      response_type: 'id_token token',
      scope: 'openid wallet walletviews exchange',

      automaticSilentRenew: true,
      accessTokenExpiringNotificationTime: 4,
      silentRequestTimeout: 10000,

      filterProtocolClaims: true,
      loadUserInfo: true
    };
  }
}

