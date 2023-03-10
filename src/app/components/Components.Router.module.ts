import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NoticeComponent } from "./notice/notice.component";
const routes: Routes = [
    { path: '', component: NoticeComponent },
    // { path: 'register', component: RegisterComponent },
    // {
    //   path: 'home',
    //   component: HomeComponent,
    //   children: [
    //     { path: '', component: DashboardComponent },
    //     { path: 'users', component: ManageUsersComponent },
    //     { path: 'residents', component: ManageResidentsComponent },
    //     {path: 'visitor/:id', component: VisitorComponent}
    //   ],
    // },
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class ComponentRoutingModule {}