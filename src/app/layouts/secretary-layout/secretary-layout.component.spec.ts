import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretaryLayoutComponent } from './secretary-layout.component';

describe('SecretaryLayoutComponent', () => {
  let component: SecretaryLayoutComponent;
  let fixture: ComponentFixture<SecretaryLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecretaryLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretaryLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
