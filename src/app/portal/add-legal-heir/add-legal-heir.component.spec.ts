import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLegalHeirComponent } from './add-legal-heir.component';

describe('AddLegalHeirComponent', () => {
  let component: AddLegalHeirComponent;
  let fixture: ComponentFixture<AddLegalHeirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLegalHeirComponent]
    });
    fixture = TestBed.createComponent(AddLegalHeirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
