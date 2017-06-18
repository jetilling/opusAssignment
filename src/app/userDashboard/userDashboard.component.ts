//--------Angular Imports---------//
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//--------Other Imports----------//
import { UsersObject }          from '../interfaces';
import { AuthService}           from '../services/auth.service';
import { UsersService }         from '../services/users.service';

@Component({
  moduleId: module.id,
  selector: 'users-list',
  templateUrl: './userDashboard.component.html',
  styleUrls: ['./userDashboard.component.css']
})

export class UserDashboardComponent implements OnInit
{
  firstName: string;
  userList: boolean = true;
  opusUser: string = document.cookie.split("Opus_User=")[1];

  constructor(
      private router: Router,
      private auth: AuthService,
      private usersService: UsersService) { }

  ngOnInit() {
    if(this.opusUser && this.opusUser.split('.').length === 3){
    this.auth.getUser()
      .subscribe(
        res => {
          if (!res) this.router.navigate(['/login'])
          else {
            this.usersService.getUsers();
            this.usersService.getLoggedInUser();
          }
        }
      )
    }
    else this.router.navigate(['/login'])
  }

  get currentUserInfo(): UsersObject {
    return this.usersService.currentUser
  }

  get currentUserInfoLoaded(): boolean {
    return this.usersService.currentUserInfoLoaded
  }

  get showConfirmDelete(): boolean {
    return this.usersService.showConfirmDelete
  }

//--------Methods----------//

/**
  * Logs user out
  */
  logout() 
  {
    let loggedOut = this.auth.logout()
    if (loggedOut) this.router.navigate(['/login'])
  }


}