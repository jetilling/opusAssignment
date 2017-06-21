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

  constructor(private usersService: UsersService) { }

  addUser() {
    this.usersService.addUser();
  }





}