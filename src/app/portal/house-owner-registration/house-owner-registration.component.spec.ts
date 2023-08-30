import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseOwnerRegistrationComponent } from './house-owner-registration.component';

describe('HouseOwnerRegistrationComponent', () => {
  let component: HouseOwnerRegistrationComponent;
  let fixture: ComponentFixture<HouseOwnerRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HouseOwnerRegistrationComponent]
    });
    fixture = TestBed.createComponent(HouseOwnerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
