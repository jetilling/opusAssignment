//----Angular Imports----//
import { Injectable, OnInit }                                       from '@angular/core';
import { Http, Headers, RequestOptions, Response }                  from '@angular/http';

//---Other Imports----//
import { IRegisterUser, IUsersObject, IPagerDetails, IUserNames }   from '../interfaces';
import { CommonFunctions }                                          from './commonFunctions.service';
import { Observable }                                               from 'rxjs/Observable';
import * as _                                                       from 'underscore';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService
{

  constructor(private http: Http,
              private common: CommonFunctions) {}
              
  //---------Properties----------//
  
  /**
   * Current logged in user's information
   */
  currentUser: IUsersObject

  /**
   * Whether or not the current user information is loaded
   */
  currentUserInfoLoaded: boolean = false;

  /**
   * An array of all the users and their information in the database
   */
  allUsers: IUsersObject[]

  /**
   * Pagination details
   */
  pagerDetails: IPagerDetails = <any>{}

  /**
   * Array of all users segemented into their respective page
   */
  pagedUsers: IUsersObject[];

  /**
   * THe current page out of all pages
   */
  currentPage: number;

  /**
   * Shows add user modal if true
   */
  showAddUser: boolean = false;

  /**
   * Shows confirmation if user was successfully added
   */
  userSuccessfullyAdded: boolean = false;

  /**
   * Shows confirm delete modal if true
   */
  showConfirmDelete: boolean;

  /**
   * The id of the selected user
   */
  selectedUserId: number;

  /**
   * The name of the selected user
   */
  selectedUserName: IUserNames;

  //--------Methods----------//

  /**
   * Adds user in database and allUsers array
   * @param {IUsersObject} user - Information for the added user
   */
  addUser(user: IUsersObject) 
  {
    const url = '/api/addUser'
    this.http.post(url, user, this.common.jwt())
            .map(this.common.extractData)
            .subscribe(
                res => {
                    this.allUsers.push(res);
                    this.userSuccessfullyAdded = true;
                    this.setPage(this.currentPage)
                }
            )
  }

  /**
   * Information for the currently logged in user
   */
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

  /**
   * Deletes user from database and allUsers array
   * @param {number} id - Id of user to delete
   */
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

  /**
   * Gets all users from database
   */
  getUsers() 
  {
    const url = '/api/getUsers'
    this.http.get(url, this.common.jwt())
            .map(this.common.extractData)
            .subscribe((res: IUsersObject[]) => {
                this.allUsers = res;
                this.setPage(1);
            });
  }

  /**
   * Sets the pages of users
   * @param {number} page - Page number to start
   */
  setPage(page: number) 
  {
    if (page < 1 || page > this.pagerDetails.totalPages) {
        return;
    }
    this.pagerDetails = this.getPages(this.allUsers.length, page);

    // get current page of items
    if (this.pagerDetails && this.allUsers) {
        this.pagedUsers = this.allUsers.slice(this.pagerDetails.startIndex, this.pagerDetails.endIndex + 1);
    } 
  }

  /**
   * Verifies added user email does not already exist
   * @param {IRegisterUser} user - User information i.e. email
   */
  verifyEmail(user: IRegisterUser): boolean 
  {
      let invalidEmail: boolean = false;
      this.allUsers.forEach(function(element){
          if (element.email === user.email) return invalidEmail = true;
      })
      return invalidEmail
  }

  /**
   * Divides users into their respective pages
   * @param {number} totalItems - Total number of users
   * @param {number} currentPage - Current page user is on
   * @param {number} pageSize - Number of users per page
   */
  private getPages(totalItems: number, currentPage: number = 1, pageSize: number = 5) 
  {
    
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

    //array of pages to repeat
    let pages = _.range(startPage, endPage + 1);

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

  /**
   * Loops through given array and removes specified value from it
   * @param {IUsersObject[]} array - array to loop through
   * @param {number} value - value to remove
   */
  private removeFromUsers(array: IUsersObject[], value: number): IUsersObject[] 
  {
      array.forEach(function(element, index){
                          if (element.id === value) {
                              array.splice(index, 1);
                          }
                      })
      return array;
  }

}