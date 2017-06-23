//--------Angular Imports---------//
import { Component }            from '@angular/core';

//--------Other Imports----------//
import { UsersService }         from './../../services/users.service';

@Component({
  moduleId: module.id,
  selector: 'confirm-delete',
  templateUrl: './confirmDelete.component.html',
  styleUrls: ['./confirmDelete.component.css']
})

export class ConfirmDeleteComponent
{

  constructor(private usersService: UsersService) { }

  //------------Properties------------//

  /**
   * Gets the first name of the selected user from the users service
   */
  get userName(): string {
    return this.usersService.selectedUserName.firstName
  }

  /**
   * Gets the id of the selected user from the users service
   */
  get userId(): number {
    return this.usersService.selectedUserId
  }

  //-----------Methods---------------//
  /**
   * Sends user id to users service to be deleted
   */
  confirmDelete() 
  {
    this.usersService.deleteUser(this.userId)
  }

  /**
   * Closes the delete modal
   */
  cancel() 
  {
    this.usersService.showConfirmDelete = false
  }


}