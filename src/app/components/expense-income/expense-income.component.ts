import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExpenseIncomeService } from 'src/app/services/expense-income.service';
import { ResidentService } from 'src/app/services/resident.service';

@Component({
  selector: 'app-expense-income',
  templateUrl: './expense-income.component.html',
  styleUrls: ['./expense-income.component.css']
})
export class ExpenseIncomeComponent implements OnInit {
  expenseForm!: FormGroup;
  expense: any = [];
  loading = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private expenseService:ExpenseIncomeService 
  ) {}

  ngOnInit(): void {
    // this.residentId = this.route.snapshot.params['id'];
    // this.getResidentById();

    this.expenseForm = this.fb.group({
      name: [''],
      amount: [''],
      month: ['Select Month'],
      year: ['Select Year'],
      type  : ['New'],
      description: [''],
    });
    this.getexpenses();
  }

  getexpenses() {
    this.expenseService
      .getExpenseIncome()
      .subscribe((res: any) => {
        this.expense = res;
        console.log(this.expense);
      });
  }

  addVisitor() {
    this.loading = true;
    this.expenseService
      .addExpenseIncome(this.expenseForm.value)
      .subscribe((res: any) => {
        this.loading = false;
        this.expenseForm.reset();
      });
  }

  
}
