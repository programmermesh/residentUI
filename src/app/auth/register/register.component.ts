import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormValidation } from '../helpers/form-validation';
import { AuthService } from '../service/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/Utils/notification.enum';
import { NotificationService } from 'src/app/services/notification.service';
import { ResidentService } from 'src/app/services/resident.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  residentList: any = [];
  residentForm!: FormGroup;
  children: any = [];
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loaderService: NgxUiLoaderService,
    private router: Router,
    private notifier: NotificationService
  ) { }

  ngOnInit(): void {
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
      houseType: [''],
      username: [''],
      password: [''],
    });
  }

  registerUser(value: any) {
    this.authService.registerResident(value).subscribe(
      (res: any) => {
        this.loaderService.stop();
        console.log(res);
        if (res.ResponseCode == '00') {
        } else {
        }
      },
      (error) => {
        this.loaderService.stop();
        console.log(error);
      }
    );
  }

  registerResident() {
    this.loading = true;
    this.residentForm.value.childrenName = this.children;
    this.authService
      .registerResident(this.residentForm.value)
      .subscribe((res: any) => {
        this.loading = false;
        if (res.ResponseCode == '00') {
          this.notifier.notify(NotificationType.SUCCESS, "Resident Registered Successfully")
          this.residentForm.reset();
          this.children = [];
          this.router.navigateByUrl('login');
        }
        else {
          this.notifier.notify(NotificationType.ERROR, res.ResponseMessage)
        }
      }, error => {
        this.loading = false;
        this.notifier.notify(NotificationType.ERROR, "An error occurred")
      });
  }
  addChild(e: any) {
    var child = e.target.value;
    if (this.children.length + 1 <= this.residentForm.value.numberOfChildren) {
      this.children.push(child);
      this.residentForm.controls['childrenName'].reset();
    }
    else {
      this.notifier.notify(NotificationType.WARNING, "You have reached the maximum number of children")
    }
  }
}
