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

  ngOnInit() {

    if (this._ss.getItem('tokken') || this._ss.getSession('tokken')) {
      this.isLogin = true;
      console.log(this.isLogin);
    }
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

  doLogout() {
    localStorage.clear();
    sessionStorage.clear();

    // // location.reload();
    // // this._router.navigateByUrl('/login');
    location.href = 'http://localhost/login';

    // this.ngOnInit();
  }
}
