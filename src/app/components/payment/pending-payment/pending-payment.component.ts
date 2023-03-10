import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PendingPayment } from 'src/app/Utils/Models/pendingPayment';
import { NotificationType } from 'src/app/Utils/notification.enum';
import { LevyService } from 'src/app/services/levy.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ResidentService } from 'src/app/services/resident.service';

@Component({
  selector: 'app-pending-payment',
  templateUrl: './pending-payment.component.html',
  styleUrls: ['./pending-payment.component.css']
})
export class PendingPaymentComponent implements OnInit {
  levies: any = [];
  levy: any
  residentId: string = "";
  resident: any;
  loading: boolean = false
  pendingPaymentList: any = []
  newPendingPaymentButton: boolean = false
  disabled: boolean = true
  imageSrc: string = "";
  month: string = "Select Month";
  year: string = "Select Year";
  constructor(
    private route: ActivatedRoute,
    private levyService: LevyService,
    private paymentService: PaymentService,
    private residentService: ResidentService,
    private loaderService: NgxUiLoaderService,
    private notifier: NotificationService
  ) { }

  async ngOnInit() {

    this.residentId = this.route.snapshot.queryParamMap.get('residentId')!;
    if (this.residentId) {
      this.newPendingPaymentButton = true;
      this.getResidentById();
    }
    this.getPendingPayments()
    this.getLevies()
 
  }

  makePendingPayment() {
  
    this.loading = true;
    let data: PendingPayment = {
      month: this.month,
      year: this.year,
      status: "Pending",
      levy: this.levy.levyType,
      amount: this.levy.amount,
      houseType: this.resident.houseType,
      residentId: this.residentId,
      fullName: this.resident.lastname + " " + this.resident.other_names,
      houseNumber: this.resident.houseNumber,
      processed: "No",
      file: this.imageSrc

    }
    this.paymentService.makePendingPayment(data).subscribe((res: any) => {
      this.loading = false;
      if (res.ResponseCode == "00") {
        this.notifier.notify(NotificationType.SUCCESS, res.ResponseDescription)
        this.getPendingPayments()
      }
      else {
        this.notifier.notify(NotificationType.ERROR, res.ResponseDescription)
      }

    }, error => {
      this.loading = false
      this.notifier.notify(NotificationType.ERROR, "An Error Occured")
    })

  }

  getPendingPayments() {
    this.loaderService.start()
    this.paymentService.getPendingPayment().subscribe((res: any) => {
      this.pendingPaymentList = res.payment
      console.log(res);
      this.loaderService.stop()
    }, error => {
      this.loaderService.stop()
      this.notifier.notify(NotificationType.ERROR, "An Error Occured")
    })
  }

  onSelectedLevy(e: any) {
    var levy = this.levies.filter((x: any) => x.levyType == e.target.value)
    this.levy = levy[0]



  }
  async getLevies() {
    this.levyService.getLevies().subscribe((res: any) => {
      this.levies = res;

    })
  }

  getResidentById() {
    this.residentService
      .getResidentById(this.residentId)
      .subscribe((res: any) => {
        this.resident = res.resident
        console.log(this.resident);

      })
  }

  onSelectedImage(e: any) {
    var file = e.target.files[0];

    if (!file) {
      this.notifier.notify(NotificationType.WARNING, "Please Select an Image")
    }
    else {

      //  claculate file max file size to upload
      var fileSize = file.size / 1024; // in KB

      console.log(fileSize);

      if (fileSize > 25) {

        this.notifier.notify(NotificationType.WARNING, "Size too large, Image should not be more than 25kb")
        return;
      }



      // only allow jpe,png, and jpeg
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        this.notifier.notify(NotificationType.WARNING, "Invalid Image Format")
        return;
      }

      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }



  }

  _handleReaderLoaded(e: any) {
    let reader = e.target;
    this.imageSrc = reader.result;

  }




}
