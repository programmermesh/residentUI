import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResidentService {

  private baseURL: string =environment.baseUrl+"/resident";

  constructor(private http:HttpClient) { }

  getResidents(){
    return this.http.get(this.baseURL);
  }

  registerResident(resident:any){
    return this.http.post(this.baseURL+"/register",resident);
  }

  
  
}
