import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService }   from '../services/users.service';


@Component({
  moduleId: module.id,
  selector: 'validate-email',
  templateUrl: './validateEmail.component.html',
})

export class ValidateEmailComponent implements OnInit {

    constructor(private usersService: UsersService,
                private router: Router){}

  ngOnInit() {
    
  }

  get email(): string {
    if (this.usersService.currentUser.email) return this.usersService.currentUser.email
    return 'your email.'
  }

}