import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ResidentService } from 'src/app/services/resident.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit {
  visitors: any=[];

  constructor(
    private residentService: ResidentService,
  ) { }

  ngOnInit(): void {
  }

  getVisitors() {
    this.residentService
      .getVisitors()
      .subscribe((res: any) => {
        this.visitors = res.visitor;
      },error=>{
      
      });
  }

  

}
