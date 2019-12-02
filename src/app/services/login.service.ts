import { Injectable } from '@angular/core';
import { ICreds } from '../interfaces/ICreds';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public admin: ICreds = {
    login: 'a',
    password: '123'
  };
  public user: ICreds;
  public isLoggedin: boolean;

  constructor(private router: Router) {
    this.user = {
      login: '',
      password: ''
    };
    this.isLoggedin = false;
  }

  get loggedIn() {
    if (this.isLoggedin) {
      return true;
    }
  }

  public logOut() {
    this.user = {
      login: '',
      password: ''
    };
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
    this.user.login = creds.login;
    this.user.password = creds.password;
  }
  private checkCredentials(): boolean {
    if ( this.user.login === this.admin.login &&
         this.user.password === this.admin.password ) {
      console.log('yes');
      return true;
    } else {
      console.log('no');
      return false;
    }
  }
}
