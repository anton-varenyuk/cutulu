import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import {error} from "util";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public uid: string;
  public authorized: boolean;
  public userData: any;
  private userPassword: string;
  private user: object;

  constructor(public afAuth: AngularFireAuth,
              private db: AngularFirestore,
              private storage: StorageService,
              private router: Router) {
    this.afAuth.user.subscribe(data => {
      console.log('User: ', data);
      this.userData = data;
      this.authorized = !!data;
    });

    console.log(this.user);
  }

  public signUp( email, password ): Promise<object> {
    const user = { email, password };
    this.userPassword = user.password;

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
    // const user = { email, password };

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

  // public updatePassword(oldPassword: string, newPassword: string): void {
  //   this.authWithCreds(this.userData.email, oldPassword).then( (user) => {
  //     firebase.auth().currentUser.updatePassword(newPassword);
  //   });
  // }


  public updatePassword(oldPassword: string, newPassword: string): Promise<void> {

    return new Promise((resolve, reject) => {
      this.authWithCreds(this.userData.email, oldPassword).then( (user) => {
        firebase.auth().currentUser.updatePassword(newPassword);
        console.log('update successful');
        resolve();
      }, error => {
        console.log('update failed', error.message);
        reject(error);
      });
    });

    // this.authWithCreds(this.userData.email, oldPassword).then( (user) => {
    //   firebase.auth().currentUser.updatePassword(newPassword).then( () => {
    //     return new Promise((resolve, reject) => {
    //       console.log('change successful');
    //       resolve();
    //     });
    //   }).catch(error => {
    //     console.log(error);
    //   });
    // });
  }

  private authWithCreds(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
}
