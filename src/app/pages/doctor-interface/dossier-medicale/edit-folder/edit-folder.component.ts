import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { NgToastService } from "ng-angular-popup";
import { MedicalFolderService } from "./../../../../services/medical-folder.service";

@Component({
  selector: "app-edit-folder",
  templateUrl: "./edit-folder.component.html",
  styleUrls: ["./edit-folder.component.scss"],
})
export class EditFolderComponent implements OnInit {
  submitted = false;
  FolderEditForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private toast: NgToastService,
    private MedicalFolderService: MedicalFolderService,
    private dialogRef: MatDialogRef<EditFolderComponent>,
    @Inject(MAT_DIALOG_DATA) public FolderData
  ) {
    this.ValidateForm();
  }

  ngOnInit(): void {
    if (this.FolderData) {
      this.FolderEditForm.controls["TaillePatient"].setValue(
        this.FolderData.TaillePatient
      );

      this.FolderEditForm.controls["PoidsPatient"].setValue(
        this.FolderData.PoidsPatient
      );

      this.FolderEditForm.controls["PerimetrePatient"].setValue(
        this.FolderData.PerimetrePatient
      );
      this.FolderEditForm.controls["Antecedents"].setValue(
        this.FolderData.Antecedents
      );
      this.FolderEditForm.controls["AllergiesMedicamenteuses"].setValue(
        this.FolderData.AllergiesMedicamenteuses
      );
      this.FolderEditForm.controls["MaladiesHereditaires"].setValue(
        this.FolderData.MaladiesHereditaires
      );
      this.FolderEditForm.controls["AllergiesAlimentaires"].setValue(
        this.FolderData.AllergiesAlimentaires
      );
    }
  }

  ValidateForm() {
    this.FolderEditForm = this.fb.group({
      TaillePatient: [null, [Validators.required]],
      PoidsPatient: [null, [Validators.required]],
      PerimetrePatient: [null, [Validators.required]],
      Antecedents : ["",[Validators.maxLength(200)]],
      AllergiesMedicamenteuses : ["",[Validators.maxLength(200)]],
      MaladiesHereditaires : ["",[Validators.maxLength(200)]],
      AllergiesAlimentaires : ["",[Validators.maxLength(200)]],
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }


  onSubmit() {
    this.submitted = true;
    if (!this.FolderEditForm.valid) {
      return false;
    } else {
      return this.MedicalFolderService.updateMedicalFolder(
        this.FolderData._id,
        this.FolderEditForm.value
      ).subscribe({
        complete: () => {
          console.log("Dossier Modifiée avec succès!");
          this.FolderEditForm.reset(this.FolderEditForm.value);
          this.dialogRef.close();
          this.toast.success({
            detail: "succès",
            summary: "Dossier Modifiée avec succès!",
            duration: 3000,
          });
          this.reloadCurrentRoute();
        },
        error: (res) => {
          this.FolderEditForm.reset(this.FolderEditForm.value);
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
