import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePaymentComponent } from './approve-payment.component';

describe('ApprovePaymentComponent', () => {
  let component: ApprovePaymentComponent;
  let fixture: ComponentFixture<ApprovePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovePaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
