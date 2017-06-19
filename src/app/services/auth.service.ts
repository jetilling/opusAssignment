import { Injectable }                               from '@angular/core';
import {Router}                                     from '@angular/router';
import { Http, Headers, RequestOptions, Response }  from '@angular/http';
import { User, UsersObject }                        from '../interfaces';
import { CommonFunctions }                          from './commonFunctions.service';
import { UsersService }                             from './users.service';
import { Observable }                               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService
{
  
  constructor(private http: Http,
              private router: Router,
              private usersService: UsersService,
              private common: CommonFunctions) {}  

  get currentUser(): UsersObject {
    return this.usersService.currentUser
  }         

  set currentUser(val: UsersObject) {
    this.usersService.currentUser = val
  }

  getUser(): Observable<string> {
    const url = '/api/me'
    return this.http.get(url, this.common.jwt())
        .map(this.common.extractData)
        .catch(this.common.handleError);
  }

  login(user: User){
    const url = '/auth/login';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post(url, JSON.stringify(user), options)
          .map(this.common.extractData)
          .subscribe(
              res => {
                this.setCookies(res)
              },
              error => {
                this.common.handleError
        })
  }

  register(user: User) {
    const url = '/auth/register';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post(url, JSON.stringify(user), options)
                    .map(this.common.extractData)
                    .subscribe(
              res => {
                this.setCookies(res);
              },
              error => {
                this.common.handleError
        })
  }

  logout(): boolean 
  {
    localStorage.removeItem('opusId')
    document.cookie = 'Opus_User=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    return true;
  }

  private setCookies(res: User) {
    if (res && res.token) {
      document.cookie = `Opus_User=${res.token}; Path=/;`
      localStorage.setItem('opusId', res.id+'');
      this.currentUser = res
    }
    this.router.navigate(['/dashboard']);
  }

}