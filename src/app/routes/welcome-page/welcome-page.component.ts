import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  checkToken(): boolean {
    return this.loginService.checkToken();
  }
}
