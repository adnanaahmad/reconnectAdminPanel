import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private themeSubject = new BehaviorSubject<any>(false);
  theme = this.themeSubject.asObservable();
  private progressBarLoadingSubject = new BehaviorSubject<any>(null);
  progressBarLoading = this.progressBarLoadingSubject.asObservable();

  constructor() { }

  updateTheme(data: boolean): void{
    this.themeSubject.next(data);
  }
  updateProgressBarLoading(data): void{
    this.progressBarLoadingSubject.next(data);
  }
  getToken(): string{
    return localStorage.getItem('token');
  }
  get userId(): string{
    return JSON.parse(localStorage.getItem('user'))._id;
  }
}
