import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { MenuInfo } from 'src/app/vo/menu-info';

@Component({
  selector: 'app-total-result',
  templateUrl: './total-result.component.html',
  styleUrls: ['./total-result.component.css']
})
export class TotalResultComponent implements OnInit {

  isTotal:boolean = true;
  themeValue: string;
  themeString: string;

  thl : any;
  rels : any;
  relUrl: string = '/rels';
  thlUrl: string = '/thl';

  rel:any;
  scrollNow:number;

  menu : MenuInfo[];
  rNum : number;
  menuLength: number;

  constructor(private _router: Router, private route: ActivatedRoute, private _cs: CommonService) {
    this.themeValue = this.route.snapshot.params['theme'];    // router 기능의 theme라는 param을 스냅샷으로 받아옴.
    console.log(`selected theme : ${this.themeValue}`);       // 콘솔로 찍어봄.

    // if (this.themeValue == 'alone') {                          // 각 테마 벨류의 값마다 string으로 지정. 케이스문을 쓸걸 그랬나 ?
    //   this.themeString = '혼자서';
    // } else if (this.themeValue == 'two') {
    //   this.themeString = '둘이서';
    // } else if (this.themeValue == 'more') {
    //   this.themeString = '넷이상';
    // } else if (this.themeValue == 'korean') {
    //   this.themeString = '한식';
    // } else if (this.themeValue == 'chinese') {
    //   this.themeString = '중식';
    // } else if (this.themeValue == 'form') {
    //   this.themeString = '양식';
    // } else if (this.themeValue == 'japanese') {
    //   this.themeString = '일식';
    // } else if (this.themeValue == 'dessert') {
    //   this.themeString = '디저트';
    // } else if (this.themeValue == 'etc') {
    //   this.themeString = '기타';
    // }

    //스위치문 ~ 편한것으로 선택. 가독성을 위해서 스위치문을 쓴다는데 나는 왜 더 길고 보기 힘든거같냐!
    switch (this.themeValue) {
      case 'alone':
        this.themeString = '혼자서';
        break;
      case 'two':
        this.themeString = '둘이서';
        break;
      case 'more':
        this.themeString = '넷이상';
        break;
      case 'korean':
        this.themeString = '한식';
        break;
      case 'chinese':
        this.themeString = '중식';
        break;
      case 'form':
        this.themeString = '양식';
        break;
      case 'japanese':
        this.themeString = '일식';
        break;
      case 'dessert':
        this.themeString = '디저트';
        break;
      case 'etc':
        this.themeString = '기타';
        break;
      default:
        break;
    }
  }

  ngOnInit() {
    this.getRestaurantWithTheme();
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

  // result-dk 용 
  goResult(rel?:any) {
    // this._router.navigateByUrl('/result');
    this.rel = rel;
    this.isTotal = false;
    this.scrollNow = window.scrollY;
    console.log(this.scrollNow);
    window.scroll(0,0);
  }
  //

  // result page로 이동시키기 , relNum 기준 
  goResultPage(relNum:number) {
    window.scroll(0,0);
    this._router.navigateByUrl(`/result/${relNum}`);
  }

  async getTheme() {
    this.thl = await this._cs.get(this.thlUrl).toPromise();
    console.log(this.thl);
  }

  async getRestaurant() {
    this.rels = await this._cs.get(this.relUrl).toPromise();
    console.log(this.rels);
  }

  async getRestaurantWithTheme() {
    this._cs.get(`/rels/thl?theme=${this.themeValue}`).subscribe(
      res => {
        console.log(res);
        this.rels = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  getResultTotal(evt) {
    this.isTotal = evt;
    setTimeout(() => {
      scroll(0,this.scrollNow);
      console.log(this.scrollNow);
      console.log(scrollY);
    },50);
  }

}
