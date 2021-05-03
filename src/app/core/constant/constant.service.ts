import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpHeaders} from '@angular/common/http';
import {NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  constructor() {
  }

  apiRoutes = {
    signin: `${environment.apiUrl}/user/signin`,
    getUsers: `${environment.apiUrl}/admin/users`,
    updateUserStatus: `${environment.apiUrl}/admin/user-status`,
    createPost: `${environment.apiUrl}/feed/create`,
    getNewsFeed: `${environment.apiUrl}/feed/news-feed`
  };
  appRoutePaths = {
    home: '/home',
    userManagement: '/home/user-management',
    topNews: '/home/top-news',
    homeBuying: '/home/home-buying'
  }
  appRoutes = [
    {
      path: this.appRoutePaths.userManagement,
      title: 'User Management',
      icon: 'icon-single-02',
      class: ''
    },
    {
      path: this.appRoutePaths.topNews,
      title: 'Top News',
      icon: 'icon-bulb-63',
      class: ''
    },
    {
      path: this.appRoutePaths.homeBuying,
      title: 'Home Buying 101',
      icon: 'icon-basket-simple',
      class: ''
    },

  ];
  apiMethod = {
    get: 'get',
    post: 'post',
    put: 'put',
    delete: 'delete'
  };
  RESPONSE_ERRORS = {
    BAD_REQUEST: 'BAD_REQUEST',
    SERVER_SIDE_ERROR: 'SERVER_SIDE_ERROR',
    CLIENT_UNAUTHORIZED: 'CLIENT_UNAUTHORIZED',
    NOT_FOUND: 'NOT_FOUND',
    EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
    MINIMUM_PASS_LENGTH: 'MINIMUM_PASS_LENGTH',
    MALFORMED_EMAIL: 'MALFORMED_EMAIL',
    INVALID_ROLE: 'INVALID_ROLE',
    NO_ACCOUNT_FOUND: 'NO_ACCOUNT_FOUND',
    INVALID_PASSWORD: 'INVALID_PASSWORD',
    INVALID_USER_REFERRAL_TYPE: 'INVALID_USER_REFERRAL_TYPE',
    INVALID_USER_REFERRER_ID: 'INVALID_USER_REFERRER_ID',
    INVALID_NAME: 'INVALID_NAME',
    MINIMUM_SEARCH_NAME_QUERY_LENGTH: 'MINIMUM_SEARCH_NAME_QUERY_LENGTH',
  };
  httpOptions = {
    json: {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    },
    image: {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
      })
    }
  };
  role = {
    BUYER: 'buyer',
    SELLER: 'seller',
    LENDER: 'lender',
    REAL_ESTATE: 'realEstateAgent',
    ATTORNEY: 'attorney',
    HOME_INSPECTOR: 'homeInspector',
    INSURANCE: 'insuranceAgent',
    CONTRACTOR: 'contractor',
    ADMIN: 'admin'
  };
  localStorageVariables = {
    TOKEN: 'token',
    USER: 'user'
  }
  regex = {
    email: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
  }
  toasterConfiguration = {
    success: {
      enableHtml: true,
      closeButton: true,
      toastClass: 'alert alert-success alert-with-icon',
    },
    error: {
      enableHtml: true,
      closeButton: true,
      toastClass: 'alert alert-danger alert-with-icon',
    }
  }
  toasterBellIconHTML = '<i class="tim-icons icon-bell-55"></i>';
  accountStatus = {
    PENDING_APPROVAL: 'pendingApproval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    BLOCKED: 'blocked'
  }
  modalOption: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false
  }
  mediaType = {
    IMAGE: 'image',
    VIDEO: 'video',
    IFRAME: 'iframe'
  }
}
