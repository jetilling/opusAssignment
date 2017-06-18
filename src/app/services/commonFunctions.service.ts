import { Injectable }                               from '@angular/core';
import { Headers, RequestOptions, Response }        from '@angular/http';
import { Observable }                               from 'rxjs/Observable';

@Injectable()
export class CommonFunctions {

  jwt() {
       let tellTovaUser = document.cookie.split("Opus_User=")[1];
       if (tellTovaUser && tellTovaUser.split('.').length === 3) {
           let headers = new Headers({ 'Authorization': tellTovaUser});
           return new RequestOptions({ headers: headers });
       }
  }

  extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}