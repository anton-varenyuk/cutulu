import { Injectable } from '@angular/core';
import { ITask } from '../interfaces/ITask';
import { StorageService } from './storage.service';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private uid: string;
  public task: ITask;

  constructor( private storage: StorageService,
               private auth: AuthService,
               public db: AngularFirestore ) {

    this.uid = this.auth.getUid();
  }

  public getTasks(): Observable<any> {
     return this.db.collection('users').doc(this.uid).collection('tasks').snapshotChanges().pipe(
       map(tasks => tasks.map(a => {
         const data = a.payload.doc.data() as ITask;
         data.id = a.payload.doc.id;
         return {...data};
       }))
     );
  }

  public getTask(taskId?): AngularFirestoreDocument {
    return this.db.collection('users').doc(this.uid).collection('tasks').doc(taskId);
  }

  public addTask(name: string, details: string): void {
    this.db.collection('users').doc(this.uid).collection('tasks').add({name: name, details: details}).then(data => {
      console.log('Added task: ', data);
    });
  }

  public deleteTask(id: string): void {
    this.db.collection('users').doc(this.uid).collection('tasks').doc(id).delete();
  }

  public overrideTask(id, data: ITask): void {
    this.db.collection('users').doc(this.uid).collection('tasks').doc(id).set(data, { merge: true });
  }
}
