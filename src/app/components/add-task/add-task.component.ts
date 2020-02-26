import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';


@Component({
  selector: 'add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})

export class AddTaskComponent implements OnInit {
  public name: string;

  constructor( private taskListService: TaskService ) {}

  ngOnInit() { }

  private quickAddTask(): void {
    if (this.validateInput()) {
      this.taskListService.addTask(this.name, '');
      this.name = '';
    } else {
      alert ('validation error');
    }
  }
  private validateInput(): boolean {
    if (this.name === undefined || this.name.length === 0) {
      return false;
    } else {
      return true;
    }
  }
}
