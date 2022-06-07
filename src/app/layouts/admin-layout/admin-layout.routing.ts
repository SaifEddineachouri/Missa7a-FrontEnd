import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./../../auth.guard";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { DashboardComponent } from "../../pages/doctor-interface/dashboard/dashboard.component";
import { CalendarComponent } from "../../pages/doctor-interface/calendar/calendar.component";
import { PatientComponent } from "./../../pages/doctor-interface/patient/patient.component";
import { DossierMedicaleComponent } from "./../../pages/doctor-interface/dossier-medicale/dossier-medicale.component";
import { InventoryComponent } from "./../../pages/doctor-interface/inventory/inventory.component";
import { FinancialAccountComponent } from "src/app/pages/doctor-interface/financial-account/financial-account.component";
import { ConsultationsComponent } from "./../../pages/doctor-interface/consultations/consultations.component";
import { CreateConsultationComponent } from "src/app/pages/doctor-interface/consultations/create-consultation/create-consultation.component";
import { DetailsConsultationComponent } from './../../pages/doctor-interface/consultations/details-consultation/details-consultation.component';
import { DetailsDoctorNoteComponent } from './../../pages/doctor-interface/consultations/details-doctor-note/details-doctor-note.component';
import { DetailsPrescriptionComponent } from './../../pages/doctor-interface/consultations/details-prescription/details-prescription.component';

import { DetailFolderComponent } from "src/app/pages/doctor-interface/dossier-medicale/detail-folder/detail-folder.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { ArchivedPatientsComponent } from "../../pages/doctor-interface/patient/archived-patients/archived-patients.component";
import { ArchivedFoldersComponent } from "../../pages/doctor-interface/dossier-medicale/archived-folders/archived-folders.component";
import { UsersComponent } from "../../pages/doctor-interface/users/users.component";
import { UpdatePasswordComponent } from "../../pages/user-profile/update-password/update-password.component";
import { CategoryComponent } from "../../pages/doctor-interface/inventory/category/category.component";
import { StockComponent } from "../../pages/doctor-interface/inventory/stock/stock.component";

export const AdminLayoutRoutes: Routes = [
  {
    path: "tableau-de-bord",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: "profil", component: UserProfileComponent },
  { path: "mot-de-passe" , component : UpdatePasswordComponent},
  { path: "tables", component: TablesComponent },
  { path: "icons", component: IconsComponent },
  { path: "calendrier", component: CalendarComponent },
  { path: "patients", component: PatientComponent },
  { path: "archive-patients", component: ArchivedPatientsComponent },
  { path: "consultations", component: ConsultationsComponent },
  { path: "consultation" , component : CreateConsultationComponent},
  { path: "consultations/:id/details", component: DetailsConsultationComponent },
  { path: "consultations/:id/ordonnance",component:DetailsPrescriptionComponent},
  { path: "consultations/:id/certificat",component:DetailsDoctorNoteComponent},
  {
    path: "dossiers-medicaux",
    component: DossierMedicaleComponent
  },
  {
    path: "archive-dossiers",
    component: ArchivedFoldersComponent
  },
  { path: "dossiers-medicaux/:id/details", component: DetailFolderComponent },
  { path: "compte-financier", component: FinancialAccountComponent },
  { path: "stock/produit", component: InventoryComponent },
  { path: "stock/categorie", component : CategoryComponent},
  { path: "stock" , component :StockComponent},
  { path: "utilisateurs" , component : UsersComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(AdminLayoutRoutes),
  ],
  exports: [],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
