import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { ITask } from '../../ITask';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  taskList: Array<ITask> = [];

  constructor(private taskListService: TaskService,
              private router: Router ) { }

  ngOnInit() {
    this.taskList = this.taskListService.getTaskList();
  }
  public remove(item: ITask): void {
    this.taskListService.removeTask(item);
  }
  // public navigate(item: ITask) {
  //   this.router.navigate([{ outlets: { details: ['list', item.id]} }]);
  // }
}
