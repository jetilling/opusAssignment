//--------Angular Imports---------//
import { NgModule }                             from '@angular/core';
import { BrowserModule }                        from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }     from '@angular/forms';
import { HttpModule, JsonpModule }              from '@angular/http';

//--------Components---------//
import { LandingPageComponent }                 from './landingPage/landingPage.component';
import { RegisterComponent }                    from './register/register.component';
import { LoginComponent }                       from './login/login.component';
import { UsersListComponent }                       from './usersList/usersList.component';

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
    LandingPageComponent,
    RegisterComponent,
    LoginComponent,
    UsersListComponent,
  ],
  providers: [
    AuthService,
    CommonFunctions,
    UsersService
  ],
  bootstrap: [ LandingPageComponent ]
})

export class AppModule {}