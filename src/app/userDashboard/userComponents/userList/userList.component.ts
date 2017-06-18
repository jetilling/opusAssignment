//--------Angular Imports---------//
import { Component, OnInit } from '@angular/core';

//--------Other Imports----------//
import { PagerDetails }         from '../../../interfaces';
import { UsersService }         from '../../../services/users.service';

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

  get pagedUsers(): any[] {
    return this.usersService.pagedUsers
  }

  get pagerDetails(): PagerDetails {
    return this.usersService.pagerDetails
  }

  //--------Methods----------//
  setPage(page: number) {
    this.usersService.setPage(page)
  }



}