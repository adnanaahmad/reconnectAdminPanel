import { Injectable } from '@angular/core';
import {HelperService} from '../../../../core/helper/helper.service';
import {ConstantService} from '../../../../core/constant/constant.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private apiRoutes;
  private method;
  constructor(private helper: HelperService, private constant: ConstantService) {
    this.apiRoutes = this.constant.apiRoutes;
    this.method = this.constant.apiMethod;
  }
  getUserList(): Observable<any> {
    return this.helper.requestCall(this.method.get, this.apiRoutes.getUsers);
  }
  updateUserStatus(data): Observable<any>{
    return this.helper.requestCall(this.method.put, this.apiRoutes.updateUserStatus, data);
  }
  resendEmailVerification(data): Observable<any>{
    return this.helper.requestCall(this.method.post, this.apiRoutes.resendEmailVerification, data);
  }
}
