import {
  Component,
  Inject,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NgToastService } from "ng-angular-popup";
import { MedicalFolderService } from "./../../../../services/medical-folder.service";


@Component({
  selector: "app-create-folder",
  templateUrl: "./create-folder.component.html",
  styleUrls: ["./create-folder.component.scss"],
})
export class CreateFolderComponent implements OnInit {
  submitted = false;
  CreateFolderForm: FormGroup;
  uploadedFiles: Array < File > ;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private toast: NgToastService,
    private dialogRef: MatDialogRef<CreateFolderComponent>,
    private MedicalFolderService: MedicalFolderService,
    @Inject(MAT_DIALOG_DATA) public FolderData
  ) {
    this.ValidateForm();
  }

  ngOnInit(): void {
    if (this.FolderData) {
      this.CreateFolderForm.controls["Prenom"].setValue(this.FolderData.Prenom);
      this.CreateFolderForm.controls["Nom"].setValue(this.FolderData.Nom);
      this.CreateFolderForm.controls["cin"].setValue(this.FolderData.cin);
    }
  }

  ValidateForm() {
    this.CreateFolderForm = this.fb.group({
      Prenom: ["", [Validators.required]],
      Nom: ["", [Validators.required]],
      cin: [
        "",
        [Validators.required, Validators.pattern("^[01][01][0-9]{6}$")],
      ],
      TaillePatient: [null, [Validators.required]],
      PoidsPatient: [null, [Validators.required]],
      PerimetrePatient: [null, [Validators.required]],
      Antecedents: ["", [Validators.maxLength(200)]],
      AllergiesMedicamenteuses: ["", [Validators.maxLength(200)]],
      MaladiesHereditaires: ["", [Validators.maxLength(200)]],
      AllergiesAlimentaires: ["", [Validators.maxLength(200)]],
    });
  }

  fileChange(element) {
      this.uploadedFiles = element.target.files;
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }


  onSubmit() {

    let formData = new FormData();

    formData.append("Nom",this.CreateFolderForm.value.Nom);
    formData.append("Prenom",this.CreateFolderForm.value.Prenom);
    formData.append("cin",this.CreateFolderForm.value.cin);
    formData.append("TaillePatient",this.CreateFolderForm.value.TaillePatient);
    formData.append("PoidsPatient",this.CreateFolderForm.value.PoidsPatient);
    formData.append("PerimetrePatient",this.CreateFolderForm.value.PerimetrePatient);
    formData.append("Antecedents",this.CreateFolderForm.value.Antecedents);
    formData.append("AllergiesMedicamenteuses",this.CreateFolderForm.value.AllergiesMedicamenteuses);
    formData.append("MaladiesHereditaires",this.CreateFolderForm.value.MaladiesHereditaires);
    formData.append("AllergiesAlimentaires",this.CreateFolderForm.value.AllergiesAlimentaires);
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("files", this.uploadedFiles[i]);
    }

    this.submitted = true;
    if (!this.CreateFolderForm.valid) {
      return false;
    } else {
      return this.MedicalFolderService.createPatientMedicalFolder(
        this.FolderData._id,
        formData
      ).subscribe({
        complete: () => {
          console.log("Dossier créé avec succès!");
          this.CreateFolderForm.reset(this.CreateFolderForm.value);
          this.dialogRef.close();
          this.toast.success({
            detail: "succès",
            summary: "Dossier Ajouté avec succès!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        error: (err) => {
          this.CreateFolderForm.reset(this.CreateFolderForm.value);
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
