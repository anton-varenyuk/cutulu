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
  private passwordIsUpdatedRecently: boolean;
  private userData: any;
  private newPasswordFieldValue: string;
  private oldPasswordFieldValue: string;
  private errorMessage: string;
  private userProfile: IUserProfile;


  private newEmail: string;

  constructor(private auth: AuthService,
              private speech: SpeechService) {
    this.userInfoEditable = false;
    this.userPasswordEditable = false;
    this.passwordIsUpdatedRecently = false;
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
      this.passwordIsUpdatedRecently = true;
      this.cleanForm();
    }).catch(error => {
      this.errorMessage = error.message;
      this.speech.speak('aa-a-a-a-a-a-a-aa-a-a-a-a-aa! Erro-o-or' +
        ' suuukaaa-aa-aa-a-a-a-a-a!');
    });
  }

  private cleanForm(): void {
    this.errorMessage = '';
    this.newPasswordFieldValue = '';
    this.oldPasswordFieldValue = '';

    if (this.passwordIsUpdatedRecently) {
      setTimeout( () => {
        this.passwordIsUpdatedRecently = false;
      }, 3000);
    }
  }

  private checkForError(): void {
    if (this.errorMessage.length > 0) {
      this.cleanForm();
    }
  }

  private updateEmail(): void {
    this.auth.updateEmail(this.oldPasswordFieldValue, this.newEmail);
  }

  private updateProfile(): void {
    this.userInfoEditable = false;
    this.userData.updateProfile({ displayName: this.userProfile.displayName });
  }

}
