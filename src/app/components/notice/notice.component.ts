import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormValidation } from 'src/app/auth/helpers/form-validation';
import { NoticeService } from 'src/app/services/Notice/notice.service';
import { AllNotices, CreateANotice } from 'src/app/Utils/Models/notice';
declare var $: any;
@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css'],
})
export class NoticeComponent implements OnInit {
  public getAllNotices!: [AllNotices];
  public createNewNotice!: FormGroup;
  public requestedData! : AllNotices;
  public isUpdate : boolean = false;
  public idToBeUpdated = "";
  constructor(
    public noticeService: NoticeService,
    public formvalidation: FormValidation
  ) {
    this.createNewNotice = this.formvalidation.CreateNewNoticeForm();
  }

  ngOnInit(): void {
    this.getAllNoticesMethod();

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
      complete: () => {},
    });
  }

  /**
   * create new Notice
   */
  CreateNewNoticeMethod(value: any) {
    let newNotice: CreateANotice = {
      title: value.title,
      content: value.content,
    };
    console.log(value);
    this.noticeService.CreateANotice(newNotice).subscribe({
      next: (res: any) => {
        if (res.responseCode == '00') {
          alert(res.ResponseDescription);
        }
        this.getAllNoticesMethod(); // get new notices
        this.createNewNotice.reset();
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  /**
   * edit a notice
   */
  editNotice(notice:AllNotices ) {
this.idToBeUpdated = notice.id;
    this.createNewNotice.patchValue({
      title: notice.title,
      id: notice.id,
      content: notice.content
    })
    let myModal:any = document.getElementById('createNoticeModal');
    debugger
        myModal.click()
  //  $('#createNoticeModal').modal('show');
  }

  /**
   * Update a notice by Id
   */

  UpdateNotice() {
   debugger

    this.noticeService.UpdateANoticeById(this.idToBeUpdated)
    .subscribe({
      next: (res: any) => {
        if (res.responseCode == '00') {
          alert(res.ResponseDescription);
          this.getAllNotices = res.notice;
        }
      },
      error: (err) => {
        
        console.log(err);
      },
      complete: () => {},
    });
  }


confirmDelete(notice : AllNotices){
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
          alert(res.ResponseDescription);
          this.getAllNotices = res.notice;
        }
  
      },
      error: (err) => {
        
        console.log(err);
      },
      complete: () => {},
    });
  }
}
