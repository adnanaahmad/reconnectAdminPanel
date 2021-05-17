import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { AbsIconButtonComponent } from './components/abs-icon-button/abs-icon-button.component';
import {SafeUrlPipe} from './pipes/safe-url/safe-url.pipe';
import { KebabButtonComponent } from './components/kebab-button/kebab-button.component';
import {CreatePostComponent} from './components/create-post/create-post.component';
import {AddExternalLinkComponent} from './components/add-external-link/add-external-link.component';
import {LoadingBarModule} from '@ngx-loading-bar/core';

@NgModule({
  declarations: [
    IconButtonComponent,
    AbsIconButtonComponent,
    SafeUrlPipe,
    KebabButtonComponent,
    CreatePostComponent,
    AddExternalLinkComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LoadingBarModule,
    ],
    exports: [
      CommonModule,
      ReactiveFormsModule,
      HttpClientModule,
      FormsModule,
      NgbModule,
      IconButtonComponent,
      AbsIconButtonComponent,
      KebabButtonComponent,
      SafeUrlPipe,
      CreatePostComponent,
      AddExternalLinkComponent
    ]
})
export class SharedModule { }
