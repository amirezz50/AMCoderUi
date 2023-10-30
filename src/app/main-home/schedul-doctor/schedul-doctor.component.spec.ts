import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulDoctorComponent } from './schedul-doctor.component';

describe('SchedulDoctorComponent', () => {
  let component: SchedulDoctorComponent;
  let fixture: ComponentFixture<SchedulDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
