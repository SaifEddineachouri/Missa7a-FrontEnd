import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDemandComponent } from './delete-demand.component';

describe('DeleteDemandComponent', () => {
  let component: DeleteDemandComponent;
  let fixture: ComponentFixture<DeleteDemandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDemandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
