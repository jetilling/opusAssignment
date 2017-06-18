namespace Opus
{
  export interface IUsersService
  {
     /**
      * Logged in user information
      */
     currentUser: UsersObject

     /**
      * Current User Info is loaded
      */
     currentUserInfoLoaded: boolean

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
      * Current Page
      */
      currentPage: number

     /**
      * Show the confirm-delete modal
      */
     showConfirmDelete: boolean

     /**
      * Id of user to delete
      */
     userIdToDelete: number

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
  
  currentUser: UsersObject
  currentUserInfoLoaded: boolean = false;
  allUsers: UsersObject[]
  pagerDetails: PagerDetails | any = {}
  pagedUsers: UsersObject[];
  currentPage: number;
  showConfirmDelete: boolean;
  userIdToDelete: number;

  //--------Methods----------//

  getLoggedInUser()
  {
      const userId = localStorage.getItem('opusId');
      const url = '/api/getLoggedInUser/' + userId;
      this.http.get(url, this.common.jwt())
               .map(this.common.extractData)
               .subscribe(
                   res => {
                       this.currentUser = res[0]
                       this.currentUserInfoLoaded = true
                   }
               )
  }

  deleteUser(id: number)
  {
    const url = '/api/deleteUser/' + id;
    this.http.delete(url, this.common.jwt())
            .map(this.common.extractData)
            .subscribe(res => {
                if (res) {
                    this.allUsers = this.removeFromUsers(this.allUsers, id)
                    this.showConfirmDelete = false;
                    this.setPage(this.currentPage)
                }
            })
  }

  private removeFromUsers(array: UsersObject[], value: number): UsersObject[] {
    array.forEach(function(element, index){
                        if (element.id === value) {
                            array.splice(index, 1);
                        }
                    })
    return array;
  }

  getUsers() 
  {
    const url = '/api/getUsers'
    this.http.get(url, this.common.jwt())
            .map(this.common.extractData)
            .subscribe((res: UsersObject[]) => {
                this.allUsers = res;
                this.setPage(1);
            });
  }

  setPage(page: number) {
    if (page < 1 || page > this.pagerDetails.totalPages) {
        return;
    }
    this.pagerDetails = this.getPages(this.allUsers.length, page);

    // get current page of items
    if (this.pagerDetails && this.allUsers) {
        this.pagedUsers = this.allUsers.slice(this.pagerDetails.startIndex, this.pagerDetails.endIndex + 1);
    } 
  }

  private getPages(totalItems: number, currentPage: number = 1, pageSize: number = 5) {
    
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
        startPage = 1;
        endPage = totalPages;
    } else {
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

    //start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    //array of pages to repeat in the pager control
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