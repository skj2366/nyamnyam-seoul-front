import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantList } from 'src/app/vo/restaurant-list';
import { LikeInfo } from 'src/app/vo/like-info';
import { ReviewInfo } from 'src/app/vo/review-info';
import { CommentList } from 'src/app/vo/comment-list';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {
  rel : RestaurantList;
  
  lists: any[] = [];

  likeLists : LikeInfo[];
  reviewLists : ReviewInfo[];
  commnetLists : CommentList[];

  constructor(private _router: Router, private _cs : CommonService, private route : ActivatedRoute) { 
    for(var i =1; i<=10; i++){
      var list = {no : i, gu: 'jiyeokgu'+i, station : 'station'+i, title : 'title'+i, count: i};
      this.lists.push(list);
    }
  }  

  ngOnInit() {
    //var cuiNum = this.route.snapshot.paramMap.get('relNum');
    var cuiNum = 1;
    //this.getLikes(cuiNum);
    //this.getReviews(cuiNum);
    //this.getComments(cuiNum);
  }


  goUserDetail() {
    this._router.navigateByUrl('/userDetail');
  }

  getLikes(cuiNum) {
    var url = `/lii/${cuiNum}`;
    this._cs.get(url).subscribe(
      res => {
        this.likeLists = <LikeInfo[]>res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

  getReviews(cuiNum) {
    var url = `/rei/${cuiNum}`;
    this._cs.get(url).subscribe(
      res => {
        this.reviewLists = <ReviewInfo[]>res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

  getComments(cuiNum) {
    var url = `/coi/${cuiNum}`;
    this._cs.get(url).subscribe(
      res => {
        this.commnetLists = <CommentList[]>res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )

  }
}
