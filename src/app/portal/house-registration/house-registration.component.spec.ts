import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseRegistrationComponent } from './house-registration.component';

describe('HouseRegistrationComponent', () => {
  let component: HouseRegistrationComponent;
  let fixture: ComponentFixture<HouseRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HouseRegistrationComponent]
    });
    fixture = TestBed.createComponent(HouseRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
