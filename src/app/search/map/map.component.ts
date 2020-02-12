import { Component, OnInit } from '@angular/core';
import { ZoneSubwayService } from '../zone-subway.service';
import { KakaoMapService } from 'src/app/common/kakao-map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private _zonsub: ZoneSubwayService, private _km: KakaoMapService) { }

  async ngOnInit() {
    // await this._km.makeMap(125, 37);
  }

  getZones() {
    this._zonsub.getZone();
  }

  makeMap() {
    this._km.makeMap(127, 37);
  }


}
