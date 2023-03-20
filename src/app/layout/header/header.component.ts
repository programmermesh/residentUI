import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ResidentService } from 'src/app/services/resident.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  visitors: any = [];
  residents: any = [];
  loadingResident: boolean = false;
  loadingVisitor: boolean = false;
  checkoutVisitors: any=[];
  checkinVisitors: any=[];
  constructor(
    private residentService: ResidentService,
  ) { }

  ngOnInit(): void {
    this.getVisitors();
    this.getResidents();
  }

  getVisitors() {
    this.loadingVisitor = true;
    this.residentService
      .getVisitors()
      .subscribe((res: any) => {
        this.visitors = res.visitor;
        this.checkinVisitors = this.visitors.filter((x:any)=> x.checkin == true)
        this.checkoutVisitors= this.visitors.filter((x:any)=> x.checkout == true)
        this.loadingVisitor = false;
      }, error => {

      });
  }

  getResidents() {
    this.loadingResident = true;
    this.residentService.getResidents().subscribe((res: any) => {
      this.residents = res?.resident;
      this.loadingResident = false;
    },error=>{
      this.residents =[]
      console.log(error);
      this.loadingResident = false;
    }
    );

  }





}
