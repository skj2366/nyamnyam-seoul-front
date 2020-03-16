import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';
import { RestaurantList } from 'src/app/vo/restaurant-list';
import { ActivatedRoute } from '@angular/router';
import { MenuInfo } from 'src/app/vo/menu-info';
import { KakaoMapService } from 'src/app/common/kakao-map.service';
import { RestaurantBlog } from 'src/app/vo/restaurant-blog';
import { StorageService } from 'src/app/common/storage.service';
import { LikeInfo } from 'src/app/vo/like-info';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  rel : RestaurantList;
  blog : RestaurantBlog[];
  menu : MenuInfo[];
  rNum : number;
  like : boolean = false;
  lii : LikeInfo;
  
  menuLength: number;

  constructor(private route : ActivatedRoute, private _cs : CommonService, private _ks: KakaoMapService, private _ss: StorageService) { }

  async ngOnInit() {    
    var relNum = this.route.snapshot.paramMap.get('relNum');    
    await this.getRestaurantDetail(relNum);
    this.getRestaurantBlogDetail(relNum);
    this.getMenu(relNum);
    this.getLike();
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

  getRestaurantBlogDetail(rNum) {
    var url = `/blog/${rNum}`;
    this._cs.get(url).subscribe(
      res => {
        this.blog = <RestaurantBlog[]>res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
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

  likeRestaurant() {
    // alert('좋아요~');
    // this.like = true;

    const url = `/lii`;
    var cuiNum = this._ss.getSession('cuiNum');
    let writeLike = new LikeInfo();
    writeLike.cuiNum = Number(cuiNum);
    writeLike.relNum = this.rel.relNum;
    this._cs.postJson(url, writeLike).subscribe(
      res=>{
        console.log(res);
        this.getLike();
      }
    )
  }

  unLikeRestaurant() {
    // alert('좋아요~ 취소');
    // this.like = false;

    const url = `/lii/${this.lii.liiNum}`;
    this._cs.delete(url).subscribe(
      res => {
        console.log(res);
        if(res) {
          this.like = false;
        }
      }
    )
  }

  getLike() {
    const url = `/lii/${this._ss.getSession('cuiNum')}/${this.rel.relNum}`;
    this._cs.get(url).subscribe(
      res=> {
        console.log(res);
        if(res) {
          this.like = true;
          this.lii = <LikeInfo>res;

        }else {
          this.like = false;
        }
      }
    )
  }

}
