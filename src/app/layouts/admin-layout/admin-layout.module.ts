import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClipboardModule } from "ngx-clipboard";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectFilterModule } from 'mat-select-filter';

import { ScheduleModule, View } from "@syncfusion/ej2-angular-schedule";
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import {
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  MonthAgendaService,
  DragAndDropService,
  ResizeService,
} from "@syncfusion/ej2-angular-schedule";

import { IconsComponent } from "./../../pages/icons/icons.component";
import { TablesComponent } from "./../../pages/tables/tables.component";
import { UserProfileComponent } from "./../../pages/user-profile/user-profile.component";
import { PatientComponent } from "./../../pages/doctor-interface/patient/patient.component";
import { CreatePatientComponent } from "./../../pages/doctor-interface/patient/create-patient/create-patient.component";
import { EditPatientComponent } from "./../..//pages/doctor-interface/patient/edit-patient/edit-patient.component";

import { CalendarComponent } from "./../../pages/doctor-interface/calendar/calendar.component";
import { DossierMedicaleComponent } from "./../../pages/doctor-interface/dossier-medicale/dossier-medicale.component";
import { FinancialAccountComponent } from './../../pages/doctor-interface/financial-account/financial-account.component';
import { CreateAccountComponent } from './../../pages/doctor-interface/financial-account/create-account/create-account.component';
import { EditAccountComponent } from './../../pages/doctor-interface/financial-account/edit-account/edit-account.component';
import { DeleteAccountComponent } from './../../pages/doctor-interface/financial-account/delete-account/delete-account.component';

import { DashboardComponent } from "./../../pages/doctor-interface/dashboard/dashboard.component";
import { InventoryComponent } from "./../../pages/doctor-interface/inventory/inventory.component";
import { ConsultationsComponent } from "./../../pages/doctor-interface/consultations/consultations.component";
import { CreateConsultationComponent } from './../../pages/doctor-interface/consultations/create-consultation/create-consultation.component';
import { EditConsultationComponent } from './../../pages/doctor-interface/consultations/edit-consultation/edit-consultation.component';
import { PayConsultationComponent } from './../../pages/doctor-interface/consultations/pay-consultation/pay-consultation.component';
import { CreatePrescriptionComponent } from './../../pages/doctor-interface/consultations/create-prescription/create-prescription.component';
import { CreateNoteComponent } from './../../pages/doctor-interface/consultations/create-note/create-note.component';
import { DetailsDoctorNoteComponent } from './../../pages/doctor-interface/consultations/details-doctor-note/details-doctor-note.component';
import { DetailsPrescriptionComponent } from './../../pages/doctor-interface/consultations/details-prescription/details-prescription.component';

import { DetailsConsultationComponent } from './../../pages/doctor-interface/consultations/details-consultation/details-consultation.component';
import { DeleteMedicalActComponent } from './../../pages/doctor-interface/consultations/delete-medical-act/delete-medical-act.component';
import { EditMedicalActComponent } from './../../pages/doctor-interface/consultations/edit-medical-act/edit-medical-act.component';
import { CreateMedicalActComponent } from './../../pages/doctor-interface/consultations/create-medical-act/create-medical-act.component';

import { CreateProductComponent } from './../../pages/doctor-interface/inventory/product/create-product/create-product.component';
import { EditProductComponent } from './../../pages/doctor-interface/inventory/product/edit-product/edit-product.component';
import { DeleteProductComponent } from './../../pages/doctor-interface/inventory/product/delete-product/delete-product.component';

import { StockComponent } from './../../pages/doctor-interface/inventory/stock/stock.component';
import { CreateStockComponent } from './../../pages/doctor-interface/inventory/stock/create-stock/create-stock.component';
import { EditStockComponent } from './../../pages/doctor-interface/inventory/stock/edit-stock/edit-stock.component';
import { DeleteStockComponent } from './../../pages/doctor-interface/inventory/stock/delete-stock/delete-stock.component';

import { CategoryComponent } from './../../pages/doctor-interface/inventory/category/category.component';
import { CreateCategoryComponent } from './../../pages/doctor-interface/inventory/category/create-category/create-category.component';
import { EditCategoryComponent } from './../../pages/doctor-interface/inventory/category/edit-category/edit-category.component';
import { DeleteCategoryComponent } from "./../../pages/doctor-interface/inventory/category/delete-category/delete-category.component";

import { CreateFolderComponent } from "./../../pages/doctor-interface/dossier-medicale/create-folder/create-folder.component";
import { EditFolderComponent } from "./../../pages/doctor-interface/dossier-medicale/edit-folder/edit-folder.component";
import { DetailFolderComponent } from "./../../pages/doctor-interface/dossier-medicale/detail-folder/detail-folder.component";
import { ArchivedFoldersComponent } from "./../../pages/doctor-interface/dossier-medicale/archived-folders/archived-folders.component";
import { ArchivedPatientsComponent } from "./../../pages/doctor-interface/patient/archived-patients/archived-patients.component";
import { UsersComponent } from "./../../pages/doctor-interface/users/users.component";
import { DeleteUserComponent } from "./../../pages/doctor-interface/users/delete-user/delete-user.component";
import { EditUserComponent } from "./../../pages/doctor-interface/users/edit-user/edit-user.component";
import { UpdatePasswordComponent } from './../../pages/user-profile/update-password/update-password.component';

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatChipsModule,
    ScheduleModule,
    DropDownListModule,
    MatSelectFilterModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    CalendarComponent,
    DossierMedicaleComponent,
    FinancialAccountComponent,
    CreateAccountComponent,
    EditAccountComponent,
    DeleteAccountComponent,
    CreateFolderComponent,
    EditFolderComponent,
    DetailFolderComponent,
    ArchivedFoldersComponent,
    InventoryComponent,
    ConsultationsComponent,
    CreateConsultationComponent,
    EditConsultationComponent,
    CreatePrescriptionComponent,
    CreateNoteComponent,
    DetailsDoctorNoteComponent,
    DetailsPrescriptionComponent,
    DetailsConsultationComponent,
    PayConsultationComponent,
    DeleteMedicalActComponent,
    EditMedicalActComponent,
    CreateMedicalActComponent,
    CreateProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    StockComponent,
    CreateStockComponent,
    EditStockComponent,
    DeleteStockComponent,
    CategoryComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    DeleteCategoryComponent,
    PatientComponent,
    CreatePatientComponent,
    EditPatientComponent,
    ArchivedPatientsComponent,
    UsersComponent,
    EditUserComponent,
    DeleteUserComponent,
    UpdatePasswordComponent
  ],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
    DragAndDropService,
    ResizeService,
  ]
})
export class AdminLayoutModule {}
