import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Landlord } from 'src/app/Utils/Models/Landlord';
import { NotificationType } from 'src/app/Utils/notification.enum';
import { NotificationService } from 'src/app/services/notification.service';
import { ResidentService } from 'src/app/services/resident.service';

@Component({
  selector: 'app-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.css']
})
export class LandlordComponent implements OnInit {
  landlords: any = [];
  form!: FormGroup;
  loading: boolean = false;
  closeModal!: HTMLElement
  recordLoading: boolean = false;
  p: number = 1
  dataToDelete: any;
  residents: any = [];
  filterLandlord: any
  filterResident: any
  selectedLandlord?: Landlord;
  residentRecordLoading: boolean = false;
  noRecordFound: string = 'Select a to view residents';
  residentForm!: FormGroup;
  children: any = [];
  landlordDataToEdit:Landlord={
    lastname: '',
    other_names: '',
    address: '',
    phone1: '',
    phone2: '',
    gender: ''

  }
  constructor(
    private fb: FormBuilder,
    private loaderService: NgxUiLoaderService,
    private router: Router,
    private residentService: ResidentService,
    private notifier: NotificationService
  ) { }

  ngOnInit() {
    this.getLandlords();
    this.form = this.fb.group({
      lastname: [''],
      other_names: [''],
      gender: ['Select Gender'],
      address: [''],
      phone1: [''],
      phone2: ['']
    });

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
      nameOfLandLord: [''],
      streetName: ['', [Validators.required]],
      spouseName: [''],
      type: ['Resident'],
      spouse_dob: [''],
      numberOfChildren: [''],
      childrenName: [''],
      houseNumber: ['', [Validators.required]],
      houseType: ['Select House Type', [Validators.required]],
      landlordId: ['Select Landlord'],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
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

  registerLandlord() {
    this.loading = true;

    this.residentService
      .registerLandlord(this.form.value)
      .subscribe((res: any) => {
        console.log(res);

        this.loading = false;
        if (res.ResponseCode == "00") {
          this.notifier.notify(NotificationType.SUCCESS, "LandLord Registered Successfully")
          this.getLandlords();
          this.closeFormModal();
          this.form.reset();
        }
        else {
          this.notifier.notify(NotificationType.ERROR, res.ResponseDescription)
        }
      }, error => {
        this.loading = false;
        this.notifier.notify(NotificationType.ERROR, error.error.message)
      });
  }

  updateLandLord(id:any) {
    

    this.loading = true;
    this.residentService.updateLandlord(id,this.landlordDataToEdit).subscribe((res: any) => {
      this.loading = false;
      if (res.ResponseCode == "00") {
        this.notifier.notify(NotificationType.SUCCESS, "LandLord Updated Successfully")
        this.getLandlords();
        this.closeEditLandLordFormModal();
        this.form.reset();
      }
      else {
        this.notifier.notify(NotificationType.ERROR, res.ResponseDescription)
      }
    }, error => {
      this.loading = false;
      this.notifier.notify(NotificationType.ERROR, error.error.message)
    });
  
   


  }
  getSelectedLandLord(landlord: any) {
    this.selectedLandlord = landlord
    this.landlordDataToEdit = landlord
    
  }
  getResidentByLandlordsById(landlord: any) {
    this.residentRecordLoading = true
    this.selectedLandlord = landlord
    this.residentService.getLandLordsResidents(landlord.id).subscribe((res: any) => {
      this.residents = res.tenants;
      this.residentRecordLoading = false
      if (res.ResponseCode == "99") {
        this.residents = []

        this.noRecordFound = "No Resident Found!"
      }

    }, error => {
      if (error.statusCode == 404) {
        this.residents = []
      }
      this.noRecordFound = "No Record Found"

      this.residentRecordLoading = false
    })
  }

  viewResidents(id: any) {
    //  navigate to query params route of ?residentId=1
    this.router.navigate(['/home/landlord/'], { queryParams: { landLordId: id } });
  }

  closeFormModal() {
    this.closeModal = document.getElementById('close') as HTMLElement;
    this.closeModal.click()
  }

  closeEditLandLordFormModal() {
    this.closeModal = document.getElementById('editLandlord') as HTMLElement;
    this.closeModal.click()
  }
  closeDeleteModal() {
    this.closeModal = document.getElementById('closeDelete') as HTMLElement;
    this.closeModal.click()
  }

  closeResidentFormModal() {
    this.closeModal = document.getElementById('closeRegisterResidentForm') as HTMLElement;
    this.closeModal.click()
  }


  confirmDelete(data: any) {
    this.dataToDelete = data
    console.log(this.dataToDelete);


  }
  deleteLandlord(id: any) {
    this.loading = true;
    this.residentService.deleteResident(id).subscribe((res: any) => {
      this.notifier.notify(NotificationType.SUCCESS, "Landlords Deleted Successfully")
      this.getLandlords();
      this.loading = false;
      this.closeDeleteModal();
    }, error => {
      this.loading = false;
      this.notifier.notify(NotificationType.ERROR, error.error.message)
    })
  }

  deleteResident(id: any) {
    this.loading = true;
    this.residentService.deleteResident(id).subscribe((res: any) => {
      this.notifier.notify(NotificationType.SUCCESS, "Resident Deleted Successfully")
      this.loading = false;
      this.closeDeleteModal();
    }, error => {
      this.loading = false;
      this.notifier.notify(NotificationType.ERROR, error.error.message)
    })
  }


  registerResident() {
    this.loading = true;
    this.residentForm.value.childrenName = this.children;
    this.residentForm.value.landlordId = this.selectedLandlord?.id;
    this.residentForm.value.nameOfLandLord = this.selectedLandlord?.lastname + " " + this.selectedLandlord?.other_names;
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
          this.getResidentByLandlordsById(this.selectedLandlord?.id);
          this.closeResidentFormModal();
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
}
