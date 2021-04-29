import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Location} from '@angular/common';
import {ConstantService} from '../../../../core/constant/constant.service';
import {AdminLayoutModel} from '../../models/navigation-model';
import {LoadingBarService} from '@ngx-loading-bar/core';
import {StoreService} from '../../../../core/store/store.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  adminLayout: AdminLayoutModel = {} as AdminLayoutModel;
  constructor(private router: Router,
              private location: Location,
              private constant: ConstantService,
              private loadingBar: LoadingBarService,
              private store: StoreService) {}
  ngOnInit() {
    this.progressBarLoading();
    this.navigateToUserManagement()
  }
  navigateToUserManagement() {
    const url = this.location.prepareExternalUrl(this.location.path());
    if (url === this.constant.appRoutePaths.home){
      this.router.navigateByUrl(this.constant.appRoutePaths.userManagement).then();
    }
  }
  progressBarLoading() {
    this.adminLayout.loader = this.loadingBar.useRef();
    this.adminLayout.subscription = this.store.progressBarLoading.subscribe(res => {
      res ? this.startLoading() : this.stopLoading();
    });
  }
  startLoading(): void {
    this.adminLayout.loader.start();
  }

  stopLoading(): void {
    this.adminLayout.loader.complete();
  }
}
