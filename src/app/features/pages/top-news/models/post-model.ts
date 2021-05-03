import {FormGroup} from '@angular/forms';

export interface CreatePostModel{
  form: FormGroup;
  media: Array<MediaModel>;
  nextScreen: boolean;
}
interface MediaModel{
  type: string;
  url: string
}
export interface TopNewsModel{
  posts: Array<PostModel>;
}
interface PostModel{
  title: string;
  description: string;
  media: Array<MediaModel>;
}
