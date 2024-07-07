import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Card } from 'src/app/shared/interfaces/INasa.Interface';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  @Input() cards: Card[] = [];
  @Input() showFilter: boolean = false;
  @Input() showInput: boolean = false;
  @Input() showSort: boolean = true;
  @Input() favoriteIcon: boolean = true;

  @Output() filterChanged = new EventEmitter<{ type: string, checked: boolean }>();
  @Output() searchTextChanged = new EventEmitter<string>();
  @Output() sortChanged = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }

  onFilterChanged(filter: { type: string, checked: boolean }) {
    this.filterChanged.emit(filter);
  }

  onSearchTextChanged(searchText: string): void {
    this.searchTextChanged.emit(searchText);
  }

  onSortChanged(sortOption:string): void {
   this.sortChanged.emit(sortOption);
  }

  

}
