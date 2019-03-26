import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {EmployeeListComponent} from './employee-list/employee-list.component';

import { AppComponent } from './app.component';
import { EmployeeService } from './services/employee/employee.service';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/okta/auth.interceptor';
import { OAuthModule } from 'angular-oauth2-oidc';




import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// Routes
import { routes } from './app.router';





@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routes,
    HttpModule,
    ReactiveFormsModule,
    OAuthModule.forRoot(),
    
  ],
  providers: [
    EmployeeService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
