import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LevyComponent } from './components/levy/levy.component';
import { ManageResidentsComponent } from './components/manage-residents/manage-residents.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { NoticeComponent } from './components/notice/notice.component';
import { VisitorComponent } from './components/visitor/visitor.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { HomeComponent } from './layout/home/home.component';
import { ExpenseIncomeComponent } from './components/expense-income/expense-income.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { PendingPaymentComponent } from './components/payment/pending-payment/pending-payment.component';
import { ApprovePaymentComponent } from './components/payment/approve-payment/approve-payment.component';
import { TransactionHistoryComponent } from './components/payment/transaction-history/transaction-history.component';
import { FinancialStatementComponent } from './components/payment/financial-statement/financial-statement.component';
import { AddPaymentComponent } from './components/payment/add-payment/add-payment.component';
import { MyTransactionHistoryComponent } from './components/payment/my-transaction-history/my-transaction-history.component';
import { LandingComponent } from './layout/landing/landing.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'welcome', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'users', component: ManageUsersComponent },
      { path: 'residents', component: ManageResidentsComponent },
      { path: 'visitor', component: VisitorComponent },
      { path: "levy", component: LevyComponent },
      { path: "notice", component: NoticeComponent },
      { path: "expense", component: ExpenseIncomeComponent },
      { path: "payment/approve", component: ApprovePaymentComponent },
      { path: "payment/add", component: AddPaymentComponent },
      { path: "transaction/history", component: TransactionHistoryComponent },
      { path: "transaction/my/history", component: MyTransactionHistoryComponent },
      { path: "financial/statement", component: FinancialStatementComponent },
   
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
