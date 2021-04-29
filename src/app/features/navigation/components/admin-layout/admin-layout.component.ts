import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Location} from '@angular/common';
import {ConstantService} from '../../../../core/constant/constant.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  constructor(private router: Router,
              private location: Location,
              private constant: ConstantService) {}
  ngOnInit() {
    this.navigateToUserManagement()
  }
  navigateToUserManagement() {
    const url = this.location.prepareExternalUrl(this.location.path());
    if (url === this.constant.appRoutePaths.home){
      this.router.navigateByUrl(this.constant.appRoutePaths.userManagement).then();
    }
  }
}
