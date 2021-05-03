import { Component, OnInit, SecurityContext } from '@angular/core';
import {StoreService} from '../../../../../core/store/store.service';
import {CreatePostComponent} from '../../popus/create-post/create-post.component';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ConstantService} from '../../../../../core/constant/constant.service';
import {TopNewsModel} from '../../models/post-model';
import {TopNewsService} from '../../services/top-news.service';
import {take} from 'rxjs/operators';
import {HelperService} from '../../../../../core/helper/helper.service';

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
              private constant: ConstantService,
              private topNewsService: TopNewsService,
              private helper: HelperService) { }

  ngOnInit(): void {
    this.configuration.centered = true;
    this.getTopNews();
  }
  getTopNews(){
    this.store.updateProgressBarLoading(true);
    this.topNewsService.getTopNews().pipe(take(1)).subscribe(res =>{
      this.topNews.posts = res.result.adminPosts;
      this.store.updateProgressBarLoading(false);
    }, error => {
      this.helper.handleApiError(error, 'Failed to fetch news feed');
      this.store.updateProgressBarLoading(false);
    })
  }
  createPost(): void{
    const modalRef = this.modalService.open(CreatePostComponent, this.constant.modalOption);
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        this.topNews.posts.unshift(result.data);
      }
    }, error => {
      console.log(error);
    });
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
}
