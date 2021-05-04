import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../../../../core/store/store.service';

@Component({
  selector: 'app-home-buying',
  templateUrl: './home-buying.component.html',
  styleUrls: ['./home-buying.component.scss']
})
export class HomeBuyingComponent implements OnInit {
  active = 1;
  constructor(public store: StoreService) { }

  ngOnInit(): void {
  }

}
