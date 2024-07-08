import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../interfaces/INasa.Interface';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() cards: Card[] = [];
  @Input() favoriteShow: boolean  = true;
  modalRef: NgbModalRef | undefined;
  card:Card | undefined;
  constructor(private modalService: NgbModal) {}

  openModal(content: any, card: Card) {
    this.modalRef = this.modalService.open(content, { size: 'lg' });
    this.card = card;
  }
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
            ? 'assets/images/heart-like-outline.svg'
            : 'assets/images/heart-like-filled.svg';

        if (!userWishList[cardIndex].favorite) {
            userWishList.splice(cardIndex, 1);
        }
        card.favorite = false;
        card.iconFavorite = 'assets/images/heart-like-outline.svg';
    } else {
        card.favorite = true;
        card.iconFavorite = 'assets/images/heart-like-filled.svg';
        card.description = card.description;
        card.info = card.info;
        userWishList.push(card);
    }

    localStorage.setItem(userEmail, JSON.stringify(userWishList));

}


}
