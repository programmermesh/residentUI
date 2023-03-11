import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
loggedInUser:any;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.loggedInUser=JSON.parse(sessionStorage.getItem('user')!);
  }


  logout(){
    sessionStorage.clear()
    this.router.navigateByUrl("/login")
  }


}
