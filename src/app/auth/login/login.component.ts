import { Component }                             from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup} from '@angular/forms';
import {Router}                                          from '@angular/router';
import { AuthService }                                   from '../../services/auth.service';



@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  model: any = {};
  loading = false;
  opusUser: string = document.cookie.split("Opus_User=")[1];

  constructor(private auth: AuthService,
              private router: Router){}

  login() {
    this.loading = true;
    this.auth.login(this.model)
      .subscribe(
              res => {
                  if (res && res.token) {
                       document.cookie = `Opus_User=${res.token}; Path=/;`
                       localStorage.setItem('id', res.id+'');
                   }
                  this.router.navigate(['/dashboard']);
      },
             error => {
                 console.log("error", error);
                 this.loading = false;
             });
  }


}