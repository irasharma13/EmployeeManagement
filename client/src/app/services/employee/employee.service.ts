import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class EmployeeService {
  public API = "http://localhost:8080/";
  public EMPLOYEES_API = this.API + "employees";

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    console.log('here');
    return this.http.get(this.EMPLOYEES_API + "/all");
    //return this.http.get(this.API + '/all');
  }
}
