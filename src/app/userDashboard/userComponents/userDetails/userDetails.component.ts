//--------Angular Imports---------//
import { Component }                  from '@angular/core';

//--------Other Imports----------//
import { UsersObject }          from '../../../interfaces';
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

  get selectedUserId(): number {
    return this.usersService.selectedUserId
  }

  get loginDates(): any {
    let self = this;
    let dates: Date[];
    let formattedDates: Date[];
    let users = this.usersService.allUsers;
    users.forEach(function(element){
      if (element.id === self.selectedUserId) { 
        dates = element.login_dates 
        formattedDates = dates.map(function(element){
          return new Date(element);
        })
      }
    })
    return formattedDates;
  }

}