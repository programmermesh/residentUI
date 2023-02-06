import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';


// ** password  matching function i got custom 
// export function matchingInputsValidator(firstKey: string, secondKey: string) {
//   return function (group: FormGroup): ValidationErrors | undefined {
//     if (group.controls[firstKey].value !== group.controls[secondKey].value) {
//       return {
//         'missmatch': true
//       };
//     }
//   };
// }







@Injectable()
export class FormValidation {


  constructor(public formBuilder: FormBuilder) { }


  loginForm(){
    return this.formBuilder.group({
    username: new FormControl('', Validators.compose([Validators.minLength(1)])),
    password: new FormControl('', Validators.compose([Validators.minLength(1)])),
    })
  }

  /**
   * @todo Register form validation
   * @returns 
   */

  registerForm() {
    return this.formBuilder.group({
      fullName: new FormControl('', Validators.compose([Validators.minLength(1)])),
      username: new FormControl('', Validators.compose([Validators.minLength(1)])),
      gender: new FormControl('Select Gender', Validators.compose([Validators.required])),
      type: new FormControl('Select UserType', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        ),
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        ),
      ])),
     
    },
      {
        validator: this.ConfirmedValidator('password', 'confirmPassword'),
      });
    
  }


  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors
        // &&  !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }



 







}
