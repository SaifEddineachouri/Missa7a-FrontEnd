import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMedicalActComponent } from './delete-medical-act.component';

describe('DeleteMedicalActComponent', () => {
  let component: DeleteMedicalActComponent;
  let fixture: ComponentFixture<DeleteMedicalActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMedicalActComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMedicalActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
