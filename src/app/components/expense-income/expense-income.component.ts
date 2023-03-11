import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificationType } from 'src/app/Utils/notification.enum';
import { ExpenseIncomeService } from 'src/app/services/expense-income.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ResidentService } from 'src/app/services/resident.service';

@Component({
  selector: 'app-expense-income',
  templateUrl: './expense-income.component.html',
  styleUrls: ['./expense-income.component.css']
})
export class ExpenseIncomeComponent implements OnInit {
  expenseForm!: FormGroup;
  incomeExpenseList: any = [];
  loading = false;
  type: any = "Expense"	;
  totalIncome: number =0 ;
  totalExpense: number = 0;
  loggedInUser: any;
  userType: any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private loaderService: NgxUiLoaderService,
    private notifier: NotificationService,
    private expenseService: ExpenseIncomeService
  ) { }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(sessionStorage.getItem('user')!);
    this.userType = this.loggedInUser.type;
    this.expenseForm = this.fb.group({
      Name: [''],
      amount: [''],
      month: ['Select Month'],
      year: ['Select Year'],
      type: ['Select Type'],
      description: [''],
    });
    this.getexpenses();
  }

  getexpenses() {
    this.loaderService.start();
    this.expenseService
      .getExpense()
      .subscribe((res: any) => {
        this.incomeExpenseList = res.expenseIncome;
        this.totalExpense = res.totalExpense;
        this.loaderService.stop();
      }, error => {
        this.notifier.notify(NotificationType.ERROR, error.error.message)
        this.loaderService.stop();
      });
  }

  getIncome() {
    this.loaderService.start();
    this.expenseService
      .getIncome()
      .subscribe((res: any) => {
        this.incomeExpenseList = res.expenseIncome;
        this.totalIncome = res.totalIncome;
        this.loaderService.stop();
      }, error => {
        this.notifier.notify(NotificationType.ERROR, error.error.message)
        this.loaderService.stop();
      });
  }

  addExpense() {
    this.loading = true;
    this.expenseService.addExpenseIncome(this.expenseForm.value).subscribe((res: any) => {
      this.loading = false;
      if (res.ResponseCode == "00") {
        this.notifier.notify(NotificationType.SUCCESS, res.ResponseDescription)
        this.getexpenses();
        this.expenseForm.reset();
      } else {
        this.notifier.notify(NotificationType.ERROR, res.ResponseDescription)
      }
    }, error => {
      this.notifier.notify(NotificationType.ERROR, error.error.message)
      this.loading = false;
    });
  }

  filterExpenseIncome(event: any) {
    this.type = event.target.value;
    if ( this.type == "Expense") {
      this.getexpenses();
    }
    if ( this.type == "Income") {
      this.getIncome();
    }

  }


}
