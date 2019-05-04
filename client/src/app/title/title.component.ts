import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { EmployeeService } from "../services/employee/employee.service";
import { Employee } from "../models/employee";

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  searchForm: FormGroup;
  employees: Employee[];
  searchInput: String;
  isSearch: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.searchForm = this.fb.group({
      search_title: new FormControl('', Validators.required)
    });
  }

  get search_title() { return this.searchForm.get('search_title') }

  search() {
    console.log('Searching by title');
    this.searchInput = this.search_title.value;
    this.employeeService.searchTitle(this.searchInput)
      .subscribe(data => {
        console.log(data);
        this.employees = data;
        this.isSearch = true;
      }, error => console.log(error));
  }

}
