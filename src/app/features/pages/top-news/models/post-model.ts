import {FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';

export interface CreatePostModel{
  form: FormGroup;
  media: Array<MediaModel>;
  nextScreen: boolean;
  subscription: Array<Subscription>;
  loader: any;
}
interface MediaModel{
  type: string;
  url: string;
}
export interface TopNewsModel{
  posts: Array<PostModel>;
  topNewsPageNumber: number;
  adminPostsCount: number;
}
export interface PostModel{
  title: string;
  description: string;
  media: Array<MediaModel>;
  _id: string;
}
