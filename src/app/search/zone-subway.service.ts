import { Injectable } from '@angular/core';
import { ZoneInfo } from '../vo/zone-info';
import { SubwayInfo } from '../vo/subway-info';
import { CommonService } from '../common/common.service';
import { resolve } from 'url';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZoneSubwayService {

  zoneInfos : ZoneInfo[];
  subwayinfos : SubwayInfo[];
  zoneList;
  subList;
  zonezone;
  private subject = new Subject<any>();

  constructor(private _cs : CommonService) {
    this.getZone();
  }

  getZone() {
    this._cs.get('/zoi').subscribe(
      res => {
        // this.zoneInfos = <ZoneInfo[]>res;
        this.zoneList = res;
        console.log(res);
      }, err => {
        console.log(err);
      }
    )
  }

  getZones() {
    this.zonezone = this._cs.get('/zoi').toPromise();
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
        // this.subwayinfos = <SubwayInfo[]>res;
        this.subList = res;
        console.log(res);
      }, err => {
        console.log(err);
      }
    )
  }

  getByCondition() {
    
  }
}
