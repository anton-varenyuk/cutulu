import { Injectable } from '@angular/core';
import { ITask } from './ITask';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public taskList: Array<ITask>;
  private storage = window.localStorage;
  constructor() {
    if (this.storage.getItem('taskList')) {
      this.taskList = JSON.parse(this.storage.getItem('taskList'));
      this.saveListState();
    } else {
      this.taskList = [{
        name: 'Example task. Feel free to delete',
        id: 0,
        details: 'Nothing special, just ignore this task. You can do it later or never.'
      }];
      this.saveListState();
    }
  }
  public getTaskList() {
    return this.taskList;
  }
  public getTask(id: number): ITask {
    return(this.taskList.find(e => e.id === id));
  }
  public addTask(n: string, d: string): void {
    this.taskList.push({name: n, id: Date.now(), details: d});
    this.saveListState();
  }
  public removeTask(model: ITask): void {
    this.taskList.splice(this.taskList.indexOf(model), 1);
    this.saveListState();
  }
  private saveListState(): void {
    this.storage.setItem('taskList', JSON.stringify(this.taskList));
  }
}
