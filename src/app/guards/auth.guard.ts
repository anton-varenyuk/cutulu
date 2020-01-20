import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router,
              private afAuth: AngularFireAuth) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.checkLoggedIn());
    return this.checkLoggedIn();
  }

  checkLoggedIn() {
    if (this.auth.checkToken()) {
      return true;
    } else {
      this.router.navigate(['welcome']);
      return false;
    }
  }
}
