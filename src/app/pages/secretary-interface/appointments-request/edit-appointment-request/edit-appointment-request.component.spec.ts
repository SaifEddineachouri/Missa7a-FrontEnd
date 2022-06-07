import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppointmentRequestComponent } from './edit-appointment-request.component';

describe('EditAppointmentRequestComponent', () => {
  let component: EditAppointmentRequestComponent;
  let fixture: ComponentFixture<EditAppointmentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAppointmentRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAppointmentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
