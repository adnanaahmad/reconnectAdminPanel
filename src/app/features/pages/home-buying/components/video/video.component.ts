import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ConstantService} from '../../../../../core/constant/constant.service';
import {CreatePostComponent} from '../../../../../shared/components/create-post/create-post.component';
import {PostModel} from '../../../top-news/models/post-model';
import {take} from 'rxjs/operators';
import {HelperService} from '../../../../../core/helper/helper.service';
import {ToastrService} from 'ngx-toastr';
import {TopNewsService} from '../../../top-news/services/top-news.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @Input() videoResources: any;
  constructor(private modalService: NgbModal,
              private configuration: NgbModalConfig,
              public constant: ConstantService,
              private helper: HelperService,
              private toaster: ToastrService,
              private topNews: TopNewsService) { }

  ngOnInit(): void {
  }
  addVideo(): void{
    const modalRef = this.modalService.open(CreatePostComponent, this.constant.modalOption);
    modalRef.componentInstance.type = this.constant.POST_TYPE.HOME_BUYING_VIDEO;
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        this.videoResources.unshift(result.data);
      }
    }, error => {
      console.log(error);
    });
  }
  editVideo(video, index): void{
    const modalRef = this.modalService.open(CreatePostComponent, this.constant.modalOption);
    modalRef.componentInstance.type = this.constant.POST_TYPE.HOME_BUYING_VIDEO;
    modalRef.componentInstance.edit = video;
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        this.videoResources[index] = result.data;
      }
    }, error => {
      console.log(error);
    });
  }
  removeVideo(video: PostModel, index: number): void{
    this.topNews.removePost(video._id).pipe(take(1)).subscribe(res => {
      this.videoResources.splice(index, 1);
      this.toaster.success(`${this.constant.toasterBellIconHTML} Post Deleted`, '',
        this.constant.toasterConfiguration.success);
    }, error => {
      this.helper.handleApiError(error, 'Failed to delete post');
    })
  }
}
