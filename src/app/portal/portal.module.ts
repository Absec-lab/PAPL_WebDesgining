import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { HomeOwnerMasterComponent } from './home-owner-master/home-owner-master.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeOwnerMasterComponent
  ],
  imports: [
    CommonModule,
    PortalRoutingModule
  ]
})
export class PortalModule { }
