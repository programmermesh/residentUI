import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {


  private paymentUrl = environment.baseUrl+"/payment";
  private pendingPaymentUrl = environment.baseUrl + "/pendingPayment";

  constructor(private http:HttpClient) { }

  makePendingPayment(data:any){
    return this.http.post(this.pendingPaymentUrl + '', data);
  }

  getPendingPayment(){
    return this.http.get(this.pendingPaymentUrl );
  }

  deletePendingPayment(id:any){
    return this.http.delete(this.pendingPaymentUrl+`/${id}`)
  }

 approvePayment(data:any){
  return this.http.post(this.paymentUrl+"/approvePayment", data)
 }

 getPayments(){
  return this.http.get(this.paymentUrl)
 }

 updatePayment(data:any,id:any){
  return this.http.put(this.paymentUrl+`/${id}`,data)
 }

 deletePayment(id:any){
  return this.http.delete(this.paymentUrl+`/${id}`)
 }

 getResidentTransactions(residentId: string) {
  return this.http.post(this.paymentUrl + '/payment/' + residentId,{});
}

filterPaymentByMonth(value: any) {
  return this.http.post(this.paymentUrl+"/month" , value);
}

filterPaymentByYear(value: any) {
  return this.http.post(this.paymentUrl + '/perannum', value);
}

}
