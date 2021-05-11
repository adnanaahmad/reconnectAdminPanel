import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ConstantService} from '../../../../../core/constant/constant.service';
import {CreatePostComponent} from '../../../../../shared/components/create-post/create-post.component';
import {PostModel} from '../../../top-news/models/post-model';
import {take} from 'rxjs/operators';
import {TopNewsService} from '../../../top-news/services/top-news.service';
import {HelperService} from '../../../../../core/helper/helper.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  @Input() blog: any;
  constructor( private modalService: NgbModal,
               private configuration: NgbModalConfig,
               public constant: ConstantService,
               private topNews: TopNewsService,
               private helper: HelperService,
               private toaster: ToastrService) { }

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
  removeBlog(): void{
    this.topNews.removePost(this.blog._id).pipe(take(1)).subscribe(res => {
      this.blog = null;
      this.toaster.success(`${this.constant.toasterBellIconHTML} Post Deleted`, '',
        this.constant.toasterConfiguration.success);
    }, error => {
      this.helper.handleApiError(error, 'Failed to delete post');
    })
  }
}
