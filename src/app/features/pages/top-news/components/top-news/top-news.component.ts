import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../../../../core/store/store.service';
import {CreatePostComponent} from '../../../../../shared/components/create-post/create-post.component';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ConstantService} from '../../../../../core/constant/constant.service';
import {PostModel, TopNewsModel} from '../../models/post-model';
import {TopNewsService} from '../../services/top-news.service';
import {take} from 'rxjs/operators';
import {HelperService} from '../../../../../core/helper/helper.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-top-news',
  templateUrl: './top-news.component.html',
  styleUrls: ['./top-news.component.scss']
})
export class TopNewsComponent implements OnInit {
  topNews: TopNewsModel = {} as TopNewsModel;
  constructor(public store: StoreService,
              private modalService: NgbModal,
              private configuration: NgbModalConfig,
              public constant: ConstantService,
              private topNewsService: TopNewsService,
              private helper: HelperService,
              private toaster: ToastrService) { }

  ngOnInit(): void {
    this.configuration.centered = true;
    this.topNews.topNewsPageNumber = 1;
    this.getTopNews();
  }
  getTopNews(){
    this.store.updateProgressBarLoading(true);
    this.topNewsService.getTopNews(`?topNewsPageNumber=${this.topNews.topNewsPageNumber}`).pipe(take(1)).subscribe(res =>{
      this.topNews.posts = res.result.adminPosts;
      this.topNews.adminPostsCount = res.result.adminPostsCount;
      this.store.updateProgressBarLoading(false);
    }, error => {
      this.helper.handleApiError(error, 'Failed to fetch news feed');
      this.store.updateProgressBarLoading(false);
    })
  }
  createPost(): void{
    const modalRef = this.modalService.open(CreatePostComponent, this.constant.modalOption);
    modalRef.componentInstance.type = this.constant.POST_TYPE.NEWS_ARTICLE;
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        this.topNews.posts.unshift(result.data);
        this.topNews.adminPostsCount = this.topNews.adminPostsCount + 1;
      }
    }, error => {
      console.log(error);
    });
  }
  editPost(post: PostModel, index: number): void{
    const modalRef = this.modalService.open(CreatePostComponent, this.constant.modalOption);
    modalRef.componentInstance.type = this.constant.POST_TYPE.NEWS_ARTICLE;
    modalRef.componentInstance.edit = post;
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        this.topNews.posts[index] = result.data;
      }
    }, error => {
      console.log(error);
    });
  }
  removePost(post: PostModel, index: number): void{
    this.topNewsService.removePost(post._id).pipe(take(1)).subscribe(res => {
      this.topNews.posts.splice(index, 1);
      this.toaster.success(`${this.constant.toasterBellIconHTML} Post Deleted`, '',
        this.constant.toasterConfiguration.success);
      this.topNews.adminPostsCount = this.topNews.adminPostsCount - 1;
    }, error => {
      this.helper.handleApiError(error, 'Failed to delete post');
    })
  }
  previous(array): void{
    this.leftShift(array);
  }
  next(array): void{
    this.rightShift(array);
  }

  leftShift(arr){
    const last = arr.pop();
    arr.unshift(last);
    return arr;
  }
  rightShift(arr){
    const first = arr[0];
    arr.shift();
    arr.push(first);
    return arr;
  }
  loadMore(): void{
    this.topNewsService.getTopNews(`?topNewsPageNumber=${this.topNews.topNewsPageNumber + 1}`).pipe(take(1)).subscribe(res =>{
        this.topNews.posts = [...this.topNews.posts , ...res.result.adminPosts];
        this.topNews.topNewsPageNumber = this.topNews.topNewsPageNumber + 1;
        this.topNews.adminPostsCount = res.result.adminPostsCount;
    }, error => {
      this.helper.handleApiError(error, 'Failed to fetch news feed');
    });
  }
}
