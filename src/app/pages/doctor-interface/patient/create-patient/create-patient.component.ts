import { MatDialogRef } from "@angular/material/dialog";
import { PatientService } from "./../../../../services/patient.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgToastService } from "ng-angular-popup";
@Component({
  selector: "app-create-patient",
  templateUrl: "./create-patient.component.html",
  styleUrls: ["./create-patient.component.scss"],
})
export class CreatePatientComponent implements OnInit {
  submitted = false;
  PatientForm: FormGroup;
  MaritalStatusList = ["Célibataire", "Marié(e)", "Divorcé(e)", "Veuf"];
  public maxDate = new Date();

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private PatientService: PatientService,
    private toast: NgToastService,
    private dialogRef: MatDialogRef<CreatePatientComponent>
  ) {
    this.ValidateForm();
  }

  ngOnInit(): void {}

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  ValidateForm() {
    this.PatientForm = this.fb.group({
      Prenom: ["", [Validators.required , Validators.minLength(5)]],
      Nom: ["", [Validators.required , Validators.minLength(5)]],
      cin: [
        "",
        [Validators.pattern("^[01][01][0-9]{6}$")],
      ],
      email:[
        "",[Validators.required,Validators.email]
      ],
      sexe: ["", [Validators.required]],
      numeroTel: ["", [Validators.required, Validators.pattern("^[0-9]{8}$")]],
      DateNaiss: ["", [Validators.required]],
      Etatcivil: ["", [Validators.required]],
      Travail : ["", [Validators.required]],
      adresse: ["", [Validators.required]],
      assurance: ["", [Validators.required]],
    });
  }

  // Getter to access form control
  get myForm() {
    return this.PatientForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.PatientForm.valid) {
      return false;
    } else {
      return this.PatientService.createPatient(
        this.PatientForm.value
      ).subscribe({
        complete: () => {
          console.log("Patient créé avec succès!");
          this.PatientForm.reset(this.PatientForm.value);
          this.dialogRef.close();
          this.toast.success({
            detail: "succès",
            summary: "Patient créé avec succès!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        error: (res) => {
          this.PatientForm.reset(this.PatientForm.value);
          this.toast.error({
            detail: "échec",
            summary: "échec de création!",
            duration: 3000,
          });
        },
      });
    }
  }
}
