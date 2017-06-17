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


  constructor(private auth: AuthService){};

  ngOnInit() {
  }

}

