import { ConsultationService } from './../../../../services/consultation.service';
import { PrescriptionService } from './../../../../services/prescription.service';
import { AuthService } from './../../../../services/auth.service';
import { Component,OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from "@angular/router";
import { NgToastService } from "ng-angular-popup";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-create-prescription",
  templateUrl: "./create-prescription.component.html",
  styleUrls: ["./create-prescription.component.scss"],
})
export class CreatePrescriptionComponent implements OnInit {
  submitted = false;
  prescriptionId: any;
  medicamentsArray : { NomMed: string; FormeMed: string,QuanMed : number ,  DosaMed : string , NbreFoisMed : string , Presentation : string }[] = [] ;
  CreatePrescriptionForm : FormGroup;

  constructor(
    public fb: FormBuilder,
    private AuthService : AuthService,
    private PrescriptionService : PrescriptionService,
    private ConsultationService : ConsultationService,
    private router: Router,
    private dialogRef: MatDialogRef<CreatePrescriptionComponent>,
    private toast: NgToastService
  ) {
    this.ValidatePrescriptionForm();
  }

  ngOnInit(): void {
    this.AuthService.getLoggedInUser().subscribe((res:any)=>{
       this.CreatePrescriptionForm.controls["NomDocteur"].setValue(res.data.Nom);
      this.CreatePrescriptionForm.controls["PrenomDocteur"].setValue(res.data.Prenom);
    })
  }

  // {{URL}}/api/v1/consultations/62741f7f4ad3e1795986710a/prescription



  addMedicament(){
    this.medicamentsArray.push({
      NomMed : this.CreatePrescriptionForm.value.NomMed,
      FormeMed : this.CreatePrescriptionForm.value.FormeMed,
      QuanMed : this.CreatePrescriptionForm.value.QuanMed,
      DosaMed : this.CreatePrescriptionForm.value.DosaMed,
      NbreFoisMed : this.CreatePrescriptionForm.value.NbreFoisMed,
      Presentation : this.CreatePrescriptionForm.value.Presentation
    })
  }

  removeMedicament(index){
    this.medicamentsArray.splice(index,1);
  }

  ValidatePrescriptionForm() {
    this.CreatePrescriptionForm = this.fb.group({
      NomDocteur: ["", [Validators.required]],
      PrenomDocteur: ["", [Validators.required]],
      NomPatient: ["", [Validators.required]],
      PrenomPatient: ["", [Validators.required]],
      NomMed: ["", [Validators.required]],
      FormeMed: ["", [Validators.required]],
      QuanMed :["",[Validators.required]],
      DosaMed :["",[Validators.required]],
      NbreFoisMed :["",[Validators.required]],
      Presentation :["",[Validators.required]],
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
    if (!this.CreatePrescriptionForm.valid) {
      return false;
    } else {
      let id= this.ConsultationService.AddedConsultationId;
      return this.PrescriptionService.createConsultationPrescription(
        id,
        {
          NomDocteur : this.CreatePrescriptionForm.value.NomDocteur,
          PrenomDocteur : this.CreatePrescriptionForm.value.PrenomDocteur,
          NomPatient :  this.CreatePrescriptionForm.value.NomPatient,
          PrenomPatient :  this.CreatePrescriptionForm.value.PrenomPatient,
          medications : this.medicamentsArray
        }
        ).subscribe(
        (res) => {
          this.CreatePrescriptionForm.reset(this.CreatePrescriptionForm.value);
          this.dialogRef.close();
          this.toast.success({
            detail: "succès",
            summary: "Ordonnance crée avec succès!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        (err: any) => {
          this.dialogRef.close();
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
