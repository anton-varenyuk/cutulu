import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IUserProfile } from '../../interfaces/IUserProfile';
// import AuthCredential = firebase.auth.AuthCredential;

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {

  private userInfoEditable: boolean;
  private userPasswordEditable: boolean;

  private userData: any;
  private userPassword: string;
  // private creds: any;

  private userProfile: IUserProfile;

  constructor(private auth: AuthService) {
    this.userInfoEditable = false;
    this.userPasswordEditable = false;

    this.userData = this.auth.getUserInfo();
    // this.creds    = this.getCreds();
    this.userProfile = {
      displayName: this.userData.displayName
    };

    console.log('myacc user:', this.userData);
    // console.log('myacc creds: ', this.creds);
  }

  ngOnInit() {
  }

  private editProfile(): void {
    this.userInfoEditable = true;
  }

  // private updatePassword(): void {
  //   this.reAuth();
  //   this.userData.updatePassword(this.userPassword);
  // }

  private updateProfile(): void {
    this.userInfoEditable = false;
    this.userData.updateProfile({ displayName: this.userProfile.displayName });
  }

  // private reAuth(): any {
  //   this.auth.reAuth(this.creds);
  // }
  //
  // getCreds(): object {
  //   return this.auth.getCreds();
  // }
}
