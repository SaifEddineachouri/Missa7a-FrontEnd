import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialAccountComponent } from './financial-account.component';

describe('FinancialAccountComponent', () => {
  let component: FinancialAccountComponent;
  let fixture: ComponentFixture<FinancialAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
