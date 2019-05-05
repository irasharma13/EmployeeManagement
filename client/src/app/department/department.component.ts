import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { EmployeeService } from "../services/employee/employee.service";
import { Employee } from "../models/employee";
import { Department } from '../models/department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  searchForm: FormGroup;
  departments: Department[];
  isSearch: boolean = false;
  employees: Employee[];
  searchInput: String;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.searchForm = this.fb.group({
      search_dept: new FormControl('', Validators.required)
    });
    this.reloadData();
  }

  get search_dept() { return this.searchForm.get('search_dept') }

  search() {
    console.log('Searching for department');
    this.searchInput = this.search_dept.value;
    this.employeeService.searchDepartment(this.searchInput)
      .subscribe(data => {
        console.log(data);
        this.employees = data;
        this.isSearch = true;
      }, error => console.log(error));
  }

  reloadData() {
    console.log('Retreiving department data');
    this.employeeService
      .getAllDepartments()
      .subscribe(departments => {console.log(departments);this.departments = departments;});
  }

}
