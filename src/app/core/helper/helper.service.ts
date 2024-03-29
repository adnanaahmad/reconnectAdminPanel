import { Injectable } from '@angular/core';
import {KeyValue} from '@angular/common';
import {ConstantService} from '../constant/constant.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {NgxImageCompressService} from 'ngx-image-compress';
import {ValidateFn} from 'codelyzer/walkerFactory/walkerFn';
import {AbstractControl} from '@angular/forms';
import {StoreService} from '../store/store.service';
import {take} from 'rxjs/operators';
import * as S3 from 'aws-sdk/clients/s3';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private constants: ConstantService,
              private http: HttpClient,
              private toaster: ToastrService,
              private imageCompress: NgxImageCompressService,
              private store: StoreService) { }
  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

  requestCall(method, api, data?: any, httpOptions?): Observable<any> {
    let response;
    switch (method) {
      case this.constants.apiMethod.post:
        response = this.http.post(api, data, httpOptions);
        break;
      case this.constants.apiMethod.get:
        response = this.http.get(api);
        break;
      case this.constants.apiMethod.put:
        response = this.http.put(api, data);
        break;
      case this.constants.apiMethod.delete:
        response = this.http.delete(api);
        break;
      default:
        break;
    }
    return response;
  }
  handleFileInput(files, user): void {
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
    if (validImageTypes.includes(files[0].type)) {
      if (Number(files[0].size) < 3145728) {
        const reader = new FileReader();
        if (files && files.length) {
          const file = files.item(0);
          reader.readAsDataURL(file);
          reader.onload = (event) => {
            this.imageCompression(event.target.result, user);
            user.image = reader.result as string;
          };
        }
      } else {
        this.toaster.error('File size is greater than 3 Mb');
      }
    } else {
      this.toaster.error('Invalid image format');
    }
  }
  resolveCamelCase(data): string{
    return data.split(/(?=[A-Z])/).join(' ');
  }
  imageCompression(image, user): void{
//    console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
    this.imageCompress.compressFile(image, -1, 50, 50).then(
        result => {
//          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
          user.fileUpload = this.dataURItoBlob(result.split(',')[1]);
        }
    );
  }
  dataURItoBlob(dataURI): Blob {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }
  getEmbeddedVideoURL(url): string {
    if (!url) {
      return null;
    }
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
        ? '//www.youtube.com/embed/' + match[2]
        : null;
  }
  setModal(): void {
    const modal = document.getElementsByClassName('modal-content') as HTMLCollectionOf<HTMLElement>;
    const index = modal.length - 1;
    const backdrop = modal[index].parentElement.parentElement.previousSibling as HTMLElement;
    //modal[index].style.padding = '20px 20px 20px 20px'
    this.store.theme.pipe(take(1)).subscribe(res => {
      if (res) {
        modal[index].style.background = 'white';
        backdrop.style.background = 'black';
        backdrop.style.opacity = '.3';
      } else {
        modal[index].style.background = '#262a3c';
        backdrop.style.background = 'black';
        backdrop.style.opacity = '.6';
      }
    })
  }
  handleApiError(error, msg): void {
    if (this.constants.RESPONSE_ERRORS[error.error.result.CODE]){
      this.toaster.error( this.constants.toasterBellIconHTML + ' ' +
        (error.error.result.details ? error.error.result.details.MESSAGE : error.error.result.MESSAGE), '',
        this.constants.toasterConfiguration.error);
    } else{
      this.toaster.error(`${this.constants.toasterBellIconHTML} ${msg}`, '',
        this.constants.toasterConfiguration.error);
    }
  }
  mediaUrlValidator(): ValidateFn<any> {
    return (control: AbstractControl): any => {
      if (!control.value){
        return null;
      }
      const validImageUrl = ((control.value).match(/\.(jpeg|jpg|gif|png)$/) != null);
      const validVideoUrl = ((control.value).match(/\.(mp4|ogg|webm)$/) != null);
      const validYoutubeUrl = !!(control.value).includes('youtube.com/watch');
      return !(validImageUrl || validVideoUrl || validYoutubeUrl) ? {validUrl: {value: control.value}} : null;
    };
  }
  validImageUrl(mediaUrl): boolean{
    return(mediaUrl.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }
  validVideoUrl(mediaUrl): boolean{
    return(mediaUrl.match(/\.(mp4|ogg|webm)$/) != null);
  }
  validYoutubeUrl(mediaUrl): boolean{
    return !!mediaUrl.includes('youtube.com/watch');
  }
  uploadFile(file, format) {
    const contentType = file.type;
    const bucket = new S3(environment.s3Bucket);
    const params = {
      Bucket: environment.s3BucketName,
      Key: file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };
    this.store.updateProgressBarLoading(true);
    bucket.upload(params, (err, data) => {
      if (err) {
        this.toaster.error(`${this.constants.toasterBellIconHTML} There was an error uploading your file: ${err}`, '',
          this.constants.toasterConfiguration.error);
        this.store.updateProgressBarLoading(false);
        (document.getElementById('media-img') as HTMLInputElement).value = null;
        (document.getElementById('media-vid') as HTMLInputElement).value = null;
        return false;
      }
      this.store.updateUploadFile({
        type: format,
        url:  data.Location
      });
      this.store.updateProgressBarLoading(false);
      console.log('Successfully uploaded file.', data);
      (document.getElementById('media-img') as HTMLInputElement).value = null;
      (document.getElementById('media-vid') as HTMLInputElement).value = null;
      return true;
    });
  }
  constructTree(data, dataMap, network): Array<any> {
    const tree = [];
    console.log(data, dataMap);
    data.forEach((node) => {
      const parent = dataMap[network[node.parent] ? network[node.parent].user : undefined];
      dataMap[node.user].expanded = true;
      dataMap[node.user] = {...dataMap[node.user], ...node}
      if (parent) {
        (parent.children || (parent.children = [])).push(dataMap[node.user]);
      } else {
        tree.push(dataMap[node.user]);
      }
    });
    console.log(tree);
    return tree;
  }
  sendEmail(email: string): void{
    window.location.href = (`mailto:${email}`);
  }
  isArray(array): boolean{
    return  Array.isArray(array);
  }
}
