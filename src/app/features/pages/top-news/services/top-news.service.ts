import { Injectable } from '@angular/core';
import {HelperService} from '../../../../core/helper/helper.service';
import {ConstantService} from '../../../../core/constant/constant.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopNewsService {
  private apiRoutes;
  private method;
  constructor(private helper: HelperService, private constant: ConstantService) {
    this.apiRoutes = this.constant.apiRoutes;
    this.method = this.constant.apiMethod;
  }
  getTopNews(): Observable<any> {
    return this.helper.requestCall(this.method.get, this.apiRoutes.getNewsFeed);
  }
  createPost(data): Observable<any>{
    return this.helper.requestCall(this.method.post, this.apiRoutes.createPost, data);
  }
}
