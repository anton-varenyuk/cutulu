import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../interfaces/ITask';


@Component({
  selector: 'app-list-item-detail',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {
  pageTitle = 'Task details';
  task: ITask;

  constructor( private taskService: TaskService,
               private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.task = this.taskService.getTask(id);
    console.log(this.task);
  }
}
