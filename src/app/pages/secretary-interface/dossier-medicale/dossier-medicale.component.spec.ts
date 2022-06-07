import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierMedicaleComponent } from './dossier-medicale.component';

describe('DossierMedicaleComponent', () => {
  let component: DossierMedicaleComponent;
  let fixture: ComponentFixture<DossierMedicaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DossierMedicaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierMedicaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
