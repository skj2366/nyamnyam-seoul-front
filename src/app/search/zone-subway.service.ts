import { Injectable } from '@angular/core';
import { ZoneInfo } from '../vo/zone-info';
import { SubwayInfo } from '../vo/subway-info';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class ZoneSubwayService {

  zoneInfos : ZoneInfo[];
  subwayinfos : SubwayInfo[];

  constructor(private _cs : CommonService) { }

  getZone() {
    this._cs.get('/zoi').subscribe(
      res => {
        this.zoneInfos = <ZoneInfo[]>res;
        console.log(res);
      }, err => {
        console.log(err);
      }
    )
  }

  getSubway() {
    this._cs.get('/sui').subscribe(
      res => {
        this.subwayinfos = <SubwayInfo[]>res;
        console.log(res);
      }, err => {
        console.log(err);
      }
    )
  }

  getByCondition() {
    
  }
}
