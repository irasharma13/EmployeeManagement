import { Component, OnInit } from "@angular/core";
import { OAuthService } from "angular-oauth2-oidc";

import { EmployeeService } from "../services/employee/employee.service";
import { Employee } from "../models/employee";
@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];
  constructor(
    private employeeService: EmployeeService,
    private oauthService: OAuthService
  ) {}

  ngOnInit() {
    const claims = this.oauthService.getIdentityClaims();

    if (!claims) {
      this.oauthService.initImplicitFlow();
    } else {
      console.log(claims);
    }
  }

  reloadData() {
    //this.customers = this.transactionService.getAll();
    this.employeeService
      .getAll()
      .subscribe(employees => (this.employees = employees));
  }
}
