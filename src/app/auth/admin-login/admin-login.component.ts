import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/Utils/notification.enum';
import { NotificationService } from 'src/app/services/notification.service';
import { FormValidation } from '../helpers/form-validation';
import { SessionService } from '../service/session.service';
import { LoginData } from 'src/app/Utils/Models/LoginData';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  form!: FormGroup;
  loading: boolean = false;
  constructor(private authService: AuthService, private notifier: NotificationService, private sessionService: SessionService, private router: Router, private formValidation: FormValidation) {
    this.form = this.formValidation.loginForm();
  }

  ngOnInit(): void {
    sessionStorage.clear()
  }

  loginUser(value: LoginData) {
    this.loading = true;
    this.authService.loginAsAdmin(value).subscribe(
      (res: any) => {
        this.loading = false;
        if (res) {
          this.notifier.notify(NotificationType.SUCCESS, "Login Successful");
          this.sessionService.setToken(res.token);
          this.sessionService.setLoggedInUser(res);
          this.router.navigate(['/home']);
        }
    


      },
      (error) => {
        this.loading = false;
          this.notifier.notify(NotificationType.ERROR, error.error.message);

      }
    );
  }



}
