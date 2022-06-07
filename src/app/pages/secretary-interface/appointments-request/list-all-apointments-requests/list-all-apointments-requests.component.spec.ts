import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllApointmentsRequestsComponent } from './list-all-apointments-requests.component';

describe('ListAllApointmentsRequestsComponent', () => {
  let component: ListAllApointmentsRequestsComponent;
  let fixture: ComponentFixture<ListAllApointmentsRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllApointmentsRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllApointmentsRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
