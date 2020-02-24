import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerInfo } from 'src/app/vo/customer-info';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {
  lists:any[] = [];
  likeLists : [];
  reviewLists : [];

  constructor(private _router: Router, private _cs : CommonModule) { 
    for(var i =1; i<=10; i++){
      var list = {no : i, gu: 'jiyeokgu'+i, station : 'station'+i, title : 'title'+i, count: i};
      this.lists.push(list);
    }
  }
  

  ngOnInit() {

  }
  goUserDetail() {
    this._router.navigateByUrl('/userDetail');
  }

  getLikeList() {
    /*this._cs.get("/lii").subscribe(
      res => {
        this.likeLists = 
      },
      err => {

      }
    )*/
  }
}
