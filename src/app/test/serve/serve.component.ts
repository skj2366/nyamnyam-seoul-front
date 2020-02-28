import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/test.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-serve',
  templateUrl: './serve.component.html',
  styleUrls: ['./serve.component.css']
})
export class ServeComponent implements OnInit {

  constructor(private _test:TestService, private _router:Router) { }

  ngOnInit() {
  }

  get message(): string {
    return this._test.message;
  }

  set message(newMessage: string) {
    this._test.message = newMessage;
  }

  goReceive() {
    this._router.navigateByUrl('/receive');
  }
}
