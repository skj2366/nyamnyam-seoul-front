import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TestService } from 'src/app/test.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.css']
})
export class ReceiveComponent implements OnInit {

  private subscription: Subscription;

  constructor(private _test: TestService, private _route:ActivatedRoute, private _router:Router) { }

  ngOnInit() {
  }

  get message(): string {
    return this._test.message;
  }

  set message(newMessage: string) {
    this._test.message = newMessage;
  }

  goServe() {
    this._router.navigateByUrl('/serve');
  }
}
