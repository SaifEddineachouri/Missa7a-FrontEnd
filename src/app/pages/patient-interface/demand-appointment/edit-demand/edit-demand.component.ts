import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AppointmentRequestService } from "./../../../../services/appointment-request.service";

@Component({
  selector: 'app-edit-demand',
  templateUrl: './edit-demand.component.html',
  styleUrls: ['./edit-demand.component.scss']
})
export class EditDemandComponent implements OnInit {
  submitted = false;
  EditDemandAppointmentForm: FormGroup;
  @ViewChild("picker") picker: any;

  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate= new Date();
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
    private router: Router,
    private toast: NgToastService,
    private AppointmentRequestService: AppointmentRequestService,
    private dialogRef: MatDialogRef<EditDemandComponent>,
    @Inject(MAT_DIALOG_DATA) public editData
  ) {
    this.ValidateForm();
   }

  ngOnInit(): void {
    if (this.editData) {
      this.EditDemandAppointmentForm.controls["Subject"].setValue(this.editData.Subject);
      this.EditDemandAppointmentForm.controls["Description"].setValue(this.editData.Description);
      this.EditDemandAppointmentForm.controls["StartTime"].setValue(this.editData.StartTime);

    }
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

    ValidateForm() {
    this.EditDemandAppointmentForm = this.fb.group({
      Subject: ["", [Validators.required]],
      Description : ["",[Validators.required]],
      StartTime: [
        "",
        [Validators.required],
      ]
    });
  }

  onSubmit(){
    this.submitted = true;
    if (!this.EditDemandAppointmentForm.valid) {
      return false;
    } else {
      return this.AppointmentRequestService.updateAppointmentRequest(
        this.editData._id,
        this.EditDemandAppointmentForm.value
      ).subscribe({
        complete: () => {
          this.EditDemandAppointmentForm.reset(this.EditDemandAppointmentForm.value);
          this.dialogRef.close();
          this.toast.success({
            detail: "succès",
            summary: "Demande Modifiée avec succès!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        error: (res) => {
          this.EditDemandAppointmentForm.reset(this.EditDemandAppointmentForm.value);
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
