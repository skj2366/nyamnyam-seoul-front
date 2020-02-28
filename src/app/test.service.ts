import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private subject = new Subject<any>();

  message:string;

  constructor(private _test:TestService) { }

  sendData(data) {
    this.subject.next(data);
    console.log('sendData : ', data);
  }

  getData() {
    return this.subject.asObservable();
  }
}
