//--------Angular Imports---------//
import { Component }            from '@angular/core';

//--------Other Imports----------//
import { UsersService }         from './../../services/users.service';

@Component({
  moduleId: module.id,
  selector: 'add-user',
  templateUrl: './addUser.component.html',
  styleUrls: ['./addUser.component.css']
})

export class AddUserComponent
{

  constructor(private usersService: UsersService) {}

  //-------------Properties------------//

  /**
   * New User information
   */
  model: any = {};

  /**
   * Email already exists if true
   */
  emailExists: boolean = false;

  /**
   * Confirmation that user was added
   */
  get userSuccessfullyAdded(): boolean {
    return this.usersService.userSuccessfullyAdded;
  }

  //--------------Methods-------------//

  /**
   * Sends new user's information to users Service to be added
   */
  addUser() 
  {
    this.usersService.addUser(this.model);
  }

  /**
   * Closes Modal
   */
  cancel() 
  {
    this.usersService.showAddUser = false;
  }

  /**
   * Returns a boolean value if email already exists
   */
  verifyEmail() 
  {
    this.emailExists = this.usersService.verifyEmail(this.model);
  }



}