import { Component, OnInit } from '@angular/core';
import { TaskService} from '../../services/task.service';
import {ITask} from '../../interfaces/ITask';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  private taskList: Array<ITask>;
  private spinner: boolean = true;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getAllTasks();
  }

  private getAllTasks(): void {
    this.taskService.getAllTasks().subscribe(data => {
      this.taskList = data;
      this.spinner = false;
    });
  }

  private getFilteredTasks(query: string): void {
    this.taskList = this.taskService.searchTasks(query);
  }
}
