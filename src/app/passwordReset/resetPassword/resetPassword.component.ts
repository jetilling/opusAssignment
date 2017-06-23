//----Angular Imports----//
import { Component, OnInit }                    from '@angular/core';
import { Router, ActivatedRoute, Params }       from '@angular/router';

//----Other Imports----//
import { AuthService }                          from '../../services/auth.service';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'reset-password',
  templateUrl: './resetPassword.component.html',
  styleUrls: ['./resetPassword.component.css']
})

export class ResetPasswordComponent implements OnInit 
{

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

  //------------Properties--------------//

  /**
   * New Passwords from form
   */
  model: any = {};

  /**
   * True if user has been validated
   */
  userIsValidated: boolean = false;

  /**
   * Validation token
   */
  token: string;

  /**
   * User's email
   */
  userEmail: string;

  /**
   * User's first name
   */
  firstName: string;

  /**
   * Get validation token from auth service
   */
  get userToken(): string {
    return this.auth.userToken;
  }

  /**
   * Set validation token for auth service
   */
  set userToken(val: string) {
    this.auth.userToken = val;
  }

//-----------Methods------------//

  /**
   * Sends new passwords to auth service
   */
  resetPassword() 
  {
    if (this.model.password.length >= 8) {
      if (this.model.password === this.model.verifyPassword) {
        this.model.token = this.userToken
        this.auth.resetPassword(this.model)
      }
    }
  }
    


}