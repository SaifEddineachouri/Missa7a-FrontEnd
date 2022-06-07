import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnconfirmAppointmentRequestComponent } from './unconfirm-appointment-request.component';

describe('UnconfirmAppointmentRequestComponent', () => {
  let component: UnconfirmAppointmentRequestComponent;
  let fixture: ComponentFixture<UnconfirmAppointmentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnconfirmAppointmentRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnconfirmAppointmentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
