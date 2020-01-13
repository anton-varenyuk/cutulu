import { Component, OnInit} from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../interfaces/ITask';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})

export class TaskListComponent implements OnInit {

  public taskList: Array<ITask>;

  constructor(private taskService: TaskService,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.getTaskList();
  }

  private deleteTask(id: string): void {
    this.taskService.deleteTask(id);
  }

  private getTaskList(): void {
      this.taskService.getTasks().subscribe((data: Array<ITask>) => {
      this.taskList = data;
      console.log('Tasklist: ', data);
    });
  }
}
