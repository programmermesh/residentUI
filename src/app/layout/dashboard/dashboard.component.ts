import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartOptions, ChartType } from 'chart.js';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Resident } from 'src/app/Utils/Models/resident';
import { Visitor } from 'src/app/Utils/Models/visitor';
import { NotificationType } from 'src/app/Utils/notification.enum';
import { NoticeService } from 'src/app/services/Notice/notice.service';
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
  n: number = 1;
  searchVisitorfilter: string = '';
  residents: any = [];
  selectedResidentData: Resident = {};
  searchResidentFilter: string = '';
  loadingRecord: boolean = false;
  residentDetailsLoading: boolean = false;
  getAllNotices: any = [];
  loggedInUser: any;
  userType: any;
  constructor(private residentService: ResidentService,
    private loaderService: NgxUiLoaderService,
    private noticeService: NoticeService,
    private notifier: NotificationService) { }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(sessionStorage.getItem('user')!);
    this.userType = this.loggedInUser.type;
    this.getVisitors()
    this.getResidents()
    this.getAllNoticesMethod()
  }

  getResidents() {
    this.loadingRecord = true;
    this.residentService.getResidents().subscribe((res: any) => {
      this.residents = res.resident;
      this.loadingRecord = false;
    },error=>{
      this.residents =[]
      console.log(error);
      
    });
  }

  getResidentById(residentId: string) {
  this.residentDetailsLoading = true;
    this.residentService.getResidentById(residentId).subscribe((res: any) => {
      this.selectedResidentData = res.resident;
    // this.residentDetailsLoading = false;
      this.loaderService.stop();
    });
  }


  getVisitors() {
  this.loadingRecord = true;
    this.residentService
      .getVisitors()
      .subscribe((res: any) => {
        // this.visitors = res.visitor;

        this.visitors = res.visitor.filter((x: any) => (x.checkin == true) || (x.checkin == false && x.checkout == false))
       this.loadingRecord = false;
      }, error => {
       this.loadingRecord = false;
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

  /**
 * get all notices
 */
  getAllNoticesMethod() {
    this.noticeService.GetAllNotices().subscribe({
      next: (res: any) => {
        this.getAllNotices = res.notice;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => { },
    });
  }

  visitorCheckIn(visitorId: string) {
    var data = {
      checkin: true,
      checkinDate: new Date(),
      checkout: false,
      checkoutDate: null
    }
    this.residentService.updateVisitor(visitorId, data).subscribe((res: any) => {
      this.notifier.notify(NotificationType.SUCCESS, "CheckedIn Successfully");
      this.getVisitors();
    }, (error: any) => {
      this.notifier.notify(error, "An Error Occurred");
    });
  }

  visitorCheckOut(visitorId: string) {
    var data = {
      checkout: true,
      checkoutDate: new Date(),
      checkin: false,
      checkinDate: null
    }
    this.residentService.updateVisitor(visitorId, data).subscribe((res: any) => {
      this.notifier.notify(NotificationType.SUCCESS, "CheckedOut Successfully");
      this.getVisitors();
    }, (error: any) => {
      this.notifier.notify(error, "An Error Occurred");
    });
  }





}
