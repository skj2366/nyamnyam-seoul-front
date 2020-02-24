import { Component, OnInit } from '@angular/core';
import { CustomerInfo } from 'src/app/vo/customer-info';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  cui:CustomerInfo = new CustomerInfo();

  constructor() { }

  ngOnInit() {
    
  // checkNick(){
  //   this._us.postCheck(this.user).subscribe(res=>{
  //     if(res==null){
  //       document.querySelector('#checkNick').innerHTML="사용가능한 닉네임입니다.";
  //       return true;
  //     }else if(this.userNick===res['userNick']){
  //       document.querySelector('#checkNick').innerHTML="현재 닉네임입니다.";
  //       return;
  //     }      
  //     else{
  //       document.querySelector('#checkNick').innerHTML="중복된 닉네임입니다.";
  //       return;
  //     }
  //   })    
  // }
  // checkPassword(){
  //   if(this.user.userPwd.length<5){
  //     document.querySelector('#checkPassword').innerHTML = '비밀번호는 5글자 이상입니다.';
  //     return;
  //   } else{
  //     document.querySelector('#checkPassword').innerHTML = '';
  //     return true;
  //   }
  // }
  // checkRePassword(){
  //   if(this.user.userPwd!==this.user.userPwdChk){
  //     document.querySelector('#checkRePassword').innerHTML = '비밀번호가 일치하지 않습니다.';
  //     return;
  //   } else {
  //     document.querySelector('#checkRePassword').innerHTML = '';
  //     return true;
  //   }
  // }
  // emailchk(){
  //   var i = 0;
  //   var cnt = 0;
  //   var dcnt = 0;
  //   while(this.user.userEmail.charAt(i)){
  //     if(this.user.userEmail.charAt(i).indexOf('@')!=-1){
  //       cnt++;
  //       }
  //       i++;
  //     }
  //     if(this.user.userEmail.indexOf('.com')!=-1 ||this.user.userEmail.indexOf('.net')!=-1||this.user.userEmail.indexOf('.co.kr')!=-1){
  //       dcnt++;
  //     }
  //     if(cnt!=1 || dcnt!=1){
  //       document.querySelector('#emailchk').innerHTML = '이메일 형식이 올바르지 않습니다.';
  //       return;
  //     }else{
  //       document.querySelector('#emailchk').innerHTML = '';
  //       return true;
  //     }
  // }
  // telchk(){
  //   if(this.user.userTel.length!=11){
  //     document.querySelector('#telchk').innerHTML = '-없이 휴대폰 번호 11자리를 정확하게 입력해주세요';
  //     return;
  //   }else{
  //     document.querySelector('#telchk').innerHTML = '';
  //     return true;
  //   }
  // }
  // birthchk(){
  //   if(!this.user.userBirth){
  //     alert('생년월일을 입력해주세요');
  //     return;
  //   }else{
  //     return true;
  //   }
  // }
  }

}
