import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PendingPayment } from 'src/app/Utils/Models/pendingPayment';
import { NotificationType } from 'src/app/Utils/notification.enum';
import { NotificationService } from 'src/app/services/notification.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-approve-payment',
  templateUrl: './approve-payment.component.html',
  styleUrls: ['./approve-payment.component.css']
})
export class ApprovePaymentComponent implements OnInit {

  loading: any
  pendingPaymentList: any = [];
  paymentDetail: any;
  paymentList: any= [];
  loggedInUser: any;
  userType: any;
  constructor(
    private paymentService: PaymentService,
    private loaderService: NgxUiLoaderService,
    private notifier: NotificationService
  ) { }
  ngOnInit(): void {
    this.loggedInUser = JSON.parse(sessionStorage.getItem('user')!);
    this.userType = this.loggedInUser.type;
    this.getPendingPayments()
    this.getApprovedPayment()

  }

  approvePayment() {
    this.loading = true;
    const updatePayment = {
      pendingPaymentId: this.paymentDetail.id,
      month: this.paymentDetail.month,
      year: this.paymentDetail.year,
      amount: this.paymentDetail.amount,
      status: "Paid",
      levy: this.paymentDetail.levy,
      houseType: this.paymentDetail.houseType,
      houseNumber: this.paymentDetail.houseNumber,
      fullName: this.paymentDetail.fullName,
      processed: "Yes",
      residentId: this.paymentDetail.residentId,
      file: this.paymentDetail.file
    }
    this.paymentService.approvePayment(updatePayment).subscribe((res: any) => {
      this.loading = false;
      if(res.ResponseCode="00"){
        this.notifier.notify(NotificationType.SUCCESS,res.ResponseDescription)
        this.getPendingPayments()
        this.getApprovedPayment()
      }
      else{
        this.notifier.notify(NotificationType.ERROR,res.ResponseDescription)
      }
    
    }, error => {
      this.loading = false;
        this.notifier.notify(NotificationType.ERROR, "An Error Occured")
      }
    )


  }

  getPendingPayments() {
    this.loaderService.start()
    this.paymentService.getPendingPayment().subscribe((res: any) => {
      this.pendingPaymentList = res.payment
      console.log(res);
      this.loaderService.stop()
    }, error => {
      this.loaderService.stop()
      this.notifier.notify(NotificationType.ERROR, "An Error Occured")
    })
  }

  getApprovedPayment(){
    this.loaderService.start()
    this.paymentService.getPayments().subscribe((res: any) => {
      this.paymentList = res.payment
      console.log(res);
      this.loaderService.stop()
    }, error => {
      this.loaderService.stop()
      this.notifier.notify(NotificationType.ERROR, "An Error Occured")
    })
  }

  viewPayment(payment: any) {
    this.paymentDetail = payment
  }

}
