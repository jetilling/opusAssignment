//--------Angular Imports---------//
import { Component }                  from '@angular/core';

//--------Other Imports----------//
import { IUserNames }                         from '../../../interfaces';
import { UsersService }                       from '../../../services/users.service';

@Component({
  moduleId: module.id,
  selector: 'user-details',
  templateUrl: './userDetails.component.html',
  styleUrls: ['./userDetails.component.css']
})

export class UserDetailsComponent
{

  opusUser: string = document.cookie.split("Opus_User=")[1];

  constructor(private usersService: UsersService) { }

  get selectedUserName(): IUserNames {
    return this.usersService.selectedUserName;
  }

  get selectedUserId(): number {
    return this.usersService.selectedUserId
  }

  loginDates = function(): any {
    let id = this.selectedUserId;
    let dates: Date[];
    let formattedDates: Date[] = [];
    let users = this.usersService.allUsers;
    let selectedUser = users.filter(function(element){
      if (element.id === id) return element
    })
    if (selectedUser.length > 0) {
      if (selectedUser[0].login_dates) {
        dates = selectedUser[0].login_dates;
        formattedDates = dates.map(function(element){
              return new Date(element);
            })
      }
      else {
        return ['This user has been added but has yet to login'];
      }
    }
    return formattedDates;
  }
  
  //get loginDates(): any {
  //   let self = this;
  //   let dates: Date[];
  //   let formattedDates: Date[];
  //   let users = this.usersService.allUsers;
  //   users.some(function(element){
  //     if (element.id === self.selectedUserId) { 
  //       dates = element.login_dates 
  //       if (dates) {
  //         formattedDates = dates.map(function(element){
  //           return new Date(element);
  //         })
  //       }
  //       else return true
  //     }
  //   })
  //   if (formattedDates) return formattedDates
  //   else this.noLoginDates = true;
  // }

}