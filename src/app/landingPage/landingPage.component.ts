import { Component, OnInit }        from '@angular/core';
import { Router }                   from '@angular/router';

import { AuthService }              from '../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'opus-assignment-main',
  templateUrl: './landingPage.component.html',
  styleUrls: ['./landingPage.component.css']
})

export class LandingPageComponent implements OnInit {
  //opusUser: string = document.cookie.split("Opus_User=")[1];


  constructor(private auth: AuthService,
              private router: Router){};

  ngOnInit() {
  // if(this.opusUser && this.opusUser.split('.').length === 3){
  //   this.auth.getUser()
  //     .subscribe(
  //       res => {
  //         console.log(res)
  //         if (res){
  //           //localStorage.setItem('id', res.id.toString());
  //           this.router.navigate(['/userList'])
  //         }
  //       }
  //     )
  //   }
  }

}

