import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseOwnerRegistrationPaymentModePaytmComponent } from './house-owner-registration-payment-mode-paytm.component';

describe('HouseOwnerRegistrationPaymentModePaytmComponent', () => {
  let component: HouseOwnerRegistrationPaymentModePaytmComponent;
  let fixture: ComponentFixture<HouseOwnerRegistrationPaymentModePaytmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HouseOwnerRegistrationPaymentModePaytmComponent]
    });
    fixture = TestBed.createComponent(HouseOwnerRegistrationPaymentModePaytmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
