import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksAutoMatchedComponent } from './tasks-auto-matched.component';

describe('TasksAutoMatchedComponent', () => {
  let component: TasksAutoMatchedComponent;
  let fixture: ComponentFixture<TasksAutoMatchedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksAutoMatchedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksAutoMatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
