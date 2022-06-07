import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorNoteDetailsComponent } from './doctor-note-details.component';

describe('DoctorNoteDetailsComponent', () => {
  let component: DoctorNoteDetailsComponent;
  let fixture: ComponentFixture<DoctorNoteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorNoteDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorNoteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
