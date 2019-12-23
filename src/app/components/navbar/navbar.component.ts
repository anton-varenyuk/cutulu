import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    console.log(this.checkToken());
  }

  private checkToken(): boolean {
    return this.loginService.checkToken();
  }
  private logOut(): void {
    this.loginService.logOut();
  }
}
