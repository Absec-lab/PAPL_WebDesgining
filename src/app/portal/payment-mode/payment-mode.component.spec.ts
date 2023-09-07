import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentModeComponent } from './payment-mode.component';

describe('PaymentModeComponent', () => {
  let component: PaymentModeComponent;
  let fixture: ComponentFixture<PaymentModeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentModeComponent]
    });
    fixture = TestBed.createComponent(PaymentModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
