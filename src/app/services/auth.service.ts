import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public isAuthorized: boolean;
  public userData: any;
  private userPassword: string;
  private user: User;

  constructor(public afAuth: AngularFireAuth,
              private db: AngularFirestore,
              private storage: StorageService,
              private router: Router) {
    this.afAuth.user.subscribe(data => {
      console.log('User: ', data);
      this.userData = data;
      this.isAuthorized = !!data;
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

    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then(data => {
        this.storage.set('uid', data.user.uid);
        resolve();
      }, error => reject(error));
    });
  }

  public checkToken(): boolean {
    return this.isAuthorized;
  }

  public getUserInfo(): object {
    return this.userData;
  }

  public logOut(): void {
    this.afAuth.auth.signOut();
    this.storage.set('uid', '');
    this.router.navigate(['welcome']);
  }

  public updatePassword(oldPassword: string, newPassword: string): Promise<void> {

    return new Promise((resolve, reject) => {
      this.authWithCreds(this.userData.email, oldPassword).then( (user) => {
        firebase.auth().currentUser.updatePassword(newPassword);
        this.db.collection('users').doc(this.getUid()).set({password: newPassword});
        resolve();
      }, error => {
        reject(error);
      });
    });
  }

  private authWithCreds(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  public updateEmail(oldPassword: string , newEmail: string): Promise<void> {

    return new Promise((resolve, reject) => {
      this.authWithCreds(this.userData.email, oldPassword).then( (user) => {
        firebase.auth().currentUser.updateEmail(newEmail);
        resolve();
      }, error => {
        reject(error);
      });
    });
  }

}
