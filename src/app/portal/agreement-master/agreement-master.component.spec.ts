import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementMasterComponent } from './agreement-master.component';

describe('AgreementMasterComponent', () => {
  let component: AgreementMasterComponent;
  let fixture: ComponentFixture<AgreementMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgreementMasterComponent]
    });
    fixture = TestBed.createComponent(AgreementMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
