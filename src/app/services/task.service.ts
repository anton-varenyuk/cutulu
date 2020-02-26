import { Injectable } from '@angular/core';
import { ITask } from '../interfaces/ITask';
import { StorageService } from './storage.service';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private uid: string;
  public task: ITask;
  // public searchResults: Array<ITask>;
  public taskList: Array<ITask>;

  constructor( private storage: StorageService,
               private auth: AuthService,
               public db: AngularFirestore ) {

    this.uid = this.auth.getUid();
    this.getUnfilteredTasks();
  }

  public getAllTasks(): Observable<any> {
     return this.db.collection('users').doc(this.uid).collection('tasks').snapshotChanges().pipe(
       map(tasks => tasks.map(a => {
         const data = a.payload.doc.data() as ITask;
         data.id = a.payload.doc.id;
         return {...data};
       }))
     );
  }

  public getUnfilteredTasks() {
    this.getAllTasks().subscribe((data: Array<ITask>) => {
      this.taskList = data;
      console.log(' unfiltered Tasklist: ', this.taskList);
    });
  }

  public searchTasks(query: string): Array<ITask> {
    console.log('task service query: ', query);
    const searchResults = [];

    this.db.collection('users').doc(this.uid)
      .collection('tasks', ref => ref.where('name', '==', query))
      .get()
      .subscribe(data => {
        data.forEach(doc => {
          const result = doc.data();
          result.id = doc.id;
          searchResults.push(result);
        });
      });

    return searchResults;
  }

  public getTask(taskId?): AngularFirestoreDocument {
    return this.db.collection('users').doc(this.uid).collection('tasks').doc(taskId);
  }

  public addTask(name: string, details: string): void {
    this.db.collection('users').doc(this.uid).collection('tasks').add({name: name, details: details});
  }

  public deleteTask(id: string): void {
    this.db.collection('users').doc(this.uid).collection('tasks').doc(id).delete();
  }

  public overrideTask(id, data: ITask): void {
    this.db.collection('users').doc(this.uid).collection('tasks').doc(id).set(data, { merge: true });
  }
}
