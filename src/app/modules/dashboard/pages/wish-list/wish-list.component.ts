import { Component, OnInit } from "@angular/core";
import { Card } from "src/app/shared/interfaces/INasa.Interface";

@Component({
  selector: "app-wish-list",
  templateUrl: "./wish-list.component.html",
  styleUrls: ["./wish-list.component.css"],
})
export class WishListComponent implements OnInit {
  cards: Card[] = [];
  constructor() {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.cards = [];

    const loggedInUser = sessionStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      return;
    }

    const parsedUser = JSON.parse(loggedInUser);
    const userEmail = parsedUser.email;
    let userWishList;

    try {
      userWishList =
        JSON.parse(localStorage.getItem(userEmail) as string) || [];
    } catch (e) {
      userWishList = [];
    }

    this.cards = userWishList;
  }
}
