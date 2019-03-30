import { AuthConfig } from 'angular-oauth2-oidc';
 
export const authConfig: AuthConfig = {
  issuer: 'https://dev-724223.oktapreview.com/oauth2/default',
  redirectUri: 'http://localhost:4200/home',
  clientId: '0oaekodz4TDEcw7Y9356',
  scope: 'openid profile email',
}