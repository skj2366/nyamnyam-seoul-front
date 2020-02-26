import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';
import { ActivatedRoute } from '@angular/router';
import { ReviewInfo } from 'src/app/vo/review-info';


@Component({
  selector: 'app-board-result',
  templateUrl: './board-result.component.html',
  styleUrls: ['./board-result.component.css']
})
export class BoardResultComponent implements OnInit {
  reviewTitle : string = '!';
  reviewDate : string = '!';
  reviewRestaurant : string = '!';
  userNick : string = '!';
  visitDate : string = '!';
  visitTime : string = '!';
  reviewContents : string = '!';

  reviewNum : string = '';
  rei : ReviewInfo;

  constructor(private _cs : CommonService, private route : ActivatedRoute) { }

  ngOnInit() {
    //var reiNum = this.route.snapshot.paramMap.get('reiNum');
    var reiNum = '0';
    this.reviewNum = reiNum;
    this.getReviewDetail(this.reviewNum);
  }

  getReviewDetail(reviewNum){
    var url = `/rei/${reviewNum}`;
    this._cs.get(url).subscribe(
      res => {
        this.rei = <ReviewInfo>res;
        console.log(this.rei);
        // this.reviewTitle = this.rei.reiTitle;
        // this.reviewDate = this.rei.reiDate + this.rei.reiTime;        
      },
      err => {
        console.log('리뷰상세 못가져옴');
        console.log(err);
      }
    )
  }
   
}
