import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-total-result',
  templateUrl: './total-result.component.html',
  styleUrls: ['./total-result.component.css']
})
export class TotalResultComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit() {
  }

  goResult(){
    this._router.navigateByUrl('/result');
  }
}
