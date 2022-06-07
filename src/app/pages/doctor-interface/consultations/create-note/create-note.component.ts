import { CertificatMedicaleService } from './../../../../services/certificat-medicale.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ConsultationService } from "./../../../../services/consultation.service";
import { AuthService } from "./../../../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {
  submitted = false;
  public variables: [];
  public filteredList;
  CreateDoctorNoteForm: FormGroup;
  constructor(
    private router : Router,
    private ConsultationService: ConsultationService,
    private AuthService : AuthService,
    private CertificatMedicaleService : CertificatMedicaleService,
    private dialogRef: MatDialogRef<CreateNoteComponent>,
    public fb: FormBuilder,
    private toast: NgToastService
  ) {
    this.ValidateDoctorNoteForm();
  }

  ngOnInit(): void {
    this.getConsultations();
    this.AuthService.getLoggedInUser().subscribe((res:any)=>{
        this.CreateDoctorNoteForm.controls["NomDocteur"].setValue(
        res.data.Nom
      );
      this.CreateDoctorNoteForm.controls["PrenomDocteur"].setValue(
        res.data.Prenom
      );
    })
  }

  getConsultations() {
    this.ConsultationService.getConsultations().subscribe((res: any) => {
      this.variables = res.data;
      this.filteredList = this.variables.slice();
    });
  }

  ValidateDoctorNoteForm(){
    this.CreateDoctorNoteForm = this.fb.group({
      NomDocteur : ["",[Validators.required]],
      PrenomDocteur : ["",[Validators.required]],
      NomPatient : ["",[Validators.required]],
      PrenomPatient : ["",[Validators.required]],
      destination : ["",[Validators.required]],
    })
  };

   reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }



  onSubmitDoctorNote(){
    this.submitted = true;
    if (!this.CreateDoctorNoteForm.valid) {
      return false;
    } else {
      let id= this.ConsultationService.AddedConsultationId;
      return this.CertificatMedicaleService.addConsultationMedicalCertificate(
        id,
        this.CreateDoctorNoteForm.value
      ).subscribe({
        complete: () => {
          console.log("Certificat Crée avec succès!");
          this.CreateDoctorNoteForm.reset(this.CreateDoctorNoteForm.value);
          this.dialogRef.close();
          this.toast.success({
            detail: "succès",
            summary: "Certificat Crée avec succès!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        error: (err) => {
          this.CreateDoctorNoteForm.reset(this.CreateDoctorNoteForm.value);
          this.toast.error({
            detail: "échec",
            summary: "échec de création!",
            duration: 3000,
          });
          this.dialogRef.close();
        },
      });
    }
  }

}
