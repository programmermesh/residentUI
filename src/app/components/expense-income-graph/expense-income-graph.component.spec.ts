import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseIncomeGraphComponent } from './expense-income-graph.component';

describe('ExpenseIncomeGraphComponent', () => {
  let component: ExpenseIncomeGraphComponent;
  let fixture: ComponentFixture<ExpenseIncomeGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseIncomeGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseIncomeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
