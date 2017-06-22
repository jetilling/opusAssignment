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

  constructor(private router: Router,
              private auth: AuthService) { }

  get emailIsAlreadyTaken(): boolean {
    return this.auth.emailIsAlreadyTaken;
  }

  switchForms() {
    this.loginForm = false;
    this.RegisterForm = true;
  }

  register() {
      this.auth.register(this.model)
  }

}