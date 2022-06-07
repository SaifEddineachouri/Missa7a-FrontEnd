import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayConsultationComponent } from './pay-consultation.component';

describe('PayConsultationComponent', () => {
  let component: PayConsultationComponent;
  let fixture: ComponentFixture<PayConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayConsultationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
