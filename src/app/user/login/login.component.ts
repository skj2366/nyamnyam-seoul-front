import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common/common.service';
import { Router } from '@angular/router';
import { StorageService } from '../../common/storage.service';
import { CustomerInfo } from '../../vo/customer-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cui: CustomerInfo = new CustomerInfo();
  isLogin: boolean = false;

  constructor(public _router: Router, private _cs: CommonService, private _ss: StorageService) { }

  ngOnInit() {
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
          if (this.cui.tokken) {
            this._ss.setSession('cuiId', this.cui.cuiId);
            this._ss.setSession('tokken', this.cui.tokken);
            this._ss.setSession('email', this.cui.cuiEmail);
            this._ss.setSession('nickname', this.cui.cuiNickname);
            console.log(this._ss.getItems);
            alert(this.cui.cuiId + ' 님 환영합니다.');
            this._router.navigateByUrl('/');
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

  goSignUp() {
    this._router.navigateByUrl('/signup');
  }
}
