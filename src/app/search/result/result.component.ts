import { Component, OnInit, ViewChild, ElementRef, DoCheck } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';
import { RestaurantList } from 'src/app/vo/restaurant-list';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuInfo } from 'src/app/vo/menu-info';
import { KakaoMapService } from 'src/app/common/kakao-map.service';
import { RestaurantBlog } from 'src/app/vo/restaurant-blog';
import { StorageService } from 'src/app/common/storage.service';
import { LikeInfo } from 'src/app/vo/like-info';
import { ReviewInfo } from 'src/app/vo/review-info';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, DoCheck {
  rel: RestaurantList;
  blog: RestaurantBlog[];
  menu: MenuInfo[];
  reviews: ReviewInfo[];
  rNum: number;
  like: boolean = false;
  lii: LikeInfo;

  isLoading: boolean = false;

  menuLength: number;
  loadMap: boolean = false;

  @ViewChild('kakaoMap') kakaoMap: ElementRef

  constructor(private route: ActivatedRoute, private _cs: CommonService, private _ks: KakaoMapService, private _ss: StorageService, private _router: Router) { }

  ngDoCheck(): void {
    if(this.kakaoMap && !this.loadMap) {
      console.log(`ngDoCheck()`);
      this.getMap();
      this.loadMap = true;
    }
  }

  async ngOnInit() {
    var relNum = this.route.snapshot.paramMap.get('relNum');
    await this.getRestaurantDetail(relNum);
    this.getRestaurantBlogDetail(relNum);
    this.getMenu(relNum);
    this.getReviews(relNum);
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

    this.rel = <RestaurantList>await this._cs.get(url).toPromise();
    console.log(this.rel);
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

  goBoardResult(reiNum: number) {
    this._router.navigateByUrl(`/board/${reiNum}`);
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

  getReviews(rNum) {
    var url = `/reisrel/${rNum}`;
    this._cs.get(url).subscribe(
      res => {
        this.reviews = <ReviewInfo[]>res;
      },
      err => {
        console.log(err);
      }
    )
  }

  getMap() {
    console.log(this.kakaoMap);
    const id = 'kakao-map';
    if (this.rel) {
      this._ks.makeMapResult(this.rel, id);
    }
  }

  likeRestaurant() {
    // alert('좋아요~');
    // this.like = true;
    if(!this._ss.getSession('cuiNum')){
      alert('로그인해주세요~');
    } else {
      const url = `/lii`;
      var cuiNum = this._ss.getSession('cuiNum');
      let writeLike = new LikeInfo();
      writeLike.cuiNum = Number(cuiNum);
      writeLike.relNum = this.rel.relNum;
      this._cs.postJson(url, writeLike).subscribe(
        res => {
          console.log(res);
          this.getLike();
        }
      )
    }    
  }

  unLikeRestaurant() {
    // alert('좋아요~ 취소');
    // this.like = false;

    const url = `/lii/${this.lii.liiNum}`;
    this._cs.delete(url).subscribe(
      res => {
        console.log(res);
        if (res) {
          this.like = false;
        }
      }
    )
  }

  getLike() {    
    const url = `/lii/${this._ss.getSession('cuiNum')}/${this.rel.relNum}`;
    this._cs.get(url).subscribe(
      res => {
        console.log(res);
        if (res) {
          this.like = true;
          this.lii = <LikeInfo>res;

        } else {
          this.like = false;
        }
      }
    )
  }

  getReview() {

  }

}
