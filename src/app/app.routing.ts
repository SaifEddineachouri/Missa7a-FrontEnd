import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { SecretaryLayoutComponent } from './layouts/secretary-layout/secretary-layout.component';
import { PatientLayoutComponent } from './layouts/patient-layout/patient-layout.component';
import { SupplierLayoutComponent } from './layouts/supplier-layout/supplier-layout.component';
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
const routes: Routes = [
  {
    path: "",
    redirectTo: "inscription",
    pathMatch: "full",
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/layouts/admin-layout/admin-layout.module").then(
            (m) => m.AdminLayoutModule
          ),
      },
    ],
  },
  {
    path: "",
    component: SecretaryLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/layouts/secretary-layout/secretary-layout.module").then(
            (m) => m.SecretaryLayoutModule
          ),
      },
    ],
  },
  {
    path: "",
    component: PatientLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/layouts/patient-layout/patient-layout.module").then(
            (m) => m.PatientLayoutModule
          ),
      },
    ],
  },
  {
    path: "",
    component: SupplierLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/layouts/supplier-layout/supplier-layout.module").then(
            (m) => m.SupplierLayoutModule
          ),
      },
    ],
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/layouts/auth-layout/auth-layout.module").then(
            (m) => m.AuthLayoutModule
          ),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "dashboard",
  },
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: [],
})
export class AppRoutingModule {}
