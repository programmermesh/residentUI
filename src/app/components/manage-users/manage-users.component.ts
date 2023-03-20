import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { IUser } from 'src/app/Utils/Models/User';
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
  dataToDelete: any;
  selecteduser: any;
  updatedPassword: any;
  // userDataToEdit: IUser = {
  //   lastname: '',
  //   other_names: '',
  //   gender: '',
  //   username: '',
  //   type: '',

  // }
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
  closeDeleteModal() {
    this.closeModal = document.getElementById('closeDelete') as HTMLElement;
    this.closeModal.click()
  }
  closeEditModal() {
    this.closeModal = document.getElementById('editUser') as HTMLElement;
    this.closeModal.click()
  }

  confirmDelete(data: any) {
    this.dataToDelete = data

  }

  deleteUser(id: any) {
    this.loading = true;
    this.userService.deleteUser(id).subscribe((data: any) => {
      console.log(data);
      this.getAllUsers()
      this.closeDeleteModal()
      this.loading = false;
    })
  }

  getUserToEdit(data: any) {
    this.selecteduser = data

  }


  editUser(id: any) {
    this.loading = true;
    if(this.updatedPassword == "" || this.updatedPassword == undefined){
      this.loading = false;
    return  this.notifier.notify(NotificationType.ERROR, "Password cannot be empty")
    }
    var data = {
      password: this.updatedPassword
    };
    this.userService.resetPassword(data, id).subscribe((data: any) => {
      this.loading = false;
      this.closeEditModal()
      this.updatedPassword=""
      this.getAllUsers()
      this.notifier.notify(NotificationType.SUCCESS, "User Updated Successfully")
    },error=>{
      this.loading = false;
      this.notifier.notify(NotificationType.ERROR, error.error.message)
    })

  }



}
