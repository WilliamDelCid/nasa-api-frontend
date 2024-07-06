import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent {
  @Output() sortChanged = new EventEmitter<string>();

  sortByOption: string = ''; 

  constructor() {}

  sortBy(option:string): void {
    this.sortByOption = option;
    this.sortChanged.emit(option); 
  }
}
