import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { SpeechService } from '../../services/speech.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService,
              private afAuth: AngularFireAuth,
              private speech: SpeechService) { }

  ngOnInit() {
    console.log('token is: ', this.checkToken());
  }

  private checkToken(): boolean {
    return this.auth.checkToken();
  }
  private logOut(): void {
    this.auth.logOut();
  }

  private cutulu() {
    this.speech.speak();
  }

}
