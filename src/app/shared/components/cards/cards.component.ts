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
    const loggedInUser = sessionStorage.getItem('loggedInUser');

    if (!loggedInUser) {
        return;
    }

    const parsedUser = JSON.parse(loggedInUser);
    const userEmail = parsedUser.email;

    let userWishList;

    try {
        const localStorageItem = localStorage.getItem(userEmail);
        userWishList = localStorageItem ? JSON.parse(localStorageItem) : [];
    } catch (e) {
        userWishList = [];
    }

    const cardIndex = userWishList.findIndex((c: Card) => c.mediaUrl === card.mediaUrl);

    if (cardIndex > -1) {
        userWishList[cardIndex].favorite = !userWishList[cardIndex].favorite;
        userWishList[cardIndex].iconFavorite = userWishList[cardIndex].favorite
            ? 'assets/images/heart-like-filled.svg'
            : 'assets/images/heart-like-outline.svg';

        if (!userWishList[cardIndex].favorite) {
            userWishList.splice(cardIndex, 1);
        }
    } else {
        card.favorite = true;
        card.iconFavorite = 'assets/images/heart-like-filled.svg';
        userWishList.push(card);
    }

    localStorage.setItem(userEmail, JSON.stringify(userWishList));

}


}
