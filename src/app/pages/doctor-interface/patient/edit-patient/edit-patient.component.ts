import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { NgToastService } from "ng-angular-popup";
import { PatientService } from "src/app/services/patient.service";
@Component({
  selector: "app-edit-patient",
  templateUrl: "./edit-patient.component.html",
  styleUrls: ["./edit-patient.component.scss"],
})
export class EditPatientComponent implements OnInit {
  submitted = false;
  PatientEditForm: FormGroup;
  MaritalStatusList = ["Célibataire", "Marié(e)", "Divorcé(e)", "Veuf"];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private PatientService: PatientService,
    private toast: NgToastService,
    private dialogRef: MatDialogRef<EditPatientComponent>,
    @Inject(MAT_DIALOG_DATA) public editData
  ) {
    this.ValidateForm();
  }

  ngOnInit(): void {
    if (this.editData) {
      this.PatientEditForm.controls["Prenom"].setValue(this.editData.Prenom);
      this.PatientEditForm.controls["Nom"].setValue(this.editData.Nom);
      this.PatientEditForm.controls["cin"].setValue(this.editData.cin);
      this.PatientEditForm.controls["email"].setValue(this.editData.email);

      this.PatientEditForm.controls["sexe"].setValue(this.editData.sexe);
      this.PatientEditForm.controls["numeroTel"].setValue(
        this.editData.numeroTel
      );
      this.PatientEditForm.controls["DateNaiss"].setValue(
        this.editData.DateNaiss
      );
      this.PatientEditForm.controls["Etatcivil"].setValue(
        this.editData.Etatcivil
      );
      this.PatientEditForm.controls["Travail"].setValue(this.editData.Travail);
      this.PatientEditForm.controls["adresse"].setValue(this.editData.location.formattedAddress);
      this.PatientEditForm.controls["assurance"].setValue(
        this.editData.assurance
      );
    }
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }


  ValidateForm() {
    this.PatientEditForm = this.fb.group({
      Prenom: ["", [Validators.required]],
      Nom: ["", [Validators.required]],
      cin: [
        "",
        [Validators.pattern("^[01][01][0-9]{6}$")],
      ],
      email:["",[Validators.required,Validators.email]],
      sexe: ["", [Validators.required]],
      numeroTel: ["", [Validators.required, Validators.pattern("^[0-9]{8}$")]],
      DateNaiss: ["", [Validators.required]],
      Etatcivil: ["", [Validators.required]],
      Travail : ["",[Validators.required]],
      adresse: ["", [Validators.required]],
      assurance: ["", [Validators.required]],
    });
  }


  onSubmit() {
    this.submitted = true;
    if (!this.PatientEditForm.valid) {
      return false;
    } else {
      return this.PatientService.updatePatient(
        this.editData._id,
        this.PatientEditForm.value
      ).subscribe({
        complete: () => {
          this.PatientEditForm.reset(this.PatientEditForm.value);
          this.dialogRef.close();
          this.toast.success({
            detail: "succès",
            summary: "Patient Modifiée avec succès!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        error: (res) => {
          this.PatientEditForm.reset(this.PatientEditForm.value);
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
