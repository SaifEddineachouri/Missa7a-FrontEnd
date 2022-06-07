import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMedicalActComponent } from './create-medical-act.component';

describe('CreateMedicalActComponent', () => {
  let component: CreateMedicalActComponent;
  let fixture: ComponentFixture<CreateMedicalActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMedicalActComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMedicalActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
