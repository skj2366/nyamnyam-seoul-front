import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZoneSubwayService } from 'src/app/search/zone-subway.service';
import { CommonService } from 'src/app/common/common.service';
import { RestaurantList } from 'src/app/vo/restaurant-list';

@Component({
  selector: 'app-board-write',
  templateUrl: './board-write.component.html',
  styleUrls: ['./board-write.component.css']
})
export class BoardWriteComponent implements OnInit {
  zoneList: any;
  zoneValue = '지역구 선택';
  subList: any;
  subValue = '지하철역 선택';

  constructor(private _router: Router, private _zonsub: ZoneSubwayService, private _cs: CommonService) { }

  keyword = 'relName';
  restaurants = RestaurantList;

  async ngOnInit() {
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
    this.subValue = '지하철역 선택';
    if (this.zoneValue != '지역구 선택' || !this.zoneValue) {
      this._cs.get('/sui/' + this.zoneValue).subscribe(
        res => {
          console.log(res);
          this.subList = res;
        }
      )
    }
  }

  getZoneValue(exp) {
    console.log(exp);
  }

  getSubValue(exp) {
    console.log(exp);
  }

  selectEvent(item) {
    // do something with selected item
  }
 
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e){
    // do something when input is focused
  }

}
