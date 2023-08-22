import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeOwnerMasterComponent } from './home-owner-master/home-owner-master.component';

const routes: Routes = [
  {
    path: 'portal/home-owner-master',
    component: HomeOwnerMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
