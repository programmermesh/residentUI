import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData } from 'src/app/Utils/Models/LoginData';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private residentURL: string =environment.baseUrl+"/resident";
  private adminURL: string =environment.baseUrl+"/users";



  constructor(private http:HttpClient) { }



  registerResident(loginData:LoginData){
    return this.http.post(`${this.residentURL}/register`,loginData);
  }

  loginAsResident(user:LoginData){
    return this.http.post(`${this.residentURL}/login`,user);
  }

  registerAdmin(user:LoginData){
    return this.http.post(`${this.adminURL}/register`,user);
  }

  resetPassword(user:any,id:string){
    return this.http.put(`${this.adminURL}/${id}`,user);
  }

  loginAsAdmin(user:any){
    return this.http.post(`${this.adminURL}/login`,user);

  }
  getAllUsers(){
    return this.http.get(`${this.adminURL}`);
  }
  deleteUser(id:any){
    return this.http.delete(`${this.adminURL}/${id}`);
  }

}
