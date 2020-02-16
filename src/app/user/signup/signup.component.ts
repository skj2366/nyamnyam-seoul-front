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

  goSignUp(){
    this._router.navigateByUrl('/signup');
  }

  goSignIn(){
    this._router.navigateByUrl('/login');
  }

  doSignUp() {
    console.log(this.cui);
    this._cs.postJson('/cui', this.cui).subscribe(
      res => {
        console.log(res);
        alert('success');
        this._router.navigateByUrl('/login');
      },
      err => {
        console.log(err);
        alert('singup error');
      }
    )
  }

  checkEmail(): any {
    this._cs.get('/cui/cuc/email?email=' + this.cui.cuiEmail, { email: this.cui.cuiEmail }).subscribe(
      res => {
        console.log('이거는 타냐????????????');
        if (res == 0) {
          console.log('이미 가입된 메일');
          alert('이미 가입된 이메일입니다');
          return;
        } else if (res == 1) {
          console.log('인증번호 발송 이력 있음');
          alert('메일함에서 인증번호를 확인해 주세요');
          this.isSend = true;
          return;
        } else {
          console.log('신규 가입 가능');
          this.doSendMail();
        }
      }
    )
  }

  // 이메일 전송
  doSendMail() {

    this.isSend = true;
    alert('메일전송!');
    this._cs.postResString('/send', this.cui).subscribe(
      res => {
        console.log(res);
        console.log(this.cui.cuiEmail);
      },
      err => {
        console.log(err);
      }
    )
  }

  // 인증번호 확인 
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
