import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseOwnerRegistrationPaymentModeUPIComponent } from './house-owner-registration-payment-mode-upi.component';

describe('HouseOwnerRegistrationPaymentModeUPIComponent', () => {
  let component: HouseOwnerRegistrationPaymentModeUPIComponent;
  let fixture: ComponentFixture<HouseOwnerRegistrationPaymentModeUPIComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HouseOwnerRegistrationPaymentModeUPIComponent]
    });
    fixture = TestBed.createComponent(HouseOwnerRegistrationPaymentModeUPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
