import { HttpClient } from '@angular/common/http';
import { Visitor } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResidentService {


  private baseURL: string = environment.baseUrl + '/resident';
  private visitorURL: string = environment.baseUrl + '/visitor';
  private landlordURL: string = environment.baseUrl + '/landlords';

  constructor(private http: HttpClient) {}

  
  getLandlords() {
    return this.http.get(this.landlordURL);
  }

  getLandlordById(landlordId: string) {
    return this.http.get(this.landlordURL + '/' + landlordId);
  }

  registerLandlord(landlord: any) {
    return this.http.post(this.landlordURL + '/createLandlord', landlord);
  }

  deleteLandlord(id: any) {
    return this.http.delete(this.landlordURL + '/' + id);
  }

  updateLandlord(id: string, data: any) {
    return this.http.put(this.landlordURL + '/' + id, data);
  }

  getLandLordsResidents(id: string) {
    return this.http.get(this.landlordURL + '/tenant/' + id);
  }

  getResidents() {
    return this.http.get(this.baseURL);
  }

  registerResident(resident: any) {
    return this.http.post(this.baseURL + '/register', resident);
  }

  getResidentById(residentId: string) {
    return this.http.get(this.baseURL + '/' + residentId);
  }

  deleteResident(id: any) {
    return this.http.delete(this.baseURL + '/' + id);
  }

  addVisitor(visitor: Visitor) {
    return this.http.post(this.visitorURL, visitor);
  }

  getVisitors(): Observable<Visitor> {
    return this.http.get<Visitor>(this.visitorURL);
  }

  updateVisitor(visitorId: string, data: any) {
    return this.http.put(this.visitorURL + '/' + visitorId, data);
  }
}
