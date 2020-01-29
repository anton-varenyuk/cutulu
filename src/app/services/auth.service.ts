import { Injectable } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
// import { auth } from 'firebase/app';
//
// import * as firebase from 'firebase';
// import AuthCredential = firebase.auth.AuthCredential;

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public uid: string;
  public authorized: boolean;
  public userData: any;
  // public creds: AuthCredential;
  private userPassword: string;

  constructor(public afAuth: AngularFireAuth,
              private db: AngularFirestore,
              private storage: StorageService,
              private router: Router) {
    this.afAuth.user.subscribe(data => {
      console.log('User: ', data);
      this.userData = data;
      this.authorized = !!data;
    });

  }

  public signUp( email, password ): Promise<object> {
    const user = { email, password };
    this.userPassword = user.password;

    // this.creds = firebase.auth.EmailAuthProvider.credential(
    //   user.email,
    //   user.password
    // );
    // console.log('creds creds:', this.creds);

    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(data => {
        this.db.collection('users').doc(data.user.uid).set(user).finally(() => {
          this.storage.set('uid', data.user.uid);
          resolve();
        });
      }, error => reject(error));
    });
  }

  public getUid(): string {
    return this.storage.get('uid');
  }

  public signIn(email, password): Promise<object> {
    const user = { email, password };
    // this.userPassword = user.password;
    //
    // this.creds = firebase.auth.EmailAuthProvider.credential(
    //   user.email,
    //   user.password
    // );
    // console.log('creds creds:', this.creds);

    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then(data => {
        this.storage.set('uid', data.user.uid);
        resolve();
      }, error => reject(error));
    });
  }

  public checkToken(): boolean {
    return this.authorized;
  }

  public getUserInfo(): object {
    return this.userData;
  }

  public logOut(): void {
    this.afAuth.auth.signOut();
    this.storage.set('uid', '');
    this.router.navigate(['welcome']);
  }

  // public reAuth(creds): void {
  //   this.userData.reauthenticateWithCredential(creds).then(data => {
  //     console.log(data);
  //   });
  // }
  //
  // public getCreds(): object {
  //   return this.creds;
  // }
}
