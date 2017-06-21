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

  model: any = {};
  emailExists: boolean = false;

  constructor(private usersService: UsersService) { }

  get userSuccessfullyAdded(): boolean {
    return this.usersService.userSuccessfullyAdded;
  }

  addUser() {
    this.usersService.addUser(this.model);
  }

  cancel() {
    this.usersService.showAddUser = false;
  }

  verifyEmail() {
    this.emailExists = this.usersService.verifyEmail(this.model);
  }



}