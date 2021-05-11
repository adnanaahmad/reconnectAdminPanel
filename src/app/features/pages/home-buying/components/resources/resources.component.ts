import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ConstantService} from '../../../../../core/constant/constant.service';
import {HelperService} from '../../../../../core/helper/helper.service';
import {ToastrService} from 'ngx-toastr';
import {TopNewsService} from '../../../top-news/services/top-news.service';
import {CreatePostComponent} from '../../../../../shared/components/create-post/create-post.component';
import {PostModel} from '../../../top-news/models/post-model';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  @Input() resources: any;
  constructor(private modalService: NgbModal,
              private configuration: NgbModalConfig,
              public constant: ConstantService,
              private helper: HelperService,
              private toaster: ToastrService,
              private topNews: TopNewsService) { }

  ngOnInit(): void {
  }
  addResource(): void{
    const modalRef = this.modalService.open(CreatePostComponent, this.constant.modalOption);
    modalRef.componentInstance.type = this.constant.POST_TYPE.HOME_BUYING_RESOURCE;
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        this.resources.unshift(result.data);
      }
    }, error => {
      console.log(error);
    });
  }
  editResource(resource, index): void{
    const modalRef = this.modalService.open(CreatePostComponent, this.constant.modalOption);
    modalRef.componentInstance.type = this.constant.POST_TYPE.HOME_BUYING_RESOURCE;
    modalRef.componentInstance.edit = resource;
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        this.resources[index] = result.data;
      }
    }, error => {
      console.log(error);
    });
  }
  removeResource(resource: PostModel, index: number): void{
    this.topNews.removePost(resource._id).pipe(take(1)).subscribe(res => {
      this.toaster.success(`${this.constant.toasterBellIconHTML} Post Deleted`, '',
        this.constant.toasterConfiguration.success);
      this.resources.splice(index, 1);
    }, error => {
      this.helper.handleApiError(error, 'Failed to delete post');
    })
  }
}
