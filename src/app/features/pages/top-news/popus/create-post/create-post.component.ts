import { Component, OnInit } from '@angular/core';
import {HelperService} from '../../../../../core/helper/helper.service';
import {StoreService} from '../../../../../core/store/store.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  constructor(private helper: HelperService,
              public store: StoreService,
              private activeModal: NgbActiveModal,) { }

  ngOnInit(): void {
    this.helper.setModal();
  }
  close(): void{
    this.activeModal.close({status: 'no'});
  }
}
