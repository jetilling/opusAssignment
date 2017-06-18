import { Component }    from '@angular/core';
import { Router } from '@angular/router';

import { AuthService} from '../../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  model: any = {};
  loading: boolean = false;
  loginForm: boolean = true;
  RegisterForm: boolean = false;
  opusUser: string = document.cookie.split("Opus_User=")[1];

  constructor(
      private router: Router,
      private auth: AuthService) { }


  switchForms() {
    this.loginForm = false;
    this.RegisterForm = true;
  }

  register() {
      this.loading = true;
      this.auth.register(this.model)
           .subscribe(
               res => {

                   if (res && res.token) {
                       document.cookie = `Opus_User=${res.token}; Path=/;`
                       localStorage.setItem('id', res.id+'');
                    }
                   this.router.navigate(['/usersList']);
        },
              error => {
                  console.log("error", error);
                  this.loading = false;
              });
  }

}