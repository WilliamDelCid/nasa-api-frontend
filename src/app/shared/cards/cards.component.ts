// cards.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/shared/interfaces/INasa.Interface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() cards: Card[] = [];

  constructor() { }

  ngOnInit(): void {
    
  }
}
