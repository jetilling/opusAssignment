  export interface IEmail {
    email: string
  }

  export interface IUser extends User {
    password: string
    verifyPassword: string
    token: string
    email: string
    firstName: string
  }

/**
 * Class for login/Register User object
 */
export class User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    token?: string;
}

/**
 * Class for Users list
 */
export class UsersObject {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    login_dates?: Date[];
}

/**
 * Class for Pagination Details
 */
export class PagerDetails {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    startPage: number;
    endPage: number;
    startIndex: number;
    endIndex: number;
    pages: number[];
}
