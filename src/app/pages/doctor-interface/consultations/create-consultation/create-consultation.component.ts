import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgToastService } from "ng-angular-popup";
import { ConsultationService } from "../../../../services/consultation.service";
import { PatientService } from "../../../../services/patient.service";
import { CreatePrescriptionComponent } from "../create-prescription/create-prescription.component";
import { CreateNoteComponent } from "../create-note/create-note.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-create-consultation",
  templateUrl: "./create-consultation.component.html",
  styleUrls: ["./create-consultation.component.scss"],
})
export class CreateConsultationComponent implements OnInit {
  submitted = false;
  ConsultationForm: FormGroup;
  patientId: string;
  consultationId: string;
  MedicalFolderId: string;
  StartTime: Date;
  Subject: string;
  Nom: string;
  Prenom: string;
  cin: string;
  medicalActs: { NomActe: string; TarifActe: string }[] = [];

  constructor(
    private dialog: MatDialog,
    private PatientService: PatientService,
    private ConsultationService: ConsultationService,
    public fb: FormBuilder,
    private router: Router,
    private toast: NgToastService
  ) {
    this.patientId = this.PatientService.patientId;
    this.StartTime = this.PatientService.StartTime;
    this.Subject = this.PatientService.Subject;
    this.ValidateConsultationForm();
  }

  ngOnInit(): void {
    this.getPatient();
    this.StartTime = this.PatientService.StartTime;
    this.Subject = this.PatientService.Subject;
  }

  ValidateConsultationForm() {
    this.ConsultationForm = this.fb.group({
      TensionSystolique: ["", [Validators.required]],
      TensionDiastolique: ["", [Validators.required]],
      Temperature: ["", [Validators.required]],
      DiagnoCons: ["", [Validators.required]],
      Motif: ["", [Validators.required]],
      CommentaireCons: ["", [Validators.required]],
      NomActe :["",[Validators.required]],
      TarifActe :["",[Validators.required]]
    });
  }

  getPatient() {
    this.PatientService.getPatient(this.patientId).subscribe((res) => {
      this.Prenom = res.data.Prenom;
      this.Nom = res.data.Nom;
      this.cin = res.data.cin;
      this.MedicalFolderId = res.data.dossier._id;
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  createPrescription() {
    this.dialog.open(CreatePrescriptionComponent, {
      width: "40%",
    });
  }

  createDoctorNote() {
    this.dialog.open(CreateNoteComponent, {
      width: "40%",
    });
  }

  addAct() {
    this.medicalActs.push({
      NomActe: this.ConsultationForm.value.NomActe,
      TarifActe: this.ConsultationForm.value.TarifActe,
    });
  }

  removeAct(index){
    this.medicalActs.splice(index,1);
  }

  onSubmit() {
    this.submitted = true;
    if (!this.ConsultationForm.valid) {
      return false;
    } else {
      return this.ConsultationService.addConsultation(
        this.MedicalFolderId,
        {
          TensionSystolique : this.ConsultationForm.value.TensionSystolique,
          TensionDiastolique : this.ConsultationForm.value.TensionDiastolique,
          Temperature :  this.ConsultationForm.value.Temperature,
          DiagnoCons :  this.ConsultationForm.value.DiagnoCons,
          Motif : this.ConsultationForm.value.Motif,
          CommentaireCons :  this.ConsultationForm.value.CommentaireCons,
          medicalActs : this.medicalActs
        }
        ).subscribe(
        (res) => {
          this.ConsultationService.AddedConsultationId = res.data._id;
          this.ConsultationForm.reset(this.ConsultationForm.value);
          this.toast.success({
            detail: "succès",
            summary: "Consultation crée avec succès!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        (err: any) => {
          this.toast.error({
            detail: "échec",
            summary: "échec de création!",
            duration: 3000,
          });
        }
      );
    }
  }
}
