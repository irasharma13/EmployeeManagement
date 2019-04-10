import { AuthConfig } from 'angular-oauth2-oidc';
 
export const authConfig: AuthConfig = {
  issuer: 'https://dev-983347.okta.com/oauth2/default',
  redirectUri: 'http://localhost:4200/home',
  clientId: '0oael4x2cfpxJb1lw356',
  scope: 'openid profile email'
}