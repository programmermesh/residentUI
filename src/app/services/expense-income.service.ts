import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseIncomeService {
 
  private baseURL: string = environment.baseUrl + '/expense-income';

  constructor(private http: HttpClient) {}

  getExpense() {
    return this.http.get(this.baseURL+"/expenses");
  }

  addExpenseIncome(expenseIncome: any) {
    return this.http.post(this.baseURL, expenseIncome);
  }

  getIncome() {
    return this.http.get(this.baseURL+"/income");
  }

}
