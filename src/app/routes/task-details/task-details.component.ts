import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../task.service';
import {ITask} from '../../ITask';


@Component({
  selector: 'app-list-item-detail',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  pageTitle = 'Task details';
  task: ITask;

  constructor( private taskService: TaskService,
               private route: ActivatedRoute) {
    // console.log(this.route.snapshot);
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.task = this.taskService.getTask(id);
    console.log(this.task);
  }
}
