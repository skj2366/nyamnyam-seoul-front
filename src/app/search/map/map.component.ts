import { Component, OnInit, Input, inject, Optional, Inject } from '@angular/core';
import { ZoneSubwayService } from '../zone-subway.service';
import { KakaoMapService } from 'src/app/common/kakao-map.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { RestaurantList } from 'src/app/vo/restaurant-list';
import { from, interval } from 'rxjs';
import { MenuInfo } from 'src/app/vo/menu-info';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  zoneValue: number = 0;
  subValue: number = 0;
  zoneList: any;
  subList: any;
  rels: RestaurantList[];
  meis: MenuInfo[];
  subUrl: string = '/sui';
  zoneUrl: string = '/zoi';
  relsUrl: string = '/rels';
  mapUrl: string = '/map';


  constructor(private _zonsub: ZoneSubwayService, private _km: KakaoMapService, private route: ActivatedRoute, private _cs: CommonService, private _router: Router) {
    console.log(this._cs.getObjectLength(route.snapshot.params));
    if(this._cs.getObjectLength(route.snapshot.params) != 0) {
      this.zoneValue = route.snapshot.params['zoneValue'];
      this.subValue = route.snapshot.params['subValue'];
    } else {
      console.log('No Params');
    }
  }

  async ngOnInit() {
    await this.getZoneListAndSubwayList();
    await this.getMap();
  }

  async getMap() {
    if (this.zoneValue != 0 && this.zoneValue != undefined && this.zoneValue != null) {
      await this._cs.get('/rels?zoneNum=' + this.zoneValue + '&subwayNum=' + this.subValue).subscribe(
        res => {
          if (this._cs.getObjectLength(res) != 0) {
            this.rels = <RestaurantList[]>res;
            console.log(this.rels);
            this._km.makeMapBySubway(0, this.rels);
          } else {
            this.rels = null;
            console.log('아무 것도 없음');
          }
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  // async getMaps() {
  //   this.rels = this._cs.get(`/rels?zoneNum=${this.zoneValue}&subwayNum=${this.subValue}`).toPromise();
  // }

  async getZone() {
    this.zoneList = await this._cs.get('/zoi').toPromise();
  }

  async getSubway() {
    this.subValue = 0;
    if (this.zoneValue) {
      this.subList = await this._cs.get('/sui/' + this.zoneValue).toPromise();
    }
  }

  async getSubwayInit() {
    if (this.zoneValue) {
      this.subList = await this._cs.get('/sui/' + this.zoneValue).toPromise();
    }
  }

  async getZoneListAndSubwayList() {
    await this.getZone();
    await this.getSubwayInit();
  }

  async doSearch(zone, sub) {
    if (!zone || zone == '지역구 선택' || !sub || sub == '지하철역 선택') {
      alert('지역구와 지하철역을 선택해주세요');
      return;
    } else {
      this._router.navigateByUrl('/map/' + this.zoneValue + '/' + this.subValue);
      this.ngOnInit();
    }
  }

  goRelPage(relNum:number) {
    this._router.navigateByUrl(`/result/${relNum}`);
  }

  closeMap() {
    document.getElementById('kakao-map').innerHTML = '<span style="font-size: 20pt;font-weight:bold; color:rgb(5, 5, 90);margin-left:5%;">검색 결과가 없습니다.</span>';
    document.getElementById('kakao-map').style.backgroundColor = 'white';
  }

}
