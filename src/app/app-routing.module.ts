import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LevyComponent } from './components/levy/levy.component';
import { ManageResidentsComponent } from './components/manage-residents/manage-residents.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { VisitorComponent } from './components/visitor/visitor.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { HomeComponent } from './layout/home/home.component';
import { LandingComponent } from './layout/landing/landing.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'welcome', component: LandingComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'users', component: ManageUsersComponent },
      { path: 'residents', component: ManageResidentsComponent },
      {path: 'visitor/:id', component: VisitorComponent},
      { path: 'menu', loadChildren:()=>import('./components/components.module').then(m=>m.ComponentsModule) },
      {path:"levy", component:LevyComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
