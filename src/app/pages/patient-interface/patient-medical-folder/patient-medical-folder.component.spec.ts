import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicalFolderComponent } from './patient-medical-folder.component';

describe('PatientMedicalFolderComponent', () => {
  let component: PatientMedicalFolderComponent;
  let fixture: ComponentFixture<PatientMedicalFolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientMedicalFolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMedicalFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
