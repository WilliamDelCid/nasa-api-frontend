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

  @Output() filterChanged = new EventEmitter<{ type: string, checked: boolean }>();
  @Output() searchTextChanged = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }

  onFilterChanged(filter: { type: string, checked: boolean }) {
    console.log(filter);
    this.filterChanged.emit(filter);
  }

  onSearchTextChanged(searchText: string): void {
    console.log(searchText);
    this.searchTextChanged.emit(searchText);
  }

}
