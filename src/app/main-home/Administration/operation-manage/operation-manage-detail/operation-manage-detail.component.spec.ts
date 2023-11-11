import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationManageDetailComponent } from './operation-manage-detail.component';

describe('OperationManageDetailComponent', () => {
  let component: OperationManageDetailComponent;
  let fixture: ComponentFixture<OperationManageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationManageDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationManageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
