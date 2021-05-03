import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StoreService} from '../../../core/store/store.service';

@Component({
  selector: 'app-abs-icon-button',
  templateUrl: './abs-icon-button.component.html',
  styleUrls: ['./abs-icon-button.component.scss']
})
export class AbsIconButtonComponent implements OnInit {
  @Input() buttonClass : string
  @Output() buttonEvent = new EventEmitter<any>();
  constructor(public store: StoreService) { }

  ngOnInit(): void {
  }
  fireEvent() {
    this.buttonEvent.emit();
  }
}
