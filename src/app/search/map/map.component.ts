import { Component, OnInit, Input } from '@angular/core';
import { ZoneSubwayService } from '../zone-subway.service';
import { KakaoMapService } from 'src/app/common/kakao-map.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  zoneValue: number = 0;
  subValue: number = 0;

  constructor(private _zonsub: ZoneSubwayService, private _km: KakaoMapService, route: ActivatedRoute, private _cs: CommonService) {
    this.zoneValue = route.snapshot.params['zoneValue'];
    this.subValue = route.snapshot.params['subValue'];
  }

  async ngOnInit() {
    // await this._km.makeMap(125, 37);
    if (this.zoneValue != 0 && this.zoneValue != undefined) {
      // alert('zoneValue : ' + this.zoneValue + ' and subValue : ' + this.subValue);
      this._cs.get('/rel?zoneNum=' + this.zoneValue + '&subwayNum=' + this.subValue).subscribe(
        res => {
          console.log(res);
          console.log(res[0].relLatitude);
          console.log(res[0].relLongitude);
          this._km.makeMap(res[0].relLongitude, res[0].relLatitude);
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  getZones() {
    this._zonsub.getZone();
  }

  makeMap() {
    this._km.makeMap(127, 37);
  }

  qwe() {
    alert('zoneValue : ' + this.zoneValue + ' and subValue : ' + this.subValue);
  }

}
