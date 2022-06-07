import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMedicalActComponent } from './edit-medical-act.component';

describe('EditMedicalActComponent', () => {
  let component: EditMedicalActComponent;
  let fixture: ComponentFixture<EditMedicalActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMedicalActComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMedicalActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
