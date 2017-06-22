import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { AuthService }   from '../../services/auth.service';


@Component({
  moduleId: module.id,
  selector: 'reset-password',
  templateUrl: './resetPassword.component.html',
})

export class ResetPasswordComponent implements OnInit {

    model: any = {};
    userIsValidated: boolean = false;
    token: string;
    userEmail: string;
    firstName: string;

    constructor(private auth: AuthService,
                private route: ActivatedRoute,
                private router: Router){}

  ngOnInit() {
    this.route.params
    .switchMap((params: Params) => this.auth.validateUser(params['token']))
    .subscribe((res) => {
      if (res) {
        this.userIsValidated = true;
      }
      else this.router.navigate(['/login'])  
    });
  }

//----Properties----//
  get userToken(): string {
    return this.auth.userToken;
  }

  set userToken(val: string) {
    this.auth.userToken = val;
  }

//----Methods----//
  resetPassword() {
    if (this.model.password.length >= 8) {
      if (this.model.password === this.model.verifyPassword) {
        this.model.token = this.userToken
        this.auth.resetPassword(this.model)
      }
    }
    else {} //do something!!!!!!!!!!!!!!!!!!!!!!!!!!!
  }
    


}