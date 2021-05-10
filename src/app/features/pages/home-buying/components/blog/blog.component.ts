import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ConstantService} from '../../../../../core/constant/constant.service';
import {CreatePostComponent} from '../../../../../shared/components/create-post/create-post.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor( private modalService: NgbModal,
               private configuration: NgbModalConfig,
               private constant: ConstantService) { }

  ngOnInit(): void {
    this.configuration.centered = true;
  }
  addBlog(): void{
    const modalRef = this.modalService.open(CreatePostComponent, this.constant.modalOption);
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        //this.topNews.posts.unshift(result.data);
      }
    }, error => {
      console.log(error);
    });
  }
}
