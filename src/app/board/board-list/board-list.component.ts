import { Component, OnInit } from '@angular/core';
import { ReviewList } from 'src/app/vo/review-list';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {
  reviews : ReviewList = new ReviewList();

  lists:any[] = [];

  //번호, 구, 역, 식당이름, 제목, 좋아요, 조회수, 작성시간
  constructor() { 
    for(var i =1; i<=10; i++){
      var list = {no : i, gu: 'jiyeokgu'+i, station : 'station'+i, title : 'title'+i, count: i};
      this.lists.push(list);
    }
  }

  ngOnInit() {
  }

}
