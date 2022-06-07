import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClipboardModule } from "ngx-clipboard";

import { PatientDashboardComponent } from './../../pages/patient-interface/patient-dashboard/patient-dashboard.component';
import { PatientMedicalFolderComponent } from './../../pages/patient-interface/patient-medical-folder/patient-medical-folder.component';
import { UserProfileComponent } from './../../pages/user-profile/patient/user-profile/user-profile.component';
import { UpdatePasswordComponent } from './../../pages/user-profile/patient/user-profile/update-password/update-password.component';
import { ConsultationDetailsComponent } from './../../pages/patient-interface/consultation-details/consultation-details.component';
import { PrescriptionDetailsComponent } from './../../pages/patient-interface/prescription-details/prescription-details.component';
import { DoctorNoteDetailsComponent } from './../../pages/patient-interface/doctor-note-details/doctor-note-details.component';
import { DemandAppointmentComponent } from './../../pages/patient-interface/demand-appointment/demand-appointment.component';
import { EditDemandComponent } from './../../pages/patient-interface/demand-appointment/edit-demand/edit-demand.component';
import { DeleteDemandComponent } from './../../pages/patient-interface/demand-appointment/delete-demand/delete-demand.component';

import { PatientLayoutRoutes } from "./patient-layout.routing";
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
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule,NgxMatNativeDateModule} from '@angular-material-components/datetime-picker';

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PatientLayoutRoutes),
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
    MatSelectFilterModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
  ],
  declarations: [
    PatientDashboardComponent,
    PatientMedicalFolderComponent,
    ConsultationDetailsComponent,
    DemandAppointmentComponent,
    EditDemandComponent,
    DeleteDemandComponent,
    PrescriptionDetailsComponent,
    DoctorNoteDetailsComponent,
    UserProfileComponent,
    UpdatePasswordComponent
  ],
  providers: [
  ],
})
export class PatientLayoutModule {}
