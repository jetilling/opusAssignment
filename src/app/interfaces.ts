/**
 * Interface for login/Register User object
 */
export class User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    token: string;
}

/**
 * Interface for Users list
 */
export class UsersObject {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
}

/**
 * Interface for Pagination Details
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
