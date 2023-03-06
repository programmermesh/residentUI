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

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
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
      {path: "expense", component: ExpenseIncomeComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
