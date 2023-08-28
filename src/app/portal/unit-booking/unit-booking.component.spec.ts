import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitBookingComponent } from './unit-booking.component';

describe('UnitBookingComponent', () => {
  let component: UnitBookingComponent;
  let fixture: ComponentFixture<UnitBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitBookingComponent]
    });
    fixture = TestBed.createComponent(UnitBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
