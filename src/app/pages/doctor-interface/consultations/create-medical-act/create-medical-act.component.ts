import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { NgToastService } from "ng-angular-popup";
import { MedicalActService } from "src/app/services/medical-act.service";
import { ConsultationService } from "src/app/services/consultation.service";
@Component({
  selector: "app-create-medical-act",
  templateUrl: "./create-medical-act.component.html",
  styleUrls: ["./create-medical-act.component.scss"],
})
export class CreateMedicalActComponent implements OnInit {
  submitted = false;
  public variables: [];
  public filteredList;
  CreateMedicalActForm: FormGroup;

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private MedicalActService: MedicalActService,
    private ConsultationService:ConsultationService,
    private dialogRef: MatDialogRef<CreateMedicalActComponent>,
    public fb: FormBuilder,
    private toast: NgToastService
  ) {
    this.ValidateMedicalActForm();
  }

  ngOnInit(): void {}

  ValidateMedicalActForm() {
    this.CreateMedicalActForm = this.fb.group({
      NomActe : ["",[Validators.required]],
      TarifActe : ["",[Validators.required,Validators.min(10)]]
    })
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.CreateMedicalActForm.valid) {
      return false;
    } else {
      let id= this.ConsultationService.AddedConsultationId;
      console.log(id);
      return this.MedicalActService.addConsultationMedicalAct(
        id,
        this.CreateMedicalActForm.value
      ).subscribe({
        complete: () => {
          this.CreateMedicalActForm.reset(this.CreateMedicalActForm.value);
          this.dialogRef.close();
          this.toast.success({
            detail: "succès",
            summary: "Acte Crée avec succès!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        error: (err) => {
          this.CreateMedicalActForm.reset(this.CreateMedicalActForm.value);
          this.toast.error({
            detail: "échec",
            summary: "échec de création!",
            duration: 3000,
          });
          this.dialogRef.close();
          this.reloadCurrentRoute();
        },
      });
    }
  }
}

