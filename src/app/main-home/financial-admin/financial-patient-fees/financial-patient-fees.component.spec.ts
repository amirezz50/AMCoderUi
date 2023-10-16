import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialPatientFeesComponent } from './financial-patient-fees.component';

describe('FinancialPatientFeesComponent', () => {
  let component: FinancialPatientFeesComponent;
  let fixture: ComponentFixture<FinancialPatientFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialPatientFeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialPatientFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
