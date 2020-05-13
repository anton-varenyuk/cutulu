import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {first, map, take, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService,
                private router: Router,
                private afAuth: AngularFireAuth) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<boolean> {

        return this.afAuth.authState.pipe(
            take(1),
            map(authState => !!authState),
            tap(authenticated => {
                if (!authenticated) {
                    this.router.navigate(['/welcome']);
                }
            })
        );

    }
}

