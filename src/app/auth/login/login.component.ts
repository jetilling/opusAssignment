//----Angular Imports----//
import { Component }                             from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup} from '@angular/forms';
import { Router }                                          from '@angular/router';
import { User }                                            from '../../interfaces';

//----Other Imports----//
import { AuthService }                                   from '../../services/auth.service';



@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  
  model: User = <any>{};
  loading = false;

  constructor(private auth: AuthService,
              private router: Router){}

//----Properties----//
  get showValidationMessage(): boolean {
    return this.auth.showValidationMessage
  }

//----Methods----//
  login() {
    this.loading = true;
    this.auth.login(this.model)
  }

}