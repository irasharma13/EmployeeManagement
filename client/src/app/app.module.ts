import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {EmployeeListComponent} from './employee-list/employee-list.component';

import { AppComponent } from './app.component';
import { EmployeeService } from './services/employee/employee.service';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/okta/auth.interceptor';
//import { OAuthModule } from 'angular-oauth2-oidc';

import { OktaAuthModule } from '@okta/okta-angular';


import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// Routes
import { routes } from './app.router';



const config = {
  issuer: 'https://dev-983347.okta.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '0oael4x2cfpxJb1lw356',
  scope: 'openid profile email'
};

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
    OktaAuthModule.initAuth(config)
  //   OAuthModule.forRoot({
  //     resourceServer: {
  //         allowedUrls: ['http://www.angular.at/api'],
  //         sendAccessToken: true
  //     }
  // }),
    
  ],
  providers: [
    EmployeeService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
