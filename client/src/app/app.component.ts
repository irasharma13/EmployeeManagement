import { Component, OnInit } from "@angular/core";
import { OktaAuthService } from '@okta/okta-angular';
// import { Router } from "@angular/router";
// import { OAuthService } from "angular-oauth2-oidc";
// import { JwksValidationHandler } from "angular-oauth2-oidc";
// import { authConfig } from "./services/okta/authconfig";

// import {Routes, RouterModule} from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";
  isAuthenticated: boolean;

  constructor(
    private oktaAuth: OktaAuthService //,
    //private oauthService: OAuthService, private router: Router
  ) {
    // this.configureWithNewConfigApi();
  }

  // private configureWithNewConfigApi() {
  // //   this.oauthService.configure(authConfig);
  // //   this.oauthService.tokenValidationHandler = new JwksValidationHandler();
  // //   this.oauthService.loadDiscoveryDocument().then(() =>{    
  // //     console.log('HERE');      
  // //     this.oauthService.tryLogin().then(_ =>{
  // //       console.log('HERE maybe');                        
  // //         if (!this.oauthService.hasValidIdToken() || !this.oauthService.hasValidAccessToken()) {
  // //           console.log('HERE 1');
  // //             this.oauthService.initImplicitFlow();
  // //          }
  // //          else{
  // //              //With Initial Routing turned off this allows the router to navigate in the 
  // //              //event of a page refresh, eg (F5).
  // //              console.log('HERE 2');
  // //              this.router.navigate(['/']);
  // //          }                  
  // //      })
  // //  });
  // }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
  }
}
