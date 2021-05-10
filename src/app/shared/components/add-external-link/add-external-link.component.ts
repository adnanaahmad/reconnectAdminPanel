import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HelperService} from '../../../core/helper/helper.service';
import {ConstantService} from '../../../core/constant/constant.service';

@Component({
  selector: 'app-add-external-link',
  templateUrl: './add-external-link.component.html',
  styleUrls: ['./add-external-link.component.scss']
})
export class AddExternalLinkComponent implements OnInit {
  @Output() goBack = new EventEmitter<any>();
  @Output() url = new EventEmitter<any>();
  urlForm: FormGroup;
  constructor(private fb: FormBuilder,
              private helper: HelperService,
              private constant: ConstantService) { }

  ngOnInit(): void {
    this.urlForm = this.fb.group({
      url: [null, [Validators.required, this.helper.mediaUrlValidator()]]
    });
  }
  goBackToCreatePost(): void {
    this.goBack.emit();
  }
  addUrl(): void {
    const data = {
      url: this.urlForm.get('url').value,
      type: ''
    }
    if (this.helper.validYoutubeUrl(data.url)){
      data.url = this.helper.getEmbeddedVideoURL(data.url);
      data.type = 'iframe';
      this.url.emit(data);
    } else if (this.helper.validVideoUrl(data.url)){
      data.type = 'video';
      this.url.emit(data);
    } else if (this.helper.validImageUrl(data.url)){
      data.type = 'image';
      this.url.emit(data);
    }
  }
}
