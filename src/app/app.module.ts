//--------Angular Imports---------//
import { NgModule }                             from '@angular/core';
import { BrowserModule }                        from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }     from '@angular/forms';
import { HttpModule, JsonpModule }              from '@angular/http';

//--------Components---------//
import { AuthComponent }                        from './auth/auth.component';
import { RegisterComponent }                    from './auth/register/register.component';
import { LoginComponent }                       from './auth/login/login.component';
import { UserDashboardComponent }               from './userDashboard/userDashboard.component';
import { UserListComponent }                    from './userDashboard/userComponents/userList/userList.component';
import { UserDetailsComponent }                 from './userDashboard/userComponents/userDetails/userDetails.component';
import { ConfirmDeleteComponent }               from './modals/deleteUser/confirmDelete.component';
import { AddUserComponent }                     from './modals/addUser/addUser.component';
import { ValidateEmailComponent }               from './validation/validateEmail.component';
import { ValidatingComponent }                  from './validation/validating.component';
import { ResetPasswordComponent }               from './passwordReset/resetPassword/resetPassword.component';
import { ForgotPasswordComponent }              from './passwordReset/forgotPassword/forgotPassword.component';

//--------Services---------//
import { AuthService }                          from './services/auth.service';
import { CommonFunctions }                      from './services/commonFunctions.service';
import { UsersService }                         from './services/users.service';

//--------Routing---------//
import { AppRoutingModule }                     from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AuthComponent,
    RegisterComponent,
    LoginComponent,
    UserDashboardComponent,
    UserListComponent,
    UserDetailsComponent,
    ConfirmDeleteComponent,
    ValidateEmailComponent,
    ValidatingComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    AddUserComponent,
  ],
  providers: [
    AuthService,
    CommonFunctions,
    UsersService
  ],
  bootstrap: [ AuthComponent ]
})

export class AppModule {}