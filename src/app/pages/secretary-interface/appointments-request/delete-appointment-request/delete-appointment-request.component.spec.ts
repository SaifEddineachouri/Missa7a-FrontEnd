import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAppointmentRequestComponent } from './delete-appointment-request.component';

describe('DeleteAppointmentRequestComponent', () => {
  let component: DeleteAppointmentRequestComponent;
  let fixture: ComponentFixture<DeleteAppointmentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAppointmentRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAppointmentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
