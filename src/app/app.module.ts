import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './layout/home/home.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TopnavComponent } from './layout/topnav/topnav.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormValidation } from './auth/helpers/form-validation';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ManageResidentsComponent } from './components/manage-residents/manage-residents.component';
import { VisitorComponent } from './components/visitor/visitor.component';
import { LevyComponent } from './components/levy/levy.component';
import { Constants } from './services/BaseHttp/base-http.service';
import { NoticeComponent } from './components/notice/notice.component';
import { NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, POSITION, SPINNER } from 'ngx-ui-loader';
import { ExpenseIncomeComponent } from './components/expense-income/expense-income.component';
import { NotificationModule } from './notification.module';
import { NgChartsModule } from 'ng2-charts';
import { ExpenseIncomeGraphComponent } from './components/expense-income-graph/expense-income-graph.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "red",
  pbColor: "red",
  fgsColor: "red",
  bgsOpacity: 0.5,
  bgsPosition: POSITION.centerCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce, // background spinner type
  fgsType: SPINNER.ballScaleMultiple, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness

};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SidebarComponent,
    TopnavComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ManageUsersComponent,
    ManageResidentsComponent,
    VisitorComponent,
    LevyComponent,
    NoticeComponent,
    ExpenseIncomeComponent,
    ExpenseIncomeGraphComponent,
    AdminLoginComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NotificationModule,
    NgChartsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxPaginationModule,
    Ng2SearchPipeModule


  ],
  providers: [FormValidation, Constants],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
