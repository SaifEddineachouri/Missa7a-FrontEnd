import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppointmentsRequestsComponent } from './list-appointments-requests.component';

describe('ListAppointmentsRequestsComponent', () => {
  let component: ListAppointmentsRequestsComponent;
  let fixture: ComponentFixture<ListAppointmentsRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAppointmentsRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAppointmentsRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
