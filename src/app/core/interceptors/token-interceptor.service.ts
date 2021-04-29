import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StoreService} from '../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private store: StoreService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.store.getToken()) {
      request = request.clone({
        setHeaders: {
          authorization: `Token ${this.store.getToken()}`,
        }
      });
    }
    return next.handle(request);
  }
}
