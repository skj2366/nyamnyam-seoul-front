import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantList } from 'src/app/vo/restaurant-list';
import { LikeInfo } from 'src/app/vo/like-info';
import { ReviewInfo } from 'src/app/vo/review-info';
import { CommentInfo } from 'src/app/vo/comment-info';
import { CommonService } from 'src/app/common/common.service';
import { CustomerInfo } from 'src/app/vo/customer-info';
import { StorageService } from 'src/app/common/storage.service';
import * as $ from 'jquery';
import { isNgTemplate } from '@angular/compiler';
import { discoverLocalRefs } from '@angular/core/src/render3/context_discovery';
// import { runInThisContext } from 'vm';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {
  cui: CustomerInfo = new CustomerInfo();
  cuiList : CustomerInfo[];

  rel : RestaurantList;
  
  lists: any[] = [];

  likeLists : LikeInfo[];
  reviewLists : ReviewInfo[];
  commnetLists : CommentInfo[];

  checkNum : number;

  isLogin: boolean = false;
  confirmCui: CustomerInfo = new CustomerInfo();

  constructor(private _router: Router, private _cs : CommonService, private route : ActivatedRoute, private _ss : StorageService) { 
    for(var i =1; i<=10; i++){
      var list = {no : i, gu: 'jiyeokgu'+i, station : 'station'+i, title : 'title'+i, count: i};
      this.lists.push(list);
    }
  }  

  ngOnInit() {
    var cuiNum =  this._ss.getSession('cuiNum');
    console.log(cuiNum);
    this.getLikes(cuiNum);
    this.getReviews(cuiNum);
    this.getComments(cuiNum);
    // this.isLogin = false;
    if(this._ss.getSession('cuiId') && this._ss.getSession('tokken')) {
      this.confirmCui.cuiNum = Number(this._ss.getSession('cuiNum'));
      this.confirmCui.cuiId = this._ss.getSession('cuiId');

      this.confirmCui.cuiBirth = this._ss.getSession('cuiBirth');
      this.confirmCui.cuiEmail = this._ss.getSession('cuiEmail');
      this.confirmCui.cuiName = this._ss.getSession('cuiName');
      this.confirmCui.cuiNickname = this._ss.getSession('cuiNickname');
      this.confirmCui.cuiPhone = this._ss.getSession('cuiPhone');
      this.confirmCui.cuiPwd = '';
      this.isLogin = true;
    }

    // 전체선택
  //  function checkAll(){
  //     if( $("#th_checkAll").is(':checked') ){
  //       $("input[name=checkGetId]").prop("checked", true);
  //     }else{
  //       $("input[name=checkGetId]").prop("checked", false);
  //     }
  // }
  }

  doLogin() {
    console.log(this.confirmCui);
    if (!this.confirmCui.cuiPwd) {
      alert('비밀번호 입력해주세요');
      return;
    }

    this._cs.postJson('/login', this.confirmCui).subscribe(
      res => {
        if (res) {
          console.log(res);
          alert('OK');
          this.confirmCui.cuiBirth = this._ss.getSession('cuiBirth');
          this.confirmCui.cuiEmail = this._ss.getSession('cuiEmail');
          this.confirmCui.cuiName = this._ss.getSession('cuiName');
          this.confirmCui.cuiNickname = this._ss.getSession('cuiNickname');
          this.confirmCui.cuiPhone = this._ss.getSession('cuiPhone');
          this.confirmCui.cuiPwd = '';
          this.isLogin = true;
          // this.cui = <CustomerInfo>res;
          // this.cuiList = <CustomerInfo[]>res;
          // console.log(this.cuiList);
          // if (this.cui.tokken) {
          //   this._ss.setSession('cuiId', this.cui.cuiId);
          //   this._ss.setSession('tokken', this.cui.tokken);
          //   this._ss.setSession('email', this.cui.cuiEmail);
          //   this._ss.setSession('nickname', this.cui.cuiNickname);
          //   console.log(this._ss.getItems);
          //   alert(this.cui.cuiId + ' 님 환영합니다.');
          //   this._router.navigateByUrl('/userDetail');
          // } else {
          //   return;
          // }
        } else {
          alert('비밀번호를 확인해 주세요');
        }
      },
      err => {
        console.log(err);
        alert('로그인에러');
      }
    )
  }

  validation() {
    var reId = /^[a-z0-9_]+$/;
    var rePwd = /^[a-z0-9_]{4,20}$/;
    var id = document.querySelector('');
    var pwd = document.querySelector('');
  }

  // goUserDetail() {
  //   this._router.navigateByUrl('/userDetail');
  // }


  getLikes(cuiNum) {
    var url = `/liis/${cuiNum}`;
    this._cs.get(url).subscribe(
      res => {
        this.likeLists = <LikeInfo[]>res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

  getReviews(cuiNum) {
    console.log(cuiNum);
    var url = `/reis/${cuiNum}`;
    this._cs.get(url).subscribe(
      res => {
        this.reviewLists = <ReviewInfo[]>res;        
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

  getComments(cuiNum) {
    var url = `/coi/${cuiNum}`;
    this._cs.get(url).subscribe(
      res => {
        this.commnetLists = <CommentInfo[]>res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

  goRestaurantDetail(relNum : number) {
    this._router.navigateByUrl(`/result/${relNum}`);
  }

  goBoardResult(reiNum : number) {
    this._router.navigateByUrl(`/board/${reiNum}`);
  }

  inputCheckItem(evt:any) {
    var num = evt.target.value;
    if($("input:checkbox[name='checkGetId']").is(":checked") == true) {
      this.checkNum = num;
      console.log(this.checkNum);
    } else {
      this.checkNum = null;
    }   
  }

  delContent(param) {
    console.log(param);
    var url;
    if(this.checkNum != null) {
      if(param=='like') {      
        url = `/lii/${this.checkNum}`;
        this._cs.delete(url).subscribe(
          res => {
            console.log("delete like ==> " + this.checkNum)
          },
          err => {
            console.log(err)
          }
        )
      } else if(param == 'review') {
        url = `/rei/${this.checkNum}`;
        this._cs.delete(url).subscribe(
          res => {
            console.log("delete review ==> " + this.checkNum)
          },
          err => {
            console.log(err)
          }
        )      
      } else if (param == 'comment') {
        url = `/coi/${this.checkNum}`
        this._cs.delete(url).subscribe(
          res => {
            console.log("delete comment ==> " + this.checkNum)
          },
          err => {
            console.log(err)
          }
        )            
      }
    }
    else {
      alert('삭제를 할 아이템이 없습니다');
    }    
  }
    
}
