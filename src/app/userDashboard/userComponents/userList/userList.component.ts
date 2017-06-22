//--------Angular Imports---------//
import { Component, OnInit }                  from '@angular/core';

//--------Other Imports----------//
import { IPagerDetails, IUsersObject }          from '../../../interfaces';
import { UsersService }                       from '../../../services/users.service';

@Component({
  moduleId: module.id,
  selector: 'user-list',
  templateUrl: './userList.component.html',
  styleUrls: ['./userList.component.css']
})

export class UserListComponent implements OnInit
{
  firstName: string;
  opusUser: string = document.cookie.split("Opus_User=")[1];

  constructor(private usersService: UsersService) { }


  ngOnInit() {
    this.usersService.getUsers();
  }

  get pagedUsers(): IUsersObject[] {
    return this.usersService.pagedUsers
  }

  get pagerDetails(): IPagerDetails {
    return this.usersService.pagerDetails
  }

  //--------Methods----------//
  setPage(page: number) 
  {
    this.usersService.currentPage = page;
    this.usersService.setPage(page)
  }

  confirmDelete(id: number) 
  {
    this.usersService.selectedUserId = id;
    this.usersService.showConfirmDelete = true;
  }

  selectUser(id: number, firstName: string, lastName: string)
  {
    this.usersService.selectedUserId = id;
    this.usersService.selectedUserName = {firstName: firstName, lastName: lastName};
  }

}