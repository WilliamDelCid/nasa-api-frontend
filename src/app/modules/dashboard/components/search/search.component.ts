import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() placeholder = 'Buscar...';
  @Output() searchTextChanged = new EventEmitter<string>();


  ngOnInit(): void { }

  handleSearch(value: string): void {
    this.searchTextChanged.emit(value);
  }
}
