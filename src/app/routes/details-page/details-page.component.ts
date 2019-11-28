import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TaskService} from '../../services/task.service';
import { ITask } from '../../interfaces/ITask';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-item-detail',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {
  private task: ITask;
  private id: number;
  private editDetailsEnabled: boolean = false;
  private editNameEnabled: boolean = false;

  constructor(private taskService: TaskService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.task = this.taskService.getTask(this.id);
    console.log(this.task);
  }
  private editDetails(): void {
    this.editDetailsEnabled = true;
  }
  private saveDetails(): void {
    this.editDetailsEnabled = false;
    this.taskService.saveListState();
  }
  private editName(): void {
    this.editNameEnabled = true;
  }
  private saveName(): void {
    this.editNameEnabled = false;
    this.taskService.saveListState();
  }
  private removeTask(): void {
    this.taskService.taskList.find((e, index) => {
      if (e.id === this.id) {
        this.taskService.removeTask(index);
        this.router.navigate(['/list']);
      }
    });
  }
}
