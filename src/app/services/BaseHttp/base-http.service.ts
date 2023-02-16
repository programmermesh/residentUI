import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export abstract class BaseHttpService {
  public errorHandle: any;
  constructor(public httpClient?: HttpClient, public constants?: Constants) {}
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.      // The response body may contain clues as to what went wrong,      console.error(
      `Backend returned code ${error.status}, ` + `body was: ${error.error}`;
      // );
    }
  }
  /***
   * @param url
   * @method get method
   * @response returns observable
   *   */
  protected get<T>(url: string): Observable<T> {

    let header = this.constants?.httpHeader();
    return this.httpClient!.get(url, {
      headers: header,
      responseType: 'json',
    }).pipe(
      map((result: any) => {
        return result as T;
      }),
      retry(2)
    );
  }

  /***   * @param url and body parameter
   * * @method Post method
   * * @response returns observable
   *   */
  protected post<T>(url: string, body: any): Observable<T> {
    let header = this.constants?.httpHeader();
    return this.httpClient!.post(url, body, {
      headers: header,
      responseType: 'json',
    }).pipe(
      map((result: any) => {
        return result as T;
      }),
      retry(2)
    );
  }

    /***   * @param url and body parameter
   * * @method Post method
   * * @response returns observable
   *   */
    protected put<T>(url: string, body: any): Observable<T> {
        let header = this.constants?.httpHeader();
        return this.httpClient!.put(url, body, {
          headers: header,
          responseType: 'json',
        }).pipe(
          map((result: any) => {
            return result as T;
          }),
          retry(2)
        );
      }

        /***   * @param url and body parameter
   * * @method Post method
   * * @response returns observable
   *   */
  protected delete<T>(url: string, body: any): Observable<T> {
    let header = this.constants?.httpHeader();
    return this.httpClient!.delete(url, body).pipe(
      map((result: any) => {
        return result as T;
      }),
      retry(2)
    );
  }

  /***   * @param url and body parameter
   *  * @method Post method
   *  * @response returns observable   */
  protected postFile<T>(url: string, body: any): Observable<T> {
    const headers = new HttpHeaders().set(
      'Content-Disposition',
      'mulipart/form-data'
    );
    return this.httpClient!.post(url, body, { headers: headers }).pipe(
      map((result: any) => {
        return result as T;
      }),
      retry(2)
    );
  }


  
}

// constant

export class Constants {
  httpHeader() {
    return new HttpHeaders({});
  }
}
