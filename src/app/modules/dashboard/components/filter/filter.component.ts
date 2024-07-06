import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  @Output() filterChanged = new EventEmitter<{ type: string, checked: boolean }>();

  onCheckboxChange(type: string, event: any) {
    this.filterChanged.emit({ type, checked: event.target.checked });
    
  }
}
