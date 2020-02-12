import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterGuardService {

  constructor(private _router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean{
    console.log(`id:${localStorage.getItem('cuiId')}`);
    if(localStorage.getItem('cuiId')){
      return true;
    } else {
      this._router.navigate(['login']);
      return false;
    }
  }
}
