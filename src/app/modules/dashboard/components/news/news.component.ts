import { Component, Input, OnInit } from '@angular/core';
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
  constructor() { }

  ngOnInit(): void {
  }


  onFilterChanged(filter: { type: string, checked: boolean }) {
    console.log(filter);
    
    if (filter.checked) {
    } else {
    }
  }

  onSearchTextChanged(searchText: string): void {
    console.log(searchText);
  }


}
