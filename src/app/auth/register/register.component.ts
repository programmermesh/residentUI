import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormValidation } from '../helpers/form-validation';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private formValidation: FormValidation
  ) {
    this.form = this.formValidation.registerForm();
  }

  ngOnInit(): void {}

  registerUser(value: any) {
    this.authService.registerUser(value).subscribe(
      (res: any) => {
        console.log(res);
        if (res.ResponseCode == '00') {
        } else {
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
