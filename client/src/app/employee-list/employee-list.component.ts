import { Component, OnInit } from "@angular/core";
// import { OAuthService } from "angular-oauth2-oidc";

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

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
  isEdit:boolean = false;
  checkId:Number;
  addForm: FormGroup;
  editForm: FormGroup;
  searchForm: FormGroup;

  constructor(private oktaAuth: OktaAuthService,
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {

    this.searchForm = this.fb.group({
      search_emp: new FormControl('', Validators.required)
    });

    this.editForm = this.fb.group({
      edit_emp_no: new FormControl('', Validators.required),
      edit_birth_date: new FormControl('', Validators.required),
      edit_first_name: new FormControl('', Validators.required),
      edit_last_name: new FormControl('', Validators.required),
      edit_gender: new FormControl('', Validators.required),
      edit_hire_date: new FormControl('', Validators.required)
    });
    
    this.addForm = this.fb.group({
      emp_no: new FormControl('', Validators.required),
      birth_date: new FormControl('', Validators.required),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      hire_date: new FormControl('', Validators.required)
    });

    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    if(this.isAuthenticated) { 
      this.reloadData();
    } 
    
  }

  get edit_emp_no() { return this.editForm.get('edit_emp_no') }
  get edit_birth_date() { return this.editForm.get('edit_birth_date') }
  get edit_first_name() { return this.editForm.get('edit_first_name') }
  get edit_last_name() { return this.editForm.get('edit_last_name') }
  get edit_gender() { return this.editForm.get('edit_gender') }
  get edit_hire_date() { return this.editForm.get('edit_hire_date') }

  get emp_no() { return this.addForm.get('emp_no') }
  get birth_date() { return this.addForm.get('birth_date') }
  get first_name() { return this.addForm.get('first_name') }
  get last_name() { return this.addForm.get('last_name') }
  get gender() { return this.addForm.get('gender') }
  get hire_date() { return this.addForm.get('hire_date') }

  get search_emp() { return this.searchForm.get('search_emp') }

  reloadData() {
    this.employeeService
      .getAll()
      .subscribe(employees => {this.employees = employees; console.log('here 1');});
  }

  add() {

    console.log("Trying to add new employee");

    var employee = new Employee();
    employee.emp_no = this.emp_no.value;
    employee.birth_date = this.birth_date.value;
    employee.first_name = this.first_name.value;
    employee.last_name = this.last_name.value;
    employee.gender = this.gender.value;
    employee.hire_date = this.hire_date.value;

    console.log("Adding transaction");
    this.employeeService.addEmployee(employee)
      .subscribe(data => {
        console.log(data);
        document.getElementById('id01').style.display='none';
        window.location.reload(true);
      }, error => console.log(error));
    
  }

  edit(id:number) {
    console.log("Employee id is: "+id);
    var employee = new Employee();
    employee.emp_no = this.edit_emp_no.value;
    employee.birth_date = this.edit_birth_date.value;
    employee.first_name = this.edit_first_name.value;
    employee.last_name = this.edit_last_name.value;
    employee.gender = this.edit_gender.value;
    employee.hire_date = this.edit_hire_date.value;

    console.log("Editing transaction");
    this.employeeService.updateEmployee(id, employee)
    .subscribe(
      data => {
        console.log(data);window.location.reload(true);
      },
      error => console.log(error));
    
  }

  search() {
    console.log('Searching');
    this.employeeService.searchEmployee(this.search_emp.value)
      .subscribe(data => {
        console.log(data);
      }, error => console.log(error));
  }
}
