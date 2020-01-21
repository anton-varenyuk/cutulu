import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {

  }

  private checkToken(): boolean {
    return this.auth.checkToken();
  }
}
