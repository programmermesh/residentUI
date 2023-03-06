import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormValidation } from '../helpers/form-validation';
import { AuthService } from '../service/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private formValidation: FormValidation,
    private loaderService: NgxUiLoaderService
  ) {
    this.form = this.formValidation.registerForm();
  }

  ngOnInit(): void {}

  registerUser(value: any) {
    this.loaderService.start();
    this.authService.registerUser(value).subscribe(
      (res: any) => {
        this.loaderService.stop();
        console.log(res);
        if (res.ResponseCode == '00') {
        } else {
        }
      },
      (error) => {
        this.loaderService.stop();
        console.log(error);
      }
    );
  }
}
