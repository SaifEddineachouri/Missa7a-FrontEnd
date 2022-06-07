import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAppointmentRequestComponent } from './confirm-appointment-request.component';

describe('ConfirmAppointmentRequestComponent', () => {
  let component: ConfirmAppointmentRequestComponent;
  let fixture: ComponentFixture<ConfirmAppointmentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmAppointmentRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmAppointmentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
