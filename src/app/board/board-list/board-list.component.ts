import { Component, OnInit } from '@angular/core';
import { ReviewList } from 'src/app/vo/review-list';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {
  reviews : ReviewList = new ReviewList();

  constructor() { }

  ngOnInit() {
  }

}
