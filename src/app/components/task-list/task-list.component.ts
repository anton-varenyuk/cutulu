import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../interfaces/ITask';
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
  public remove(index: number): void {
    this.taskListService.removeTask(index);
  }
}
