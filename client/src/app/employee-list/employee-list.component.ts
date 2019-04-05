import { Component, OnInit } from "@angular/core";
// import { OAuthService } from "angular-oauth2-oidc";

import { EmployeeService } from "../services/employee/employee.service";
import { Employee } from "../models/employee";
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];
  isAuthenticated: boolean;
  constructor(private oktaAuth: OktaAuthService,
    private employeeService: EmployeeService,
    // private oauthService: OAuthService
  ) {}

  async ngOnInit() {
    // const claims = this.oauthService.getIdentityClaims();

    // if (!claims) {
    //   // this.oauthService.initImplicitFlow();
    // } else {
    //   console.log(claims);
    // }
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    console.log('here 4');
    if(this.isAuthenticated) { 
      console.log('here 2');
      this.reloadData();
    }

    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => {
        console.log('here 3');
        this.isAuthenticated = isAuthenticated;
      }
    );
    
  }

  // login() {
  //   this.oauthService.initImplicitFlow();
  // }

  reloadData() {
    //this.customers = this.transactionService.getAll();
    this.employeeService
      .getAll()
      .subscribe(employees => {this.employees = employees; console.log('here 1');});
  }
}
