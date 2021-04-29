import {Component, Input, OnInit} from '@angular/core';
import {StoreService} from '../../../../../core/store/store.service';
import {HelperService} from '../../../../../core/helper/helper.service';
import {UserModel} from '../../models/user-management-model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserManagementService} from '../../services/user-management.service';
import {take} from 'rxjs/operators';
import {ConstantService} from '../../../../../core/constant/constant.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @Input() user: UserModel;
  account : FormGroup;
  constructor(public store: StoreService,
              public helper: HelperService,
              private fb: FormBuilder,
              private userService: UserManagementService,
              public constant: ConstantService,
              private activeModal: NgbActiveModal,
              private toaster: ToastrService) { }

  ngOnInit(): void {
    this.helper.setModal();
    this.account = this.fb.group({
      userId: [this.user._id],
      status: [this.user.accountStatus]
    })
  }
  onSubmit(): void{
    this.userService.updateUserStatus(this.account.value).pipe(take(1)).subscribe(res => {
      this.activeModal.close({status: 'yes', data: res.result.accountStatus});
      this.toaster.success(`${this.constant.toasterBellIconHTML} Successfully updated status`, '',
        this.constant.toasterConfiguration.success);
    }, error => {
      if (this.constant.RESPONSE_ERRORS[error.error.result.CODE]){
        this.toaster.error( this.constant.toasterBellIconHTML + ' ' +
          (error.error.result.details ? error.error.result.details.MESSAGE : error.error.result.details.MESSAGE), '',
          this.constant.toasterConfiguration.error);
      } else{
        this.toaster.error(`${this.constant.toasterBellIconHTML} Failed to update status`, '',
          this.constant.toasterConfiguration.error);
      }
    })
  }
  close(): void{
    this.activeModal.close({status: 'no'});
  }

}
