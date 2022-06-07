import { ConsultationService } from './../../../../services/consultation.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit-consultation',
  templateUrl: './edit-consultation.component.html',
  styleUrls: ['./edit-consultation.component.scss']
})
export class EditConsultationComponent implements OnInit {
  EditConsultationForm : FormGroup ;
  submitted = false;

  constructor(
    private ConsultationService: ConsultationService,
    public fb: FormBuilder,
    private router: Router,
    private toast: NgToastService,
    private dialogRef: MatDialogRef<EditConsultationComponent>,
    @Inject(MAT_DIALOG_DATA) public consultationEditData
  ) {
    this.ValidateConsultationForm();
  }

  ngOnInit(): void {
    if (this.consultationEditData) {
      this.EditConsultationForm.controls["TensionSystolique"].setValue(this.consultationEditData.TensionSystolique);
      this.EditConsultationForm.controls["TensionDiastolique"].setValue(this.consultationEditData.TensionDiastolique);
      this.EditConsultationForm.controls["Temperature"].setValue(this.consultationEditData.Temperature);
      this.EditConsultationForm.controls["DiagnoCons"].setValue(this.consultationEditData.DiagnoCons);
      this.EditConsultationForm.controls["Motif"].setValue(this.consultationEditData.Motif);
      this.EditConsultationForm.controls["CommentaireCons"].setValue(this.consultationEditData.CommentaireCons);
    }
  }

  ValidateConsultationForm() {
    this.EditConsultationForm = this.fb.group({
      TensionSystolique: ["", [Validators.required]],
      TensionDiastolique: ["", [Validators.required]],
      Temperature: ["", [Validators.required]],
      DiagnoCons: ["", [Validators.required]],
      Motif: ["", [Validators.required]],
      CommentaireCons: ["", [Validators.required]],
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
    if (!this.EditConsultationForm.valid) {
      return false;
    } else {
      return this.ConsultationService.updateConsultation(
        this.consultationEditData._id,
        this.EditConsultationForm.value
        ).subscribe(
        (res) => {
          this.EditConsultationForm.reset(this.EditConsultationForm.value);
          this.dialogRef.close();
          this.toast.success({
            detail: "succès",
            summary: "Consultation Modifiée avec succès!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        (err: any) => {
          this.EditConsultationForm.reset(this.EditConsultationForm.value);
          this.dialogRef.close();
          this.toast.error({
            detail: "échec",
            summary: "échec de Modification!",
            duration: 3000,
          });
        }
      );
    }
  }

}
