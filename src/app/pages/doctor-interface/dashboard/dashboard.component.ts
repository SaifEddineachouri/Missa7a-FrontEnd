import { UserService } from "./../../../services/user.service";
import { MedicalFolderService } from "./../../../services/medical-folder.service";
import { ConsultationService } from "./../../../services/consultation.service";
import { PatientService } from "src/app/services/patient.service";
import { AppointmentService } from "../../../services/appointment.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgToastService } from "ng-angular-popup";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  Appointments: [] = [];
  CountPatients: number;
  CountMedicalFolders: number;
  CountConsultations: number;
  CountUsers: number;
  constructor(
    private router: Router,
    private toast: NgToastService,
    private PatientService: PatientService,
    private appointmentService: AppointmentService,
    private ConsultationService: ConsultationService,
    private MedicalFolderService: MedicalFolderService,
    private UserService: UserService
  ) {}

  ngOnInit() {
    this.appointmentService.getTodayAppointments().subscribe((res: any) => {
      this.Appointments = res.data;
    });

    this.PatientService.getPatients().subscribe((res: any) => {
      this.CountPatients = res.count;
    });

    this.ConsultationService.getConsultations().subscribe((res: any) => {
      this.CountConsultations = res.count;
    });

    this.MedicalFolderService.getMedicalFolders().subscribe((res: any) => {
      this.CountMedicalFolders = res.count;
    });

    this.UserService.getUsers().subscribe((res: any) => {
      this.CountUsers = res.count;
    });
  }

  redirectConsultation(id, StartTime, Subject, AppId) {
    this.router.navigateByUrl("/consultation");
    this.PatientService.patientId = id;
    this.PatientService.StartTime = StartTime;
    this.PatientService.Subject = Subject;
    this.appointmentService.InProgressAppointment(AppId);
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  NextAppointment(id) {
    return this.appointmentService.NextAppointment(id).subscribe({
      complete: () => {
          this.toast.success({
            detail: "succès",
            summary: "Prochain rendez-vous !",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        error: () => {
          this.toast.error({
            detail: "échec",
            summary: "échec de Modification!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
      });
  }

  FinishAppointment(id) {
    return this.appointmentService.FinishAppointment(id).subscribe({
      complete: () => {
          this.toast.success({
            detail: "succès",
            summary: "Consultation terminée!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        error: () => {
          this.toast.error({
            detail: "échec",
            summary: "échec de Modification!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
    });
  }

  AbsenceAppointment(id) {
    return this.appointmentService.AbsenceAppointment(id).subscribe({
      complete: () => {
          this.toast.success({
            detail: "succès",
            summary: "Patient est absent!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        error: () => {
          this.toast.error({
            detail: "échec",
            summary: "échec!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
    });
  }
}
