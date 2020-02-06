import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common/common.service';
import { Router } from '@angular/router';
import { StorageService } from '../common/storage.service';
import { CustomerInfo } from '../vo/customer-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cui: CustomerInfo = new CustomerInfo();
  isLogin: boolean = false;

  constructor(public _router: Router, private _cs: CommonService) { }

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
          console.log(this.cui);
          alert('로그인성공!');
          this._router.navigateByUrl('/');
        } else {
          console.log(this.cui);
          alert('로그인 실패!');
        }
      },
      err => {
        console.log(err);
        alert('로그인에러');
      }
    )
  }

}
