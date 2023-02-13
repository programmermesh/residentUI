import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  userList: any;

  constructor(private userService:AuthService) { }

  ngOnInit() {
    this.getAllUsers()
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe((data:any)=>{
    
      this.userList=data.users
      console.log(this.userList);
    })
  }

  deleteUser(id:any){
    this.userService.deleteUser(id).subscribe((data:any)=>{
      console.log(data);
      this.getAllUsers()
    })
  }



}
