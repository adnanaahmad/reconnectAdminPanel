import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../../../../core/store/store.service';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {UserDetailsComponent} from '../../popups/user-details/user-details.component';
import {UserManagementService} from '../../services/user-management.service';
import {take} from 'rxjs/operators';
import {UserManagementModel} from '../../models/user-management-model';
import {HelperService} from '../../../../../core/helper/helper.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: UserManagementModel = {} as UserManagementModel;
  constructor(public store: StoreService,
              private modalService: NgbModal,
              private configuration: NgbModalConfig,
              private userService: UserManagementService,
              public helper: HelperService,) {}

  ngOnInit(): void {
    this.configuration.centered = true;
    this.getUserList();
  }
  getUserList(): void{
    this.store.updateProgressBarLoading(true);
    this.userService.getUserList().pipe(take(1)).subscribe(res => {
      console.log(res);
      this.users.list = res.result;
      this.store.updateProgressBarLoading(false);
    }, error => {
      this.helper.handleApiError(error, 'Failed to fetch user list');
      this.store.updateProgressBarLoading(false);
    })
  }
  edit(data, index): void{
    const modalRef = this.modalService.open(UserDetailsComponent);
    modalRef.componentInstance.user = data;
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        this.users.list[index] = result.data;
      }
    }, error => {
      console.log(error);
    });
  }

}
