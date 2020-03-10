import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZoneInfo } from '../vo/zone-info';
import * as $ from 'jquery';
import { ZoneSubwayService } from '../search/zone-subway.service';
import { CommonService } from '../common/common.service';
import { SubwayInfo } from '../vo/subway-info';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  zoneList: any;
  zoneValue:number = 0;
  subList: any;
  subValue: number = 0;
  isSearch: boolean = false;

  constructor(private _router: Router, private _zonsub: ZoneSubwayService, private _cs: CommonService) { }

  async ngOnInit() {
    this.getZones();
  }

  getZones() {
    this._cs.get('/zoi').subscribe(
      res => {
        //console.log(res);
        this.zoneList = res;
        console.log(this.zoneList);
      }, err => {
        console.log(err);
      }
    )
  }

  getZoneValue(exp) {
    console.log(exp);
  }

  getSubValue(exp) {
    console.log(exp);
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

  // doSearch() {
  //   if (!this.zoneValue || this.zoneValue == '지역구 선택' || !this.subValue || this.subValue == '지하철역 선택') {
  //     alert('지역구와 지하철역을 선택해주세요');
  //     return;
  //   } else {
  //     alert('Zone Value : ' + this.zoneValue + ' and Subway Value : ' + this.subValue);
  //   }
  // }

  async doSearch(zone, sub) {
    if (!zone || zone == '지역구 선택' || !sub || sub == '지하철역 선택') {
      alert('지역구와 지하철역을 선택해주세요');
      return;
    } else {
      this.isSearch = true;
      if (this.isSearch) {
        // alert('Zone Value : ' + zone + ' and Subway Value : ' + sub);
        console.log(this.isSearch);
        this._router.navigateByUrl('/map/' + this.zoneValue + '/' + this.subValue);
      }
    }
  }
}
