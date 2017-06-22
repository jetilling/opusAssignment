import { Injectable }                               from '@angular/core';
import {Router}                                     from '@angular/router';
import { Http, Headers, RequestOptions, Response }  from '@angular/http';
import { IRegisterUser, IUsersObject, IEmail, IUser }     from '../interfaces';
import { CommonFunctions }                          from './commonFunctions.service';
import { UsersService }                             from './users.service';
import { Observable }                               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService
{

  userToken: string;
  showValidationMessage: boolean = false;

  constructor(private http: Http,
              private router: Router,
              private usersService: UsersService,
              private common: CommonFunctions) {}  

//----Properties----//
  get currentUser(): IUsersObject {
    return this.usersService.currentUser
  }         

  set currentUser(val: IUsersObject) {
    this.usersService.currentUser = val
  }

//----Methods----//
  getUser(): Observable<string> {
    const url = '/api/me'
    return this.http.get(url, this.common.jwt())
        .map(this.common.extractData)
        .catch(this.common.handleError);
  }

  login(user: IRegisterUser){
    const url = '/auth/login';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post(url, JSON.stringify(user), options)
          .map(this.common.extractData)
          .subscribe(
              res => {
                if (res.message) this.showValidationMessage = true;
                else this.setCookies(res, false)
              },
              error => {
                this.common.handleError
        })
  }

  register(user: IRegisterUser) {
    const url = '/auth/register';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post(url, JSON.stringify(user), options)
                    .map(this.common.extractData)
                    .subscribe(
                          res => {
                            this.usersService.currentUser = res;
                            this.router.navigate(['/validate'])
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

  validateUser(token: string) {
    this.userToken = token;
    let validationToken = {token: token}
    const url = '/auth/validate';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(url, JSON.stringify(validationToken), options)
                  .map(this.common.extractData)
                  .catch(this.common.handleError);
  }

    validateUserAndLogin(token: string) {
    this.userToken = token;
    let validationToken = {token: token}
    const url = '/auth/validateAndLogin';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(url, JSON.stringify(validationToken), options)
                  .map(this.common.extractData)
                  .catch(this.common.handleError);
  }

  submitResetEmail(email: IEmail) {
    const url = "/auth/sendPasswordResetUrl"
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(url, JSON.stringify(email), options)
                  .map(this.common.extractData)
                  .catch(this.common.handleError);
  }

  resetPassword(user: IUser) {
    const url = "/auth/resetPassword"
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.put(url, JSON.stringify(user), options)
                  .map(this.common.extractData)
                  .subscribe(
                        res => {
                          user.email = res.email;
                          this.login(user)
                        },
                        error => {
                          this.common.handleError
                  })
  }

 setCookies(res: IRegisterUser, newUser: boolean) {
    if (res && res.token) {
      document.cookie = `Opus_User=${res.token}; Path=/;`
      localStorage.setItem('opusId', res.id+'');
      this.currentUser = res
    }
    newUser ? this.router.navigate(['/validate']) : this.router.navigate(['/dashboard'])
  }

}