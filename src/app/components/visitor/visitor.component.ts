import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificationType } from 'src/app/Utils/notification.enum';
import { NotificationService } from 'src/app/services/notification.service';
import { ResidentService } from 'src/app/services/resident.service';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.css'],
})
export class VisitorComponent implements OnInit {
  visitorForm!: FormGroup;
  visitors: any = [];
  residentId!: string;
  resident: any;
  newVisitorButton: boolean=false;
  loading: boolean = false;
  recordLoading: boolean=false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private residentService: ResidentService,
    private loaderService: NgxUiLoaderService,
    private notifier: NotificationService
  ) {}

  ngOnInit(): void {
  this.residentId = this.route.snapshot.queryParamMap.get('residentId')!;
  
  if(this.residentId){
    this.newVisitorButton=true;
  }
    // this.getResidentById();

    this.visitorForm = this.fb.group({
      name: [''],
      discription: [''],
      checkin:[false],
      checkinDate:[null],
      checkout:[false],
      checkoutDate:[null],
      residentId: [this.residentId],
    });
    this.getVisitors();
  }

  getResidentById() {
   
    this.residentService
      .getResidentById(this.residentId)
      .subscribe((res: any) => {
        this.resident = res.resident;
        console.log(this.resident);
        
      },error=>{
      
      });
  }

  addVisitor() {
    this.loading = true;
    this.residentService
      .addVisitor(this.visitorForm.value)
      .subscribe((res: any) => {
        this.loading = false;
        if(res.ResponseCode=="00"){
          this.notifier.notify(NotificationType.SUCCESS,res.ResponseDescription)
          this.visitorForm.reset();
          this.getVisitors()
        }
        else{
          this.notifier.notify(NotificationType.ERROR,res.ResponseDescription)
        }
      },error=>{
        this.loading = false;
        this.notifier.notify(NotificationType.ERROR,error.error.message)
      });
  }

  getVisitors() {
    this.loaderService.start();
    this.residentService
      .getVisitors()
      .subscribe((res: any) => {
        this.visitors = res.visitor;
        this.loaderService.stop();
      },error=>{
        this.loaderService.stop();
      });
  }

  deleteVisitor(id: any) {}
}
