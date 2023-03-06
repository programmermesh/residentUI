import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseIncomeComponent } from './expense-income.component';

describe('ExpenseIncomeComponent', () => {
  let component: ExpenseIncomeComponent;
  let fixture: ComponentFixture<ExpenseIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseIncomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
