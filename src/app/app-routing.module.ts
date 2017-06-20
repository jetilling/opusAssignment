import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { LoginComponent }           from './auth/login/login.component';
import { RegisterComponent }        from './auth/register/register.component';
import { UserDashboardComponent }   from './userDashboard/userDashboard.component';
import { ValidateEmailComponent }   from './validation/validateEmail.component';
import { ValidatingComponent }      from './validation/validating.component';  


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: UserDashboardComponent },
  { path: 'validate', component: ValidateEmailComponent },
  { path: 'validating/:token', component: ValidatingComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}