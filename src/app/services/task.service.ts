import { Injectable } from '@angular/core';
import { ITask } from '../interfaces/ITask';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public taskList: Array<ITask>;

  constructor(private storageService: StorageService) {
    if (this.storageService.get('taskList')) {
      this.taskList = JSON.parse(this.storageService.get('taskList'));
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
  public removeTask(index: number): void {
    this.taskList.splice(index, 1);
    this.saveListState();
  }
  private saveListState(): void {
    this.storageService.set('taskList', JSON.stringify(this.taskList));
  }
}
