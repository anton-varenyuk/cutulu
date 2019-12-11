import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isLoggedIn: boolean;

  constructor(private loginService: LoginService) {
    this.isLoggedIn = this.loginService.isLoggedIn;
    console.log(this.isLoggedIn);
  }

  ngOnInit() {

  }
  public logOut(): void {
    this.loginService.logOut();
  }
  public checkLoggedIn() {
    if (this.loginService.LoggedIn) return true;
  }

}
