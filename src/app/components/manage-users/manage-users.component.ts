import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificationType } from 'src/app/Utils/notification.enum';
import { AuthService } from 'src/app/auth/service/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  userList: any;
  userForm!: FormGroup
  loading: boolean = false
  recordLoading: boolean = false
  closeModal!: HTMLElement
  constructor(private userService: AuthService, private fb: FormBuilder, private loaderService: NgxUiLoaderService, private notifier: NotificationService) { }

  ngOnInit() {
    this.getAllUsers()

    this.userForm = this.fb.group({
      username: [''],
      lastname: [''],
      other_names: [''],
      gender: ['Select Gender'],
      type: ['Select User Type'],
      password: ['']
    })

  }

  createNewUser() {
    this.loading = true;
    this.userService.registerAdmin(this.userForm.value).subscribe((res: any) => {
      this.loading = false;
      if (res.ResponseCode == '00') {
        this.notifier.notify(NotificationType.SUCCESS, `${this.userForm.value.type} User Registered Successfully`)
        this.userForm.reset();
        this.closeFormModal()
        this.getAllUsers()
      }
      else {
        this.notifier.notify(NotificationType.ERROR, res.ResponseDescription)
      }
    }, error => {
      this.loading = false;
      this.notifier.notify(NotificationType.ERROR, "An error occurred")
    });

  }

  getAllUsers() {
    this.recordLoading = true
    this.userService.getAllUsers().subscribe((data: any) => {

      this.userList = data.users
      this.recordLoading = false
    }, error => {
      this.notifier.notify(NotificationType.ERROR, error.error.message)
      this.recordLoading = false
    }
    )
  }

  closeFormModal() {
    this.closeModal = document.getElementById('close') as HTMLElement;
    this.closeModal.click()
  }

  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe((data: any) => {
      console.log(data);
      this.getAllUsers()
    })
  }





}
