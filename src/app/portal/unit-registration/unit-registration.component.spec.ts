import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitRegistrationComponent } from './unit-registration.component';

describe('UnitRegistrationComponent', () => {
  let component: UnitRegistrationComponent;
  let fixture: ComponentFixture<UnitRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitRegistrationComponent]
    });
    fixture = TestBed.createComponent(UnitRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
