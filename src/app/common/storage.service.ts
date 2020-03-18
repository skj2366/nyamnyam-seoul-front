import { Injectable } from '@angular/core';
import { CustomerInfo } from '../vo/customer-info';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setItems(cui: CustomerInfo) {
    for (var key in cui) {
      localStorage.setItem(key, cui[key]);
    }
  }

  getItems(key: string) {
    return localStorage.getItem(key);
  }

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  setSessions(cui: CustomerInfo) {
    for(var key in cui) {
      sessionStorage.setItem(key, cui[key]);
    }
  }

  setSession(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  getSession(key: string) {
    return sessionStorage.getItem(key);
  }
  
}
