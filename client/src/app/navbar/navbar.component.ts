import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
// import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated: boolean = true;

  constructor(//private oktaAuth: OktaAuthService,
                private oauthService: OAuthService) {
  }

  ngOnInit() {
    // this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    // // Subscribe to authentication state changes
    // this.oktaAuth.$authenticationState.subscribe(
    //   (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    // );
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['name'];
  }

  // isAuthenticated: boolean;

  // constructor(private oktaAuth: OktaAuthService) { }

  // async ngOnInit() {
  //   this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  //   if(this.isAuthenticated) { 
  //     this.reloadData();
  //   } else {
  //     this.oktaAuth.loginRedirect();
  //   }

  //   // Subscribe to authentication state changes. If user gets logged out, redirect to the login screen.
  //   this.oktaAuth.$authenticationState.subscribe(
  //     (isAuthenticated: boolean)  => {
  //       this.isAuthenticated = isAuthenticated;
    
  //     }
  //   );
  // }

}
