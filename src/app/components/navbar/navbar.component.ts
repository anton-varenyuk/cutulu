import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { SpeechService } from '../../services/speech.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private loggedIn: boolean;
  private showContent: boolean;
  private subscription: Subscription;

  constructor(private auth: AuthService,
              private afAuth: AngularFireAuth,
              private speech: SpeechService) {

    this.showContent = false;
  }

  ngOnInit() {
    this.subscription = this.auth.checkUserData().subscribe(data => {
      this.loggedIn = !!data;
      this.showContent = true;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private logOut(): void {
    this.auth.logOut();
  }

  private voiceResponse() {
    this.speech.speak('CÜtÜlÜ!');
  }

}
