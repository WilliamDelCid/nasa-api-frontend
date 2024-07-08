import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardsComponent } from './components/cards/cards.component';
import { InputComponent } from './components/input/input.component';
import { SortComponent } from './components/sort/sort.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    CardsComponent,
    InputComponent,
    SortComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,NgbModalModule
  ],
  exports:[
    CardsComponent,
    InputComponent,
    SortComponent,LoadingComponent
  ]
})
export class SharedModule { }
