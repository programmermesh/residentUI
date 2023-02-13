import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResidentService {


  private baseURL: string =environment.baseUrl+"/resident";
  private visitorURL: string =environment.baseUrl+"/visitor";

  constructor(private http:HttpClient) { }

  getResidents(){
    return this.http.get(this.baseURL);
  }

  registerResident(resident:any){
    return this.http.post(this.baseURL+"/register",resident);
  }

  getResidentById(residentId: string) {
    return this.http.get(this.baseURL + '/' + residentId);
  }

  addVisitor(residentId: string, visitor: any) {
    return this.http.post(this.visitorURL + '/' + residentId, visitor);
  }

  
  
}
