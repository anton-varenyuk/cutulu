import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SpeechService } from '../../services/speech.service';
import { IUserProfile } from '../../interfaces/IUserProfile';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {

  private userInfoEditable: boolean;
  private userPasswordEditable: boolean;
  private passwordUpdatedRecently: boolean;
  private userData: any;
  private newPassword: string;
  private oldPassword: string;
  private errorMessage: string;
  private userProfile: IUserProfile;

  constructor(private auth: AuthService,
              private speech: SpeechService) {
    this.userInfoEditable = false;
    this.userPasswordEditable = false;
    this.passwordUpdatedRecently = false;
    this.errorMessage = '';

    this.userData = this.auth.getUserInfo();
    this.userProfile = {
      displayName: this.userData.displayName
    };

    console.log('myacc user:', this.userData);
  }

  ngOnInit() {
  }

  private editProfile(): void {
    this.userInfoEditable = true;
  }

  private updatePassword(oldPassword: string, newPassword: string): void {
    this.auth.updatePassword(oldPassword, newPassword).then( () => {
      this.passwordUpdatedRecently = true;
      this.cleanForm();
    }).catch(error => {
      this.errorMessage = error.message;
      this.speech.speak('aa-a-a-a-a-a-a-aa-a-a-a-a-aa-a-a-aaaaa! Erro-o-or' +
        ' suuukaaa-aa-aa-a-a-a-a-a-!');
    });
  }

  private cleanForm(): void {
    this.errorMessage = '';
    this.newPassword = '';
    this.oldPassword = '';

    if (this.passwordUpdatedRecently) {
      setTimeout( () => {
        this.passwordUpdatedRecently = false;
      }, 5000);
    }
  }

  private checkError(): void {
    if (this.errorMessage.length > 0) {
      this.cleanForm();
    }
  }

  private updateProfile(): void {
    this.userInfoEditable = false;
    this.userData.updateProfile({ displayName: this.userProfile.displayName });
  }

}
