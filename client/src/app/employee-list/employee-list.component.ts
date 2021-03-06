import { Component, OnInit } from "@angular/core";
// import { OAuthService } from "angular-oauth2-oidc";

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { EmployeeService } from "../services/employee/employee.service";
import { Employee } from "../models/employee";
import { OktaAuthService } from '@okta/okta-angular';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  
  employees: Employee[] = [];
  isAuthenticated: boolean;
  isEdit:boolean = false;
  isDelete: boolean = false;
  checkId:Number;
  
  addForm: FormGroup;
  editForm: FormGroup;
  deleteForm: FormGroup;
  searchForm: FormGroup;
  
  index =0;

  myRecaptcha = new FormControl(false);

  constructor(private oauthService: OAuthService, //private oktaAuth: OktaAuthService,
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {

    this.searchForm = this.fb.group({
      search_emp: new FormControl('', Validators.required)
    });

    this.editForm = this.fb.group({
      edit_empNo: new FormControl('', Validators.required),
      edit_birth_date: new FormControl('', Validators.required),
      edit_first_name: new FormControl('', Validators.required),
      edit_lastName: new FormControl('', Validators.required),
      edit_gender: new FormControl('', Validators.required),
      edit_hire_date: new FormControl('', Validators.required)
    });
    
    this.addForm = this.fb.group({
      empNo: new FormControl('', Validators.required),
      birth_date: new FormControl('', Validators.required),
      first_name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      hire_date: new FormControl('', Validators.required),
      depNo: new FormControl('', Validators.required)
    });
    
    this.deleteForm = this.fb.group({
      lastDay: new FormControl('', Validators.required)
    });

    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      alert('An error occured. You need to login to access this page.');
    } else {
      this.reloadData();
    }
    
  }

  get edit_empNo() { return this.editForm.get('edit_empNo') }
  get edit_birth_date() { return this.editForm.get('edit_birth_date') }
  get edit_first_name() { return this.editForm.get('edit_first_name') }
  get edit_lastName() { return this.editForm.get('edit_lastName') }
  get edit_gender() { return this.editForm.get('edit_gender') }
  get edit_hire_date() { return this.editForm.get('edit_hire_date') }

  get empNo() { return this.addForm.get('empNo') }
  get birth_date() { return this.addForm.get('birth_date') }
  get first_name() { return this.addForm.get('first_name') }
  get lastName() { return this.addForm.get('lastName') }
  get gender() { return this.addForm.get('gender') }
  get hire_date() { return this.addForm.get('hire_date') }

  get search_emp() { return this.searchForm.get('search_emp') }

  get lastDay() { return this.deleteForm.get('lastDay') }

  reloadData() {
    console.log('Retreiving employee data');
    this.employeeService
      .getAll(this.index)
      .subscribe(employees => {
        if(this.employees.length == 0) {
          this.employees = employees;
        } else {
          var old = this.employees;
          this.employees = old.concat(employees);
        }
        // this.employees.concat(employees); 
        this.index += 50; 
        console.log(this.index);
        console.log(this.employees);
        // if(this.index < 300000) {
        //   this.reloadData();
        // }
      });
  }

  addMore() {
    if(this.index < 300000) {
      this.reloadData();
    }
  }

  add() {

    console.log("Trying to add new employee");

    var employee = new Employee();
    employee.empNo = this.empNo.value;
    employee.birth_date = this.birth_date.value;
    employee.first_name = this.first_name.value;
    employee.lastName = this.lastName.value;
    employee.gender = this.gender.value;
    employee.hire_date = this.hire_date.value;

    console.log("Adding transaction");
    this.employeeService.addEmployee(employee)
      .subscribe(data => {
        console.log(data);
        document.getElementById('add-modal').style.display='none';
        window.location.reload(true);
      }, error => console.log(error));
    
  }

  openEdit(num:number) {
    if(document.getElementById('edit-modal') != null) {
      document.getElementById('edit-modal').style.display='block'; 
      this.checkId =num;
    }
  }

  edit(id:number) {
    console.log("Employee id is: "+id);
    var employee = new Employee();
    employee.empNo = id;
    employee.birth_date = this.edit_birth_date.value;
    employee.first_name = this.edit_first_name.value;
    employee.lastName = this.edit_lastName.value;
    employee.gender = this.edit_gender.value;
    employee.hire_date = this.edit_hire_date.value;

    console.log("Editing employee");
    this.employeeService.updateEmployee(id, employee)
    .subscribe(
      data => {
        console.log(data);
        window.location.reload(true);
      },
      error => console.log(error));
    
  }

  search() {
    console.log('Searching');
    this.employeeService.searchEmployee(this.search_emp.value)
      .subscribe(data => {
        console.log(data);
        this.employees = data;
      }, error => console.log(error));
  }

  onScriptLoad() {
    console.log('Google reCAPTCHA loaded and is ready for use!')
  }

  onScriptError() {
    console.log('Something went long when loading the Google reCAPTCHA')
  }


  // openEdit() {
  //   this.isEdit=true;
  //   // this.checkID=this.employee.empNo;
  //   document.getElementById('edit-modal').style.display='block';
  // }
}
