import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private residentService: ResidentService
  ) {}

  ngOnInit(): void {
    this.residentId = this.route.snapshot.params['id'];
    this.getResidentById();

    this.visitorForm = this.fb.group({
      name: [''],
      discription: [''],
      residentId: [this.residentId],
    });
  }

  getResidentById() {
    this.residentService
      .getResidentById(this.residentId)
      .subscribe((res: any) => {
        this.resident = res.resident;
        console.log(this.resident);
      });
  }

  addVisitor() {
    this.residentService
      .addVisitor(this.residentId, this.visitorForm.value)
      .subscribe((res: any) => {
        this.visitorForm.reset();
      });
  }

  getVisitors() {}

  deleteVisitor(id: any) {}
}
