import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';


@Component({
  selector: 'app-add',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})

export class AddTaskComponent implements OnInit {
  public name: string;

  constructor( private taskListService: TaskService ) {}

  ngOnInit() { }

  quickAddTask() {
    this.taskListService.addTask(this.name, '');
    this.name = '';
  }
}
