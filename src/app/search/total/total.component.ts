import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css']
})
export class TotalComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {

  }
  goResult() {
    this._router.navigateByUrl('/totalResult');
  }

  goResultByTheme(theme:string) {
    if(theme) {
      // alert(theme);
      this._router.navigateByUrl(`/totalResult/${theme}`);
    }
  }
}
