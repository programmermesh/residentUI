import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageResidentsComponent } from './manage-residents.component';

describe('ManageResidentsComponent', () => {
  let component: ManageResidentsComponent;
  let fixture: ComponentFixture<ManageResidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageResidentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageResidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
