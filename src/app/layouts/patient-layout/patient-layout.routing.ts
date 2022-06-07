import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./../../auth.guard";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { PatientDashboardComponent } from "./../../pages/patient-interface/patient-dashboard/patient-dashboard.component";
import { PatientMedicalFolderComponent } from "./../../pages/patient-interface/patient-medical-folder/patient-medical-folder.component";
import { ConsultationDetailsComponent } from './../../pages/patient-interface/consultation-details/consultation-details.component';
import { UserProfileComponent } from './../../pages/user-profile/patient/user-profile/user-profile.component';
import { UpdatePasswordComponent } from './../../pages/user-profile/patient/user-profile/update-password/update-password.component';
import { PrescriptionDetailsComponent } from './../../pages/patient-interface/prescription-details/prescription-details.component';
import { DoctorNoteDetailsComponent } from './../../pages/patient-interface/doctor-note-details/doctor-note-details.component';

export const PatientLayoutRoutes: Routes = [
  {
    path: "patient/tableau-de-bord",
    component: PatientDashboardComponent,
    canActivate: [AuthGuard],
  },
  { path : "patient/dossier-medicale", component : PatientMedicalFolderComponent},
  { path : "patient/consultations/:id/details", component : ConsultationDetailsComponent},
  { path : "patient/consultations/:id/ordonnance", component : PrescriptionDetailsComponent},
  { path : "patient/consultations/:id/certificat", component:DoctorNoteDetailsComponent},
  { path: "patient/profil", component: UserProfileComponent },
  { path: "patient/profil/mot-de-passe" , component : UpdatePasswordComponent},
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(PatientLayoutRoutes),
  ],
  exports: [],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
