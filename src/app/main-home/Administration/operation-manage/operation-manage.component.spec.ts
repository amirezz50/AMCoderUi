import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationManageComponent } from './operation-manage.component';

describe('OperationManageComponent', () => {
  let component: OperationManageComponent;
  let fixture: ComponentFixture<OperationManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
