import { Component, OnInit }                             from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup} from '@angular/forms';
import {Router}                                          from '@angular/router';
import { AuthService }                                   from '../../services/auth.service';
//import { ILoginData }                                     from './../interfaces';


@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  opusUser: string = document.cookie.split("Opus_User=")[1];

  constructor(private auth: AuthService,
              private router: Router){}

ngOnInit() {
    if(this.opusUser && this.opusUser.split('.').length === 3){
        this.auth.getUser()
        .subscribe(
            res => {
                if (res) this.router.navigate(['/usersList'])
            }
        )
    }
  }

  login() {
    this.loading = true;
    this.auth.login(this.model)
      .subscribe(
              res => {
                  console.log("STUFF: ", res);
                  if (res && res.token) {
                       document.cookie = `Opus_User=${res.token}; Path=/;`
                       localStorage.setItem('id', res.id+'');
                   }
                  this.router.navigate(['/usersList']);
      },
             error => {
                 console.log("error", error);
                 this.loading = false;
             });
  }


}