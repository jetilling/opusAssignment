import { Component }    from '@angular/core';
import { Router } from '@angular/router';

import { IRegisterUser }    from '../../interfaces';
import { AuthService} from '../../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  model: IRegisterUser = <any>{};
  loginForm: boolean = true;
  RegisterForm: boolean = false;
  //opusUser: string = document.cookie.split("Opus_User=")[1];

  constructor(private router: Router,
              private auth: AuthService) { }


  switchForms() {
    this.loginForm = false;
    this.RegisterForm = true;
  }

  register() {
      this.auth.register(this.model)
  }

}