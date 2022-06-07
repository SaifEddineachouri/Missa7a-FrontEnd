import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MedicalActService } from './../../../../services/medical-act.service';

@Component({
  selector: 'app-edit-medical-act',
  templateUrl: './edit-medical-act.component.html',
  styleUrls: ['./edit-medical-act.component.scss']
})
export class EditMedicalActComponent implements OnInit {
  submitted = false;
  MedicalActEditForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private MedicalActService:MedicalActService,
    private toast: NgToastService,
    private dialogRef: MatDialogRef<EditMedicalActComponent>,
    @Inject(MAT_DIALOG_DATA) public MedicalActData
  ) {
    this.ValidateForm();
  }

  ngOnInit(): void {
    if (this.MedicalActData) {
      this.MedicalActEditForm.controls["NomActe"].setValue(
        this.MedicalActData.NomActe
      );
    }
  }

  ValidateForm() {
    this.MedicalActEditForm = this.fb.group({
      NomActe: [null, [Validators.required]],
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
    if (!this.MedicalActEditForm.valid) {
      return false;
    } else {
      return this.MedicalActService.updateMedicalAct(
        this.MedicalActData._id,
        this.MedicalActEditForm.value
      ).subscribe({
        complete: () => {
          this.MedicalActEditForm.reset(this.MedicalActEditForm.value);
          this.dialogRef.close();
          this.toast.success({
            detail: "succès",
            summary: "Acte Médicale Modifiée avec succès!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        error: (err) => {
          this.MedicalActEditForm.reset(this.MedicalActEditForm.value);
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



