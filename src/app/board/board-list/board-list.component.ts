import { Component, OnInit } from '@angular/core';
import { ReviewInfo } from 'src/app/vo/review-info';
import { CommonService } from 'src/app/common/common.service';
import { ZoneSubwayService } from 'src/app/search/zone-subway.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {
  reviews : ReviewInfo = new ReviewInfo();
  
  zoneList: any;
  subList: any;
  zoneValue: number = 0;
  subValue: number = 0;

  lists:any = [];

  //번호, 구, 역, 식당이름, 제목, 좋아요, 조회수, 작성시간
  constructor(private _cs : CommonService, private _zonsub: ZoneSubwayService, private _router: Router) { 
    // for(var i =1; i<=10; i++){
    //   var list = {no : i, gu: 'jiyeokgu'+i, station : 'station'+i, title : 'title'+i, count: i};
    //   this.lists.push(list);
    // }
  }

  ngOnInit() {
    this.getZones();
    this.getReviewList();
  }

  getZones() {
    this._cs.get('/zoi').subscribe(
      res => {
        console.log(res);
        this.zoneList = res;
        console.log(this.zoneList);
      }, err => {
        console.log(err);
      }
    )
  }

  getSubwayInfo() {
    this.subValue = 0;
    if (this.zoneValue) {
      this._cs.get('/sui/' + this.zoneValue).subscribe(
        res => {
          console.log(res);
          this.subList = res;
        }
      )
    }
  }

  doSearchByCondition() {

  }

  getSubValue(subValue?) {

  }
  
  goPage(url:string) {
    this._router.navigateByUrl(url);
  }

  goBoardResult(reiNum:number) {
    var url = `/board/${reiNum}`;
    this._router.navigateByUrl(url);
  }

  async getReviewList() {
    const url = '/reis/board';
    this.lists = await this._cs.get(url).toPromise();
    console.log(this.lists);
  }
}
