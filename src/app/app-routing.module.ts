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
<<<<<<< HEAD
import { ExpenseIncomeComponent } from './components/expense-income/expense-income.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
=======
import { LandingComponent } from './layout/landing/landing.component';
>>>>>>> olajide

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {path: 'admin/login', component: AdminLoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'welcome', component: LandingComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'users', component: ManageUsersComponent },
      { path: 'residents', component: ManageResidentsComponent },
<<<<<<< HEAD
      { path: 'visitor', component: VisitorComponent },
      { path: "levy", component: LevyComponent },
      { path: "notice", component: NoticeComponent },
      {path: "expense", component: ExpenseIncomeComponent}
=======
      {path: 'visitor/:id', component: VisitorComponent},
      { path: 'menu', loadChildren:()=>import('./components/components.module').then(m=>m.ComponentsModule) },
      {path:"levy", component:LevyComponent},
>>>>>>> olajide
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
