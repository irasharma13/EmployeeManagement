import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
//import { OktaCallbackComponent} from '@okta/okta-angular';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import { OktaCallbackComponent, OktaAuthModule } from '@okta/okta-angular';


export const router: Routes = [
    { path: 'home', component: EmployeeListComponent},
    { path: 'implicit/callback', component: OktaCallbackComponent},
   
    
    { path: '**', redirectTo: 'home'}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);