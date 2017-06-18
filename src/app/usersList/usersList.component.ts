//--------Angular Imports---------//
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//--------Other Imports----------//
import { AuthService}           from '../services/auth.service';
import { UsersService }         from '../services/users.service';

@Component({
  moduleId: module.id,
  selector: 'users-list',
  templateUrl: './usersList.component.html',
  styleUrls: ['./usersList.component.css']
})

export class UsersListComponent implements OnInit
{

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
          if (!res){
            this.router.navigate(['/login'])
          }
        }
      )
    }
    else this.router.navigate(['/login'])
  }

/**
  * Logs user out
  */
  logout() 
  {
    let loggedOut = this.auth.logout()
    if (loggedOut) this.router.navigate(['/login'])
  }


}