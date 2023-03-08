import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificationType } from 'src/app/Utils/notification.enum';
import { NotificationService } from 'src/app/services/notification.service';
import { ResidentService } from 'src/app/services/resident.service';

@Component({
  selector: 'app-manage-residents',
  templateUrl: './manage-residents.component.html',
  styleUrls: ['./manage-residents.component.css'],
})
export class ManageResidentsComponent implements OnInit {
  residentList: any = [];
  residentForm!: FormGroup;
  children: any = [];
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private residentService: ResidentService,
    private loaderService: NgxUiLoaderService,
    private router: Router,
    private notifier:NotificationService
  ) {}

  ngOnInit() {
    this.getResidents();
    this.residentForm = this.fb.group({
      lastname: [''],
      other_names: [''],
      gender: ['Select Gender'],
      status: ['Select Status'],
      phone_number1: [''],
      phone_number2: [''],
      dob: [''],
      employment_status: ['Select Employment Status'],
      profession: [''],
      date_of_entry: [''],
      spouseName: [''],
      spouse_dob: [''],
      numberOfChildren: [''],
      childrenName: [''],
      houseNumber: [''],
      houseType: ['Select House Type'],
      username: [''],
      password: [''],
    });
  }

  getResidents() {
    this.loaderService.start()
    this.residentService.getResidents().subscribe((res: any) => {
      this.residentList = res.resident;
      console.log(this.residentList);
      this.loaderService.stop()
    });
  }

  registerResident() {
    this.loading = true;
    this.residentForm.value.childrenName = this.children;
    this.residentService
      .registerResident(this.residentForm.value)
      .subscribe((res: any) => {
        this.loading = false;
        this.notifier.notify(NotificationType.SUCCESS,"Resident Registered Successfully")
       this.getResidents();
        this.residentForm.reset();
        this.children = [];
      });
  }
  addChild(e: any) {
    var child = e.target.value;
    if (this.children.length + 1 <= this.residentForm.value.numberOfChildren) {
      this.children.push(child);
      this.residentForm.controls['childrenName'].reset();
    }
    else{
this.notifier.notify(NotificationType.WARNING,"You have reached the maximum number of children")
    }
  }

  viewVisitors(id: any) {
  //  navigate to query params route of ?residentId=1
    this.router.navigate(['/home/visitor'], { queryParams: { residentId: id } });
  }

  deleteUser(id: any) {}
}
