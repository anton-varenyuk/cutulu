import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {SpeechService} from '../../services/speech.service';
import {IUserProfile} from '../../interfaces/IUserProfile';
import MyAccPageSettings, {IEmailFormValue, IPassFormValue} from '../../classes/myAccPageSettings';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Utils from '../../classes/utils';

@Component({
  selector: 'app-myaccount',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})

export class MyAccountComponent implements OnInit {

  private userData: any;
  private userProfile: IUserProfile;
  private settings: MyAccPageSettings;
  private emailPattern: string = new Utils().emailPattern;

  private emailChangeForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newEmail: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)])
  });

  private passwordChangeForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required])
  });


  constructor(private auth: AuthService,
              private speech: SpeechService) {

    this.settings = new MyAccPageSettings();
    this.userData = this.auth.getUserInfo();
    this.userProfile = {
      displayName: this.userData.displayName
    };
  }

  ngOnInit() {
    console.log(this.emailPattern);
  }

  private getFormValue(formName: string): object {
    return this[formName].value;
  }

  private editToggle(property: string): void {
    this.settings[property] = !this.settings[property];
  }

  private updatePassword(oldPassword: string, newPassword: string): void {
    const formValue = this.getFormValue('passwordChangeForm') as IPassFormValue;

    this.auth.updatePassword(formValue.oldPassword, formValue.newPassword).then(() => {
      this.settings.passwordIsUpdatedRecently = true;
      this.passwordChangeForm.reset();
      this.editToggle('passwordUpdateFieldIsEditable');
      this.hideMsg('passwordIsUpdatedRecently');
    }).catch(error => {
      this.settings.errorMessage = error.message;
    });
  }

  private updateEmail(oldPassword: string, newEmail: string): void {
    const formValue = this.getFormValue('emailChangeForm') as IEmailFormValue;

    this.auth.updateEmail(formValue.oldPassword, formValue.newEmail).then(() => {
      this.settings.emailFieldIsUpdatedRecently = true;
      this.emailChangeForm.reset();
      this.editToggle('emailUpdateFieldIsEditable');
      this.hideMsg('emailFieldIsUpdatedRecently');
    }).catch(error => {
      this.settings.errorMessage = error.message;
      console.log(error);
    });
  }

  private hideMsg(field: string) {
    if (this.settings[field]) {
      setTimeout(() => {
        this.settings[field] = false;
      }, 3000);
    }
  }

  private checkForErrors(formName: string): void {
    if (this.settings.errorMessage.length > 0) {
      this.settings.errorMessage = '';
      this[formName].reset();
    }
  }

  private updateProfile(): void {
    this.settings.userInfoIsEditable = false;
    this.userData.updateProfile({displayName: this.userProfile.displayName});
  }

}
