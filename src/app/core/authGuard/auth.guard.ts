import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment} from '@angular/router';
import {Observable} from 'rxjs';
import {StoreService} from '../store/store.service';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
    constructor(private store: StoreService, private router: Router) {
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (localStorage.getItem('token')) {
            return true;
        } else {
            this.router.navigateByUrl('/login').then();
            return false;
        }
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (localStorage.getItem('token')) {
            return true;
        } else {
            this.router.navigateByUrl('/login').then();
            return false;
        }
    }
}
