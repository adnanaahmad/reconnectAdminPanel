import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {StoreService} from '../../../core/store/store.service';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {
  @Input() buttonClass : string;
  @Input() buttonSizeClass: string;
  @Output() buttonEvent = new EventEmitter<any>();
  constructor(public store: StoreService) { }

  ngOnInit(): void {
  }
  fireEvent() {
    this.buttonEvent.emit();
  }
}
