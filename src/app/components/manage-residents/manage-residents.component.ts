import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private residentService: ResidentService
  ) {}

  ngOnInit() {
    this.getResidents();
    this.residentForm = this.fb.group({
      fullName: [''],
      gender: ['Select Gender'],
      status: [''],
      spouseName: [''],
      numberOfChildren: [''],
      childrenName: [''],
      houseNumber: [''],
      houseType: [''],
      username: [''],
      password: [''],
    });
  }

  getResidents() {
    this.residentService.getResidents().subscribe((res: any) => {
      this.residentList = res.resident;
      console.log(this.residentList);
    });
  }

  registerResident() {
    this.residentForm.value.childrenName = this.children;
    console.log(this.residentForm.value);

    this.residentService
      .registerResident(this.residentForm.value)
      .subscribe((res: any) => {
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
  }

  deleteUser(id: any) {}
}
