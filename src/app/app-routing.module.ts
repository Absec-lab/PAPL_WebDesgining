import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: 'login',component: LoginComponent},
  {path: 'portal', loadChildren: () => import('./portal/portal.module').then(m => m.PortalModule), canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
