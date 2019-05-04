import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Employee } from "../../models/employee";

@Injectable()
export class EmployeeService {
  public API = "http://localhost:8080/";
  public EMPLOYEES_API = this.API + "employees";

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.EMPLOYEES_API + "/all");
  }

  updateEmployee(id: number, employee: Employee): Observable<Object> {
    console.log(employee);
    return this.http.put(`${this.EMPLOYEES_API}/update/${id}`, employee);
  }

  addEmployee(employee: Object): Observable<Object> {
    console.log(employee);
    return this.http.post(`${this.EMPLOYEES_API}` + `/add`, employee);
  }

  searchEmployee(emp_name: String): Observable<any> {
    console.log(emp_name);
    return this.http.get(`${this.EMPLOYEES_API}` + `/search/employee/${emp_name}`);
  }

  getAllDepartments(): Observable<any> {
    return this.http.get('http://localhost:8080/emps/all');
  }

  searchDepartment(dept_name: String): Observable<Object> {
    console.log(dept_name);
    return this.http.get(`http://localhost:8080/emps/search/employee/${dept_name}`);
  }

  searchManager(manager: String): Observable<Object> {
    console.log(manager);
    return this.http.get(`${this.EMPLOYEES_API}` + `/search/employee/${manager}`);
  }

  searchTitle(title: String): Observable<Object> {
    console.log(title);
    return this.http.get(`${this.EMPLOYEES_API}` + `/search/employee/${title}`);
  }
}
