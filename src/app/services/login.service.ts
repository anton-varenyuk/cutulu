import { Injectable } from '@angular/core';
import { ICreds } from '../interfaces/ICreds';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public admin: ICreds = { login: 'a', password: '123' };
  public currentUser: ICreds;
  public isLoggedIn: boolean;

  constructor(private router: Router) {
    this.currentUser = { login: '', password: '' };
    this.isLoggedIn = false;
  }

  get LoggedIn() {
    if (this.isLoggedIn) {
      return true;
    }
  }

  public logOut() {
    this.currentUser = { login: '', password: '' };
    this.isLoggedIn = false;
    this.router.navigate(['login']);
  }
  public authorization(credentials: ICreds) {
    this.setCredentials(credentials);
    if (this.checkCredentials()) {
      this.isLoggedIn = true;
    }
  }
  public setCredentials(creds: ICreds) {
    this.currentUser.login = creds.login;
    this.currentUser.password = creds.password;
  }
  private checkCredentials(): boolean {
    if ( this.currentUser.login === this.admin.login &&
         this.currentUser.password === this.admin.password ) {
      console.log('yes');
      return true;
    } else {
      console.log('no');
      return false;
    }
  }
}
