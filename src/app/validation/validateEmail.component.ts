//----Angular Imports----//
import { Component }                    from '@angular/core';
import { Router }                       from '@angular/router';

//----Other Imports----//
import { UsersService }                 from '../services/users.service';


@Component({
  moduleId: module.id,
  selector: 'validate-email',
  templateUrl: './validateEmail.component.html',
  styleUrls: ['./validateEmail.component.css']
})

export class ValidateEmailComponent
{

  constructor(private usersService: UsersService,
              private router: Router){}

  /**
   * Retrieve User Email
   */
  get email(): string {
    if (this.usersService.currentUser 
        && this.usersService.currentUser.email) 
        return this.usersService.currentUser.email
    return 'your email.'
  }

}