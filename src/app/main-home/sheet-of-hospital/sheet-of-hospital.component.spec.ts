import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetOfHospitalComponent } from './sheet-of-hospital.component';

describe('SheetOfHospitalComponent', () => {
  let component: SheetOfHospitalComponent;
  let fixture: ComponentFixture<SheetOfHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SheetOfHospitalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetOfHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
