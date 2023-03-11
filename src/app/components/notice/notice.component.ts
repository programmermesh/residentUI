import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormValidation } from 'src/app/auth/helpers/form-validation';
import { NoticeService } from 'src/app/services/Notice/notice.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AllNotices, CreateANotice } from 'src/app/Utils/Models/notice';
import { NotificationType } from 'src/app/Utils/notification.enum';
declare var $: any;
@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css'],
})
export class NoticeComponent implements OnInit {
  public getAllNotices!: [AllNotices];
  public createNewNotice!: FormGroup;
  public requestedData: any;
  public isUpdate: boolean = false;
  loading: boolean = false;
  loggedInUser: any;
  userType: any;
  constructor(
    public noticeService: NoticeService,
    public formvalidation: FormValidation,
    private loaderService: NgxUiLoaderService,
    private notifier: NotificationService
  ) {
    this.createNewNotice = this.formvalidation.CreateNewNoticeForm();
  }

  ngOnInit(): void {
    this.getAllNoticesMethod();
    this.loggedInUser = JSON.parse(sessionStorage.getItem('user')!);
    this.userType = this.loggedInUser.type;
  }
  /**
   * get all notices
   */
  getAllNoticesMethod() {
    this.noticeService.GetAllNotices().subscribe({
      next: (res: any) => {
        this.getAllNotices = res.notice;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => { },
    });
  }

  /**
   * create new Notice
   */
  CreateNewNoticeMethod(value: any) {
    this.loading = true;
    let newNotice: CreateANotice = {
      title: value.title,
      content: value.content,
    };
    console.log(value);
    this.noticeService.CreateANotice(newNotice).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res.ResponseCode == '00') {
          this.notifier.notify(NotificationType.SUCCESS, res.ResponseDescription);
          this.getAllNoticesMethod();
          this.createNewNotice.reset();
        }
        else {
          this.notifier.notify(NotificationType.ERROR, res.ResponseDescription);

        }


      },
      error: (err) => {
        console.log(err);
      },
      complete: () => { },
    });
  }

  /**
   * edit a notice
   */
  editNotice(notice: AllNotices) {

    this.createNewNotice.patchValue({
      title: notice.title,
      id: notice.id,
      content: notice.content
    })
    let myModal: any = document.getElementById('createNoticeModal');
    myModal.click()
    //  $('#createNoticeModal').modal('show');
  }

  /**
   * Update a notice by Id
   */

  UpdateNotice(id: string) {
    this.noticeService.UpdateANoticeById(id)
      .subscribe({
        next: (res: any) => {
          if (res.ResponseCode == '00') {
            alert(res.ResponseDescription);
            this.getAllNotices = res.notice;
          }
        },
        error: (err) => {

          console.log(err);
        },
        complete: () => { },
      });
  }


  confirmDelete(notice: AllNotices) {
    this.requestedData = notice;
  }

  /**
   * delete a notice by Id
   */

  deleteNotice(id: string) {
    this.noticeService.DeleteANoticeById(id)
      .subscribe({
        next: (res: any) => {
          if (res.responseCode == '00') {

            this.getAllNotices = res.notice;
          }
          this.getAllNoticesMethod()

        },
        error: (err) => {

          console.log(err);
        },
        complete: () => { },
      });
  }
}
