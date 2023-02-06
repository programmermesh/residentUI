import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  getLoggedInUser(){
    return sessionStorage.getItem('user');
  }

  setLoggedInUser(user: any) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  logout(){
    sessionStorage.clear();
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }


}
