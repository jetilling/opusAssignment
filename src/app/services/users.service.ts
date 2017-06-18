namespace Opus
{
  export interface IUsersService
  {
    // /**
    //  * User's first name
    //  */
    //  firstName: string

    //  /**
    //   * User's last name
    //   */
    //   lastName: string

      /**
       * List of all users
       */
      allUsers: UsersObject[]

      /**
       * Pagination Object
       */
      pagerDetails: PagerDetails

      /**
       * List of current users on the page
       */
       pagedUsers: UsersObject[]

      /**
       * Retrieves User list
       */
      getUsers: () => void

      /**
       * Sets a new page
       */
      setPage: (page: number) => void

  }
}

import { Injectable, OnInit }                               from '@angular/core';
import { Http, Headers, RequestOptions, Response }          from '@angular/http';
import { User, UsersObject, PagerDetails }                  from '../interfaces';
import { CommonFunctions }                                  from './commonFunctions.service';
import { Observable }                                       from 'rxjs/Observable';
import * as _                                               from 'underscore';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService implements Opus.IUsersService
{

  constructor(private http: Http,
              private common: CommonFunctions) {}
  
  allUsers: UsersObject[]
  pagerDetails: PagerDetails | any = {}
  pagedUsers: UsersObject[];

  getUsers() 
  {
    const url = '/api/getUsers'
    this.http.get(url, this.common.jwt())
            .map(this.common.extractData)
            .subscribe((res: UsersObject[]) => {
                // set items to json response
                this.allUsers = res;
                // initialize to page 1
                this.setPage(1);
            });
  }

  setPage(page: number) {
    if (page < 1 || page > this.pagerDetails.totalPages) {
        return;
  }

    // get pager object from service
    this.pagerDetails = this.getPages(this.allUsers.length, page);

    // get current page of items
    if (this.pagerDetails && this.allUsers) {
        this.pagedUsers = this.allUsers.slice(this.pagerDetails.startIndex, this.pagerDetails.endIndex + 1);
    } 
  }

  private getPages(totalItems: number, currentPage: number = 1, pageSize: number = 5) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
    } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
        } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to repeat in the pager control
    let pages = _.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    };
  }

}