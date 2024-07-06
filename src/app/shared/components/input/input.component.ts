import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Output() searchInput = new EventEmitter<string>();
  searchText: string = '';

  handleInput(event: any): void {
    this.searchText = event.target.value;
    this.searchInput.emit(this.searchText);
  }

  clearInput(): void {
    this.searchText = '';
    const inputElement = document.querySelector('.form-control') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
    this.searchInput.emit(this.searchText);
  }

  hasText(): boolean {
    return this.searchText.length > 0;
  }
}
