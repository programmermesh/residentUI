import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LevyService } from 'src/app/services/levy.service';

@Component({
  selector: 'app-levy',
  templateUrl: './levy.component.html',
  styleUrls: ['./levy.component.css']
})
export class LevyComponent implements OnInit {

  levyForm!: FormGroup;
  levies: any= [];
  constructor(private levyService:LevyService,private loaderService: NgxUiLoaderService, private fb:FormBuilder) { }

  ngOnInit() {
   
    this.levyForm = this.fb.group({
      levyType: [''],
      apartmentType: ['Select Apartment'],
      amount: ['']
    })
    this.getLevies();
  }

  addLevy(){
    this.levyService.addLevy(this.levyForm.value).subscribe((res:any) => {
      this.getLevies();
    })
    
  }

  getLevies(){
    this.loaderService.start();
    this.levyService.getLevies().subscribe((res:any) => {
      this.levies = res;
      this.loaderService.stop();
    })
  }

  deleteLevy(levyId: number) {
    this.levyService.deleteLevy(levyId).subscribe((res:any) => {
      this.getLevies();
    })
  }


}
