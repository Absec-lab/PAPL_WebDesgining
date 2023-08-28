import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { HomeOwnerMasterComponent } from './home-owner-master/home-owner-master.component';
import { UnitRegistrationComponent } from './unit-registration/unit-registration.component';
import { AgreementTypeMasterComponent } from './agreement-type-master/agreement-type-master.component';
import { HomeRegistrationComponent } from './home-registration/home-registration.component';
import { AgreementMasterComponent } from './agreement-master/agreement-master.component';
import { UtilityCalculationComponent } from './utility-calculation/utility-calculation.component';
import { UnitBookingComponent } from './unit-booking/unit-booking.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeOwnerMasterComponent,
    UnitRegistrationComponent,
    AgreementTypeMasterComponent,
    HomeRegistrationComponent,
    AgreementMasterComponent,
    UtilityCalculationComponent,
    UnitBookingComponent
  ],
  imports: [
    CommonModule,
    PortalRoutingModule
  ]
})
export class PortalModule { }
