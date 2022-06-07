import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedFoldersComponent } from './archived-folders.component';

describe('ArchivedFoldersComponent', () => {
  let component: ArchivedFoldersComponent;
  let fixture: ComponentFixture<ArchivedFoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedFoldersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedFoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
