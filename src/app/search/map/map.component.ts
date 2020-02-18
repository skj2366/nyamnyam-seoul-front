import { Component, OnInit, Input } from '@angular/core';
import { ZoneSubwayService } from '../zone-subway.service';
import { KakaoMapService } from 'src/app/common/kakao-map.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { RestaurantList } from 'src/app/vo/restaurant-list';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  zoneValue: number = 0;
  subValue: number = 0;
  rels: RestaurantList[];

  constructor(private _zonsub: ZoneSubwayService, private _km: KakaoMapService, route: ActivatedRoute, private _cs: CommonService) {
    this.zoneValue = route.snapshot.params['zoneValue'];
    this.subValue = route.snapshot.params['subValue'];
  }

  async ngOnInit() {
    if (this.zoneValue != 0 && this.zoneValue != undefined) {
      await this._cs.get('/rels?zoneNum=' + this.zoneValue + '&subwayNum=' + this.subValue).subscribe(
        res => {
          if (this._cs.getObjectLength(res) != 0) {
            this.rels = <RestaurantList[]>res;
            console.log(this.rels);
            this._km.makeMapBySubway(0, this.rels);
          } else {
            console.log('아무 것도 없음');
          }
          // console.log(res);
        },
        err => {
          console.log(err);
        }
      )
    }
  }

}
