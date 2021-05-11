import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../../../../core/store/store.service';
import {HomeBuyingService} from '../../services/home-buying.service';
import {take} from 'rxjs/operators';
import {HelperService} from '../../../../../core/helper/helper.service';
import {HomeBuyingModel} from '../../models/home-buying-model';

@Component({
  selector: 'app-home-buying',
  templateUrl: './home-buying.component.html',
  styleUrls: ['./home-buying.component.scss']
})
export class HomeBuyingComponent implements OnInit {
  active = 1;
  homeBuying: HomeBuyingModel = {} as HomeBuyingModel;
  constructor(public store: StoreService,
              private feed: HomeBuyingService,
              private helper: HelperService) {}

  ngOnInit(): void {
    this.store.updateProgressBarLoading(true);
    this.feed.getHomeBuyingFeed().pipe(take(1)).subscribe(res =>{
      this.homeBuying = res.result;
      console.log(this.homeBuying);
      this.store.updateProgressBarLoading(false);
    }, error => {
      this.helper.handleApiError(error, 'Failed to fetch feed');
      this.store.updateProgressBarLoading(false);
    })
  }

}
