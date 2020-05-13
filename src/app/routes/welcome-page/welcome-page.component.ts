import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})

export class WelcomePageComponent implements OnInit {

  private showContent: boolean;
  private showLoginControls: boolean;

  constructor( private auth: AuthService ) {
    this.showContent = false;
  }

  ngOnInit() {
    this.userDataCheck();
  }

  private userDataCheck(): void {

    this.auth.authState.subscribe(data => {

      if (typeof data === 'object' && data !== null) {
        this.showContent = true;
        this.showLoginControls = true;
      } else {
        this.showLoginControls = false;
        this.showContent = true;
      }
    });
  }

}
