import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Employee } from "../../models/employee";

@Injectable()
export class EmployeeService {
  public API = "http://localhost:8080/";
  public EMPLOYEES_API = this.API + "employees";

  constructor(private http: HttpClient) {}

  getAll(index: number): Observable<any> {
    return this.http.get(this.EMPLOYEES_API + `/all/${index}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<Object> {
    return this.http.put(`${this.EMPLOYEES_API}/update/${id}`, employee);
  }

  addEmployee(employee: Object): Observable<Object> {
    return this.http.post(`${this.EMPLOYEES_API}` + `/add`, employee);
  }

  searchEmployee(emp_name: String): Observable<any> {
    return this.http.get(`${this.EMPLOYEES_API}` + `/search/employee/${emp_name}`);
  }

  getAllDepartments(): Observable<any> {
    return this.http.get('http://localhost:8080/emps/all');
  }

  searchDepartment(dept_name: String): Observable<any> {
    return this.http.get(`http://localhost:8080/emps/search/employee/${dept_name}`);
  }

  getAllManagers(): Observable<any> {
    return this.http.get('http://localhost:8080/managers/all');
  }

  searchManager(dept_name: String): Observable<any> {
    return this.http.get(`http://localhost:8080/managers/search/employee/${dept_name}`);
  }

  searchTitle(title: String): Observable<any> {
    return this.http.get(`http://localhost:8080/titles/search/employee/${title}`);
  }
}
