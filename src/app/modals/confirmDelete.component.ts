//--------Angular Imports---------//
import { Component, Input }            from '@angular/core';

//--------Other Imports----------//
import { UsersService }         from '../services/users.service';

@Component({
  moduleId: module.id,
  selector: 'confirm-delete',
  templateUrl: './confirmDelete.component.html',
  styleUrls: ['./confirmDelete.component.css']
})

export class ConfirmDeleteComponent
{

  constructor(private usersService: UsersService) { }

  get userId(): number {
    return this.usersService.selectedUserId
  }

  confirmDelete() {
    this.usersService.deleteUser(this.userId)
  }

  cancel() {
    this.usersService.showConfirmDelete = false
  }


}