import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent {
  public name = '';
  public desc = '';

  constructor(private taskListService: TaskService,
              private router: Router) { }

  validateAndAdd(): void {
      this.addTask();
      this.router.navigate(['list']);
  }

  addTask(): void {
    this.taskListService.addTask(this.name, this.desc);
    this.name = '';
    this.desc = '';
  }

  private validateBtn(value): boolean {
    return value === 0;
  }
}
