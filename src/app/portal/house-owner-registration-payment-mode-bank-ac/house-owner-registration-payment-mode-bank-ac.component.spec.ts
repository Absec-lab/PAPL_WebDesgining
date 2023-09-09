import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseOwnerRegistrationPaymentModeBankAcComponent } from './house-owner-registration-payment-mode-bank-ac.component';

describe('HouseOwnerRegistrationPaymentModeBankAcComponent', () => {
  let component: HouseOwnerRegistrationPaymentModeBankAcComponent;
  let fixture: ComponentFixture<HouseOwnerRegistrationPaymentModeBankAcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HouseOwnerRegistrationPaymentModeBankAcComponent]
    });
    fixture = TestBed.createComponent(HouseOwnerRegistrationPaymentModeBankAcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
