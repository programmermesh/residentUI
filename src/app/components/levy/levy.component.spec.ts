import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevyComponent } from './levy.component';

describe('LevyComponent', () => {
  let component: LevyComponent;
  let fixture: ComponentFixture<LevyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
