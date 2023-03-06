import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidation } from '../helpers/form-validation';
import { AuthService } from '../service/auth.service';
import { SessionService } from '../service/session.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/Utils/notification.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading: boolean = false;
  constructor(private authService: AuthService, private notifier: NotificationService, private sessionService: SessionService, private router: Router, private formValidation: FormValidation) {
    this.form = this.formValidation.loginForm();
  }

  ngOnInit(): void {

  }

  loginUser(value: any) {
    this.loading = true;
    this.authService.loginUser(value).subscribe(
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
