import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLegalHeirPaymentModeBankAcComponent } from './add-legal-heir-payment-mode-bank-ac.component';

describe('AddLegalHeirPaymentModeBankAcComponent', () => {
  let component: AddLegalHeirPaymentModeBankAcComponent;
  let fixture: ComponentFixture<AddLegalHeirPaymentModeBankAcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLegalHeirPaymentModeBankAcComponent]
    });
    fixture = TestBed.createComponent(AddLegalHeirPaymentModeBankAcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
