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
  rei : ReviewInfo = new ReviewInfo();
  reiNum : number;
  constructor(private _cs : CommonService, private route : ActivatedRoute) {
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

  test: string = `<p style="color:red;">asdasdasd</p>`
   
}
