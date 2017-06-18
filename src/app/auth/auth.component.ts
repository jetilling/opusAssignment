import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService }       from '../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'authentication',
  templateUrl: './auth.component.html',
})

export class AuthComponent implements OnInit {
  loginForm: boolean = true;
  signupForm: boolean = false;
  switchFormsText: string = "Or Sign-up 'n Stuff";
  opusUser: string = document.cookie.split("Opus_User=")[1];

    constructor(private auth: AuthService,
                private router: Router){}

  ngOnInit() {
    if(this.opusUser && this.opusUser.split('.').length === 3){
    this.auth.getUser()
      .subscribe(
        res => {
          if (res){
            this.router.navigate(['/usersList'])
          }
        }
      )
    }
  }

  switchForms() {
    if (this.loginForm){
      this.loginForm = false;
      this.signupForm = true;
      this.switchFormsText = "Of Login 'n Stuff";
    }
    else {
      this.loginForm = true;
      this.signupForm = false;
      this.switchFormsText = "Or Sign-up 'n Stuff"
    }
  }
}