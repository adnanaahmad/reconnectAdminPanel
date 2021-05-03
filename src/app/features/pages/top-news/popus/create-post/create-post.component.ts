import { Component, OnInit } from '@angular/core';
import {HelperService} from '../../../../../core/helper/helper.service';
import {StoreService} from '../../../../../core/store/store.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators} from '@angular/forms';
import {CreatePostModel} from '../../models/post-model';
import {ConstantService} from '../../../../../core/constant/constant.service';
import {TopNewsService} from '../../services/top-news.service';
import {take} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  post: CreatePostModel = {} as CreatePostModel;
  constructor(private helper: HelperService,
              public store: StoreService,
              private activeModal: NgbActiveModal,
              private fb: FormBuilder,
              public constant: ConstantService,
              private topNewsService: TopNewsService,
              private toaster: ToastrService) { }

  ngOnInit(): void {
    this.helper.setModal();
    this.post.nextScreen = false;
    this.initializeForm();
  }
  initializeForm(): void {
    this.post.media = [];
    this.post.form = this.fb.group({
      title: [null, Validators.required],
      description: [null],
      media: [null],
      type: ['custom-post']
    })
  }
  onSubmit(): void{
    if (this.post.media.length > 0 || this.post.form.get('description').value) {
      this.topNewsService.createPost({...this.post.form.value, media: this.post.media}).pipe(take(1)).subscribe(res => {
        this.activeModal.close({status: 'yes', data: res.result});
      },error => {
        this.helper.handleApiError(error, 'Failed to create post');
      })
    } else {
      this.toaster.error(`${this.constant.toasterBellIconHTML} No description or media attached`, '',
        this.constant.toasterConfiguration.error);
    }
  }
  close(): void{
    this.activeModal.close({status: 'no'});
  }
  goToCreatePost(): void{
    this.post.nextScreen = false;
  }
  goToAddExternalLink(): void{
    this.post.media.length < 6 ? this.post.nextScreen = true :
      this.toaster.error(`${this.constant.toasterBellIconHTML} Not more than 6 files can be posted`, '',
      this.constant.toasterConfiguration.error);
  }
  addUrl(data): void{
    this.post.media.push(data);
    this.goToCreatePost();
  }
  removeMediaFile(index: number): void{
    this.post.media.splice(index, 1);
  }
}
