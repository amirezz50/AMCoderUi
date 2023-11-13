import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  starWidth: number = 0;
  starRating1 = 0;
  starRating2 = 0;
  starRating3 = 0;

  rateProduct(rateValue: number) {
    this.starWidth = rateValue * 75 / 5;
  }
}
