import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LevyService {
  private baseUrl: string = environment.baseUrl + '/levy';
  constructor(private http: HttpClient) {}

  addLevy(value: any) {
    return this.http.post(this.baseUrl, value);
  }

  getLevies() {
    return this.http.get(this.baseUrl);
  }

  deleteLevy(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
