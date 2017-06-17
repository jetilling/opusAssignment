import { Component }                             from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup} from '@angular/forms';
import {Router}                                          from '@angular/router';
import { AuthService }                                   from './../services/auth.service';
//import { ILoginData }                                     from './../interfaces';


@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  model: any = {};
  loading = false;

  constructor(private auth: AuthService,
              private router: Router){}


  login() {
    this.loading = true;
    this.auth.login(this.model)
      .subscribe(
              res => {
                  console.log("STUFF: ", res);
                  if (res && res.token) {
                       document.cookie = `TellTova_User=${res.token}; Path=/;`
                       localStorage.setItem('id', res.id+'');
                   }
                  //this.router.navigate(['/dashboard']);
      },
             error => {
                 console.log("error", error);
                 this.loading = false;
             });
  }


}