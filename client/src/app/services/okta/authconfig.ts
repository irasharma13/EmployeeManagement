import { AuthConfig } from 'angular-oauth2-oidc';
 
export const authConfig: AuthConfig = {
  issuer: 'https://dev-558783.oktapreview.com/oauth2/default',
  redirectUri: window.location.origin,
  clientId: '0oae5bt4guMx7iZZN356',
  scope: 'openid profile email',
}