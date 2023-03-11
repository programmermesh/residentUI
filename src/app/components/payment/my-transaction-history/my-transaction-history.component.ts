import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-my-transaction-history',
  templateUrl: './my-transaction-history.component.html',
  styleUrls: ['./my-transaction-history.component.css']
})
export class MyTransactionHistoryComponent  implements OnInit{
  filterTransaction: string = '';
  p: number = 1;
  transactionList: any = [];
  recordLoading: boolean = false;
  residentId: string='';
  noRecordFound: string="";
  constructor(
    private paymentService: PaymentService,
    private loaderService: NgxUiLoaderService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.residentId = this.route.snapshot.queryParamMap.get('residentId')!;
    if (this.residentId) {
      this.getResidentById(this.residentId);
    }
  }

  getResidentById(residentId: string) {
    this.recordLoading = true;
    this.paymentService.getResidentTransactions(residentId).subscribe((res: any) => {
      this.transactionList = res.resident;
      console.log(res);
      this.recordLoading=false
      if(res.ResponseCode == "99"){
        this.noRecordFound="No Transaction Found!"
      }
    }, error => {
      this.recordLoading=false


    })
  }
}
