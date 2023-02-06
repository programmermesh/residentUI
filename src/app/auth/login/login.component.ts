import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidation } from '../helpers/form-validation';
import { AuthService } from '../service/auth.service';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
 form!:FormGroup;
  constructor(private authService:AuthService,private sessionService:SessionService,private router:Router, private formValidation:FormValidation) { 
    this.form=this.formValidation.loginForm();
  }

  ngOnInit(): void {


  }

  loginUser(value:any){
    this.authService.loginUser(value).subscribe(
      (res:any)=>{
        console.log(res);
          this.sessionService.setToken(res.token);
          this.sessionService.setLoggedInUser(res);
          this.router.navigate(['/home']);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

}
