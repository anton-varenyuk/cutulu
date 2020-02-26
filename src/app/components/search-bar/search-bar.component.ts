import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() search = new EventEmitter<string>();

  private query: string;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  private searchTasks(value): void {
  this.search.emit(value);
  }

}
