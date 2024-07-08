import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardsComponent } from './components/cards/cards.component';
import { InputComponent } from './components/input/input.component';
import { SortComponent } from './components/sort/sort.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

@NgModule({
  declarations: [
    CardsComponent,
    InputComponent,
    SortComponent,
    LoadingComponent,
    ErrorPageComponent,
  ],
  imports: [
    CommonModule,NgbModalModule
  ],
  exports:[
    CardsComponent,
    InputComponent,
    SortComponent,LoadingComponent,ErrorPageComponent
  ]
})
export class SharedModule { }
