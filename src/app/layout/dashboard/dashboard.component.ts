import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartOptions, ChartType } from 'chart.js';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Resident } from 'src/app/Utils/Models/resident';
import { Visitor } from 'src/app/Utils/Models/visitor';
import { NotificationType } from 'src/app/Utils/notification.enum';
import { NotificationService } from 'src/app/services/notification.service';
import { ResidentService } from 'src/app/services/resident.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading: boolean = false
  visitors: any = [];
  p: number = 1;
  q: number = 1;
  searchVisitorfilter: string = '';
  residents: any= [];
  selectedResidentData:Resident = {};
  searchResidentFilter: string = '';
  constructor(private residentService: ResidentService,
    private loaderService: NgxUiLoaderService,
    private notifier: NotificationService) { }

  ngOnInit(): void {
    this.getVisitors()
    this.getResidents()
  }

  getResidents() {
    this.loaderService.start()
    this.residentService.getResidents().subscribe((res: any) => {
      this.residents = res.resident;
      console.log(this.residents);
      this.loaderService.stop()
    });
  }

  getResidentById(residentId: string) {
    this.loaderService.start();
    this.residentService.getResidentById(residentId).subscribe((res: any) => {
      this.selectedResidentData = res.resident;
      console.log(this.selectedResidentData);
      this.loaderService.stop();
    });
  }


  getVisitors() {
    this.loaderService.start();
    this.residentService
      .getVisitors()
      .subscribe((res: any) => {
        this.visitors = res.visitor;
        this.loaderService.stop();
      }, error => {
        this.loaderService.stop();
      });
  }

  //  checkin
  updateVisitor(status: boolean, visitorId: string) {
    if (status == true) {
      this.visitorCheckIn(visitorId);

    }
    if (status == false) {
      this.visitorCheckOut(visitorId);
    }
  }

  visitorCheckIn(visitorId: string) {
    this.loading = true;
    var data = {
      checkin: true,
      checkinDate: new Date(),
      checkout: false,
      checkoutDate: null
    }
    this.residentService.updateVisitor(visitorId, data).subscribe((res: any) => {
      this.loading = false;
      this.notifier.notify(NotificationType.SUCCESS, "CheckedIn Successfully");
      this.getVisitors();
    }, (error: any) => {
      this.notifier.notify(error, "An Error Occurred");
    });
  }

  visitorCheckOut(visitorId: string) {
    this.loading = true;
    var data = {
      checkout: true,
      checkoutDate: new Date(),
      checkin: false,
      checkinDate: null
    }
    this.residentService.updateVisitor(visitorId, data).subscribe((res: any) => {
      this.loading = false;
      this.notifier.notify(NotificationType.SUCCESS, "CheckedOut Successfully");
      this.getVisitors();
    }, (error: any) => {
      this.notifier.notify(error, "An Error Occurred");
    });
  }





}
