import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicSetupAdminComponent } from './dynamic-setup-admin.component';

describe('DynamicSetupAdminComponent', () => {
  let component: DynamicSetupAdminComponent;
  let fixture: ComponentFixture<DynamicSetupAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicSetupAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicSetupAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
