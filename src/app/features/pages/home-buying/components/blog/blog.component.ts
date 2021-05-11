import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ConstantService} from '../../../../../core/constant/constant.service';
import {CreatePostComponent} from '../../../../../shared/components/create-post/create-post.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  @Input() blog: any;
  constructor( private modalService: NgbModal,
               private configuration: NgbModalConfig,
               public constant: ConstantService) { }

  ngOnInit(): void {
    this.configuration.centered = true;
  }
  addBlog(): void{
    const modalRef = this.modalService.open(CreatePostComponent, this.constant.modalOption);
    modalRef.componentInstance.type = this.constant.POST_TYPE.HOME_BUYING_BLOG;
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        this.blog = result.data;
      }
    }, error => {
      console.log(error);
    });
  }
  editBlog(): void{
    const modalRef = this.modalService.open(CreatePostComponent, this.constant.modalOption);
    modalRef.componentInstance.type = this.constant.POST_TYPE.HOME_BUYING_BLOG;
    modalRef.componentInstance.edit = this.blog;
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        this.blog = result.data;
      }
    }, error => {
      console.log(error);
    });
  }
  removeBlog(blog): void{}
}
