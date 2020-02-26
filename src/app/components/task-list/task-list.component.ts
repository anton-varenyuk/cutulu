import {Component, Input, OnInit} from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../interfaces/ITask';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})

export class TaskListComponent implements OnInit {
  @Input() taskListData: Array<ITask>;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  private deleteTask(id: string): void {
    this.taskService.deleteTask(id);
  }

}
