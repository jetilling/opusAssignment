//----Angular Imports----//
import { Component, OnInit }                    from '@angular/core';
import { Router, ActivatedRoute, Params }       from '@angular/router';

//----Other Imports----//
import { AuthService }                          from '../services/auth.service';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'validating',
  template: '',
})

export class ValidatingComponent implements OnInit 
{

  constructor(private auth: AuthService,
              private route: ActivatedRoute,
              private router: Router){}

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.auth.validateUserAndLogin(params['token']))
      .subscribe((res) => {
        if (res) 
          this.auth.setCookies(res, false)
      });
  }

}