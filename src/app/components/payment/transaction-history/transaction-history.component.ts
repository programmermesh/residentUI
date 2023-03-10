import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Resident } from 'src/app/Utils/Models/resident';
import { PaymentService } from 'src/app/services/payment.service';
import { ResidentService } from 'src/app/services/resident.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  residents: any = [];
  selectedResidentData: Resident = {};
  filterTransaction: string = '';
  filterResidents: string = '';
  p: number = 1;
  transactionList: any = [];
  noRecordFound: string= 'Select Resident to view transaction';
  constructor(
    private residentService: ResidentService,
    private paymentService: PaymentService,
    private loaderService: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.getResidents()
  }


  getResidents() {
    this.loaderService.start()
    this.residentService.getResidents().subscribe((res: any) => {
      this.residents = res.resident;
      console.log(this.residents);
      this.loaderService.stop()
    });
  }

  getResidentById(residentId: string) {
    this.loaderService.start();
    this.paymentService.getResidentTransactions(residentId).subscribe((res: any) => {
      this.transactionList = res.resident;
      console.log(res);
      this.loaderService.stop();
      if(res.ResponseCode == "99"){
        this.noRecordFound="No Transaction Found!"
      }
    }, error => {
      this.loaderService.stop();


    })
  }



}
