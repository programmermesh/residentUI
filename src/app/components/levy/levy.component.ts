import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificationType } from 'src/app/Utils/notification.enum';
import { LevyService } from 'src/app/services/levy.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-levy',
  templateUrl: './levy.component.html',
  styleUrls: ['./levy.component.css']
})
export class LevyComponent implements OnInit {

  levyForm!: FormGroup;
  levies: any= [];
  loading: boolean = false;
  constructor(private levyService:LevyService,private notifier :NotificationService,  private loaderService: NgxUiLoaderService, private fb:FormBuilder) { }

  ngOnInit() {
   
    this.levyForm = this.fb.group({
      levyType: [''],
      apartmentType: ['Select Apartment Type'],
      amount: ['']
    })
    this.getLevies();
  }

  addLevy(){
    this.loading=true;
    this.levyService.addLevy(this.levyForm.value).subscribe((res:any) => {
  
      this.loading=false;
      if(res.ResponseCode =="00"){
        this.notifier.notify(NotificationType.SUCCESS,res.ResponseDescription)
        this.getLevies();
      }else{
        this.notifier.notify(NotificationType.ERROR,res.ResponseDescription)
      }
    },error=>{
      this.loading=false;
      this.notifier.notify(NotificationType.ERROR,error.error.message)
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
