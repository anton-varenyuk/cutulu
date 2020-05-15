import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})

export class WelcomePageComponent implements OnInit, OnDestroy {

  private showContent: boolean;
  private showLoginControls: boolean;
  private spinner: boolean;
  private subscription: Subscription;

  constructor( private auth: AuthService ) {
    this.spinner = true;
    this.showLoginControls = true;
  }

  ngOnInit() {
    this.subscription = this.auth.checkUserData().subscribe(data => {
      this.showLoginControls = !!data;
      this.showContent = true;
      this.spinner = false;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
