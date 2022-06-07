import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedPatientsComponent } from './archived-patients.component';

describe('ArchivedPatientsComponent', () => {
  let component: ArchivedPatientsComponent;
  let fixture: ComponentFixture<ArchivedPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedPatientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
