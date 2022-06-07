import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPrescriptionComponent } from './details-prescription.component';

describe('DetailsPrescriptionComponent', () => {
  let component: DetailsPrescriptionComponent;
  let fixture: ComponentFixture<DetailsPrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsPrescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
