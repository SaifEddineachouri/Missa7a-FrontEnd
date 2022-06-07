import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClipboardModule } from "ngx-clipboard";
import { SecretaryLayoutRoutes } from './secretary-layout.routing';


import { SecretaryDashboardComponent } from './../../pages/secretary-interface/secretary-dashboard/secretary-dashboard.component';
import { UserProfileComponent } from './../../pages/user-profile/secretary/user-profile/user-profile.component';
import { UpdatePasswordComponent } from './../../pages/user-profile/secretary/update-password/update-password.component';
import { ListAppointmentsRequestsComponent } from './../../pages/secretary-interface/appointments-request/list-appointments-requests/list-appointments-requests.component';
import { ListAllApointmentsRequestsComponent } from './../../pages/secretary-interface/appointments-request/list-all-apointments-requests/list-all-apointments-requests.component';
import { EditAppointmentRequestComponent } from './../../pages/secretary-interface/appointments-request/edit-appointment-request/edit-appointment-request.component';
import { DeleteAppointmentRequestComponent } from './../../pages/secretary-interface/appointments-request/delete-appointment-request/delete-appointment-request.component';
import { ConfirmAppointmentRequestComponent } from './../../pages/secretary-interface/appointments-request/confirm-appointment-request/confirm-appointment-request.component';
import { UnconfirmAppointmentRequestComponent } from './../../pages/secretary-interface/appointments-request/unconfirm-appointment-request/unconfirm-appointment-request.component';
import { PatientComponent } from './../../pages/secretary-interface/patient/patient.component';
import { CreatePatientComponent } from './../../pages/secretary-interface/patient/create-patient/create-patient.component';
import { ArchivedPatientsComponent } from '../../pages/secretary-interface/patient/archived-patients/archived-patients.component';
import { EditPatientComponent } from './../../pages/secretary-interface/patient/edit-patient/edit-patient.component';
import { DossierMedicaleComponent } from './../../pages/secretary-interface/dossier-medicale/dossier-medicale.component';
import { ArchivedFoldersComponent } from './../../pages/secretary-interface/dossier-medicale/archived-folders/archived-folders.component';
import { DetailFolderComponent } from './../../pages/secretary-interface/dossier-medicale/detail-folder/detail-folder.component';
import { ConsultationsComponent } from './../../pages/secretary-interface/consultations/consultations.component';
import { DetailsConsultationComponent } from './../../pages/secretary-interface/consultations/details-consultation/details-consultation.component';
import { PayConsultationComponent } from './../../pages/secretary-interface/consultations/pay-consultation/pay-consultation.component';
import { DetailsDoctorNoteComponent } from './../../pages/secretary-interface/consultations/details-doctor-note/details-doctor-note.component';
import { DetailsPrescriptionComponent } from './../../pages/secretary-interface/consultations/details-prescription/details-prescription.component';

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
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule,NgxMatNativeDateModule} from '@angular-material-components/datetime-picker';
import { CalendarComponent } from './../../pages/secretary-interface/calendar/calendar.component';

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SecretaryLayoutRoutes),
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
    MatSelectFilterModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
  ],
  declarations: [
    SecretaryDashboardComponent,
    CalendarComponent,
    PatientComponent,
    CreatePatientComponent,
    ArchivedPatientsComponent,
    EditPatientComponent,
    DossierMedicaleComponent,
    ArchivedFoldersComponent,
    DetailFolderComponent,
    ConsultationsComponent,
    DetailsConsultationComponent,
    PayConsultationComponent,
    DetailsDoctorNoteComponent,
    DetailsPrescriptionComponent,
    UserProfileComponent,
    UpdatePasswordComponent,
    ListAppointmentsRequestsComponent,
    ListAllApointmentsRequestsComponent,
    EditAppointmentRequestComponent,
    DeleteAppointmentRequestComponent,
    ConfirmAppointmentRequestComponent,
    UnconfirmAppointmentRequestComponent
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
  ],
})
export class SecretaryLayoutModule {}
