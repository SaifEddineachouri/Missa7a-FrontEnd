import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandAppointmentComponent } from './demand-appointment.component';

describe('DemandAppointmentComponent', () => {
  let component: DemandAppointmentComponent;
  let fixture: ComponentFixture<DemandAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
