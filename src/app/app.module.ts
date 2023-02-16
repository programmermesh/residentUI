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
import { ComponentsModule } from './components/components.module';
import { Constants } from './services/BaseHttp/base-http.service';
import { LevyComponent } from './components/levy/levy.component';

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
    LevyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  providers: [FormValidation,Constants],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports:[FooterComponent,HeaderComponent,SidebarComponent]
})
export class AppModule { }
