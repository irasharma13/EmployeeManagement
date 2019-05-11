import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { EmployeeService } from "../services/employee/employee.service";
import { Employee } from "../models/employee";
import { Title } from "../models/title";

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  searchForm: FormGroup;
  employees: Employee[] = [];
  searchInput: String;
  isSearch: boolean = false;
  titles: String[];
  index: number = 0;


  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.searchForm = this.fb.group({
      search_title: new FormControl('', Validators.required)
    });
    this.reloadData();
  }

  get search_title() { return this.searchForm.get('search_title') }

  search() {
    console.log('Searching by title');
    this.searchInput = this.search_title.value;
    this.employeeService.searchTitle(this.searchInput)
      .subscribe(data => {
        console.log(data);
        this.getEmployees();
        
      }, error => console.log(error));
  }

  reloadData() {
    console.log('Retreiving employee data');
    this.employeeService
      .getAllTitles()
      .subscribe(titles => {
        console.log('Got titles');
        console.log(titles);
        this.titles = titles;
      });
  }

  addMore() {
    this.index += 25;
    if(this.index < 100000) {
      this.getEmployees();
    }
  }

  getEmployees() {
    console.log('Getting employees with provided title');
    this.employeeService.getAllEmpWithTitle(this.index).subscribe(employees =>
       {
        console.log('Printing employees with title');
        if(this.employees.length == 0) {
          this.employees = employees;
        } else {
          var old = this.employees;
          this.employees = old.concat(employees);
        }
        console.log(this.employees);
        this.isSearch = true;
       })
  }

}
