import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { EmployeeService } from "../services/employee/employee.service";
import { Employee } from "../models/employee";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  searchForm: FormGroup;
  employees: Employee[];
  searchInput: String;
  isSearch: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.searchForm = this.fb.group({
      search_manager: new FormControl('', Validators.required)
    });
  }

  get search_manager() { return this.searchForm.get('search_manager') }

  search() {
    console.log('Searching for manager');
    this.searchInput = this.search_manager.value;
    this.employeeService.searchManager(this.searchInput)
      .subscribe(data => {
        console.log(data);
        this.employees = data;
        this.isSearch = true;
      }, error => console.log(error));
  }

}
