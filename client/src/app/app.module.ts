import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {EmployeeListComponent} from './employee-list/employee-list.component';

import { AppComponent } from './app.component';
import { EmployeeService } from './services/employee/employee.service';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/okta/auth.interceptor';
import { OAuthModule } from 'angular-oauth2-oidc';

//import { OktaAuthModule } from '@okta/okta-angular';


import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RecaptchaModule } from 'angular-google-recaptcha';
// Routes
import { routes } from './app.router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { DepartmentComponent } from './department/department.component';
import { ManagerComponent } from './manager/manager.component';
import { TitleComponent } from './title/title.component';
import { HomeComponent } from './home/home.component';



const config = {
  issuer: 'https://dev-983347.okta.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '0oael4x2cfpxJb1lw356',
  scope: 'openid profile email'
};

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    NavbarComponent,
    FooterComponent,
    DepartmentComponent,
    ManagerComponent,
    TitleComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routes,
    HttpModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot({
      siteKey: '6LcxzVEUAAAAAKyNKo47zY56Fgd8Yni3RBVPSL6o',
    }),
    OAuthModule.forRoot()
    // OktaAuthModule.initAuth(config)
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
