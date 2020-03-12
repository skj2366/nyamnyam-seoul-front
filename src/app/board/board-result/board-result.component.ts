import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewInfo } from 'src/app/vo/review-info';
import { RestaurantList } from 'src/app/vo/restaurant-list';
import { CommentInfo } from 'src/app/vo/comment-info';
import { StorageService } from 'src/app/common/storage.service';


@Component({
  selector: 'app-board-result',
  templateUrl: './board-result.component.html',
  styleUrls: ['./board-result.component.css']
})
export class BoardResultComponent implements OnInit {
  rei : ReviewInfo = new ReviewInfo();
  
  reiNum : number; //리뷰번호
  relNum : number; //식당번호
  coi: CommentInfo = new CommentInfo();

  constructor(private _cs : CommonService, private route : ActivatedRoute, private _router: Router, private _ss: StorageService) {
    this.reiNum = this.route.snapshot.params['boardNum'];
  }

  async ngOnInit() {
    this.getReviewDetail(this.reiNum);
  }

  async getReviewDetail(reviewNum) {
    var url = `/rei/${reviewNum}`;
    this.rei = <ReviewInfo> await this._cs.get(url).toPromise();
    console.log(this.rei);
    if(this.rei) {
      document.getElementById('boardContent').innerHTML = this.rei['reiContents'];
    }
  }

  goRelPage(relNum) {
    this._router.navigateByUrl(`/result/${relNum}`);
  }

  test: string = `<p style="color:red;">asdasdasd</p>`

  writeComment() {
    const url = '/coi';
    this.coi.cuiNum = Number(this._ss.getSession('cuiNum')); // ngOninit으로 뺄까 
    console.log(this.coi.cuiNum);
    this.coi.reiNum = this.reiNum;
    this._cs.postJson(url, this.coi).subscribe(
      res=> {
        console.log(res);
      }
    )
  }
   
}
