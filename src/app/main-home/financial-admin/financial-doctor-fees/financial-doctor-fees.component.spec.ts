import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialDoctorFeesComponent } from './financial-doctor-fees.component';

describe('FinancialDoctorFeesComponent', () => {
  let component: FinancialDoctorFeesComponent;
  let fixture: ComponentFixture<FinancialDoctorFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialDoctorFeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialDoctorFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
