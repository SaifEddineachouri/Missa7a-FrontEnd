import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretarySidebarComponent } from './secretary-sidebar.component';

describe('SecretarySidebarComponent', () => {
  let component: SecretarySidebarComponent;
  let fixture: ComponentFixture<SecretarySidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecretarySidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretarySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
