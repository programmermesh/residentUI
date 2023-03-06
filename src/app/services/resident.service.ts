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

  constructor(private http: HttpClient) {}

  getResidents() {
    return this.http.get(this.baseURL);
  }

  registerResident(resident: any) {
    return this.http.post(this.baseURL + '/register', resident);
  }

  getResidentById(residentId: string) {
    return this.http.get(this.baseURL + '/' + residentId);
  }

  addVisitor(visitor: Visitor) {
    return this.http.post(this.visitorURL, visitor);
  }

  getVisitors(): Observable<Visitor> {
    return this.http.get<Visitor>(this.visitorURL);
  }
}
