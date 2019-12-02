import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public login: string;
  public password: string;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  public checkLoggedIn() {
    if (this.loginService.checkLoggedIn) return true;
  }
  public auth(l: string, p: string) {
    this.loginService.authorization({login: l, password: p});
    // this.login = '';
    // this.password = '';
  }
}

