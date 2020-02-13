import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SpeechService } from '../../services/speech.service';
import { IUserProfile } from '../../interfaces/IUserProfile';
import { IMyAccOptions } from '../../interfaces/IMyAccOptions';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {

  private userData: any;
  private newPasswordFieldValue: string;
  private oldPasswordInPassForm: string;
  private oldPasswordInEmailForm: string;
  private errorMessageInPassForm: string;
  private errorMessageInEmailForm: string;
  private userProfile: IUserProfile;
  private settings: IMyAccOptions;
  private newEmailInEmailForm: string;

  constructor(private auth: AuthService,
              private speech: SpeechService) {

    this.settings = {
      userInfoEditable: false,
      userPasswordEditable: false,
      passwordIsUpdatedRecently: false,
      emailUpdatedRecently: false,
      userEmailEditable: false
    };

    this.errorMessageInPassForm = '';
    this.errorMessageInEmailForm = '';
    this.userData = this.auth.getUserInfo();
    this.userProfile = {
      displayName: this.userData.displayName
    };

    console.log('myacc user:', this.userData);
  }

  ngOnInit() {
  }

  private editEnable(property: string): void {
    this.settings[property] = true;
  }

  private updatePassword(oldPassword: string, newPassword: string): void {
    this.auth.updatePassword(oldPassword, newPassword).then( () => {
      this.settings.passwordIsUpdatedRecently = true;
      this.cleanPassForm();
    }).catch(error => {
      this.errorMessageInPassForm = error.message;
    });
  }

  private updateEmail(oldPassword: string, newEmail: string): void {
    this.auth.updateEmail(oldPassword, newEmail).then( () => {
      this.settings.emailUpdatedRecently = true;
    }).catch(error => {
      this.errorMessageInEmailForm = error.message;
      console.log(error);
    });
  }

  private cleanPassForm(): void {
    this.errorMessageInPassForm = '';
    this.newPasswordFieldValue = '';
    this.oldPasswordInPassForm = '';

    if (this.settings.passwordIsUpdatedRecently) {
      setTimeout( () => {
        this.settings.passwordIsUpdatedRecently = false;
      }, 3000);
    }
  }

  private cleanEmailForm(): void {
    this.errorMessageInEmailForm = '';
    this.newEmailInEmailForm = '';
    this.oldPasswordInEmailForm = '';

    if (this.settings.emailUpdatedRecently) {
      setTimeout( () => {
        this.settings.emailUpdatedRecently = false;
      }, 3000);
    }
  }

  private checkForErrors(where: string): void {
    if (where === 'passwordChangeForm' && this.errorMessageInPassForm.length > 0) {
      this.cleanPassForm();
    }
    if (where === 'emailChangeForm' && this.errorMessageInEmailForm.length > 0) {
      this.cleanEmailForm();
    }
  }

  private updateProfile(): void {
    this.settings.userInfoEditable = false;
    this.userData.updateProfile({ displayName: this.userProfile.displayName });
  }

}
