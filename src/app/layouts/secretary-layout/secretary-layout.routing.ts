import { SecretaryDashboardComponent } from "../../pages/secretary-interface/secretary-dashboard/secretary-dashboard.component";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./../../auth.guard";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { UserProfileComponent } from "../../pages/user-profile/secretary/user-profile/user-profile.component";
import { UpdatePasswordComponent } from "../../pages/user-profile/secretary/update-password/update-password.component";
import { ListAppointmentsRequestsComponent } from "../../pages/secretary-interface/appointments-request/list-appointments-requests/list-appointments-requests.component";
import { ListAllApointmentsRequestsComponent } from "./../../pages/secretary-interface/appointments-request/list-all-apointments-requests/list-all-apointments-requests.component";
import { CalendarComponent } from "../../pages/secretary-interface/calendar/calendar.component";
import { PatientComponent } from "../../pages/secretary-interface/patient/patient.component";
import { DossierMedicaleComponent } from "../../pages/secretary-interface/dossier-medicale/dossier-medicale.component";
import { ArchivedFoldersComponent } from './../../pages/secretary-interface/dossier-medicale/archived-folders/archived-folders.component';
import { ArchivedPatientsComponent } from "../../pages/secretary-interface/patient/archived-patients/archived-patients.component";
import { DetailFolderComponent } from './../../pages/secretary-interface/dossier-medicale/detail-folder/detail-folder.component';
import { ConsultationsComponent } from './../../pages/secretary-interface/consultations/consultations.component';
import { DetailsConsultationComponent } from './../../pages/secretary-interface/consultations/details-consultation/details-consultation.component';
import { DetailsPrescriptionComponent} from "../../pages/secretary-interface/consultations/details-prescription/details-prescription.component";
import { DetailsDoctorNoteComponent } from "../../pages/secretary-interface/consultations/details-doctor-note/details-doctor-note.component";

export const SecretaryLayoutRoutes: Routes = [
  {
    path: "secretaire/tableau-de-bord",
    component: SecretaryDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "secretaire/rendez-vous/demandes/aujourdhui",
    component: ListAppointmentsRequestsComponent,
  },
  { path: "secretaire/calendrier", component: CalendarComponent },
  { path: "secretaire/patients", component: PatientComponent },
  { path: "secretaire/archive-patients", component: ArchivedPatientsComponent },
  {
    path: "secretaire/dossiers-medicaux",
    component: DossierMedicaleComponent,
  },
  {
    path: "secretaire/archive-dossiers",
    component: ArchivedFoldersComponent,
  },

  { path: "secretaire/dossiers-medicaux/:id/details", component: DetailFolderComponent },
  {
    path: "secretaire/rendez-vous/demandes",
    component: ListAllApointmentsRequestsComponent,
  },
  { path: "secretaire/consultations", component: ConsultationsComponent },
  { path: "secretaire/consultations/:id/ordonnance",component:DetailsPrescriptionComponent},
  { path: "secretaire/consultations/:id/certificat",component:DetailsDoctorNoteComponent},
  { path: "secretaire/consultations/:id/details", component: DetailsConsultationComponent },
  { path: "secretaire/profil", component: UserProfileComponent },
  { path: "secretaire/profil/mot-de-passe", component: UpdatePasswordComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(SecretaryLayoutRoutes),
  ],
  exports: [],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
