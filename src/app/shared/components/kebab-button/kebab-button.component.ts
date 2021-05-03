import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../../core/store/store.service';

@Component({
  selector: 'app-kebab-button',
  templateUrl: './kebab-button.component.html',
  styleUrls: ['./kebab-button.component.scss']
})
export class KebabButtonComponent implements OnInit {

  constructor(public store: StoreService) { }

  ngOnInit(): void {
  }

}
