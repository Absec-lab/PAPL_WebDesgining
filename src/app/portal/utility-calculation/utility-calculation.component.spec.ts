import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityCalculationComponent } from './utility-calculation.component';

describe('UtilityCalculationComponent', () => {
  let component: UtilityCalculationComponent;
  let fixture: ComponentFixture<UtilityCalculationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtilityCalculationComponent]
    });
    fixture = TestBed.createComponent(UtilityCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
