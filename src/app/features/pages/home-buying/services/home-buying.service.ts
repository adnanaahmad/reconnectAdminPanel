import { Injectable } from '@angular/core';
import {HelperService} from '../../../../core/helper/helper.service';
import {ConstantService} from '../../../../core/constant/constant.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeBuyingService {
  private apiRoutes;
  private method;
  constructor(private helper: HelperService, private constant: ConstantService) {
    this.apiRoutes = this.constant.apiRoutes;
    this.method = this.constant.apiMethod;
  }
  getHomeBuyingFeed(): Observable<any> {
    return this.helper.requestCall(this.method.get, this.apiRoutes.getHomeBuyingFeed);
  }
}
