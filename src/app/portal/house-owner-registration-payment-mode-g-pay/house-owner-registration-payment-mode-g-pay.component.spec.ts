import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseOwnerRegistrationPaymentModeGPayComponent } from './house-owner-registration-payment-mode-g-pay.component';

describe('HouseOwnerRegistrationPaymentModeGPayComponent', () => {
  let component: HouseOwnerRegistrationPaymentModeGPayComponent;
  let fixture: ComponentFixture<HouseOwnerRegistrationPaymentModeGPayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HouseOwnerRegistrationPaymentModeGPayComponent]
    });
    fixture = TestBed.createComponent(HouseOwnerRegistrationPaymentModeGPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
