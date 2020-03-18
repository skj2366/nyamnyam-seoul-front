import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const thisUrl = 'http://localhost:80';
const baseUrl = 'http://localhost:809';
const httpJson = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json' }
  )
}
const httpData = {
  headers: new HttpHeaders(
    { 'ENCTYPE': 'multipart/form-data' }
  )
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _http: HttpClient, private _router: Router) { }

  get(url, param?) {
    url = baseUrl + url;
    return this._http.get(url);
  }

  makeFormData(obj): FormData {
    const formData = new FormData();
    for (var key in obj) {
      formData.append(key, obj[key]);
    }
    return formData;
  }

  postJson(url, obj) {
    url = baseUrl + url;
    return this._http.post(url, obj, httpJson);
  }

  postResString(url, obj) {
    url = baseUrl + url;
    return this._http.post(url, obj, {responseType: 'text'});
  }

  postFile(url, obj) {
    url = baseUrl + url;
    const data = this.makeFormData(obj);
    return this._http.post(url, data, httpData);
  }

  delete(url, param?) {
    url = baseUrl + url;
    return this._http.delete(url);
  }

  modifyJson(url, obj, param?) {
    url = baseUrl + url;
    return this._http.put(url, obj, httpJson);
  }

  getObjectLength(obj): number {
      var length = Object.keys(obj).length;
      return length;
  }

  currencyFormat(money: number): string {
    if (money == 0) return '0';
    var rx = /(^[+-]?\d+)(\d{3})/;
    var moneyStr = money + '';
    while (rx.test(moneyStr)) {
      moneyStr = moneyStr.replace(rx, `$1` + ',' + `$2`);
    }
    return moneyStr;
  }

  returnBaseUrl() {
    return baseUrl;
  }

  returnThisUrl() {
    return thisUrl;
  }
}
