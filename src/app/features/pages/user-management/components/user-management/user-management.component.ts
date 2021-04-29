import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../../../../core/store/store.service';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {UserDetailsComponent} from '../../popups/user-details/user-details.component';
import {UserManagementService} from '../../services/user-management.service';
import {take} from 'rxjs/operators';
import {UserManagementModel} from '../../models/user-management-model';
import {HelperService} from '../../../../../core/helper/helper.service';
import {TitleCasePipe} from '@angular/common';

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
              public helper: HelperService,
              private titleCasePipe:TitleCasePipe) {}

  ngOnInit(): void {
    this.configuration.centered = true;
    this.getUserList();
  }
  getUserList(): void{
    this.userService.getUserList().pipe(take(1)).subscribe(res => {
      console.log(res);
      this.users.list = res.result;
    }, error => {
      console.log(error);
    })
  }
  edit(data, id): void{
    const modalRef = this.modalService.open(UserDetailsComponent);
    modalRef.componentInstance.user = data;
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        document.getElementById(id).innerHTML = this.titleCasePipe.transform(this.helper.resolveCamelCase(result.data));
      }
    }, error => {
      console.log(error);
    });
  }

}
