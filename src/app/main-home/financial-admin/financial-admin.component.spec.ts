import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialAdminComponent } from './financial-admin.component';

describe('FinancialAdminComponent', () => {
  let component: FinancialAdminComponent;
  let fixture: ComponentFixture<FinancialAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
