import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  @Output() searchInput = new EventEmitter<string>();

  handleInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchInput.emit(value.trim()); 
  }

}
