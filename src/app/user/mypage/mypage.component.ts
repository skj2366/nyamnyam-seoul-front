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


  constructor(private _router: Router, private _cs : CommonService, private route : ActivatedRoute, private _ss : StorageService) { 
    for(var i =1; i<=10; i++){
      var list = {no : i, gu: 'jiyeokgu'+i, station : 'station'+i, title : 'title'+i, count: i};
      this.lists.push(list);
    }
  }  

  ngOnInit() {
    //var cuiNum = this.route.snapshot.paramMap.get('cuiNum');
    var cuiNum = 6;
    this.getLikes(cuiNum);
    this.getReviews(cuiNum);
    this.getComments(cuiNum);

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
    console.log(this.cui);
    if (!this.cui.cuiId) {
      alert('아이디를 입력해주세요');
      return;
    } else if (!this.cui.cuiPwd) {
      alert('비밀번호 입력해주세요');
      return;
    }

    this._cs.postJson('/login', this.cui).subscribe(
      res => {
        if (res) {
          this.cui = <CustomerInfo>res;
          this.cuiList = <CustomerInfo[]>res;
          console.log(this.cuiList);
          if (this.cui.tokken) {
            this._ss.setSession('cuiId', this.cui.cuiId);
            this._ss.setSession('tokken', this.cui.tokken);
            this._ss.setSession('email', this.cui.cuiEmail);
            this._ss.setSession('nickname', this.cui.cuiNickname);
            console.log(this._ss.getItems);
            alert(this.cui.cuiId + ' 님 환영합니다.');
            this._router.navigateByUrl('/userDetail');
          } else {
            return;
          }
        } else {
          alert('로그인 실패!');
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

  delContent(param) {
    var checkbox = $("input[name=checkGetId]:checked");
    var rowData : any[];
    const result : number[] = [];
    var url;

    checkbox.each(function(i) {
      var tr = checkbox.parent().parent().eq(i);
      var td = tr.children();
      rowData.push(tr.text());

      rowData.forEach((item, index) => {
        if(item.state === true) {
          result.push(index);
          console.log(result);
        }
      });

      // if(param=='like') {
      //   while(result.length) {
      //     url = `/lii/${result.values}`
      //     this._cs.delete(url).subscribe(
      //       res => {
      //         console.log("delte like ==> " + result.values)
      //       },
      //       err => {
      //         console.log(err)
      //       }
      //     )}        

      // }else if(param=='review') {

      // }else if(param=='comment') {

      // }
    })
  }



    
}
