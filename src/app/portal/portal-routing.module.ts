import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HouseOwnerRegistrationComponent } from "./house-owner-registration/house-owner-registration.component";
import { AgreementTypeMasterComponent } from "./agreement-type-master/agreement-type-master.component";
import { AgreementMasterComponent } from "./agreement-master/agreement-master.component";
import { UnitRegistrationComponent } from "./unit-registration/unit-registration.component";
import { HouseRegistrationComponent } from "./house-registration/house-registration.component";
import { UtilityCalculationComponent } from "./utility-calculation/utility-calculation.component";
import { UnitBookingComponent } from "./unit-booking/unit-booking.component";
import { AuthGuard } from "../auth.guard";

const routes: Routes = [
  {
    path: "portal/house-owner-registration",
    component: HouseOwnerRegistrationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "portal/agreement-type-master",
    component: AgreementTypeMasterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "portal/unit-registration",
    component: UnitRegistrationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "portal/house-registration",
    component: HouseRegistrationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "portal/agreement-master",
    component: AgreementMasterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "portal/utility-calculation",
    component: UtilityCalculationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "portal/unit-booking",
    component: UnitBookingComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortalRoutingModule {}
