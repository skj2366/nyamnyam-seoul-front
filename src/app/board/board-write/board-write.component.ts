import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZoneSubwayService } from 'src/app/search/zone-subway.service';
import { CommonService } from 'src/app/common/common.service';
import { RestaurantList } from 'src/app/vo/restaurant-list';
import { StorageService } from 'src/app/common/storage.service';
import { CustomerInfo } from 'src/app/vo/customer-info';
import { ReviewInfo } from 'src/app/vo/review-info';
import { ZoneInfo } from 'src/app/vo/zone-info';
import { SubwayInfo } from 'src/app/vo/subway-info';


@Component({
  selector: 'app-board-write',
  templateUrl: './board-write.component.html',
  styleUrls: ['./board-write.component.css']
})


export class BoardWriteComponent implements OnInit {
  // zoneList: ZoneInfo = new ZoneInfo();
  zoneList: any;
  zoneValue: number = 0;
  // subList: SubwayInfo = new SubwayInfo();
  subList: any;
  subValue: number = 0;
  cui: CustomerInfo = new CustomerInfo();
  rels: RestaurantList[];
  rei: ReviewInfo = new ReviewInfo();

  editorValue: string = '';
  baseUrl: string = 'http://localhost:809/';
  imgUrl: string = 'image/upload';
  imgUrl2: string = 'it';
  imgUrl3: string = 'upload/one';
  // ckEditorConfig = {
  //   filebrowserUploadUrl: this.baseUrl + this.imgUrl3,
  //   fileTools_requestHeaders: {
  //     'X-Requested-With': 'xhr'
  //   },
  //   filebrowserUploadMethod: 'xhr',
  //   toolbar: [
  //     {
  //       name: 'document',
  //       items: ['Undo', 'Redo']
  //     },
  //     {
  //       name: 'styles',
  //       items: ['Format']
  //     },
  //     {
  //       name: 'basicstyles',
  //       items: ['Bold', 'Italic', 'Strike', '-', 'RemoveFormat']
  //     },
  //     {
  //       name: 'paragraph',
  //       items: ['NumberedList', 'BulletedList']
  //     },
  //     {
  //       name: 'links',
  //       items: ['Link', 'Unlink']
  //     },
  //     {
  //       name: 'insert',
  //       items: ['Image']
  //     },
  //   ],
  //   height: 800,
  // };
  ckEditorConfig = {
    filebrowserUploadUrl: 'http://localhost:809/' + this.imgUrl,
    // fileTools_requestHeaders: {
    //     'X-Requested-With': 'xhr',
    //     Authorization: 'Bearer ' + localStorage.getItem('access_token')
    // },
    filebrowserUploadMethod: 'xhr',
    on: {
        instanceReady: function( evt ) {
            var editor = evt.editor;
            console.log('editor ===>', editor);
        },
        fileUploadRequest: function(evt) {
            console.log( 'evt ===>', evt );
        },
    },
  };
  email: string;

  constructor(private _router: Router, private _zonsub: ZoneSubwayService, private _cs: CommonService, private _ss: StorageService) { }

  keyword = 'name';
  relname = [];

  async ngOnInit() {
    await this.getInit();
  }

  async getZoneInfo() {
    this.zoneList = <ZoneInfo>await this._cs.get('/zoi').toPromise();
    console.log(this.zoneList);
  }

  getSubwayInfo() {
    console.log('getSubwayInfo');
    this.subValue = 0;
    if (this.zoneValue && this.zoneValue != 0) {
      this._cs.get('/sui/' + this.zoneValue).subscribe(
        res => {
          console.log(res);
          this.subList = <SubwayInfo>res;
        }
      )
    }
  }

  getZoneValue(exp) {
    console.log(exp);
  }

  getSubValue(exp) {
    console.log(exp);
  }

  selectEvent(item) {
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }

  getCustomer() {
    this.cui.cuiEmail = this._ss.getSession('email');
    this.cui.cuiNickname = this._ss.getSession('nickname');
  }

  consoleCK() {
    console.log(this.editorValue);
  }

  async getRestaurantListForAutoComplete(subValue: number) {
    this.relname = [];
    const url = `/rels?zoneNum=${this.zoneValue}&subwayNum=${this.subValue}`;
    this.rels = <RestaurantList[]>await this._cs.get(url).toPromise();
    for (let rel of this.rels) {
      this.relname.push({ num: rel.relNum, name: rel.relName, zoneNum: rel.zoneNum, subwayNum: rel.subwayNum });
    }
    console.log(this.relname)
    console.log(this.rels);
  }

  async getCuiInfo() {
    this.email = this._ss.getSession('email');
    if (this.email) {
      const url = `/cui/byemail?cuiEmail=${this.email}`;
      this.cui = <CustomerInfo>await this._cs.get(url).toPromise();
      console.log(this.cui);
    } else {
      alert('nope');
    }
  }

  async getInit() {
    this.getCustomer();
    await this.getZoneInfo();
    // await this.getRestaurantListForAutoComplete();
    await this.getCuiInfo();
  }
  autocompleteValue: any;
  writeReview() {
    const url = `/rei`;
    this.rei.zoneNum = this.zoneValue;
    this.rei.subwayNum = this.subValue;
    this.rei.cuiNum = this.cui.cuiNum;
    if (!this.autocompleteValue.num) {
      alert('식당이름을 확인해주세요');
      return;
    } else {
      this.rei.relNum = this.autocompleteValue.num;
    }
    console.log('autocompleteValue');
    console.log(this.autocompleteValue.num);
    this._cs.postJson(url, this.rei).subscribe(
      res => {
        console.log(res);
        alert('후기 작성 완료');
        this._router.navigateByUrl('/board');
      },
      err => {
        console.log(err);
      }
    )
  }
  notFound: string = '결과가 없습니다.';
}
