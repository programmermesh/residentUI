import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL: string =environment.baseUrl;

  constructor(private http:HttpClient) { }



  registerUser(user:any){
    return this.http.post(`${this.baseURL}/register`,user);
  }

  loginUser(user:any){
    return this.http.post(`${this.baseURL}/login`,user);
  }

  getAllUsers(){
    return this.http.get(`${this.baseURL}/users`);
  }

}
