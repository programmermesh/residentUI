import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateANotice } from 'src/app/Utils/Models/notice';
import { environment } from 'src/environments/environment';
import { BaseHttpService, Constants } from '../BaseHttp/base-http.service';
@Injectable({
  providedIn: 'root'})
export class NoticeService  extends BaseHttpService{
  public const: any;
  public theHeader: any;
 public baseUrl = environment.baseUrl+"/";

  constructor(public override httpClient?: HttpClient, 
     public override constants?: Constants  ) {
    super()
  }
 /**  
  *  * @todo Get All Notices
  *    
  *  */
 
 GetAllNotices():Observable<any> {
   let connect = this.baseUrl + environment.Notices ;
      return this.get<any>(connect);
  }

  /**
   * 
   * @param CreateANotice
   * @todo Create  A Notice
   * @returns 
   */
  CreateANotice(createANotice :CreateANotice):Observable<any> {
    let connect = this.baseUrl + environment.Notices;  
       return this.post<any>(connect, createANotice);
   }

   /**
    * @todo update a notice by Id
    * @param id 
    * @returns 
    */

   UpdateANoticeById(id :string):Observable<any> {
    let connect = this.baseUrl + environment.Notices +`/` + id;  
       return this.put<any>(connect, {});
   }

    /**
    * @todo Delete a notice by Id
    * @param id 
    * @returns 
    */

    DeleteANoticeById(id :string):Observable<any> {
        let connect = this.baseUrl + environment.Notices +`/` + id;  
           return this.delete<any>(connect, {});
       }


        /**
    * @todo get a notice by Id
    * @param id 
    * @returns 
    */

   GetANoticeById(id :string):Observable<any> {
    let connect = this.baseUrl + environment.Notices +`/` + id;  
       return this.get<any>(connect);
   }

}