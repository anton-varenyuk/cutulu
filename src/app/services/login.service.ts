import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor( private router: Router,
               private storage: StorageService ) { }

  makeTokenFrom(arg: string): void {
    this.storage.set('token', window.btoa(arg + String(Date.now())));
  }

  checkToken(): boolean {
    return this.storage.get('token').length > 0;
  }

  logOut() {
    this.storage.set('token', '');
    this.router.navigate(['login']);
  }
}
