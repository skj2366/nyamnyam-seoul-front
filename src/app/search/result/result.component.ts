import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';
import { RestaurantList } from 'src/app/vo/restaurant-list';
import { ActivatedRoute } from '@angular/router';
import { MenuInfo } from 'src/app/vo/menu-info';
import { KakaoMapService } from 'src/app/common/kakao-map.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  rel : RestaurantList;
  menu : MenuInfo[];
  rNum : number;
  
  menuLength: number;

  constructor(private route : ActivatedRoute, private _cs : CommonService, private _ks: KakaoMapService) { }

  async ngOnInit() {    
    var relNum = this.route.snapshot.paramMap.get('relNum');    
    await this.getRestaurantDetail(relNum);
    this.getMenu(relNum);
    
  }

  async getRestaurantDetail(rNum) {
    var url = `/reln/${rNum}`;
    // this._cs.get(url).subscribe(
    //   res => {
    //       this.rel = <RestaurantList>res;          
    //       console.log(this.rel);
          
    //     }
    //   , err => {
    //       console.log('레스토랑상세 못가져옴');
    //       console.log(err);
    //     }      
    // )

    this.rel = <RestaurantList> await this._cs.get(url).toPromise();
  }

  getMenu(rNum) {
    var url = `/mei/${rNum}`;
    this._cs.get(url).subscribe(
      res => {
        this.menu = <MenuInfo[]>res;
        console.log(res);
        this.menuLength = this._cs.getObjectLength(this.menu);
      },
      err => {
        console.log(err);
      }
    )
  }

  getMap() {
    var id = 'kakao-map';
    if(this.rel) {
      alert(`${this.rel.relLatitude}, ${this.rel.relLongitude}`);
      this._ks.makeMapByRestaurant(this.rel.relLatitude, this.rel.relLongitude, id);
    }
  }

}
