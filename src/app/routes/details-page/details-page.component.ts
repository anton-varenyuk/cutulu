import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { ITask } from '../../interfaces/ITask';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-item-detail',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {
  private task: ITask;
  private id: string;
  private detailsEditable: boolean = false;
  private nameEditable: boolean = false;

  constructor(private taskService: TaskService,
              private route: ActivatedRoute,
              private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getTask(this.id);
  }

  private getTask(id: string): void {
    this.taskService.getTask(id).valueChanges().subscribe((data: ITask) => {
      this.task = data;
    });
  }
  private editDetails(): void {
    console.log(this.task);
    this.detailsEditable = true;
  }
  private saveDetails(): void {
    this.detailsEditable = false;
    this.taskService.overrideTask(this.id, this.task);
  }
  private editName(): void {
    this.nameEditable = true;
  }
  private saveName(): void {
    this.nameEditable = false;
    this.taskService.overrideTask(this.id, this.task);
  }
  public removeTask(id: string): void {
    this.taskService.deleteTask(id);
    this.router.navigate(['list']);
  }
}
