import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated: boolean;

  constructor(private oktaAuth: OktaAuthService) { }

  async ngOnInit() {
    // this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    // if(this.isAuthenticated) { 
    //   //this.reloadData();
    // } else {
    //   //this.oktaAuth.loginRedirect();
    // }

    // // Subscribe to authentication state changes. If user gets logged out, redirect to the login screen.
    // this.oktaAuth.$authenticationState.subscribe(
    //   (isAuthenticated: boolean)  => {
    //     this.isAuthenticated = isAuthenticated;
    
    //   }
    // );
  }

}
