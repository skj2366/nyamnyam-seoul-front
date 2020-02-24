import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { StorageService } from '../common/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private _router: Router, private _ss: StorageService) { }

  isLogin: boolean = false;

  ngDoCheck() {
    if (!this.isLogin) {
      this.getLoginInfo();
    }
  }

  ngOnInit() {

    // ---------------------------------------------
    window.onscroll = function () { myFunction() };

    var navbar = document.getElementById("navbar");
    var sticky = navbar.offsetTop;

    function myFunction() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
      } else {
        navbar.classList.remove("sticky");
      }
    }
    // ---------------------------------------------
  }

  getLoginInfo() {
    if (this._ss.getItem('tokken') || this._ss.getSession('tokken')) {
      this.isLogin = true;
      console.log(this.isLogin);
    }
  }

  goSignUp() {
    this._router.navigateByUrl('/signup');
  }

  goLogin() {
    this._router.navigateByUrl('/login');
  }

  goMain() {
    this._router.navigateByUrl('');
  }

  goMap() {
    this._router.navigateByUrl('/map');
  }

  goTotal() {
    this._router.navigateByUrl('/total');
  }
  goBoard() {
    this._router.navigateByUrl('/board');
  }

  goMypage() {
    this._router.navigateByUrl('/mypage');
  }

  goManage() {
    this._router.navigateByUrl('/manage');
  }

  goPage(url) {
    this._router.navigateByUrl(url);
  }

  doLogout() {
    localStorage.clear();
    sessionStorage.clear();

    // // location.reload();
    // // this._router.navigateByUrl('/login');
    // location.href = 'http://localhost/login';
    this.isLogin = false;
    alert('로그아웃 완료');
    this.ngOnInit();
    this._router.navigateByUrl('/login');
  }
}
