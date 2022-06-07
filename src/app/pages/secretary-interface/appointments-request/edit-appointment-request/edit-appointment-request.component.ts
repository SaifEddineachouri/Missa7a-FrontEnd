import { AppointmentRequestService } from './../../../../services/appointment-request.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from "moment";
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-appointment-request',
  templateUrl: './edit-appointment-request.component.html',
  styleUrls: ['./edit-appointment-request.component.scss']
})
export class EditAppointmentRequestComponent implements OnInit {
  submitted = false;
  EditAppointmentRequestForm : FormGroup;
  @ViewChild("picker") picker: any;

  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  id: any;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private AppointmentRequestService: AppointmentRequestService,
    private toast: NgToastService,
    private dialogRef: MatDialogRef<EditAppointmentRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public editData
  ) {
    this.ValidateForm();
   }

  ngOnInit(): void {
    if (this.editData) {
      this.EditAppointmentRequestForm.controls["Subject"].setValue(this.editData.Subject);
      this.EditAppointmentRequestForm.controls["Description"].setValue(this.editData.Description);
      this.EditAppointmentRequestForm.controls["status"].setValue(this.editData.status);
      this.EditAppointmentRequestForm.controls["StartTime"].setValue(this.editData.StartTime);
    }
  }

  ValidateForm() {
    this.EditAppointmentRequestForm = this.fb.group({
      Subject: ["", [Validators.required]],
      StartTime: ["", [Validators.required]],
      status : ["",[Validators.required]]
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onSubmit(){
    this.submitted = true;
    if (!this.EditAppointmentRequestForm.valid) {
      return false;
    } else {
      return this.AppointmentRequestService.updateAppointmentRequest(
        this.editData._id,
        this.EditAppointmentRequestForm.value
      ).subscribe({
        complete: () => {
          this.EditAppointmentRequestForm.reset(this.EditAppointmentRequestForm.value);
          this.dialogRef.close();
          this.toast.success({
            detail: "succès",
            summary: "Rendez-vous Modifiée avec succès!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        error: (res) => {
          this.EditAppointmentRequestForm.reset(this.EditAppointmentRequestForm.value);
          this.toast.error({
            detail: "échec",
            summary: "échec de Modification!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
      });
    }
  }

}
