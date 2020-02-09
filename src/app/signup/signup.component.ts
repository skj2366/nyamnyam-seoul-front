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

  constructor(private _router: Router, private _cs: CommonService) { }

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
}
