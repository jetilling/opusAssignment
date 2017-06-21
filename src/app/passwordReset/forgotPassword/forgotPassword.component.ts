import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService }   from '../../services/auth.service';


@Component({
  moduleId: module.id,
  selector: 'forgot-password',
  templateUrl: './forgotPassword.component.html',
})

export class ForgotPasswordComponent implements OnInit {

    model: any = {};
    emailSent: boolean = false;

    constructor(private auth: AuthService,
                private router: Router){}

  ngOnInit() {
    
  }

  submitEmail() {
    this.auth.submitResetEmail(this.model)
            .subscribe(
              res => {
                this.emailSent = true;
              })
  }


}