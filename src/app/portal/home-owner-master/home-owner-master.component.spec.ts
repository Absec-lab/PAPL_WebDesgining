import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOwnerMasterComponent } from './home-owner-master.component';

describe('HomeOwnerMasterComponent', () => {
  let component: HomeOwnerMasterComponent;
  let fixture: ComponentFixture<HomeOwnerMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeOwnerMasterComponent]
    });
    fixture = TestBed.createComponent(HomeOwnerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
