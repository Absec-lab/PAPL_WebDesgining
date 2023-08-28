import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementTypeMasterComponent } from './agreement-type-master.component';

describe('AgreementTypeMasterComponent', () => {
  let component: AgreementTypeMasterComponent;
  let fixture: ComponentFixture<AgreementTypeMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgreementTypeMasterComponent]
    });
    fixture = TestBed.createComponent(AgreementTypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
