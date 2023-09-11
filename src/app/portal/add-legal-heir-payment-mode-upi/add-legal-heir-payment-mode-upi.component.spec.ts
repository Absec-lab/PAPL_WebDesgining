import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLegalHeirPaymentModeUPIComponent } from './add-legal-heir-payment-mode-upi.component';

describe('AddLegalHeirPaymentModeUPIComponent', () => {
  let component: AddLegalHeirPaymentModeUPIComponent;
  let fixture: ComponentFixture<AddLegalHeirPaymentModeUPIComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLegalHeirPaymentModeUPIComponent]
    });
    fixture = TestBed.createComponent(AddLegalHeirPaymentModeUPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
