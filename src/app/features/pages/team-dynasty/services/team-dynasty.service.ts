import { Injectable } from '@angular/core';
import {HelperService} from '../../../../core/helper/helper.service';
import {ConstantService} from '../../../../core/constant/constant.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamDynastyService {
  private apiRoutes;
  private method;
  constructor(private helper: HelperService, private constant: ConstantService) {
    this.apiRoutes = this.constant.apiRoutes;
    this.method = this.constant.apiMethod;
  }
  getTeamDynasty(): Observable<any> {
    return this.helper.requestCall(this.method.get, this.apiRoutes.getTeamDynasty);
  }
  getRealEstateAgents(): Observable<any> {
    return this.helper.requestCall(this.method.get, this.apiRoutes.getRealEstateAgents);
  }
  addNode(data): Observable<any> {
    return this.helper.requestCall(this.method.post, this.apiRoutes.addNode, data);
  }
  deleteNode(data): Observable<any>{
    return this.helper.requestCall(this.method.delete, this.apiRoutes.deleteNode + '/' + data);
  }
}
