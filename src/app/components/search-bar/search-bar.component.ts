import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<boolean>();

  private query: string;

  private searchOccured: boolean;

  constructor() {
    this.searchOccured = false;
  }

  ngOnInit() {
  }

  private searchTasks(value): void {
    this.search.emit(value);
    this.searchOccured = true;
  }

  private cancelSearch() {
    this.cancel.emit();
    this.query = '';
    this.searchOccured = false;
  }
}
