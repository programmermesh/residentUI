import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Resident } from 'src/app/Utils/Models/resident';
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
  closeModal!: HTMLElement
  recordLoading: boolean = false;
  p: number = 1
  dataToDelete: any;
  landlords: any = [];
  residentDataToEdit: Resident = {
    lastname: '',
    other_names: '',
    childrenName: '',
    date_of_entry: '',
    dob: '',
    employment_status: '',
    gender: '',
    houseNumber: '',
    houseType: '',
    landlordId: '',
    nameOfLandLord: '',
    numberOfChildren: '',
    phone_number1: '',
    phone_number2: '',
    profession: '',
    spouseName: '',
    spouse_dob: '',
    status: '',
    streetName: '',
    username: '',
    password: '',
    type: ''
  }
  selectedResident: any;
  selectedResidentChildren:any=[]
  constructor(
    private fb: FormBuilder,
    private residentService: ResidentService,
    private loaderService: NgxUiLoaderService,
    private router: Router,
    private notifier: NotificationService
  ) { }

  ngOnInit() {
    this.getResidents();
    this.getLandlords();
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
      spouseName: [''],
      spouse_dob: [''],
      numberOfChildren: ['', [Validators.required]],
      childrenName: ['', [Validators.required]],
      houseNumber: ['', [Validators.required]],
      houseType: ['Select House Type', [Validators.required]],
      landlordId: ['Select Landlord', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  getResidents() {
    this.recordLoading = true
    this.residentService.getResidents().subscribe((res: any) => {
      this.residentList = res.resident;
      console.log(this.residentList);
      this.recordLoading = false
    }, error => {
      this.residentList = []
      this.recordLoading = false

    });
  }

  registerResident() {
    this.loading = true;
    this.residentForm.value.childrenName = this.children;
    var selectedLandlord = this.landlords.filter((x: any) => x.id == this.residentForm.value.landlordId)
    this.residentForm.value.nameOfLandLord = selectedLandlord[0].lastname + " " + selectedLandlord[0].other_names;
    if (this.residentForm.invalid) {
      this.notifier.notify(NotificationType.ERROR, "Please fill in all required fields")
      this.loading = false;
      return;
    }
    this.residentService
      .registerResident(this.residentForm.value)
      .subscribe((res: any) => {
        this.loading = false;
        if (res.ResponseCode == "00") {
          this.notifier.notify(NotificationType.SUCCESS, "Resident Registered Successfully")
          this.getResidents();
          this.closeFormModal();
          this.residentForm.reset();
          this.children = [];
        }
        else {
          this.notifier.notify(NotificationType.ERROR, res.ResponseDescription)
        }
      }, error => {
        this.loading = false;
        this.notifier.notify(NotificationType.ERROR, error.error.message)
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

  getLandlords() {
    this.recordLoading = true
    this.residentService.getLandlords().subscribe((res: any) => {
      this.landlords = res.users;
      console.log(this.landlords);
      this.recordLoading = false
    }, error => {
      this.recordLoading = false
    });
  }
  viewVisitors(id: any) {
    this.router.navigate(['/home/visitor'], { queryParams: { residentId: id } });
  }

  closeFormModal() {
    this.closeModal = document.getElementById('close') as HTMLElement;
    this.closeModal.click()
  }
  closeDeleteModal() {
    this.closeModal = document.getElementById('closeDelete') as HTMLElement;
    this.closeModal.click()
  }

  confirmDelete(data: any) {
    this.dataToDelete = data

  }
  deleteUser(id: any) {
    this.loading = true;
    this.residentService.deleteResident(id).subscribe((res: any) => {
      this.notifier.notify(NotificationType.SUCCESS, "Resident Deleted Successfully")
      this.getResidents();
      this.loading = false;
      this.closeDeleteModal();
    }, error => {
      this.loading = false;
      this.notifier.notify(NotificationType.ERROR, error.error.message)
    })
  }


  getResidentToEdit(data:any){
    this.selectedResident = data
    this.residentDataToEdit = data
    
    
  }
  updateResident(id:any){
    this.loading = true;
    this.residentService.updateResident(id,this.residentDataToEdit).subscribe((res: any) => {
      this.loading = false;
      if (res.ResponseCode == "00") {
        this.notifier.notify(NotificationType.SUCCESS, "Resident Updated Successfully")
        this.getResidents();
        this.closeEditResidentFormModal();
  
      }
      else {
        this.notifier.notify(NotificationType.ERROR, res.ResponseDescription)
      }
    }, error => {
      this.loading = false;
      this.notifier.notify(NotificationType.ERROR, error.error.message)
    });
  

  }
  closeEditResidentFormModal() {
    this.closeModal = document.getElementById('closeEditResidentForm') as HTMLElement;
    this.closeModal.click()	
  }
}
