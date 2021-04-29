import { Component, OnInit } from '@angular/core';
import {ConstantService} from '../../../../core/constant/constant.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private constant: ConstantService) {}

  ngOnInit() {
    this.menuItems = this.constant.appRoutes.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    return window.innerWidth <= 991;
  }
}
