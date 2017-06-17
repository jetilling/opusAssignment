import { Injectable }                               from '@angular/core';
import { Http, Headers, RequestOptions, Response }  from '@angular/http';
// import { CanActivate, Router, ActivatedRouteSnapshot,
//   RouterStateSnapshot}                              from '@angular/router';
import { User }                                     from '../interfaces';
import { CommonFunctions }                          from './commonFunctions.service';
import { Observable }                               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService
{
  

  constructor(private http: Http,
              private common: CommonFunctions) {}


  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   console.log(state)
  //   console.log("route ", route)
  //   if(this.opusUser && this.opusUser.split('.').length === 3){
  //   this.getUser()
  //     .subscribe(
  //       res => {
  //         if (res){
  //           this.router.navigate(['/usersList'])
  //           return true
  //           //localStorage.setItem('id', res.id.toString());
  //           //this.router.navigate(['/usersList'])
  //         }
  //       }
  //     )
  //   }
  //   return false
  // }            

  getUser(): Observable<string> {
    const url = '/api/me'
    return this.http.get(url, this.jwt())
        .map(this.common.extractData)
        .catch(this.common.handleError);
  }

  login(user: User): Observable<User> {
    const url = '/auth/login';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
      return this.http.post(url, JSON.stringify(user), options)
          .map(this.common.extractData)
          .catch(this.common.handleError);
  }

  register(user: User): Observable<User> {
    const url = '/auth/register';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, JSON.stringify(user), options)
                    .map(this.common.extractData)
                    .catch(this.common.handleError);
  }

  logout(): boolean 
  {
    localStorage.removeItem('id')
    document.cookie = 'Opus_User=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    return true;
  }

  // create authorization header with jwt token
  jwt() {
       let opusUser = document.cookie.split("Opus_User=")[1];
       if (opusUser && opusUser.split('.').length === 3) {
           let headers = new Headers({ 'Authorization': opusUser});
           return new RequestOptions({ headers: headers });
       }
   }

}