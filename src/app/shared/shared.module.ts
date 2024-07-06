import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards/cards.component';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';



@NgModule({
  declarations: [
    CardsComponent,
    InputComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CardsComponent,
    InputComponent,
    ButtonComponent
  ]
})
export class SharedModule { }
