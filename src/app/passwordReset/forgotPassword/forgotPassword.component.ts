//----Angular Imports----//
import { Component }                from '@angular/core';
import { Router }                   from '@angular/router';

//----Other Imports----//
import { AuthService }              from '../../services/auth.service';


@Component({
  moduleId: module.id,
  selector: 'forgot-password',
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.css']
})

export class ForgotPasswordComponent 
{

  constructor(private auth: AuthService,
              private router: Router){}

  //------------Properties-------------//
  
  /**
   * User's email taken from the form
   */
  model: any = {};

  /**
   * Show message saying an email was sent
   */
  emailSent: boolean = false;

  //--------------Methods--------------//

  /**
   * Sends user's information to auth 
   * Sets emailSent to true
   */
  submitEmail() 
  {
    this.auth.submitResetEmail(this.model)
            .subscribe(
              res => {
                this.emailSent = true;
              })
  }

}