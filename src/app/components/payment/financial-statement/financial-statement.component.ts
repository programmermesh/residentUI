import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationType } from 'src/app/Utils/notification.enum';
import { LevyService } from 'src/app/services/levy.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PaymentService } from 'src/app/services/payment.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-financial-statement',
  templateUrl: './financial-statement.component.html',
  styleUrls: ['./financial-statement.component.css']
})
export class FinancialStatementComponent implements OnInit {

  montlyPaymentList: any = [];
  yearlyPaymentList: any = [];
  loading: boolean = false;
  monthFormFilter!: FormGroup
  yearFormFilter!: FormGroup
  levies: any = [];
  monthlyTotalAmount: any = 0;
  yearlyTotalAmount: any = 0;
  monthlyPeriod!: { year: any; month: any; };
  showMonthandYear:boolean=false
  showYear:boolean=false
  yearPeriod!: { year: any; };

  constructor(private paymentService: PaymentService, private levyService: LevyService, private notifier: NotificationService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.monthFormFilter = this.fb.group({
      month: ['', [Validators.required]],
      year: ['', [Validators.required]],
      levy: ['Select Levy', [Validators.required]]
    })

    this.yearFormFilter = this.fb.group({
      year: ['', [Validators.required]],
      levy: ['Select Levy', [Validators.required]]
    })

    this.getLevies()
  }

  filterPaymentByMonth() {
    this.loading = true;
    if (this.monthFormFilter.invalid) {
      this.notifier.notify(NotificationType.WARNING, "Please fill all required fields")
      this.loading = false;
      return;
    }
    this.paymentService.filterPaymentByMonth(this.monthFormFilter.value).subscribe((res: any) => {
      this.montlyPaymentList = res.resident;
      this.monthlyTotalAmount = res.Totalamount ? res.Totalamount : 0;
      this.monthlyPeriod= {year: this.monthFormFilter.value.year, month: this.monthFormFilter.value.month}
      this.showMonthandYear=true
      this.loading = false;
      if (res.ResponseCode == "99") {
        this.notifier.notify(NotificationType.ERROR, "No Payment Record Found!")
      }
    }, error => {
      this.notifier.notify(NotificationType.ERROR, "An error occured")
    })
  }

  filterPaymentByYear() {
    this.loading = true;
    if (this.yearFormFilter.invalid) {
      this.notifier.notify(NotificationType.WARNING, "Please fill all required fields")
      this.loading = false;
      return;
    }
    this.paymentService.filterPaymentByYear(this.yearFormFilter.value).subscribe((res: any) => {
      this.yearlyPaymentList = res.resident;
      this.yearlyTotalAmount = res.Totalamount ? res.Totalamount : 0;
      this.yearPeriod= {year: this.yearFormFilter.value.year}
      this.showYear=true
      this.loading = false;
      if (res.ResponseCode == "99") {
        this.notifier.notify(NotificationType.ERROR, "No Payment Record Found!")
      }
    }, error => {
      this.notifier.notify(NotificationType.ERROR, "An error occured")
    })


  }
  getLevies() {
    this.levyService.getLevies().subscribe((res: any) => {
      this.levies = res;
    })
  }

  exportMonthlyExcel(month:any,year:any)  {
    let element = document.getElementById('month-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Montly Statement');
    XLSX.writeFile(wb, `RMS-${month} ${year}-MonthlyStatment.xlsx`);
 
  }

  exportYearExcel(year:any){
    let element = document.getElementById('year-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Yearly Statement');
    XLSX.writeFile(wb, `RMS-${year}-YearlyStatment.xlsx`);
  }


}
