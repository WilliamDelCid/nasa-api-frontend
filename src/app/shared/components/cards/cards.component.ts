import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../interfaces/INasa.Interface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() cards: Card[] = [];
  @Input() favoriteShow: boolean  = true;
  
  
  constructor() { }

  ngOnInit(): void {
    
  }

  addToMyWishList(card: Card) {
    card.favorite = !card.favorite;
    card.iconFavorite = card.favorite ? 'assets/images/heart-like-filled.svg' : 'assets/images/heart-like-outline.svg';
  }

}
