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
    var count = `/reiCount/${reiNum}`;
    this._cs.modifyJson(count, null).subscribe( 
      res => {
        console.log(res + "카운트 증가")
      }
    )

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
    // if(this.checkValue.solo) {
    //   url += `solo=${this.checkValue.solo}&`;
    // }
    // if(this.checkValue.two) {
    //   url += `two=${this.checkValue.two}&`;
    // }
    // if(this.checkValue.four) {
    //   url += `four=${this.checkValue.four}&`;
    // }
    url += `solo=${this.checkValue.solo}&two=${this.checkValue.two}&four=${this.checkValue.four}&`;
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
        return (a.reiNum > b.reiNum) ? -1 : (a.reiNum < b.reiNum) ? 1 : 0;
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

  checkValue:any = {
    solo : 0,
    two : 0,
    four : 0
  };

  checkboxValue(evt:any) {
    console.log(evt.target.value);
    if(evt.target.value == 1 && this.checkValue.solo == 0) {
      this.checkValue.solo = 1;
      console.log(this.checkValue);
    }else if(evt.target.value == 1 && this.checkValue.solo == 1) {
      this.checkValue.solo = 0;
      console.log(this.checkValue);
    }

    if(evt.target.value == 2 && this.checkValue.two == 0) {
      this.checkValue.two = 1;
      console.log(this.checkValue);
    }else if(evt.target.value == 2 && this.checkValue.two == 1) {
      this.checkValue.two = 0;
      console.log(this.checkValue);
    }

    if(evt.target.value == 3 && this.checkValue.four == 0) {
      this.checkValue.four = 1;
      console.log(this.checkValue);
    }else if(evt.target.value == 3 && this.checkValue.four == 1) {
      this.checkValue.four = 0;
      console.log(this.checkValue);
    }
  }

  initFilter() {
    this.checkValue.solo = 0;
    this.checkValue.two = 0;
    this.checkValue.four = 0;
    var checkBoxs = document.querySelectorAll('input[type="checkbox"]');
    checkBoxs.forEach((value) => {
      console.log(value);
      value['checked'] = false;
    });
    this.zoneValue = 0;
    this.subValue = 0;
  }
}
