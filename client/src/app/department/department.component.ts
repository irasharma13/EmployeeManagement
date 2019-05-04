import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { EmployeeService } from "../services/employee/employee.service";
import { Employee } from "../models/employee";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  searchForm: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.searchForm = this.fb.group({
      search_dept: new FormControl('', Validators.required)
    });
    console.log(this.employeeService.getAllDepartments());
  }

  get search_dept() { return this.searchForm.get('search_dept') }

  search() {
    console.log('Searching for manager');
    this.employeeService.searchDepartment(this.search_dept.value)
      .subscribe(data => {
        console.log(data);
      }, error => console.log(error));
  }

}
