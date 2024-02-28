import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { AuthGuard } from "./auth.guard";
import { DashboardComponent } from "./portal/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
  { path: "login", component: LoginComponent },
  {
    path: "portal",
    loadChildren: () =>
      import("./portal/portal.module").then((m) => m.PortalModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
