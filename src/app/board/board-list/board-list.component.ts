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
  reviews: ReviewInfo = new ReviewInfo();

  zoneList: any;
  subList: any;
  zoneValue: number = 0;
  subValue: number = 0;

  lists: any = [];

  inputRelName: string;
  //번호, 구, 역, 식당이름, 제목, 좋아요, 조회수, 작성시간
  constructor(private _cs: CommonService, private _zonsub: ZoneSubwayService, private _router: Router) {}

  ngOnInit() {
    this.getZones();
    this.getReviewList();
    document.getElementById('btnCreatDtOrder').style.background = '#c94545';
    document.getElementById('btnCreatDtOrder').style.color = 'white';
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

  goPage(url: string) {
    this._router.navigateByUrl(url);
  }

  goBoardResult(reiNum: number) {
    var url = `/board/${reiNum}`;
    this._router.navigateByUrl(url);
  }

  async getReviewList() {
    const url = '/reis/board';
    this.lists = await this._cs.get(url).toPromise();
    console.log(this.lists);
  }

  search() {
    let url: string = '/search?';
    if (this.zoneValue) {
      url += `zoneNum=${this.zoneValue}&`;
    }
    if (this.subValue) {
      url += `subwayNum=${this.subValue}&`;
    }
    if (this.inputRelName) {
      url += `relName=${this.inputRelName}&`;
    }
    console.log(`url : ${url}`);
    this._cs.get(url).subscribe(
      res => {
        this.lists = res;
        console.log(res);
      }
    );
    document.getElementById('btnCreatDtOrder').style.background = '#c94545';
    document.getElementById('btnCreatDtOrder').style.color = 'white';
    document.getElementById('btnLikeOrder').style.background = 'white';
    document.getElementById('btnLikeOrder').style.color = '#c94545';
  }

  sortByRecent(evt: any) {
    if (this.lists) {
      this.lists.sort((a: any, b: any) => {
        return (a.reiCredat > b.reiCredat) ? -1 : (a.reiCredat < b.reiCredat) ? 1 : 0;
      });
    }
    evt.target.style = 'background : #c94545; color : white;';
    document.getElementById('btnLikeOrder').style.background = 'white';
    document.getElementById('btnLikeOrder').style.color = '#c94545';
  }

  sortByView(evt: any) {
    if (this.lists) {
      this.lists.sort((a: any, b: any) => {
        return (a.reiCount > b.reiCount) ? -1 : (a.reiCount < b.reiCount) ? 1 : 0;
      });
    }
    evt.target.style = 'background : #c94545; color : white;';
    document.getElementById('btnCreatDtOrder').style.background = 'white';
    document.getElementById('btnCreatDtOrder').style.color = '#c94545';
  }
}
