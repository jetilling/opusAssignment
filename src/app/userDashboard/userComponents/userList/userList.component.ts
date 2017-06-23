//--------Angular Imports---------//
import { Component, OnInit }                  from '@angular/core';

//--------Other Imports----------//
import { IPagerDetails, IUsersObject }        from '../../../interfaces';
import { UsersService }                       from '../../../services/users.service';

@Component({
  moduleId: module.id,
  selector: 'user-list',
  templateUrl: './userList.component.html',
  styleUrls: ['./userList.component.css']
})

export class UserListComponent implements OnInit
{

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers();
  }

  /**
   * Selected User first name
   */
  firstName: string;

  /**
   * List of Users on each page
   */
  get pagedUsers(): IUsersObject[] {
    return this.usersService.pagedUsers
  }

  /**
   * Pagination details
   */
  get pagerDetails(): IPagerDetails {
    return this.usersService.pagerDetails
  }

  //--------Methods----------//

  /**
   * Sets the page on click
   * @param {number} page - The page number 
   */
  setPage(page: number) 
  {
    this.usersService.currentPage = page;
    this.usersService.setPage(page)
  }

  /**
   * 
   * @param {number} id - Id of user to delete 
   * @param {string} firstName - First name of user to delete
   */
  confirmDelete(id: number, firstName: string) 
  {
    this.usersService.selectedUserId = id;
    this.usersService.selectedUserName = {firstName: firstName};
    this.usersService.showConfirmDelete = true;
  }

  /**
   * Populates user service with the information of the selected user
   * @param {number} id - Id of selected user
   * @param {string} firstName - First name of selected user
   * @param {string} lastName - Last name of selected user
   */
  selectUser(id: number, firstName: string, lastName: string)
  {
    this.usersService.selectedUserId = id;
    this.usersService.selectedUserName = {firstName: firstName, lastName: lastName};
  }

}