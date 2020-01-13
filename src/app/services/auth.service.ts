import { Injectable } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public uid: string;

  constructor(public afAuth: AngularFireAuth,
              private db: AngularFirestore,
              private storage: StorageService,
              private router: Router) { }


  public signUp( email, password ): void {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(data => {
      const user = { email, password };

      this.db.collection('users').doc(data.user.uid).set(user).finally(() => {
        this.makeTokenFrom(email);
        this.storage.set('uid', data.user.uid);
      });
    });
  }

  public getUid(): string {
    return this.storage.get('uid');
  }

  public signIn(email, password): void {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(data => {
      console.log(data);
    });
  }

  private makeTokenFrom(arg: string): void {
    this.storage.set('token', window.btoa(arg + String(Date.now())));
  }

  public checkToken(): boolean {
    if (!this.storage.get('token')) {
      return false;
    }
    return this.storage.get('token').length > 0;
  }

  public logOut(): void {
    this.afAuth.auth.signOut();
    this.storage.set('token', '');
    this.storage.set('uid', '');
    this.router.navigate(['welcome']);
  }
}
