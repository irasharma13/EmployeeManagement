import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
//import { OktaCallbackComponent} from '@okta/okta-angular';
import {EmployeeListComponent} from './employee-list/employee-list.component';


export const router: Routes = [
    { path: 'home', component: EmployeeListComponent},
   
    
    { path: '**', redirectTo: 'home'}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);