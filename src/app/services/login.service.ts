import { Injectable } from '@angular/core';
import { ICreds } from '../interfaces/ICreds';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public admin: ICreds = { login: 'a', password: '123' };
  public currentUser: ICreds;
  public isLoggedin: boolean;

  constructor(private router: Router) {
    this.currentUser = { login: '', password: '' };
    this.isLoggedin = false;
  }

  get checkLoggedIn() {
    if (this.isLoggedin) {
      return true;
    }
  }

  public logOut() {
    this.currentUser = { login: '', password: '' };
    this.isLoggedin = false;
    this.router.navigate(['login']);
  }

  public authorization(creds: ICreds) {
    this.logInAttempt(creds);
    if (this.checkCredentials()) {
      this.isLoggedin = true;
    }
  }
  public logInAttempt(creds: ICreds) {
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
