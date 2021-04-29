import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../../../../core/store/store.service';
import {CreatePostComponent} from '../../popus/create-post/create-post.component';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ConstantService} from '../../../../../core/constant/constant.service';

@Component({
  selector: 'app-top-news',
  templateUrl: './top-news.component.html',
  styleUrls: ['./top-news.component.scss']
})
export class TopNewsComponent implements OnInit {

  constructor(public store: StoreService,
              private modalService: NgbModal,
              private configuration: NgbModalConfig,
              private constant: ConstantService) { }

  ngOnInit(): void {
    this.configuration.centered = true;
  }
  createPost(): void{
    const modalRef = this.modalService.open(CreatePostComponent, this.constant.modalOption);
    modalRef.componentInstance.user = '';
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        // this.users.list[index] = result.data;
      }
    }, error => {
      console.log(error);
    });
  }
}
