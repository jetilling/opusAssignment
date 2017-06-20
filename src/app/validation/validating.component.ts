import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { AuthService }   from '../services/auth.service';


@Component({
  moduleId: module.id,
  selector: 'validating',
  template: '',
})

export class ValidatingComponent implements OnInit {

    constructor(private auth: AuthService,
                private route: ActivatedRoute,
                private router: Router){}

  ngOnInit() {
    this.route.params
    .switchMap((params: Params) => this.auth.validateUser(params['token']))
    .subscribe((res) => {
      if (res) 
        this.router.navigate(['/dashboard']);
    });
  }

}