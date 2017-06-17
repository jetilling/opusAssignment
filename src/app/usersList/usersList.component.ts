//--------Angular Imports---------//
import { Component } from '@angular/core';
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

export class UsersListComponent 
{
  constructor(
      private router: Router,
      private auth: AuthService,
      private usersService: UsersService) { }

/**
  * Logs user out
  */
  logout() 
  {
    let loggedOut = this.auth.logout()
    if (loggedOut) this.router.navigate(['/login'])
  }


}