import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task-page',
  templateUrl: './create-task-page.component.html',
  styleUrls: ['./create-task-page.component.scss']
})
export class CreateTaskPageComponent implements OnInit {
  public name: string = '';
  public desc: string = '';

  constructor(private taskListService: TaskService,
              private router: Router) { }

  ngOnInit() {
  }
  validateAndAdd(): void {
    if (this.name.length > 0 && this.desc.length > 0) {
      this.addTask();
      this.router.navigate(['list']);
    } else {
      alert('validation error');
    }
  }
  addTask(): void {
    this.taskListService.addTask(this.name, this.desc);
    this.name = '';
    this.desc = '';
  }
}
