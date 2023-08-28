import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeOwnerMasterComponent } from './home-owner-master/home-owner-master.component';
import{AgreementTypeMasterComponent} from './agreement-type-master/agreement-type-master.component';
import{AgreementMasterComponent} from './agreement-master/agreement-master.component';
import { UnitRegistrationComponent } from './unit-registration/unit-registration.component';
import { HomeRegistrationComponent } from './home-registration/home-registration.component';
import {  UtilityCalculationComponent } from './utility-calculation/utility-calculation.component';
import { UnitBookingComponent } from './unit-booking/unit-booking.component';


const routes: Routes = [
  {
    path: 'portal/home-owner-master',
    component: HomeOwnerMasterComponent
  },
  {
    path: 'portal/agreement-type-master',
    component: AgreementTypeMasterComponent
  },
  {
    path: 'portal/unit-registration',
    component: UnitRegistrationComponent
  },
  {
    path: 'portal/home-registration',
    component: HomeRegistrationComponent
  },
  {
    path: 'portal/agreement-master',
    component: AgreementMasterComponent
  },
  {
    path: 'portal/utility-calculation',
    component: UtilityCalculationComponent
  },
  {
    path: 'portal/unit-booking',
    component: UnitBookingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
