import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZoneInfo } from '../vo/zone-info';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  //zoi : ZoneInfo = new ZoneInfo();
  
  constructor(private _router:Router) { }

  ngOnInit() {
  }
 
  goSignUp() {
    this._router.navigateByUrl('/signup');
  }

  goLogin() {
    this._router.navigateByUrl('/login');
  }

}
