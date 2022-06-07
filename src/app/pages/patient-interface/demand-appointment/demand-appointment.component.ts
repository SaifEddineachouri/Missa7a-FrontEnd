import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { NgToastService } from "ng-angular-popup";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AppointmentRequestService } from "./../../../services/appointment-request.service";
import { PatientService } from "src/app/services/patient.service";
import { AuthService } from "./../../../services/auth.service";

@Component({
  selector: "app-demand-appointment",
  templateUrl: "./demand-appointment.component.html",
  styleUrls: ["./demand-appointment.component.scss"],
})
export class DemandAppointmentComponent implements OnInit {
  submitted = false;
  DemandAppointmentForm: FormGroup;
  @ViewChild("picker") picker: any;

  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate = new Date();
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  id: any;
  subject: any;
  status: any;
  startTime: any;

  constructor(
    public fb: FormBuilder,
    private AuthService: AuthService,
    private PatientService: PatientService,
    private AppointmentRequestService: AppointmentRequestService,
    private router: Router,
    private toast: NgToastService,
    private dialogRef: MatDialogRef<DemandAppointmentComponent>
  ) {
    this.ValidateForm();
  }

  ngOnInit(): void {}

  ValidateForm() {
    this.DemandAppointmentForm = this.fb.group({
      Subject: ["", [Validators.required]],
      Description : ["",[Validators.required]],
      StartTime: ["", [Validators.required]],
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.DemandAppointmentForm.valid) {
      return false;
    } else {
      this.AuthService.getLoggedInUser().subscribe((res: any) => {
        this.PatientService.getPatientWithCin(res.data.cin).subscribe(
          (res: any) => {
            return this.AppointmentRequestService.demandAppointmentRequest(
              res.data[0]._id,
              this.DemandAppointmentForm.value
            ).subscribe({
              complete: () => {
                console.log("Votre Demande a été envoyé avec succès!");
                this.DemandAppointmentForm.reset(
                  this.DemandAppointmentForm.value
                );
                this.dialogRef.close();
                this.toast.success({
                  detail: "succès",
                  summary: "Votre Demande a été envoyé avec succès!",
                  duration: 3000,
                });
                this.reloadCurrentRoute();
              },
              error: (res) => {
                this.DemandAppointmentForm.reset(
                  this.DemandAppointmentForm.value
                );
                this.toast.error({
                  detail: "échec",
                  summary: "échec d'envoie!",
                  duration: 3000,
                });
              },
            });
          }
        );
      });
    }
  }
}
