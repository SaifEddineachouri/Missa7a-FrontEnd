import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDoctorNoteComponent } from './details-doctor-note.component';

describe('DetailsDoctorNoteComponent', () => {
  let component: DetailsDoctorNoteComponent;
  let fixture: ComponentFixture<DetailsDoctorNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsDoctorNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDoctorNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
