namespace Tova
{
  export interface IUsersService
  {

    /**
     * Logs user out
     */
    logout: () => boolean
  }
}

import { Injectable }                               from '@angular/core';
import { Http, Headers, RequestOptions, Response }  from '@angular/http';
import { User }                                     from '../interfaces';
import { CommonFunctions }                          from './commonFunctions.service';
import { Observable }                               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
  constructor(private http: Http,
              private common: CommonFunctions) {}



}