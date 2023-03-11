import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  showStep1: boolean = true;
  showStep2: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loaderService: NgxUiLoaderService,
    private router: Router,
    private notifier: NotificationService
  ) { }

  ngOnInit(): void {
    this.residentForm = this.fb.group({
      lastname: ['', [Validators.required]],
      other_names: ['', [Validators.required]],
      gender: ['Select Gender', [Validators.required]],
      status: ['Select Status', [Validators.required]],
      phone_number1: ['', [Validators.required]],
      phone_number2: [''],
      dob: ['', [Validators.required]],
      employment_status: ['Select Employment Status', [Validators.required]],
      profession: ['', [Validators.required]],
      date_of_entry: ['', [Validators.required]],
      nameOfLandLord: ['', [Validators.required]],
      streetName: ['', [Validators.required]],
      spouseName: ['', [Validators.required]],
      spouse_dob: ['', [Validators.required]],
      numberOfChildren: ['', [Validators.required]],
      childrenName: ['', [Validators.required]],
      houseNumber: ['', [Validators.required]],
      houseType: ['Select House Type', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      type: ['Resident']
    });
  }



  registerResident() {
    this.loading = true;
    if (!this.residentForm.valid) {
      return this.notifier.notify(NotificationType.ERROR, "Please fill all required fields");
      
    }
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
          this.notifier.notify(NotificationType.ERROR, res.ResponseDescription)
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

  gotoStep2() {
    this.showStep1 = false;
    this.showStep2 = true;
  }

  goBack() {
    this.showStep1 = true;
    this.showStep2 = false;
  }
}
