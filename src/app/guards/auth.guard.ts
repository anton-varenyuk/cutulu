import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router,
              private afAuth: AngularFireAuth) {  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.isAuthorized.pipe(
      map(res => !!res));
  }
}

// map(res => {
//   if (res) {
//     console.log(res);
//     return true;
//   } else {
//     return false;
//   }
// })

// setTimeout( () => {
//   map(res => !!res);
// }, 2000 )
// );

