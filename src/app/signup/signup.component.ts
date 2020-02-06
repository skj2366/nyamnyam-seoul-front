import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common/common.service';
import { CustomerInfo } from '../vo/customer-info';

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

  constructor(private _router:Router, private _cs:CommonService) { }

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

  doSendMail() {
    this._cs.postJson('/send', this.cui).subscribe(
      res => {
        console.log(res);
        console.log(this.cui.cuiEmail);
        alert('메일 전송!');
        this.isSend = true;
        this.certificationNumber = <string>res;
      },
      err => {
        console.log(err);
      }
    )
  }

  confirmCertificationNumber() {
    
    if(this.certificationNumber == this.certifi) {
      this.isCerti = true;
    }else {
      alert('인증번호를 확인해주세요');
    }
  }
}
