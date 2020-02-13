import { Injectable } from '@angular/core';
import { ZoneInfo } from '../vo/zone-info';
import { SubwayInfo } from '../vo/subway-info';
import { CommonService } from '../common/common.service';
import { resolve } from 'url';

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

  // getZone(): Promise<any> {
  //   this._cs.get('/zoi').subscribe(
  //     res => {
  //       this.zoneInfos = <ZoneInfo[]>res;
  //       console.log(res);
  //       return new Promise((res, err) => {
  //         setTimeout(() => {
  //           res({
  //             txt: 'hello world';   
  //           });
  //         }, 2000);
  //       });
  //     }, err => {
  //       console.log(err);
  //     }
  //   )
  // }

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
