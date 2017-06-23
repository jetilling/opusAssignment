//--------Angular Imports---------//
import { Component, OnInit }           from '@angular/core';
import { Router }                      from '@angular/router';

//--------Other Imports----------//
import { IUsersObject }                from '../interfaces';
import { AuthService}                  from '../services/auth.service';
import { UsersService }                from '../services/users.service';

@Component({
  moduleId: module.id,
  selector: 'users-list',
  templateUrl: './userDashboard.component.html',
  styleUrls: ['./userDashboard.component.css']
})

export class UserDashboardComponent implements OnInit
{

  constructor(private router: Router,
              private auth: AuthService,
              private usersService: UsersService) {}

  opusUser: string = document.cookie.split("Opus_User=")[1];
  
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

  //---------Properties----------//

  /**
   * User first name
   */
  firstName: string;

  /**
   * Show user List
   */
  userList: boolean = true;

  /**
   * Current user's information
   */
  get currentUserInfo(): IUsersObject {
    return this.usersService.currentUser
  }

  /**
   * True is the current user's info is loaded
   */
  get currentUserInfoLoaded(): boolean {
    return this.usersService.currentUserInfoLoaded
  }

  /**
   * True if showing confirm delete modal
   */
  get showConfirmDelete(): boolean {
    return this.usersService.showConfirmDelete
  }

  /**
   * True if showing add user modal
   */
  get showAddUser(): boolean {
    return this.usersService.showAddUser
  }

//-------------Methods----------------//

/**
  * Logs user out
  */
  logout() 
  {
    let loggedOut = this.auth.logout()
    if (loggedOut) this.router.navigate(['/login'])
  }

  /**
   * Shows add user modal
   */
  showAddUserModal() 
  {
    this.usersService.showAddUser = true;
  }


}