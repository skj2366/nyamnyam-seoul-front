import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../common/common.service';
import { CustomerInfo } from '../../vo/customer-info';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  cui: CustomerInfo = new CustomerInfo();
  isSend: boolean = false;
  isCerti: boolean = false;
  certificationNumber: string = '';
  certifi: string = '';

  constructor(private _router: Router, private _cs: CommonService) { }

  ngOnInit() {
  }

  doSignUp() {
    console.log(this.cui);
    this._cs.postJson('/cui', this.cui).subscribe(
      res => {
        console.log(res);
        alert('success');
        this._router.navigateByUrl('');
      },
      err => {
        console.log(err);
        alert('singup error');
      }
    )
  }

  checkEmail(): any {
    this._cs.get('/cui/cuc/email', this.cui.cuiEmail).subscribe(
      res => {
        if (!res) {
          console.log(res);

          return 1;
        } else {
          console.log(res);
          alert('이미 가입된 이메일 입니다');
          return 2;
        }
      }
    )
  }

  doSendMail() {

    // 여기에 인증번호 보낸 이력 있으면 isSend 바로 True 시키고 이메일 다시 안보내는 로직 추가 
    // 그리고 인증번호 재전송 로직 추가

    if (this.checkEmail() == 1) {
      console.log("this is do check");
      return "qwe";
    } else {
      console.log("this is else check");
      return "zxc";
    }

    this._cs.postResString('/send', this.cui).subscribe(
      res => {
        console.log(res);
        console.log(this.cui.cuiEmail);
        alert('메일전송!');
        this.isSend = true;
        this.certificationNumber = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  confirmCertificationNumber() {
    console.log(this.cui.cuiEmail);
    this._cs.get('/cuc/' + this.cui.cuiEmail).subscribe(
      res => {
        console.log(res);
        if (!res) {
          alert('인증번호가 없습니다');
        } else {
          if (this.certificationNumber == res['cucCerNum']) {
            alert('인증번호 확인 완료!');
            this.isCerti = true;
          } else {
            alert('인증번호를 다시 확인해 주세요');
          }

        }
      },
      err => {
        console.log(err);
      }
    )

  }
}
