import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HelperService} from '../../../core/helper/helper.service';
import {StoreService} from '../../../core/store/store.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators} from '@angular/forms';
import {CreatePostModel, PostModel} from '../../../features/pages/top-news/models/post-model';
import {ConstantService} from '../../../core/constant/constant.service';
import {TopNewsService} from '../../../features/pages/top-news/services/top-news.service';
import {take} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() type: string;
  @Input() edit: PostModel;
  post: CreatePostModel = {} as CreatePostModel;
  constructor(private helper: HelperService,
              public store: StoreService,
              private activeModal: NgbActiveModal,
              private fb: FormBuilder,
              public constant: ConstantService,
              private topNewsService: TopNewsService,
              private toaster: ToastrService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.helper.setModal();
    this.post.nextScreen = false;
    this.initializeForm();
    this.post.subscription.push(
      this.store.uploadFile.subscribe(res => {
        if (res) {
          this.post.media.push(res);
        }
      })
    )
  }
  ngAfterViewInit() {
    if (this.edit){
      this.post.media = [...this.edit.media];
      this.post.form.patchValue({
        title: this.edit.title,
        description: this.edit.description
      });
      this.cdr.detectChanges();
    }
  }
  ngOnDestroy(): void {
    this.store.updateUploadFile(null);
    this.post.subscription.forEach(x => x.unsubscribe());
  }

  initializeForm(): void {
    this.post.subscription = [];
    this.post.media = [];
    this.post.form = this.fb.group({
      title: [null, Validators.required],
      description: [null],
      media: [null],
      contentType: ['custom-post'],
      type: [this.type]
    })
  }
  onSubmit(): void{
    if (this.customValidation) {
      (this.edit ? this.topNewsService.updatePost({...this.post.form.value, media: this.post.media}, this.edit._id) :
        this.topNewsService.createPost({...this.post.form.value, media: this.post.media})).pipe(take(1)).subscribe(res => {
        this.activeModal.close({status: 'yes', data: res.result});
        this.toaster.success(`${this.constant.toasterBellIconHTML} ${this.edit ? 'Post Edited' : 'Post Created'}`, '',
          this.constant.toasterConfiguration.success);
      },error => {
        this.helper.handleApiError(error, `Failed to ${this.edit ? 'edit' : 'create'} post`);
      })
    } else {
        this.errorHandling();
    }
  }
  errorHandling(): void{
    switch (this.type) {
      case this.constant.POST_TYPE.HOME_BUYING_VIDEO:
        this.toaster.error(`${this.constant.toasterBellIconHTML} No media attached`, '',
          this.constant.toasterConfiguration.error);
        break;
      case this.constant.POST_TYPE.HOME_BUYING_RESOURCE:
        this.toaster.error(`${this.constant.toasterBellIconHTML} No description`, '',
          this.constant.toasterConfiguration.error);
        break;
      case this.constant.POST_TYPE.HOME_BUYING_BLOG:
        this.toaster.error(`${this.constant.toasterBellIconHTML} ${ ( this.post.media.length === 0 && !this.post.form.get('description').value) ?
        'No description or media attached' : !(this.post.media.length > 0) ? 'No media attached' : 'No description'}`, '',
          this.constant.toasterConfiguration.error);
        break;
      default:
        this.toaster.error(`${this.constant.toasterBellIconHTML} No description or media attached`, '',
          this.constant.toasterConfiguration.error);
        break;
    }
  }
  get customValidation(): boolean{
    switch (this.type) {
      case this.constant.POST_TYPE.HOME_BUYING_VIDEO:
        return this.post.media.length > 0;
      case this.constant.POST_TYPE.HOME_BUYING_RESOURCE:
        return this.post.form.get('description').value;
      case this.constant.POST_TYPE.HOME_BUYING_BLOG:
        return (this.post.media.length > 0 && this.post.form.get('description').value);
      default:
        return this.post.media.length > 0 || this.post.form.get('description').value;
    }
  }
  close(): void{
    this.activeModal.close({status: 'no'});
  }
  goToCreatePost(): void{
    this.post.nextScreen = false;
  }
  goToAddExternalLink(): void{
    if ( this.type === this.constant.POST_TYPE.NEWS_ARTICLE) {
      this.post.media.length < 6 ? this.post.nextScreen = true :
        this.toaster.error(`${this.constant.toasterBellIconHTML} Not more than 6 files can be posted`, '',
          this.constant.toasterConfiguration.error);
    } else {
      this.post.media.length < 1 ? this.post.nextScreen = true :
        this.toaster.error(`${this.constant.toasterBellIconHTML} Not more than 1 file can be posted`, '',
          this.constant.toasterConfiguration.error);
    }
  }
  addUrl(data): void{
    this.post.media.push(data);
    this.goToCreatePost();
  }
  removeMediaFile(index: number): void{
    this.post.media.splice(index, 1);
  }
  uploadImageFile(file) {
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
    file = file.target.files.item(0);
    validImageTypes.includes(file.type) ? this.helper.uploadFile(file, 'image') : this.toaster.error(`${this.constant.toasterBellIconHTML} Valid image formats: gif, jpg, jpeg and png`, '',
      this.constant.toasterConfiguration.error);
  }
  uploadVideoFile(file) {
    const validVideoTypes = ['video/mp4', 'video/ogg', 'video/webm'];
    file = file.target.files.item(0);
    validVideoTypes.includes(file.type) ? this.helper.uploadFile(file, 'video') : this.toaster.error(`${this.constant.toasterBellIconHTML} Valid video formats: mp4, ogg and webm`, '',
      this.constant.toasterConfiguration.error);
  }
}
